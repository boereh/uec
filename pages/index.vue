<script setup lang="ts">
import { IconClock, IconMovie, IconCalendar } from "@tabler/icons-vue";
const { data: movies } = await useFetch("/api/movies");

const tabs = [
  {
    label: "Now Playing",
    movies: movies?.value?.playing || [],
    icon: IconMovie,
  },
  {
    label: "Coming Soon",
    movies: movies?.value?.coming || [],
    icon: IconClock,
  },
  {
    label: "Special Event",
    movies: movies?.value?.special || [],
    icon: IconCalendar,
  },
];

const current_tab = ref(tabs[0]);
</script>

<template>
  <div class="p-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex gap-2 whitespace-nowrap">
        <button
          v-for="tab of tabs"
          :key="tab.label"
          :class="[
            'flex items-center gap-2 transition px-2 h-10 rounded-md duration-300',
            current_tab.label === tab.label
              ? 'bg-brand-red'
              : 'text-white/75 hover:bg-white/15',
          ]"
          @click="current_tab = tab"
        >
          <component :is="tab.icon" size="24" />

          {{ tab.label }}
        </button>
      </div>

      <div class="grid grid-cols-7 gap-4 py-4">
        <nuxt-link
          v-for="movie of current_tab.movies.toSorted((a, b) =>
            a.title.localeCompare(b.title)
          )"
          :to="`/movie/${movie.id}`"
          class="relative border-2 border-transparent rounded-lg overflow-hidden hover:border-brand-red transition duration-300"
        >
          <img
            :src="`https://uecmovies.com${movie.poster}`"
            :alt="`${movie.title} poster`"
          />

          <span
            v-if="movie.title.includes('Mega Screen')"
            class="absolute top-2 right-0 bg-brand-red/75 backdrop-blur-md p-1 rounded-l-md text-sm"
          >
            Mega Screen
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
  <!-- <div class="space-y-8">
    <Carousel :movies="movies?.playing || []" label="Now Playing"></Carousel>
    <Carousel :movies="movies?.coming || []" label="Coming Soon"></Carousel>
    <Carousel :movies="movies?.special || []" label="Special Event"></Carousel>
  </div> -->
</template>
