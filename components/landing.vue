<script setup lang="ts">
import theatres from "assets/scripts/theatres";
import Select from "primevue/select";
import Button from "primevue/button";
import { IconUser } from "@tabler/icons-vue";
const theatre = useTheatre();
const small_width = useReponsive().smaller("md");
</script>

<template>
  <div
    class="fixed inset-0 flex-col flex items-center justify-center p-8 gap-8"
  >
    <svg-logo class="size-24 md:size-32 mb-16" />

    <Select
      v-model="theatre"
      :options="theatres.map((v) => v.name)"
      placeholder="Select a theatre"
      class="min-w-60"
    />

    <nuxt-link
      to="/login"
      class="w-60 h-10 flex gap-2 justify-center items-center hover:underline"
    >
      <IconUser class="size-5" />
      Login to myUEC
    </nuxt-link>
  </div>
</template>
