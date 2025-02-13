<script setup lang="ts">
import { PhCaretDown } from "@phosphor-icons/vue";
import {
  useElementBounding,
  onClickOutside,
  useWindowSize,
} from "@vueuse/core";

type Props = {
  options: string[];
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
};

const props = defineProps<Props>();
const value = defineModel<string>("value", { default: "" });
const focused = ref(false);
const { height: window_height } = useWindowSize();
const options_el = useTemplateRef("options");
const button_el = useTemplateRef("button");
const { bottom: button_botom } = useElementBounding(button_el);
const { height: options_height } = useElementBounding(options_el);
const enabled = ref(false);
const value_index = computed(() =>
  props.options.findIndex((v) => v === value.value)
);
const options_top = computed(() => {
  if (options_height.value > window_height.value) return 0;
  if (button_botom.value + options_height.value > window_height.value) {
    console.log(window_height.value - options_height.value);

    return window_height.value - options_height.value - button_botom.value;
  }
  return 0;
});

onClickOutside(button_el, () => (enabled.value = false));

function setValue(option: string) {
  value.value = option;

  console.log((value_index.value + 1) * 2);

  setTimeout(() => (value.value = option), 250);
}
</script>

<template>
  <div class="relative">
    <button
      ref="button"
      :class="[
        'border border-white/25 rounded-md flex items-center justify-between px-2 w-full focus:border-brand-red transition h-10',
        value ? '' : 'text-white/75',
      ]"
      :disabled="disabled"
      @click="enabled = !enabled"
    >
      <span>
        {{ value || placeholder }}
      </span>

      <PhCaretDown />
    </button>

    <div
      ref="options"
      :class="[
        'absolute bg-black/75 border border-white/10 backdrop-blur2 min-w-full z-200 p-2 max-h-lg transform transition overflow-y-auto max-h-lg rounded-lg',
        enabled ? '' : 'pointer-events-none opacity-0 scale-95',
      ]"
      :style="{
        top: `${options_top}px`,
      }"
    >
      <button
        v-for="option of options"
        :key="option"
        class="w-full hover:bg-brand-red h-10 rounded-md"
        @click="setValue(option)"
      >
        {{ option }}
      </button>
    </div>
    <!-- <select
      :value="value"
      :class="[
        'h-8 border outline-none flex items-center justify-between border-dark-300 pl-2 pr-6 transition-default relative w-full appearance-none rounded-md',
        disabled || loading
          ? 'cursor-not-allowed bg-dark-400'
          : 'bg-transparent hover:border-brand-red focus:border-brand-red',
      ]"
      :disabled="disabled"
      @input="$emit('update:value', ($event.target as any).value)"
      @focus="focused = true"
      @blur="focused = false"
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
        {{ typeof option === "string" ? option : option.text }}
      </option>
    </select>

    <div
      :class="[
        'absolute right-0 w-8 h-8 grid place-content-center pointer-events-none transition-default',
        disabled && 'opacity-50',
      ]"
    >
      <icon
        v-if="loading"
        class="animate-spin"
        name="fluent:spinner-ios-16-regular"
      />

      <icon v-else-if="focused" name="fluent:chevron-up-16-regular" />

      <icon v-else name="fluent:chevron-down-16-regular" />
    </div> -->
  </div>
</template>
