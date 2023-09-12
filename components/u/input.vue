<script setup lang="ts">
type Props = {
    value?: string
    block?: boolean
    placeholder?: string
    type?: string
    iconRight?: string
    iconLeft?: string
    inputBind?: any
}

const props = defineProps<Props>()
const emit = defineEmits([
    'update:value',
    'clicked:iconRight',
    'clicked:iconLeft',
])

function Updated(target: EventTarget | null) {
    if (!target) return

    emit('update:value', (target as HTMLInputElement).value.trim())
}
</script>

<template>
    <div :class="['h-8', block ? '' : 'w-full flex h-8 group']">
        <input
            :value="value"
            v-bind="inputBind"
            :class="[
                'h-8 px-2 border w-full transition duration-300',
                'dark:text-white placeholder:dark:text-white/50 bg-transparent outline-none',
                ' border-light-700 dark:border-dark-300 group-hover:border-brand-red focus:border-brand-red',
            ]"
            :type="type || 'text'"
            :placeholder="placeholder"
            @input="Updated($event.target)"
        />

        <button
            v-if="iconRight"
            class="aspect-1 bg-light-700 dark:bg-dark-300 hover:text-black/50 hover:dark:text-white/70 active:text-brand-red grid place-items-center transition"
            @click="$emit('clicked:iconRight', $event)"
        >
            <icon :name="iconRight" />
        </button>
    </div>
</template>
