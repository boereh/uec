<script setup lang="ts">
const { data: movies } = await useFetch("/api/movies");
</script>

<template>
  <div class="space-y-8">
    <Carousel :movies="movies?.playing || []" label="Now Playing"></Carousel>
    <Carousel :movies="movies?.coming || []" label="Coming Soon"></Carousel>
    <Carousel :movies="movies?.special || []" label="Special Event"></Carousel>
  </div>
</template>
