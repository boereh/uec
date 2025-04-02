import { JSDOM } from "jsdom";

const KINDS: Record<string, string> = {
  playing: "nowplaying",
  coming: "comingsoon",
  special: "specialevents",
};

export default defineEventHandler(async (event) => {
  const { kind } = getQuery<{ kind: string }>(event);

  if (!kind || !KINDS[kind]) return [];

  const res = await $fetch<string>(
    `https://uecmovies.com/movies/${KINDS[kind]}`
  );
  const dom = new JSDOM(res);
  const movies: { poster: string; title: string; id: string }[] = [];
  const items = dom.window.document.querySelectorAll("li");

  for (const item of items) {
    movies.push({
      poster: item.querySelector("img")?.getAttribute("src") || "",
      title: item.querySelector("a")?.title || "",
      id: item.querySelector("a")?.getAttribute("href")?.split("/").pop() || "",
    });
  }

  return movies;
});
