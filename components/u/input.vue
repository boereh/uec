<script setup lang="ts">
type Props = {
  value?: string
  block?: boolean
  placeholder?: string
  type?: string
  iconRight?: string
  iconRightClass?: string | string[]
  iconRightButtonClass?: string | string[]
  iconLeft?: string
  iconLeftClass?: string | string[]
  inputBind?: any
}

const props = defineProps<Props>()
const emit = defineEmits(['update:value', 'click:iconRight', 'click:iconLeft'])

function Updated(target: EventTarget | null) {
  if (!target) return

  emit('update:value', (target as HTMLInputElement).value.trim())
}
</script>

<template>
  <div :class="['h-8', block ? '' : 'w-full flex h-8']">
    <input
      :value="value"
      v-bind="inputBind"
      :class="[
        'h-8 px-2 border w-full transition-default',
        'dark:text-white placeholder:dark:text-white/50 bg-transparent outline-none',
        'border-light-900 dark:border-dark-300 hover:border-brand-red focus:border-brand-red',
        !iconRight && 'rounded-r-md',
        !iconLeft && 'rounded-l-md',
      ]"
      :type="type || 'text'"
      :placeholder="placeholder"
      @input="Updated($event.target)"
    />

    <button
      v-if="iconRight"
      class="aspect-1 rounded-r-md bg-light-700 dark:bg-dark-300 hover:bg-brand-red active:bg-brand-red-lighter grid place-items-center transition"
      :class="iconRightButtonClass"
      @click="$emit('click:iconRight', $event)"
    >
      <icon
        :name="iconRight"
        :class="iconRightClass"
      />
    </button>
  </div>
</template>
