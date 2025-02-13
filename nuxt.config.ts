import {
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
  presetUno,
} from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@unocss/nuxt"],
  css: ["@unocss/reset/tailwind.css"],
  unocss: {
    theme: {
      colors: {
        "brand-red": "#e90000",
        "brand-red-lighter": "#ff1a1a",
        "brand-red-darker": "#b30000",
      },
    },
    presets: [presetUno(), presetScrollbar()],
    transformers: [
      transformerCompileClass(),
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  },
});
