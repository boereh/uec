<script setup lang="ts">
import { onClickOutside, onKeyPressed, useElementBounding, useElementHover, useMagicKeys, useMouse, useMousePressed } from '@vueuse/core'

type Marker =
  | null
  | string
  | {
      style: Record<string, any>
      class: string[] | string
      label: string
    }

type Props = {
  value?: number
  min?: number
  max?: number
  step?: number
  markers?: Record<number, Marker>
}

const props = defineProps<Props>()
const emit = defineEmits(['update:value'])
const buttonRef = ref<HTMLButtonElement>()
const containerRef = ref<HTMLDivElement>()
const focused = ref(false)
const {} = useMagicKeys()
const { pressed } = useMousePressed({ target: buttonRef })
const { width: conWidth, left: conLeft } = useElementBounding(containerRef)
const hoveringContainer = useElementHover(containerRef)
const percent = ref<number>(0)

function Update(x: number, skipIsPressed: boolean) {
  if (!skipIsPressed && !pressed.value) return

  if (x < conLeft.value) return emit('update:value', props.min || 0)
  if (x > conLeft.value + conWidth.value) {
    return emit('update:value', props.max || 100)
  }

  percent.value = (x - conLeft.value) / conWidth.value

  const clamp = (props.max || 100) - (props.min || 0)
  let value = clamp * percent.value + (props.min || 0)

  if (props.step) {
    value = Math.floor(value / props.step) * props.step
  }

  emit('update:value', value)
}

onMounted(() => {
  const clamp = (props.max || 100) - (props.min || 0)

  percent.value = ((props.value || 0) - (props.min || 0)) / clamp
})

watch(useMouse().x, (x) => Update(x, false), { immediate: true })
onClickOutside(buttonRef, () => (focused.value = false))
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'h-1.5 my-2 dark:bg-dark-500 rounded-md relative flex items-center transition-default border dark:border-dark-300',
      hoveringContainer && 'dark:bg-dark-50',
    ]"
    @click.self="Update($event.x, true)"
  >
    <span
      :class="['block h-full rounded-full pointer-events-none', hoveringContainer || focused ? 'bg-brand-red' : 'bg-brand-red-darker']"
      :style="`width: ${percent * 100}%`"
    />

    <button
      ref="buttonRef"
      :class="[
        'absolute block w-4 h-4 outline-none bg-brand-red rounded-full p-0.25 hover:scale-125 hover:p-0.75 tranform transition-default -translate-x-1/2',
        focused && 'scale-125 p-0.75',
      ]"
      :style="{ left: `${percent * 100}%` }"
      @click="focused = true"
    >
      <span class="block w-full h-full dark:bg-dark-900 rounded-full" />
    </button>
  </div>
</template>
