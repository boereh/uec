<script setup lang="ts">
import {
    useBreakpoints,
    breakpointsTailwind,
    whenever,
    useLocalStorage,
    watchOnce,
    watchDebounced,
    useDark,
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

        showings.filtered = showings.list.filter(
            (showing) => day === showing.date
        )
    },
    {
        debounce: 50,
        immediate: true,
    }
)
</script>

<template>
    <u-container>
        <div class="flex <md:flex-col-reverse gap-4 sm:gap-8">
            <div>
                <img
                    class="min-w-xs <md:hidden aspect-intial"
                    :src="movie?.poster"
                    :alt="movie?.title"
                />
            </div>

            <div class="flex-grow flex flex-col">
                <div
                    class="flex <md:flex-col gap-4 md:items-center justify-between"
                >
                    <div class="flex gap-4 items-center">
                        <h1 class="mb-0">{{ movie?.title }}</h1>

                        <span
                            class="noto-serif text-white bg-black dark:bg-white dark:text-black font-bold px-1 rounded select-none whitespace-nowrap"
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

                <div class="flex <md:flex-col gap-4 flex-grow">
                    <img
                        class="md:hidden"
                        :src="movie?.poster"
                        :alt="movie?.title"
                    />

                    <div class="flex flex-col">
                        <p>{{ movie?.description }}</p>

                        <br />

                        <table class="w-full">
                            <tbody>
                                <tr
                                    v-for="metadata of metadatas"
                                    :key="metadata.text"
                                    class="border-b border-light-700 dark:border-dark-500"
                                >
                                    <td class="pr-8 py-2 whitespace-nowrap">
                                        {{ metadata.text }}:
                                    </td>

                                    <td>
                                        {{ metadata.value }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br />

                        <div class="flex-grow"></div>

                        <div>
                            <u-button
                                v-if="movie?.youtube"
                                @click="trailerEnabled = true"
                            >
                                Watch trailer
                            </u-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br />
        <br />

        <h2>Get tickets for {{ movie?.title }}</h2>

        <br />

        <div id="showings" class="border border-dark-500 p-4 sm:p-8 min-h-xs">
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
