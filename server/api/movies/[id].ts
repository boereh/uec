import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  const id = getRouterParams(event).id;
  const res = await $fetch<string>(
    `https://uecmovies.com/movies/details/${id}`
  );
  const dom = new JSDOM(res).window.document;
  const title = dom.querySelector(".movie-title")?.innerHTML;
  const poster = dom
    .querySelector<HTMLImageElement>(".movie-poster")
    ?.src.replace("-320", "");
  const synopsis = dom.querySelector(".movie-synopsis")?.innerHTML;
  const embed = dom.querySelector<HTMLIFrameElement>(
    ".videoSlide > iframe"
  )?.src;

  return {
    title,
    poster,
    synopsis,
    embed,
  };
});
