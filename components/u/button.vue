<script setup lang="ts">
import { NuxtLink, Icon as NuxtIcon } from '#components'
import { useDebounceFn } from '@vueuse/core'

type ButtonTypes = 'default' | 'primary' | 'secondary' | 'text' | 'dashed'
type ButtonSizes = 'tiny' | 'small' | 'default' | 'medium' | 'large'
type ButtonShapes = 'default' | 'circle' | 'square'

type Props = {
  icon?: string
  type?: ButtonTypes
  size?: ButtonSizes
  shape?: ButtonShapes
  href?: string
  target?: string
  block?: boolean
  disabled?: boolean
  loading?: boolean
  htmlType?: string
  wrap?: boolean
}

const types: Record<ButtonTypes, { disabled: string; default: string }> = {
  default: {
    default: 'border border-dark-50 hover:border-brand-red hover:text-brand-red active:border-brand-red-lighter active:text-brand-red-lighter outline-none',
    disabled: 'border border-dark-50 hover:border-brand-red hover:text-brand-red active:border-brand-red-lighter active:text-brand-red-lighter outline-none',
  },
  dashed: {
    default: 'border border-dashed border-dark-50 hover:border-brand-red hover:text-brand-red active:border-brand-red-lighter active:text-brand-red-lighter',
    disabled: '',
  },
  primary: {
    default: 'bg-brand-red text-white hover:bg-brand-red-darker active:bg-brand-red-lighter',
    disabled: 'bg-brand-red/50 text-white/50',
  },
  secondary: {
    default: 'bg-dark-500 dark:bg-light-500 text-brand-red hover:bg-dark-900 hover:dark:bg-light-900 active:bg-dark-50 active:dark:bg-white',
    disabled: '',
  },
  text: { default: 'hover:bg-light-700 hover:dark:bg-dark-500 active:bg-brand-red/25', disabled: '' },
}
const sizes: Record<ButtonSizes, string> = {
  tiny: 'px-2 h-6 text-xs',
  small: 'px-2 h-7 text-sm',
  default: 'px-4 h-8',
  medium: 'px-5 h-10 text-md',
  large: 'px-6 h-12 text-lg',
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])
const tobox = props.shape && ['circle', 'square'].includes(props.shape)
const shadows = reactive({
  enabled: false,
  rand: Math.random(),
})

function UseShadows() {
  const rand = Math.random()

  shadows.rand = rand
  shadows.enabled = false
  shadows.enabled = true

  setTimeout(() => {
    if (rand !== shadows.rand) return

    shadows.enabled = false
  }, 500)
}

function Click() {
  if (props.disabled) return

  if (props.type === 'primary') UseShadows()

  emit('click')
}
</script>

<template>
  <component
    :is="href ? NuxtLink : 'button'"
    :class="[
      'flex items-center justify-center gap-2 rounded-md transition-all duration-300 select-none outline-none',
      (type ? types[type] : types.default)[disabled ? 'disabled' : 'default'],
      size ? sizes[size] : sizes.default,
      wrap ? '' : 'whitespace-nowrap',
      block ? 'w-full' : 'w-fit',
      tobox && 'aspect-square px-0',
      disabled && 'cursor-not-allowed',
      // shadows.enabled && 'shadow-button-play',
    ]"
    :to="disabled ? null : href"
    :type="htmlType || 'button'"
    :target="href && !disabled ? target : null"
    @click="Click"
  >
    <nuxt-icon
      v-if="icon && !loading"
      :name="icon"
    />

    <nuxt-icon
      v-if="loading"
      name="fluent:spinner-ios-16-regular"
      class="animate-spin"
    />

    <slot />
  </component>
</template>

<style>
@keyframes ShadowButton {
  0% {
    box-shadow: 0 0 0px rgba(233, 0, 0.5);
  }

  100% {
    box-shadow: 0 0 50px rgba(233, 0, 0, 0);
  }
}

.shadow-button-play {
  animation: ShadowButton 500ms forwards;
}
</style>
