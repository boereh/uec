<script setup lang="ts">
import { RuleFn } from 'assets/scripts/types/form'

type Props = {
    label?: string
    name?: string
    required?: boolean
}

const props = defineProps<Props>()
const model = inject<Record<string, any>>('useFormModel')
const rules = inject<Record<string, RuleFn[]>>('useFormRules')
const messages = ref<string[]>([])

watchEffect(() => {
    messages.value = []

    if (!props.name) return
    if (!model || !model[props.name]) return
    if (!rules || !rules[props.name]) return

    for (const rule of rules[props.name]) {
        try {
            const res = rule(model[props.name])

            if (!res) continue
            if (typeof res === 'string') {
                console.log(res)

                messages.value.push(res)

                continue
            }

            res.then((msg) => {
                if (!msg) return

                messages.value.push(msg)
            })
        } catch (error) {}
    }
})
</script>

<template>
    <div :class="['flex flex-col gap-2', !label && 'mt-2']">
        <label v-if="label">
            {{ label }}:
            <span v-if="required" class="text-brand-red">*</span>
        </label>

        <slot />

        <div v-for="msg of messages" :key="msg">
            <span>{{ msg }}</span>
        </div>
    </div>
</template>
