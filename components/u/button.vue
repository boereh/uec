<script setup lang="ts">
import { NuxtLink } from '#components'

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

const types: Record<ButtonTypes, string> = {
    default:
        'border border-dark-50 hover:border-brand-red hover:text-brand-red active:border-brand-red-lighter active:text-brand-red-lighter',
    dashed: 'border border-dashed border-dark-50 hover:border-brand-red hover:text-brand-red active:border-brand-red-lighter active:text-brand-red-lighter',
    primary:
        'bg-brand-red text-white hover:bg-brand-red-darker active:bg-brand-red-lighter',
    secondary:
        'bg-dark-500 dark:bg-light-500 text-brand-red hover:bg-dark-900 hover:dark:bg-light-900 active:bg-dark-50 active:dark:bg-white',
    text: 'hover:bg-light-700 hover:dark:bg-dark-500 active:bg-brand-red/25',
}
const sizes: Record<ButtonSizes, string> = {
    tiny: 'px-2 h-6 text-xs',
    small: 'px-2 h-7 text-sm',
    default: 'px-4 h-8',
    medium: 'px-5 h-10 text-md',
    large: 'px-6 h-12 text-lg',
}

const props = defineProps<Props>()
const tobox = props.shape && ['circle', 'square'].includes(props.shape)
</script>

<template>
    <component
        :is="href ? NuxtLink : 'button'"
        :class="[
            'flex items-center justify-center gap-2 rounded-md transition duration-300 select-none',
            type ? types[type] : types.default,
            size ? sizes[size] : sizes.default,
            wrap ? '' : 'whitespace-nowrap',
            block ? 'w-full' : 'w-fit',
            tobox && 'aspect-square px-0',
        ]"
        :to="href"
        :type="htmlType || 'button'"
        :target="href && target"
    >
        <icon v-if="icon && !loading" :name="icon" class="min-w-fit" />

        <icon
            v-if="loading"
            name="fluent:spinner-ios-16-regular"
            class="animate-spin"
        />

        <slot />
    </component>
</template>
