<script setup lang="ts"></script>

<template>
  <navigation />

  <slot />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Noto+Serif:wght@700&display=swap");

body {
  font-family: "Poppins", sans-serif;
  @apply bg-black text-white overflow-x-hidden;
}

.noto-serif {
  font-family: "Noto Serif", serif;
}

h1 {
  @apply text-4xl fontbold my-4;
}

h2 {
  @apply text-3xl my-4;
}

h3 {
  @apply text-2xl font-bold my-4;
}

h4 {
  @apply text-xl my-4;
}

h5 {
  @apply text-lg font-bold my-4;
}

h6 {
  @apply text-md my-4;
}

p {
  @apply mb-2;
}

a.link {
  @apply text-brand-red hover:underline;
}

.fill-container {
  height: calc(100dvh - 6rem - 1px);
}

hr {
  @apply my-12 border-light-700 dark:border-dark-50 border-dashed;
}

.bg-brand-red-grad {
  background: rgb(233, 0, 0);
  background: radial-gradient(circle, #e90000 0%, #3b0000 100%);
}

.bg-brand-brown-grad {
  background: rgb(247, 218, 186);
  background: radial-gradient(
    circle,
    rgba(247, 218, 186, 1) 15%,
    rgba(147, 131, 118, 1) 100%
  );
  background-size: 100% 6rem;
  background-position-x: center;
  background-position-y: center;
  color: black;
}

ul {
  @apply list-disc list-inside;
}

ul > li {
  @apply mb-2;
}

highlight {
  @apply bg-yellow/50;
}

.aspect-featured {
  aspect-ratio: 672 / 401;
}

.transition-default {
  @apply transition-all duration-200;
}
</style>
