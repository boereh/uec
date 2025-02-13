<script setup lang="ts">
type Props = {
    value?: number
    block?: boolean
    placeholder?: string
    iconRight?: string
    iconLeft?: string
    inputBind?: any
}

defineProps<Props>()
defineEmits(['update:value', 'clicked:iconRight', 'clicked:iconLeft'])
</script>

<template>
    <u-input
        :value="String(value)"
        :block="block"
        :placeholder="placeholder"
        type="number"
        :input-bind="{ inputmode: 'numeric' }"
        @update:value="$emit('update:value', Number($event))"
        @clicked:icon-left="$emit('clicked:iconLeft', $event)"
        @clicked:icon-right="$emit('clicked:iconRight', $event)"
    />
</template>
