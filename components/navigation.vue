<script setup lang="ts">
import { IconId, IconMapPin, IconMenu2 } from "@tabler/icons-vue";
import theatres from "assets/scripts/theatres";
const links = [
  {
    to: "/loyalty-rewards",
    text: "Loyalty Rewards",
  },
  {
    to: "/gift-cards",
    text: "Gift Cards",
  },
  {
    to: "/group-sales",
    text: "Group Sales",
  },
  {
    to: "/about",
    text: "About UEC",
  },
];

const menu_open = ref(false);

watch(menu_open, (v) => (document.body.style.overflow = v ? "hidden" : "auto"));
</script>

<template>
  <nav
    class="sticky top-0 left-0 w-full bg-black/75 backdrop-blur-lg z-50 whitespace-nowrap border-b border-zinc-900 px-4 max-w-screen overflow-hidden"
  >
    <div
      class="h-30 max-w-7xl mx-auto flex items-center justify-between <sm:(h-20)"
    >
      <nuxt-link
        to="/"
        class="h-full w-20 <sm:(w-14) flex items-center justify-start"
      >
        <svg-logo class="aspect-square w-full" />
      </nuxt-link>

      <IconMenu2 class="md:hidden" @click="menu_open = !menu_open" />

      <div class="h-full grid grid-rows-2 <md:hidden">
        <div class="flex items-center justify-end gap-8">
          <nuxt-link
            to="/account"
            class="flex items-center gap-1 underline underline-transparent transition hover:underline-white"
          >
            <IconId class="size-6 text-white" weight="fill" />

            myUEC
          </nuxt-link>

          <nuxt-link
            to="/theatres"
            class="flex items-center gap-1 underline underline-transparent transition hover:underline-white"
          >
            <IconMapPin class="size-6 text-white" weight="fill" />

            No Theatre Selected
          </nuxt-link>
        </div>

        <div class="h-full flex items-center justify-between py-2 gap-2">
          <nuxt-link
            ref="link"
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :class="[
              'flex-grow h-8 px-2 flex items-center rounded-md justify-center underline underline-transparent transition duration-500 underline-offset-4 font-medium uppercase border',
              $route.path == link.to
                ? 'border-brand-red text-brand-red'
                : 'hover:underline-white border-transparent',
            ]"
          >
            {{ link.text }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>

  <div
    :class="[
      'fixed inset-0 z-50 flex justify-end',
      menu_open ? 'bg-black/50' : 'pointer-events-none',
    ]"
    @click.self="menu_open = false"
  >
    <div
      :class="[
        'bg-black/50 backdrop-blur-md w-3/4 p-4 h-full border-l border-zinc-800 transition duration-300 flex flex-col gap-4 justify-center',
        menu_open ? 'pointer-events-auto' : 'translate-x-full',
      ]"
    >
      <nuxt-link
        ref="link"
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="[
          'flex-grow px-2 flex items-center rounded-md justify-center text-white underline underline-transparent transition duration-500 underline-offset-4 font-medium uppercase',
          $route.path == link.to ? 'bg-brand-red' : 'hover:underline-white',
        ]"
      >
        {{ link.text }}
      </nuxt-link>
    </div>
  </div>
  <!-- <set-theatre /> -->
</template>
