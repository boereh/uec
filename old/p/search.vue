<script setup lang="ts">
import { useMounted, watchDebounced } from "@vueuse/core";
import { useRouteQuery } from "@vueuse/router";
import { Movie } from "~/assets/scripts/types/movies";

const isMounted = useMounted();
const query = useRouteQuery("q").value;
const router = useRouter();
const search = ref(!query ? "" : Array.isArray(query) ? query[0] : query);
const searched = ref("");
const isSearching = ref(false);
const movies = ref<Movie[]>([]);

function InsertBolds(str: string, value: string) {
  return str.replaceAll(new RegExp(value, "ig"), `<highlight>$&</highlight>`);
}

async function Search() {
  isSearching.value = true;

  router.replace({
    query: {
      q: search.value.trim(),
    },
  });

  if (search.value.trim() === "") return (isSearching.value = false);

  const { data } = await useFetch<Movie[]>(
    `/api/movies/search?q=${encodeURIComponent(search.value)}`,
    {
      method: "POST",
    }
  );

  searched.value = search.value.trim();
  isSearching.value = false;

  if (!data.value) return (movies.value = []);

  const searchInTitle: Movie[] = [];
  const searchInTheRest: Movie[] = [];

  for (const movie of data.value) {
    movie.title = InsertBolds(movie.title, search.value);
    movie.description = InsertBolds(movie.description, search.value);

    if (!movie.title.match(new RegExp(search.value, "ig"))) {
      searchInTheRest.push(movie);

      continue;
    }

    searchInTitle.push(movie);
  }

  movies.value = [...searchInTitle, ...searchInTheRest];
}

Search();

useHead({
  title: () => `Search ${searched.value} - UEC Theatres`,
});
</script>

<template>
  <u-container>
    <div>
      <u-input
        class="md:hidden"
        v-model:value="search"
        placeholder="Search..."
        :icon-right="
          isSearching
            ? 'fluent:spinner-ios-16-regular'
            : 'fluent:search-16-filled'
        "
        :icon-right-class="isSearching ? 'animate-spin' : ''"
        @click:icon-right="Search"
      />
    </div>

    <p class="mt-2">
      Search results for
      <span class="text-black/50 dark:text-white/50">
        {{ searched }}
      </span>
    </p>

    <br />

    <client-only>
      <div class="min-h-sm flex flex-col gap-8">
        <div v-for="movie of movies" :key="movie.id">
          <nuxt-link :to="`/movies/${movie.id}`" class="float-left mb-3 mr-4">
            <img
              class="min-w-42 max-w-42"
              :src="movie.poster"
              :alt="movie.title"
            />
          </nuxt-link>

          <nuxt-link
            :to="`/movies/${movie.id}`"
            class="block text-2xl font-bold mb-4"
            v-html="movie.title"
          />

          <span v-html="movie.description" />
        </div>
      </div>
    </client-only>
  </u-container>
</template>
