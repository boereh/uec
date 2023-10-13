<script setup lang="ts">
type Props = {
  noPadding?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-dark-800 shadow-xl rounded-xl border border-light-900 dark:border-dark-300 dark:border-dark-300flex-grow flex flex-col gap-4',
      noPadding ? '' : 'p-4',
    ]"
  >
    <slot />
  </div>
</template>
