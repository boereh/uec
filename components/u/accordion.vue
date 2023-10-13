<script setup lang="ts">
type Props = {
  header: string
}

defineProps<Props>()
const visible = ref(false)
</script>

<template>
  <div class="rounded-md border dark:border-dark-300 mb-4">
    <button
      :class="['flex gap-4 p-2 select-none outline-none hover:dark:bg-dark-500 w-full text-lg', visible ? 'rounded-t-md' : 'rounded-md']"
      @click="visible = !visible"
    >
      <div class="h-7 grid place-items-center">
        <icon
          name="fluent:add-16-regular"
          :class="['transform transition-default', visible ? 'rotate-45' : '']"
        />
      </div>

      <div class="flex-grow flex text-left">
        <span> {{ header }} </span>
      </div>
    </button>

    <div
      v-if="visible"
      :class="['p-4']"
    >
      <slot />
    </div>
  </div>
</template>
