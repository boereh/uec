<script setup lang="ts">
import {
	useBreakpoints,
	breakpointsTailwind,
	whenever,
	useLocalStorage,
	watchOnce,
	watchDebounced,
	useDark,
	useElementSize,
} from '@vueuse/core'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { Movie } from 'assets/scripts/types/movies'
import theatres from 'assets/json/theatres.json'

dayjs.extend(utc)

type Showing = {
	id: number
	time: number
	date: string
}

type Showings = {
	list: Showing[]
	filtered: Showing[]
	date: string | null
	options: string[]
}

const posterEl = ref()
const { height } = useElementSize(posterEl)
const route = useRoute()
const router = useRouter()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDeviceSmall = breakpoints.smallerOrEqual('md')
const theatre = useLocalStorage('uec-theatre', '')
const trailerEnabled = ref(false)
const showings = reactive<Showings>({
	list: [],
	filtered: [],
	date: dayjs().utc().startOf('date').toISOString(),
	options: [],
})

const { data: movie, error } = useFetch<Movie>(
	() => `/api/movies/${route.params.movieid}`,
	{
		method: 'POST',
	}
)

const metadatas = computed(() => {
	return [
		{
			text: 'Released date',
			value: dayjs(movie.value?.released).format('DD MMMM YYYY'),
		},
		{
			text: 'Runtime',
			value: `${movie.value?.runtime} minutes`,
		},
		{
			text: 'MPAA Rating',
			value: `${movie.value?.mpaa}`,
		},
		{
			text: 'Actors',
			value: `${movie.value?.actors.join(', ')}`,
		},
		{
			text: 'Director',
			value: movie.value?.director,
		},
		{
			text: 'Genre',
			value: `${movie.value?.genre.join(', ')}`,
		},
		{
			text: 'Special event',
			value: movie.value?.special ? 'Special' : 'N/A',
		},
	]
})

console.log(dayjs(dayjs().format('YYYY-MM-DD')).toISOString())

if (error.value) router.replace('/404')

useHead({
	script: [{ src: 'https://www.youtube.com/iframe_api' }],
})

whenever(
	movie,
	async ({ title, id }) => {
		useHead({
			title: `${title} - UEC Theatres`,
		})

		if (!theatre.value) return

		const t = theatres.find(({ name }) => name === theatre.value)

		if (!t) return

		const { data } = await useFetch<Showing[]>(
			() => `/api/movies/${id}/showings`,
			{
				body: t.id,
				method: 'POST',
			}
		)

		console.log(data, data.value)

		showings.list = data.value || []
	},
	{ immediate: true }
)

watchDebounced(
	toRef(showings, 'date'),
	(day) => {
		if (!showings.date) return (showings.filtered = [])

		showings.filtered = showings.list.filter((showing) => day === showing.date)
	},
	{
		debounce: 50,
		immediate: true,
	}
)
</script>

<template>
	<u-container>
		<div :style="{ minHeight: `calc(${height}px + 2rem)` }">
			<div class="flex justify-center md:float-left mb-8 md:mr-8">
				<img
					ref="posterEl"
					class="min-w-xs max-w-xs aspect-intial"
					:src="movie?.poster"
					:alt="movie?.title"
				/>
			</div>

			<div class="flex <md:flex-col gap-4 items-start justify-between">
				<div class="flex gap-4 items-start">
					<h1 class="m-0">{{ movie?.title }}</h1>

					<span
						class="noto-serif text-white bg-black dark:bg-white dark:text-black font-bold px-1 rounded select-none whitespace-nowrap mt-2 <sm:mt-3"
					>
						{{ movie?.mpaa }}
					</span>
				</div>

				<u-button
					type="primary"
					size="medium"
					:block="isDeviceSmall"
					:href="`/movies/${movie?.id}#showings`"
				>
					GET TICKETS
				</u-button>
			</div>

			<br />

			<table>
				<tbody>
					<tr
						v-for="metadata of metadatas"
						:key="metadata.text"
						class="border-b border-light-700 dark:border-dark-500"
					>
						<td class="pr-8 py-2 whitespace-nowrap">{{ metadata.text }}:</td>

						<td>
							{{ metadata.value }}
						</td>
					</tr>
				</tbody>
			</table>

			<br />

			<p>{{ movie?.description }}</p>
		</div>

		<br />

		<h2>Get tickets for {{ movie?.title }}</h2>

		<br />

		<div
			id="showings"
			class="border border-dark-500 p-4 sm:p-8 min-h-xs"
		>
			{{ showings.date }}
		</div>
	</u-container>

	<u-modal
		v-model:visible="trailerEnabled"
		:title="`Trailer for ${movie?.title}`"
	>
		<iframe
			v-if="trailerEnabled"
			class="w-screen max-w-full aspect-video"
			:src="movie?.youtube || undefined"
			frameborder="0"
			allowfullscreen="true"
		/>
	</u-modal>
</template>
