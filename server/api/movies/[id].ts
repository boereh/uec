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

  const fields = [...dom.querySelectorAll<HTMLSpanElement>(".movie-info-field")]
    .map((field) => {
      const label = field.querySelector("label")?.getAttribute("for");
      const texts = field.textContent?.split("\n");

      if (!texts) return;
      if (field.classList.contains("bold")) return ["Genre", texts[1].trim()];
      if (!label) return;

      return [label, texts[2].trim()];
    })
    .filter((field) => field !== undefined);

  return {
    title,
    poster,
    synopsis,
    embed,
    fields: Object.fromEntries(fields),
  };
});
