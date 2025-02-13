import { watchDebounced } from "@vueuse/core";
import { Card } from "assets/scripts/types/account";
import { Theatre } from "assets/scripts/types/uec";
import dayjs from "dayjs";
import theatres from "assets/scripts/theatres";

const useLoyaltyCardskey = "uec-loyalty-rewards-cards";

export const useLoyaltyCards = () => {
  const cards = ref<Card[]>([]);

  if (!window) return cards;

  watchDebounced(
    cards,
    (c) => localStorage.setItem(useLoyaltyCardskey, PublicSign(c)),
    { debounce: 200 }
  );

  const cardsLS = localStorage.getItem(useLoyaltyCardskey);

  if (!cardsLS) return cards;

  cards.value = PublicVerify<Card[]>(cardsLS);
};

export const useTheatre = () => {
  const cookie = useCookie<number>("uec-theatre", { decode: (v) => Number(v) });

  return computed(() => theatres.find((x) => x.id === Number(cookie.value)));
};

export const setTheatre = (id: number) => {
  useCookie<number>("uec-theatre", {
    expires: dayjs().add(1, "year").toDate(),
  }).value = id;
};
