import {
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
  presetUno,
} from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@unocss/nuxt", "shadcn-nuxt", "@nuxt/icon"],
  css: ["@unocss/reset/tailwind.css"],
  nitro: {
    storpoage: {

    }
  },
  unocss: {
    theme: {
      colors: {
        "brand-red": "#e90000",
        "brand-red-lighter": "#ff1a1a",
        "brand-red-darker": "#b30000",
      },
    },
    presets: [
      presetUno(),
      presetAnimations(),
      presetShadcn(
        {
          color: "red",
          // With default setting for SolidUI, you need to set the darkSelector option.
          darkSelector: ".dark",
        },
        {
          // If you are using reka ui.
          componentLibrary: "reka",
        }
      ),
    ],
    transformers: [
      transformerCompileClass(),
      transformerDirectives(),
      transformerVariantGroup(),
    ],
    content: {
      pipeline: {
        include: [
          // the default
          /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
          // include js/ts files
          "(components|src)/**/*.{js,ts}",
        ],
      },
    },
  },
});
