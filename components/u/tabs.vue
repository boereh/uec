<script setup lang="ts">
type Props = {
    tabs?: Array<{
        name: string
        key: string
        data?: Record<string, any>
    }>
}

const route = useRoute()
const props = defineProps<Props>()

const selected = ref<string>('')

onMounted(() => {
    if (!props.tabs) return

    const tab = props.tabs.find(({ key }) => key === route.hash.slice(1))

    selected.value = tab?.key || props.tabs[0].key
})

useHead({
    title: computed(() => {
        if (!props.tabs) return 'UEC Theatres'
        if (!selected.value) return 'UEC Theatres'

        const tab = props.tabs.find(({ key }) => key === selected.value)

        return tab?.name ? `${tab?.name} - UEC Theatres` : 'UEC Theatres'
    }),
})
</script>

<template>
    <div>
        <div class="whitespace-nowrap overflow-hidden">
            <div class="flex overflow-auto">
                <button
                    v-for="tab of tabs || []"
                    :key="tab.key"
                    :class="[
                        'px-4 py-2 border-b-2 transition duration-300',
                        selected === tab.key
                            ? 'border-brand-red text-brand-red'
                            : 'border-transparent',
                    ]"
                    @click="selected = tab.key"
                >
                    {{ tab.name }}
                </button>
            </div>
        </div>

        <div
            class="bg-light-500 dark:bg-dark-800 border border-light-900 dark:border-dark-500"
        >
            <div
                v-for="tab of tabs || []"
                :key="tab.key"
                :class="[selected === tab.key ? 'p-4' : 'hidden']"
            >
                <slot v-if="selected === tab.key" :name="tab.key" />
            </div>
        </div>
    </div>
</template>
