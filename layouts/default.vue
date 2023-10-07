<script setup lang="ts">
import { useLocalStorage, useWindowSize, usePreferredColorScheme } from '@vueuse/core'
import Theatres from 'assets/json/theatres.json'

const links = [
  {
    to: '/movies',
    text: 'Movies',
  },
  {
    to: '/loyalty-rewards',
    text: 'Loyalty Rewards',
  },
  {
    to: '/gift-cards',
    text: 'Gift Cards',
  },
  {
    to: '/group-sales',
    text: 'Group Sales',
  },
  {
    to: '/about',
    text: 'About UEC',
  },
]

const theatre = useTheatre()
const breadcrumbs = useState<string[]>('useBreadcrumbs', () => [])
const drawerEnabled = ref(false)
const { height } = useWindowSize()
const user = useSupabaseUser()
const search = ref('')

const theatreName = computed(() => {
  if (!theatre.value) return 'NO THEATRE SET'

  const t = Theatres.find(({ id }) => id === Number(id))

  return t ? t.name : 'NO THEATRE SET'
})

useHead({
  htmlAttrs: {
    class: usePreferredColorScheme().value,
    style: `color-scheme: ${usePreferredColorScheme().value};`,
  },
})
</script>

<template>
  <nav class="bg-light-50 dark:bg-dark-900 border-b border-brand-red relative max-w-screen overflow-x-hidden sticky top-0 pl-4 sm:px-8 z-100">
    <div class="max-w-5xl mx-auto h-24 flex gap-4 justify-between">
      <nuxt-link
        class="h-full py-2"
        to="/"
        @click="drawerEnabled = false"
      >
        <svg-logo class="h-full w-24" />
      </nuxt-link>

      <div class="md:hidden flex flex-col min-w-42">
        <div class="h-10 flex justify-between items-center flex-grow md:hidden w-full">
          <nuxt-link
            class="grid place-items-center text-2xl h-full aspect-1 dark:text-white"
            to="/account"
            @click="drawerEnabled = false"
          >
            <icon name="fluent:person-20-filled" />
          </nuxt-link>

          <nuxt-link
            class="grid place-items-center text-2xl h-full aspect-1"
            to="/search"
            @click="drawerEnabled = false"
          >
            <icon name="fluent:search-20-filled" />
          </nuxt-link>

          <button
            class="text-2xl h-full aspect-1 transition duration-300"
            :class="[drawerEnabled ? 'bg-brand-red text-white' : '']"
            @click="drawerEnabled = !drawerEnabled"
          >
            <icon :name="drawerEnabled ? 'fluent:dismiss-20-regular' : 'fluent:line-horizontal-3-20-regular'" />
          </button>
        </div>

        <div
          class="bg-brand-red relative after:content-[''] after:block after:bg-brand-red after:w-full after:h-10 after:absolute after:left-full after:bottom-0"
        >
          <span class="px-2 justify-center items-center flex-grow flex gap-1 h-10 whitespace-nowrap text-white">
            <icon
              name="fluent:location-24-filled"
              class="dark:text-white"
            />

            <nuxt-link
              to="/theatres"
              class="hover:underline text-white"
              @click="drawerEnabled = false"
            >
              {{ theatreName }}
            </nuxt-link>
          </span>
        </div>
      </div>

      <div class="flex flex-col items-end h-full <md:hidden">
        <div class="h-10 flex items-center gap-4 w-full flex-grow <md:hidden">
          <nuxt-link
            class="flex items-center gap-1 h-full dark:text-white whitespace-nowrap hover:underline"
            to="/account"
            @click="drawerEnabled = false"
          >
            <icon
              name="fluent:person-20-filled"
              size="20"
            />

            {{ !!user ? user.user_metadata.full_name : 'Log in' }}
          </nuxt-link>

          <span class="px-2 justify-end items-center flex-grow flex gap-1 whitespace-nowrap">
            <icon
              name="fluent:location-20-filled"
              size="20"
              class="text-brand-red"
            />

            <nuxt-link
              to="/theatres"
              class="hover:underline text-white"
            >
              {{ theatreName }}
            </nuxt-link>
          </span>

          <u-input
            v-model:value="search"
            placeholder="Search..."
            icon-right="fluent:search-16-filled"
            @click:icon-right="$router.push(`/search?q=${search}`)"
          />
        </div>

        <div
          class="bg-brand-red w-full relative after:content-[''] after:block after:bg-brand-red after:w-full after:h-10 after:absolute after:left-full after:bottom-0"
        >
          <div class="<md:hidden h-10 grid grid-cols-5 w-full whitespace-nowrap text-sm">
            <nuxt-link
              v-for="(link, index) of links"
              :key="link.to"
              class="hover:bg-black/20 px-2 lg:px-4 grid place-items-center text-white"
              :class="[index < links.length - 1 ? 'border-solid border-r border-white/30 hover:border-white/0' : '']"
              :to="link.to"
            >
              {{ link.text }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <slot />

  <div class="md:hidden fixed top-0 bottom-0 left-0 right-0 pt-24 pointer-events-none z-100">
    <div
      class="h-full max-h-full flex flex-col transition duration-200"
      :class="[drawerEnabled ? 'bg-dark-900/50 pointer-events-auto' : '']"
      :style="{
        transitionDelay: drawerEnabled ? '0ms' : `${links.length * 25}ms`,
      }"
      @click="drawerEnabled = false"
    >
      <nuxt-link
        v-for="(link, index) of links"
        :key="link.to"
        :class="[
          'px-4 h-12 bg-brand-red flex items-center capitalize border-b border-brand-red-lighter transition duration-300 transform text-white',
          drawerEnabled ? '' : 'translate-x-full',
        ]"
        :style="{
          transitionDelay: drawerEnabled ? `${index * 50}ms` : `${(links.length - 1) * 25 - index * 25}ms`,
        }"
        :to="link.to"
        @click="drawerEnabled = false"
      >
        {{ link.text }}
      </nuxt-link>
    </div>
  </div>

  <br />

  <footer class="border-t dark:border-dark-300">
    <u-container>
      <div class="flex gap-4 justify-between whitespace-nowrap flex-wrap overflow-hidden">
        <nuxt-link
          v-for="(link, index) of links"
          :key="link.to"
          :to="link.to"
          :class="['text-center']"
        >
          {{ link.text }}
        </nuxt-link>

        <nuxt-link
          to="/contact-us"
          :class="['text-center']"
        >
          Contact Us
        </nuxt-link>

        <nuxt-link
          to="/account"
          :class="['text-center']"
        >
          Account
        </nuxt-link>

        <nuxt-link
          to="/login"
          :class="['text-center']"
        >
          Login
        </nuxt-link>
      </div>

      <br />

      <div class="flex justify-between <sm:justify-center flex-wrap gap-4">
        <span>
          © 2023 United Entertainment Corp.
          <nuxt-link
            class="link"
            to="/privacy"
          >
            Privacy Policy
          </nuxt-link>
        </span>

        <span class="flex gap-4">
          <nuxt-link
            to="https://www.facebook.com/UECTheatres/"
            class="flex items-center gap-1"
          >
            <icon name="logos:facebook" />

            Facebook
          </nuxt-link>

          <nuxt-link
            to="https://www.twitter.com/UECMovies/"
            class="flex items-center gap-1"
          >
            <icon name="logos:twitter" />

            Twitter
          </nuxt-link>
        </span>
      </div>
    </u-container>
  </footer>
</template>
