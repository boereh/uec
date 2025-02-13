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
  loading?: boolean
}

defineProps<Props>()
defineEmits(['update:value'])
const focused = ref(false)

const davalue = computed(() => (option: Option) => {
  if (typeof option === 'object' && option.value) return option.value

  return option
})
</script>

<template>
  <div class="flex relative items-center">
    <select
      :value="value"
      :class="[
        'h-8 border outline-none flex items-center justify-between border-light-900 dark:border-dark-300 pl-2 pr-6 transition-default relative w-full appearance-none rounded-md',
        disabled || loading ? 'cursor-not-allowed bg-light-500 dark:bg-dark-400' : 'bg-transparent hover:border-brand-red focus:border-brand-red',
      ]"
      :disabled="disabled"
      @input="$emit('update:value', ($event.target as any).value)"
      @focus="focused = true"
      @blur="focused = false"
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

    <div :class="['absolute right-0 w-8 h-8 grid place-content-center pointer-events-none transition-default', disabled && 'opacity-50']">
      <icon
        v-if="loading"
        class="animate-spin"
        name="fluent:spinner-ios-16-regular"
      />

      <icon
        v-else-if="focused"
        name="fluent:chevron-up-16-regular"
      />

      <icon
        v-else
        name="fluent:chevron-down-16-regular"
      />
    </div>
  </div>
</template>
