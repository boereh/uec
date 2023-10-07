<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
	visible: {
		type: Boolean,
		require: false,
	},
	bgClosable: {
		type: Boolean,
		default: () => true,
	},
	closable: {
		type: Boolean,
		default: () => true,
	},
	title: {
		type: String,
	},
})
const emit = defineEmits(['update:visible'])

function BGClicked() {
	if (!props.bgClosable) return

	emit('update:visible', false)
}

watchDebounced(
	toRef(props, 'visible'),
	(visible) => {
		if (!process.client) return

		const intent = visible ? 'add' : 'remove'

		document.body.classList[intent]('overflow-hidden')
	},
	{ debounce: 50, immediate: true }
)
</script>

<template>
	<teleport
		v-if="visible"
		to="body"
	>
		<div
			class="fixed top-0 left-0 right-0 bottom-0 z-1000 grid place-items-center p-4 transition"
			:class="[visible ? '' : 'pointer-events-none', visible ? 'bg-dark-900/75' : 'bg-black/0']"
			@click.self="BGClicked"
		>
			<div
				class="bg-light-50 dark:bg-dark-800 p-4 min-w-xs max-w-5xl border-solid border border-light-700 dark:border-dark-500 transform transition"
				:class="[visible ? '' : '-translate-y-8 opacity-0']"
			>
				<div class="flex justify-between gap-4 items-center text-lg font-semibold mb-4">
					<span>
						{{ title }}
					</span>

					<button
						v-if="closable === true"
						@click="$emit('update:visible', false)"
					>
						<icon name="fluent:dismiss-20-regular" />
					</button>
				</div>
				<slot />
			</div>
		</div>
	</teleport>
</template>
