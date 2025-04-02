<script setup lang="ts">
import { useLocalStorage, useMounted, watchDebounced } from "@vueuse/core";
import { Swiper, SwiperSlide } from "swiper/vue";
import Theatres from "~/assets/scripts/theatres";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

type FeaturedMovie = {
  id: number;
  movie_id: number;
  title: string;
  url: string;
};

type Showtime = {
  theatre: number | null;
  movie: number | null;
  date: number | null;
  time: number | null;
};

type Movie = {
  id: number;
  title: string;
  date: Date;
};

type Option = {
  value: any;
  text: string;
};

type Options = {
  movies: Array<Option>;
  dates: Array<Option>;
  times: Array<Option>;
};

const isMounted = useMounted();
const swiperEl = ref<typeof Swiper>();
const fetchingMovies = ref(false);
const lastswipped = ref<number>();
const showtime = reactive<Showtime>({
  theatre: null,
  movie: null,
  date: null,
  time: null,
});
const movies = ref<Movie[]>([]);
const options = computed(() => {
  const result: Options = { movies: [], dates: [], times: [] };

  if (!showtime.theatre) return result;

  let theatre = Theatres.find((x) => x.id === Number(showtime.theatre));

  if (!theatre) return result;

  for (const movie of movies.value) {
    if (result.movies.find((x) => x.value === movie.id)) continue;

    result.movies.push({
      value: movie.id,
      text: movie.title,
    });
  }

  if (!showtime.movie) return result;

  const today = dayjs().tz(theatre.timezone).startOf("day").unix();

  for (const movie of movies.value) {
    if (movie.id !== Number(showtime.movie)) continue;
    let day = dayjs.utc(movie.date).tz(theatre.timezone).startOf("day");

    if (today > day.unix()) continue;
    if (result.dates.find((x) => x.value === day.unix())) continue;

    if (today === day.unix()) {
      result.dates.push({
        value: day.unix(),
        text: "Today",
      });

      continue;
    }

    result.dates.push({
      value: day.unix(),
      text: day.format("dddd, MMM DD"),
    });
  }

  result.dates.sort((a, b) => a.value - b.value);

  if (!showtime.date) return result;

  for (const movie of movies.value) {
    if (movie.id !== Number(showtime.movie)) continue;
    let day = dayjs.utc(movie.date).tz(theatre.timezone);

    if (Number(showtime.date) !== day.startOf("day").unix()) continue;

    result.times.push({
      value: day.unix(),
      text: day.format("h:mm a"),
    });
  }

  return result;
});

const { data: featured } = await useFetch<FeaturedMovie[]>("/api/featured", {
  method: "POST",
});

type UpdateValueArg = {
  theatre?: number;
  movie?: number;
  date?: number;
  time?: number;
};

/**
 * if each parameter is undefined then
 */
function UpdateValue({ theatre, movie, date, time }: UpdateValueArg) {
  if (undefined !== time) return (showtime.time = Number(time));
  showtime.time = null;

  if (undefined !== date) return (showtime.date = Number(date));
  showtime.date = null;

  if (undefined !== movie) return (showtime.movie = Number(movie));
  showtime.movie = null;

  if (undefined !== theatre) return (showtime.theatre = Number(theatre));
  showtime.theatre = null;
}

watchDebounced(
  lastswipped,
  (last) => {
    if (swiperEl.value) swiperEl.value.$el.swiper.slideNext(500);

    lastswipped.value = Date.now();
  },
  { debounce: 5500 }
);

onMounted(() => (lastswipped.value = Date.now()));
onMounted(() => {
  let theatre = useTheatre();

  if (!theatre.value) return;

  showtime.theatre = theatre.value.id;
});

watch(toRef(showtime, "theatre"), async (tid) => {
  movies.value = [];

  fetchingMovies.value = true;

  if (!tid || !Theatres.find((x) => x.id === Number(tid)))
    return (fetchingMovies.value = false);

  const { data } = await useFetch<Movie[]>("/api/movies/for-theatre", {
    method: "POST",
    body: tid.toString(),
  });

  movies.value = data.value || [];

  fetchingMovies.value = false;
});

useHead({
  title: "UEC Theatres",
});
</script>

<template>
  <u-container>
    <div class="flex <lg:flex-col gap-4 sm:gap-8">
      <div class="flex-grow lg:max-w-2xl w-full overflow-hidden">
        <h3 class="mt-0">Featured</h3>

        <div class="aspect-featured rounded-md overflow-hidden">
          <swiper
            ref="swiperEl"
            :slides-per-view="1"
            :loop="true"
            class="select-none"
            @slideChange="lastswipped = Date.now()"
          >
            <swiper-slide
              v-for="movie of isMounted && featured ? featured : []"
            >
              <nuxt-link
                :to="movie.movie_id ? `/movies/${movie.movie_id}` : ''"
                class="relative"
              >
                <img
                  class="w-full"
                  :src="`https://uecmovies.com${movie.url}`"
                  :alt="movie.title"
                />

                <span
                  class="absolute bottom-0 left-0 w-full max-w-full p-2 md:p-4 md:pt-8 text-white bg-gradient-to-t from-black/75 to-black/0 font-bold md:text-2xl whitespace-nowrap"
                >
                  {{ movie.title }}
                </span>
              </nuxt-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="min-w-xs flex flex-col">
        <h3 class="mt-0">Find Showtimes</h3>

        <u-sheet class="flex-grow">
          <u-form>
            <div class="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
              <u-form-item label="Theatre">
                <u-select
                  v-model:value="showtime.theatre"
                  :options="
                    Theatres.map((x) => ({ value: x.id, text: x.name }))
                  "
                />
              </u-form-item>

              <u-form-item label="Movie">
                <u-select
                  :value="showtime.movie"
                  :options="options.movies"
                  :disabled="null === showtime.theatre"
                  :loading="fetchingMovies"
                  @update:value="UpdateValue({ movie: $event })"
                />
              </u-form-item>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
              <u-form-item label="Date">
                <u-select
                  :value="showtime.date"
                  :options="options.dates"
                  :disabled="null === showtime.movie"
                  :loading="fetchingMovies"
                  @update:value="UpdateValue({ date: $event })"
                />
              </u-form-item>

              <u-form-item label="Time">
                <u-select
                  :value="showtime.time"
                  :options="options.times"
                  :disabled="null === showtime.date"
                  :loading="fetchingMovies"
                  @update:value="UpdateValue({ time: $event })"
                />
              </u-form-item>
            </div>
          </u-form>

          <div class="flex-grow flex items-end">
            <u-button
              :disabled="null === showtime.time"
              type="primary"
              href="/tickets"
              block
              @click="useLocalStorage('uec-tickets', [showtime])"
            >
              Get Ticket
            </u-button>
          </div>
        </u-sheet>
      </div>
    </div>

    <br />
    <br />

    <div class="flex <sm:flex-col gap-4 sm:gap-8">
      <div
        class="bg-brand-red-grad px-8 pt-8 pb-4 min-w-56 grid place-items-center rounded-md"
      >
        <img
          src="/img/loyalty-rewards-card-angled.png"
          alt="loyalty rewards cards"
        />
      </div>

      <div class="flex-grow">
        <h3>UEC Loyalty Program</h3>

        <p>
          Pick up a Free Loyalty Rewards Card today. Earn valuable points for
          each purchase. Redeem for FREE soda, FREE popcorn & FREE movie
          tickets!
        </p>

        <nuxt-link class="link" to="/loyalty-rewards">
          Learn More About Our Exclusive Loyalty Program
        </nuxt-link>
      </div>
    </div>

    <br />

    <div class="flex <sm:flex-col-reverse gap-4 sm:gap-8">
      <div class="flex-grow">
        <h3>Group Sales</h3>

        <p>
          ESpecial discounts and private viewings are available for parties of
          50+. Great for business events, school outings, employee rewards, or
          any other group activity.
        </p>

        <nuxt-link class="link" to="/group-sales">
          Learn More About Group And Corporate Sales
        </nuxt-link>
      </div>

      <div
        class="bg-brand-red-grad p-4 min-w-56 grid place-items-center rounded-md"
      >
        <img
          src="/img/loyalty-rewards-tickets-turned.png"
          alt="loyalty rewards cards"
        />
      </div>
    </div>

    <br />

    <div class="flex <sm:flex-col gap-4 sm:gap-8">
      <div
        class="bg-brand-red-grad px-8 pt-8 pb-2 min-w-56 grid place-items-center rounded-md"
      >
        <img
          class="max-w-40"
          src="/img/gift-card-main.png"
          alt="loyalty rewards cards"
        />
      </div>

      <div class="flex-grow">
        <h3>Gift Cards</h3>

        <p>
          Give the gift of entertainment! Gift Cards are available online or at
          your local UEC Theatre.
        </p>

        <nuxt-link class="link" to="/gift-cards">
          Learn More About Our Versatile Gift Cards
        </nuxt-link>
      </div>
    </div>
  </u-container>
</template>
