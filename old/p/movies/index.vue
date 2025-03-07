<script setup lang="ts">
const banners = [
  {
    name: 'bargain-tuesday',
    color: '#3b0000',
  },
]

useHead({
  title: 'Movies - UEC Theatres',
})
</script>

<template>
  <div
    class="overflow-hidden"
    :style="{
      backgroundColor: banners[0].color,
    }"
  >
    <div class="max-w-5xl mx-auto relative">
      <img
        class="h-full w-full"
        :src="`/img/banner-${banners[0].name}-center.jpg`"
        :alt="banners[0].name"
      />

      <img
        class="absolute right-full top-0 h-full"
        :src="`/img/banner-${banners[0].name}-left.jpg`"
        :alt="banners[0].name"
      />

      <img
        class="absolute left-full top-0 h-full"
        :src="`/img/banner-${banners[0].name}-right.jpg`"
        :alt="banners[0].name"
      />
    </div>
  </div>

  <pages-movies />
</template>
