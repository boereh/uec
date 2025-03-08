<script setup lang="ts">
import { IconId, IconMapPin, IconAt } from "@tabler/icons-vue";
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
</script>

<template>
  <nav
    class="sticky top-0 left-0 w-full bg-black/75 backdrop-blur-lg z-50 whitespace-nowrap border-b border-zinc-900 px-4 max-w-screen overflow-hidden"
  >
    <div class="h-30 max-w-7xl mx-auto flex items-center justify-between">
      <nuxt-link to="/" class="h-full aspect-square grid place-items-center">
        <svg-logo class="h-2/3 w-full" />
      </nuxt-link>

      <div class="h-full grid grid-rows-2">
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
              'flex-grow h-full px-2 flex items-center rounded-md justify-center text-white underline underline-transparent transition duration-500 underline-offset-4 font-medium uppercase',
              $route.path == link.to ? 'bg-brand-red' : 'hover:underline-white',
            ]"
          >
            {{ link.text }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>

  <!-- <set-theatre /> -->
</template>
