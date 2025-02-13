<script setup lang="ts">
type Sizes = 'tiny' | 'small' | 'default' | 'medium' | 'large'

type Props = {
  value?: boolean
  rounded?: boolean
  text?: string
  label?: string
  size?: Sizes
}

const sizes: Record<Sizes, string> = {
  tiny: 'min-w-8 w-8 h-4 text-xs',
  small: 'min-w-10 w-10 h-5 text-sm',
  default: 'min-w-12 w-12 h-6',
  medium: 'min-w-16 w-16 h-8 text-md',
  large: 'min-w-20 w-20 h-10 text-lg',
}

defineProps<Props>()
defineEmits(['update:value'])
</script>

<template>
  <div class="flex gap-4">
    <button
      :class="[
        'transition-default select-none whitespace-nowrap relative border border-light-900 dark:border-dark-300 box-content',
        rounded ? 'rounded-full' : 'rounded-md',
        size ? sizes[size] : sizes.default,
        value ? 'bg-brand-red border-brand-red' : 'hover:border-light-900 hover:dark:border-dark-50',
      ]"
      @click="$emit('update:value', !value)"
    >
      <span
        :class="[
          'block absolute h-full aspect-1 top-0 grid place-items-center transform transition',
          rounded ? 'rounded-full' : 'rounded-md',
          value ? 'translate-x-full bg-white' : 'bg-light-900 dark:bg-white/50',
        ]"
      />
    </button>

    <div class="flex flex-col gap-2">
      {{ label }}

      <p class="text-white/50">{{ text }}</p>
    </div>
  </div>
</template>
