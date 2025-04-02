<script setup lang="ts">
import theatres from "~/assets/scripts/theatres";
const enabled = defineModel<boolean>("enabled", { default: false });
const value = ref("");
</script>

<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-md z-100 p-4 grid place-items-center"
    @click.self="enabled = false"
  >
    <div
      class="bg-black max-w-full p-4 rounded-2xl border border-white/10 space-y-4 max-w-xl"
    >
      <h4>Select your Theatre</h4>

      <p class="text-white/50">
        Find the theatre you wish and make it the theatre when you look for
        movies. You can narrow your search with the name, state, address, and
        phone number of the theatre or it's features.
      </p>

      <u-select
        v-model:value="value"
        :options="theatres.map((v) => v.name)"
        placeholder="Select a theatre"
      ></u-select>
    </div>
  </div>
</template>
