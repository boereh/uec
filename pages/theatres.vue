<script setup lang="ts">
import { IconMapSearch, IconPhone } from "@tabler/icons-vue";
import theatres from "assets/scripts/theatres";
import features from "assets/scripts/features";

const route = useRoute();
const router = useRouter();
const theatre = useTheatre();
const search = ref("");

const theatresToShow = computed(() => {
  const value = search.value.trim().toLowerCase();

  if (value === "") return theatres;

  return theatres.filter((x) => {
    if (x.address.toLowerCase().includes(value)) return true;
    if (x.name.toLowerCase().includes(value)) return true;
    if (x.phone.toLowerCase().includes(value)) return true;
    if (x.state.toLowerCase().includes(value)) return true;
    if (x.features.some((f: string) => f.toLowerCase().includes(value)))
      return true;
  });
});

type SetTheatreArgs = { name: string; classes: string; id: string };

function setTheatre({ name, classes, id }: SetTheatreArgs) {
  return h(
    "button",
    {
      class: [classes, theatre.value === name ? "!hidden" : ""],
      onClick: () => {
        theatre.value = name;

        if (!route.query.redirect) return;

        router.replace(route.query.redirect as string);
      },
    },
    () => "Make My UEC"
  );
}
</script>

<template>
  <div class="p-4">
    <div class="max-w-7xl mx-auto space-y-4">
      <h1>Select your Theatre</h1>

      <p class="text-white/50">
        Find the theatre you wish and make it the theatre when you look for
        movies. You can narrow your search with the name, state, address, and
        phone number of the theatre or it's features.
      </p>

      <u-input v-model:value="search" placeholder="Search theatres..." />

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="t of theatresToShow"
          :key="t.name"
          class="border rounded-lg p-4 flex flex-col gap-4"
        >
          <nuxt-link class="flex justify-between items-center gap-4">
            <span class="text-2xl">{{ t.name }}</span>

            <client-only>
              <!-- <SetTheatre :name="t.name" :id="t.id" classes="sm:hidden" /> -->
            </client-only>
          </nuxt-link>

          <nuxt-link
            :to="`https://www.google.com/maps/place/${t.address}`"
            target="_blank"
            class="hover:(underline text-zinc-300) transition flex gap-2 text-zinc-500"
          >
            <IconMapSearch />

            {{ t.address }}
          </nuxt-link>

          <nuxt-link
            :to="`tel:+1${t.phone.replaceAll(/[\D]+/g, '')}`"
            target="_blank"
            class="hover:(underline text-zinc-300) transition flex gap-2 text-zinc-500"
          >
            <IconPhone />

            {{ t.phone }}
          </nuxt-link>

          <div
            class="flex flex-wrap gap-3 items-center text-zinc-500 cursor-default select-none"
          >
            <span
              v-for="feature of t.features"
              class="flex flex-wrap gap-3 items-center hover:text-zinc-300 transition"
              :title="feature"
            >
              <template
                v-for="f of features.find((x) => x.title === feature)?.render ||
                []"
              >
                <Icon v-if="'name' in f" :name="f.name" size="24" />
                <template v-else>{{ f.text }}</template>
              </template>
            </span>
          </div>
        </div>

        <client-only>
          <!-- <SetTheatre :name="t.name" :id="t.id" classes="<sm:hidden" /> -->
        </client-only>
      </div>
    </div>
  </div>
  <div></div>
</template>
