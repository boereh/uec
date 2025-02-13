import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      CRYPTR_KEY: process.env.CRYPTR_KEY,
    },
  },

  alias: {
    '#utils': fileURLToPath(new URL('./server/utils', import.meta.url)),
  },

  css: ['@unocss/reset/tailwind.css', fileURLToPath(new URL('./assets/styles/main.css', import.meta.url))],
  modules: ['@unocss/nuxt', 'nuxt-icon'],
  compatibilityDate: '2024-09-03',
})
