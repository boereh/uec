<script setup lang="ts">
import { useElementBounding } from "@vueuse/core";
import { IconVideo } from "@tabler/icons-vue";

const trailer_el = useTemplateRef("trailer");
const { width, height } = useElementBounding(trailer_el);
const route = useRoute();
const { data: movie } = useFetch(`/api/movies/${route.params.id}`);
</script>

<template>
  <div v-if="movie" class="p-4">
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="grid grid-cols-4 gap-4">
        <div class="grid-col-span-3 flex flex-col gap-2">
          <h1>{{ movie.title }}</h1>

          <p class="text-white/75">{{ movie.synopsis }}</p>

          <div
            v-for="field of Object.entries((movie as any).fields)"
            :key="field[0]"
          >
            <span class="text-gray-500 tracking-wider uppercase font-bold">
              {{ field[0] }}
            </span>

            <span class="text-gray-500"> — </span>

            <span>
              {{ field[1] }}
            </span>
          </div>
        </div>

        <div class="max-w-sm rounded-lg overflow-hidden">
          <img
            class="w-full"
            :src="`https://uecmovies.com${movie.poster}`"
            :alt="`${movie.title} poster`"
          />
        </div>
      </div>

      <div
        ref="trailer"
        class="aspect-video relative border-1.5 border-zinc-800 rounded-xl overflow-hidden grid place-items-center"
      >
        <svg
          class="absolute z-1 inset-0 h-full w-full stroke-zinc-900"
          fill="none"
        >
          <defs>
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
            </pattern>
          </defs>
          <rect
            stroke="none"
            fill="url(#pattern)"
            width="100%"
            height="100%"
          ></rect>
        </svg>

        <div
          class="p-4 bg-black absolute z-2 rounded-xl border border-zinc-900"
        >
          <IconVideo class="text-zinc-700" size="32" weight="thin" />
        </div>

        <iframe
          v-if="width > 0"
          class="z-3 absolute"
          :src="movie.embed"
          :width="width"
          :height="height"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>
