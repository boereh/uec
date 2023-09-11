<script setup lang="ts">
import { RuleFn } from 'assets/scripts/types/form'

type Props = {
    model?: Record<string, any>
    rules?: Record<string, RuleFn[]>
}

const props = defineProps<Props>()

provide('useFormProps', props)
provide('useFormModel', props.model)
provide('useFormRules', props.rules)
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="">
        <slot />
    </form>
</template>
