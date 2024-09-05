import { defineConfig, transformerVariantGroup, transformerDirectives, transformerCompileClass, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerCompileClass(), transformerVariantGroup()],
  theme: {
    colors: {
      'brand-red': '#e90000',
      'brand-red-lighter': '#ff1a1a',
      'brand-red-darker': '#b30000',
    },
  },
})
