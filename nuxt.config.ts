import {
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
  presetWind3,
} from "unocss";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@unocss/nuxt", "@nuxt/icon"],
  css: ["@unocss/reset/tailwind.css"],
  unocss: {
    theme: {
      colors: {
        "brand-red": "#e90000",
        "brand-red-lighter": "#ff1a1a",
        "brand-red-darker": "#b30000",
      },
    },
    presets: [presetWind3()],
    transformers: [
      transformerCompileClass(),
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  },
});
