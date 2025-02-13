import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

export const useReponsive = () => useBreakpoints(breakpointsTailwind);
