<script setup lang="ts">
type Option =
	| any
	| {
			[k: string]: any
			value: any
			text: any
			icon?: string
	  }

type Props = {
	value?: any
	options: Option[]
}

defineProps<Props>()
defineEmits(['update:value'])

const davalue = computed(() => (option: Option) => {
	if (typeof option === 'object' && option.value) return option.value

	return option
})
</script>

<template>
	<select
		:value="value"
		class="h-8 outline-none bg-transparent border dark:border-dark-300 px-1"
		@input="$emit('update:value', ($event.target as any).value)"
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
</template>
