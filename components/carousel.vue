<script setup lang="ts">
import {
  useBreakpoints,
  breakpointsTailwind,
  useScroll,
  useElementSize,
} from "@vueuse/core";

type Props = {
  movies: Array<{
    title: string;
    poster: string;
    id: string;
  }>;
  label: string;
};

const props = defineProps<Props>();
const breakpoints = useBreakpoints(breakpointsTailwind);
const carousel = useTemplateRef<HTMLDivElement>("carousel");
const { height: carousel_height } = useElementSize(carousel);
const carousel_scroll = useScroll(carousel);
const scroll_left = ref(0);
const small_screen = breakpoints.smaller("md");
watch(toRef(carousel_scroll, "isScrolling"), () => {
  scroll_left.value = carousel.value?.scrollLeft || 0;
});

watch(scroll_left, (v) => {
  if (!carousel.value) return;

  carousel.value.scrollLeft = v;
});
</script>

<template>
  <div class="px-4">
    <div class="">
      <component :is="small_screen ? 'h3' : 'h1'" class="md:py-4">
        {{ label }}
      </component>

      <!-- <div
        v-if="false"
        class="absolute z-1 w-full flex justify-between pointer-events-none"
        :style="{ height: carousel_height + 'px' }"
      >
        <button
          :class="[
            'left-0 bg-black/79 w-16 hover:bg-black/69 transition-all grid place-items-center',
            !carousel_scroll.arrivedState.left
              ? 'pointer-events-auto'
              : 'opacity-0',
            carousel_scroll.arrivedState.right ? 'w-32' : '',
          ]"
          @click="scroll_left = scroll_left - 750"
        >
          <PhCaretLeft size="24" weight="bold" />
        </button>

        <button
          :class="[
            'right-0 bg-black/79 w-16 hover:bg-black/69 transition-all grid place-items-center',
            !carousel_scroll.arrivedState.right
              ? 'pointer-events-auto'
              : 'opacity-0',
            carousel_scroll.arrivedState.left ? 'w-32' : '',
          ]"
          @click="scroll_left = scroll_left + 750"
        >
          <PhCaretRight size="24" weight="bold" />
        </button>
      </div> -->

      <div
        ref="carousel"
        :class="[
          'flex overflow-x-auto gap-4 scroll-smooth relative',
          breakpoints.smaller('md') ? '' : '',
        ]"
        :style="{
          scrollPaddingLeft: '4rem',
        }"
      >
        <nuxt-link
          ref="carousel_item"
          v-for="movie in movies"
          :key="movie.id"
          :to="`/movie?id=${movie.id}`"
          class="min-w-28 max-w-28 md:(min-w-42 max-w-42) lg:(min-w-56 max-w-56) relative border-2 rounded-lg border-transparent overflow-hidden transition hover:border-brand-red"
        >
          <img
            :src="`https://uecmovies.com${movie.poster}`"
            :alt="movie.title"
          />

          <span
            v-if="movie.title.includes('Mega Screen')"
            class="absolute top-1 right-1 bg-black/50 text-xs px-2 py-1 backdrop-blur rounded-md"
          >
            Mega Screen
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
