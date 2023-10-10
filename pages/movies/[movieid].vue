<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind, whenever, useLocalStorage, watchOnce, watchDebounced, useDark, useElementSize } from '@vueuse/core'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import type { Movie } from 'assets/scripts/types/movies'

dayjs.extend(utc)
dayjs.extend(tz)

type Showing = {
  id: number
  time: number
  date: string
}

type Showings = {
  list: Showing[]
  filtered: Showing[]
  date: Dayjs
  options: Dayjs[]
}

const theatre = useTheatre()
const posterEl = ref()
const { height } = useElementSize(posterEl)
const route = useRoute()
const router = useRouter()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDeviceSmall = breakpoints.smallerOrEqual('md')
const trailerEnabled = ref(false)
const showings = reactive<Showings>({
  list: [],
  filtered: [],
  date: dayjs().startOf('day'),
  options: [],
})

const { data: movie, error } = useFetch<Movie>(() => `/api/movies/${route.params.movieid}`, {
  method: 'POST',
})

const metadatas = computed(() => {
  return [
    {
      text: 'Released date',
      value: dayjs(movie.value?.released).format('MMMM DD, YYYY'),
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

    const { data, status } = await useFetch<Showing[]>(`/api/movies/${id}/showings`, {
      body: dayjs().startOf('day').toISOString(),
      method: 'POST',
    })

    watchOnce(data, (list) => {
      showings.list = list || []

      if (!theatre.value) return

      const options: Record<string, Dayjs> = {}

      for (const showing of showings.list) {
        const date = dayjs.tz(showing.date, theatre.value.timezone).startOf('day')

        if (options[date.toISOString()]) continue

        options[date.toISOString()] = date
      }

      showings.options = Object.values(options).sort((a, b) => a.unix() - b.unix())
    })
  },
  { immediate: true }
)

watchDebounced(
  toRef(showings, 'date'),
  (day) => {
    if (!showings.date) return (showings.filtered = [])
    const d = day.startOf('day').toISOString()

    showings.filtered = showings.list.filter(({ date }) => d === dayjs.tz(date, theatre.value?.timezone).startOf('day').toISOString())
  },
  {
    debounce: 50,
    immediate: true,
  }
)
</script>

<template>
  <u-container class="overflow-hidden">
    <div :style="{ minHeight: `calc(${height}px + 2rem)` }">
      <div class="flex justify-center md:float-left mb-8 md:mr-8 relative overscroll-contain">
        <img
          ref="posterEl"
          class="min-w-xs max-w-xs aspect-intial"
          :src="`https://uecmovies.com${movie?.poster}`"
          :alt="movie?.title"
        />

        <!-- <img
          ref="posterEl"
          class="min-w-xs max-w-xs aspect-intial absolute scale-200 blur-3xl -z-1 opacity-25 pointer-events-none select-none"
          :src="`https://uecmovies.com${movie?.poster}`"
          :alt="movie?.title"
        /> -->
      </div>

      <div class="flex <md:flex-col gap-4 items-start justify-between">
        <div class="flex gap-4 items-start">
          <h1 class="m-0">{{ movie?.title }}</h1>

          <span class="noto-serif text-white bg-black dark:bg-white dark:text-black font-bold px-1 rounded select-none whitespace-nowrap mt-2 <sm:mt-3">
            {{ movie?.mpaa }}
          </span>
        </div>

        <u-button
          type="primary"
          size="medium"
          :block="isDeviceSmall"
          :href="`/movies/${movie?.id}`"
        >
          GET TICKETS
        </u-button>
      </div>

      <br />

      <table class="z-1">
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

      <u-button
        icon="fluent:movies-and-tv-20-regular"
        @click="trailerEnabled = true"
      >
        Watch Trailer
      </u-button>

      <br />

      <p>{{ movie?.description }}</p>
    </div>

    <br />

    <h2>Get tickets for {{ movie?.title }}</h2>

    <br />

    <div
      v-if="showings.options.length > 0"
      class="flex gap-2"
    >
      <u-button
        v-for="option of showings.options"
        :key="option.unix()"
        :type="showings.date.unix() === option.unix() ? 'primary' : 'default'"
        @click="showings.date = option"
      >
        {{ option.format('DD MMM') === dayjs().format('DD MMMM') ? 'Today' : option.format('DD MMM') }}
      </u-button>
    </div>

    <br v-if="showings.options.length > 0" />

    <div
      id="showings"
      class="border border-dark-500 bg-dark-900 p-4 sm:p-8 min-h-xs"
    >
      <div
        v-if="!theatre"
        class="flex flex-col justify-center items-center gap-2 min-h-xs"
      >
        <p>You don't have a theatre selected.</p>

        <u-button :href="`/theatres?redirect=/movies/${movie?.id}`">Select a theatre</u-button>
      </div>

      <div
        v-if="theatre && showings.filtered.length > 0"
        v-for="item of showings.filtered"
      >
        {{ item.id }}
      </div>

      <div
        v-if="theatre && showings.filtered.length < 1"
        class="flex flex-col justify-center items-center gap-2 min-h-xs text-center"
      >
        <p>There isn't any showtimes for this movie at {{ theatre.name }}.</p>

        <div class="flex items-center <sm:flex-col gap-4">
          <u-button @click="$router.back()"> Go back </u-button>

          <u-button
            type="text"
            :href="`/theatres?redirect=/movies/${movie?.id}`"
            >Select another theatre</u-button
          >
        </div>
      </div>
    </div>
  </u-container>

  <u-modal
    v-model:visible="trailerEnabled"
    :title="`Watch the trailer of ${movie?.title}`"
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
