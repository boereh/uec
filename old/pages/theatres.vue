<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import features from "assets/json/features.json";
import theatres from "assets/scripts/theatres";
import { UButton } from "#components";

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

type MakeMyUECButtonArgs = { name: string; classes: string; id: number };

function MakeMyUECButton({ name, classes, id }: MakeMyUECButtonArgs) {
  return h(
    UButton,
    {
      class: [classes, theatre.value?.id === id ? "!hidden" : ""],
      onClick: () => {
        setTheatre(id);

        if (!route.query.redirect) return;

        router.replace(route.query.redirect as string);
      },
    },
    () => "Make My UEC"
  );
}

useHead({
  title: "Select Theatre - UEC Theatres",
});
</script>
<template>
  <u-container>
    <h1>Select your Theatre</h1>

    <p class="text-white/50">
      Find the theatre you wish and make it the theatre when you look for
      movies. You can narrow your search with the name, state, address, and
      phone number of the theatre or it's features.
    </p>

    <u-input
      v-model:value="search"
      placeholder="Search theatres..."
      class="max-w-sm mb-8"
      block
    />

    <div
      v-for="t of theatresToShow"
      :key="t.name"
      class="border-t border-t-dark-200 py-4 flex justify-between items-center gap-2"
    >
      <div>
        <div class="flex justify-between items-center gap-4 mb-4 h-8">
          <span class="text-brand-red">{{ t.name }}</span>

          <client-only>
            <MakeMyUECButton :name="t.name" :id="t.id" classes="sm:hidden" />
          </client-only>
        </div>

        <p class="text-sm flex gap-2">
          <nuxt-link
            :to="`https://www.google.com/maps/place/${t.address}`"
            target="_blank"
            class="hover:underline"
          >
            {{ t.address }}
          </nuxt-link>

          <span class="block bg-dark-300 w-px" />

          <nuxt-link
            :to="`tel:+1${t.phone.replaceAll(/[\D]+/g, '')}`"
            target="_blank"
            class="hover:underline whitespace-nowrap"
          >
            {{ t.phone }}
          </nuxt-link>
        </p>

        <div class="flex flex-wrap gap-3 items-center">
          <span
            v-for="feature of t.features"
            class="flex flex-wrap gap-3 items-center"
            :title="feature"
          >
            <u-theatre-feature
              v-for="f of features.find((x) => x.title === feature)?.render ||
              []"
              v-bind="f"
            />
          </span>
        </div>
      </div>

      <client-only>
        <MakeMyUECButton :name="t.name" :id="t.id" classes="<sm:hidden" />
      </client-only>
    </div>
  </u-container>
</template>
