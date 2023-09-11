import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    transformers: [transformerDirectives()],
    theme: {
        colors: {
            'brand-red': '#e90000',
            'brand-red-lighter': '#ff1a1a',
            'brand-red-darker': '#b30000',
        },
    },
})
