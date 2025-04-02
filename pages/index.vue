<script setup lang="ts">
import { IconClock, IconMovie, IconCalendar } from "@tabler/icons-vue";
import { useLocalStorage } from "@vueuse/core";

type Movie = {
  id: string;
  title: string;
  poster: string;
};

const tabs = [
  {
    label: "Now Playing",
    kind: "playing",
    icon: IconMovie,
  },
  {
    label: "Coming Soon",
    kind: "coming",
    icon: IconClock,
  },
  {
    label: "Special Event",
    kind: "special",
    icon: IconCalendar,
  },
];
const current_tab = ref(tabs[0]);
const movies = ref<Record<string, Movie[]>>({});
const local_movies = useLocalStorage<Record<string, Movie[]>>("key:movies", {});
const display_movies = computed(() => {
  return movies.value[current_tab.value.label] || [];
});

watch(
  [current_tab],
  ([currrent]) => {
    if (!window) return;
    if (display_movies.value.length > 0) return;
    const local = local_movies.value[current_tab.value.label];
    const current = current_tab.value;

    if (local) {
      movies.value = {
        ...movies.value,
        [current_tab.value.label]: local_movies.value[current_tab.value.label],
      };
    }

    $fetch(`/api/movies?kind=${current_tab.value.kind}`).then((res) => {
      if (current_tab.value.label !== current.label) return;

      const temp_movies = movies.value[current_tab.value.label] || [];

      for (const movie of res) {
        if (temp_movies.find((m) => m.id === movie.id)) continue;
        temp_movies.push(movie);
      }

      movies.value = {
        ...movies.value,
        [current_tab.value.label]: temp_movies,
      };

      local_movies.value = movies.value;
    });
  },
  { immediate: true }
);
</script>

<template>
  <div class="p-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex gap-2 whitespace-nowrap max-w-full overflow-x-auto">
        <button
          v-for="tab of tabs"
          :key="tab.label"
          :class="[
            'flex items-center gap-2 transition px-2 h-10 <md:(h-8 text-sm) rounded-md duration-300',
            current_tab.label === tab.label
              ? 'bg-brand-red'
              : 'text-white/75 hover:bg-white/15 <md:(bg-gray-900)',
          ]"
          @click="current_tab = tab"
        >
          <component :is="tab.icon" size="24" class="" />

          <span
            :class="[current_tab.label === tab.label ? '' : '<md:(hidden)']"
          >
            {{ tab.label }}
          </span>
        </button>
      </div>

      <div class="grid grid-cols-7 <xl:grid-cols-5 <md:grid-cols-3 gap-4 py-4">
        <template v-if="display_movies.length > 0">
          <nuxt-link
            v-for="movie of display_movies.toSorted((a, b) =>
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
              class="absolute top-2 right-0 bg-brand-red/75 backdrop-blur-md <md:text-xs p-1 rounded-l-md text-sm"
            >
              Mega Screen
            </span>
          </nuxt-link>
        </template>

        <template v-else>
          <div
            v-for="index of 14"
            class="block bg-zinc-900 text-center text-white/75 animate-pulse aspect-2/3 rounded-lg"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>
