import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

export const useReponsive = () => useBreakpoints(breakpointsTailwind);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref
) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}
