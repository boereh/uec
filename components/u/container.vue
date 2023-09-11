<script setup lang="ts">
type Props = {
    tag?: string
    divClass?: string
    divTag?: string
    fill?: boolean
}

defineProps<Props>()
</script>

<template>
    <component
        :is="tag || 'main'"
        :class="['p-4 sm:p-8', fill && 'fill-container']"
    >
        <component
            :is="divTag || 'div'"
            :class="['max-w-5xl mx-auto', divClass]"
        >
            <slot />
        </component>
    </component>
</template>
