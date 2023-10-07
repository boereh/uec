<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind, useMounted } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { NuxtLink } from '#components'

import 'swiper/css'

type Movie = {
  id: number
  title: string
  poster: string
  special: boolean
  released: Date
  placeholder: boolean
}

type Section = { title: string; movies: Movie[] }

const placeholders: Movie[] = [
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
  {
    title: '',
    poster: '/img/movies-placeholder.png',
    id: 0,
    special: false,
    placeholder: true,
    released: new Date(),
  },
]

const isMounted = useMounted()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDeviceExtraSmall = breakpoints.smallerOrEqual('sm')
const isDeviceSmall = breakpoints.smallerOrEqual('md')
const isDeviceMedium = breakpoints.smallerOrEqual('lg')
const isDeviceLarge = breakpoints.smallerOrEqual('xl')
const isDeviceMassive = breakpoints.smallerOrEqual('2xl')

const slideAmount = computed(() => {
  if (isDeviceExtraSmall.value) return 2.25
  if (isDeviceSmall.value) return 2.5
  if (isDeviceMedium.value) return 5.25
  if (isDeviceLarge.value) return 6.25
  if (isDeviceMassive.value) return 7.5

  return 8.75
})

const { data: movies } = useFetch<Movie[]>('/api/movies', {
  method: 'POST',
})

const sections = computed(() => {
  const result: Section[] = [
    { title: 'Now Playing', movies: [] },
    { title: 'Coming Soon', movies: [] },
    { title: 'Special Events', movies: [] },
  ]

  for (const movie of movies.value || []) {
    if (new Date(movie.released).valueOf() <= Date.now()) {
      result[0].movies.push(movie)
    } else {
      result[1].movies.push(movie)
    }

    if (movie.special) result[2].movies.push(movie)
  }

  return result.map((x) => ({
    ...x,
    movies: x.movies.sort((a, b) => a.title.localeCompare(b.title)),
  }))
})

useHead({
  title: 'UEC Theatres',
})
</script>

<template>
  <div
    v-for="section of sections"
    :key="section.title"
    class="px-4 sm:px-8"
  >
    <u-container
      div-tag="h1"
      tag="div"
    >
      {{ section.title }}
    </u-container>

    <swiper
      :slides-per-view="slideAmount"
      :space-between="16"
      class="select-none"
    >
      <swiper-slide v-for="movie of isMounted ? section.movies : placeholders">
        <component
          :is="isMounted ? NuxtLink : 'div'"
          class="space-y-2 max-w-xs group text-black/70 dark:text-white/50"
          :to="`/movies/${movie.id}`"
        >
          <img
            class="w-full"
            :src="!!movie.placeholder ? movie.poster : `https://uecmovies.com${movie.poster}`"
            :alt="movie.title"
          />

          <p class="group-hover:underline">
            {{ movie.title }}
          </p>
        </component>
      </swiper-slide>
    </swiper>
  </div>
</template>
