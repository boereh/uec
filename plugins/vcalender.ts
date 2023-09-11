import { setupCalendar } from 'v-calendar'

export default defineNuxtPlugin((nuxtapp) => {
    nuxtapp.vueApp.use(setupCalendar, {})
})
