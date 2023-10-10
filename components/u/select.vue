<script setup lang="ts">
type Value =
  | any
  | {
      [k: string]: any
      text: any
    }

type Option =
  | any
  | {
      [k: string]: any
      value: any
      text: any
      icon?: string
    }

type Props = {
  value?: Value
  options: Option[]
  disabled?: boolean
}

defineProps<Props>()
defineEmits(['update:value'])

const davalue = computed(() => (option: Option) => {
  if (typeof option === 'object' && option.value) return option.value

  return option
})
</script>

<template>
  <select
    :class="[
      'h-8 border outline-none bg-transparent flex items-center justify-between dark:border-dark-300 px-1 transition duration-200 relative',
      disabled ? 'cursor-not-allowed' : 'hover:border-brand-red focus:border-brand-red',
    ]"
    :disabled="disabled"
    @input="$emit('update:value', ($event.target as any).value)"
  >
    <option
      v-if="!value"
      style="display: none"
      value=""
      class="dark:text-white dark:bg-dark-700 rounded-0"
    />

    <option
      v-for="option of options"
      :key="davalue(option)"
      :value="davalue(option)"
      class="dark:text-white dark:bg-dark-700 rounded-0"
    >
      {{ typeof option === 'string' ? option : option.text }}
    </option>
  </select>
</template>
