import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  const res = await Promise.all([
    $fetch<string>("https://uecmovies.com/movies/nowplaying"),
    $fetch<string>("https://uecmovies.com/movies/comingsoon"),
    $fetch<string>("https://uecmovies.com/movies/specialevents"),
  ]);

  const [playing, coming, special] = res.map((v) => new JSDOM(v));

  function extractMovies(dom: JSDOM) {
    const movies: { poster: string; title: string; id: string }[] = [];
    const items = dom.window.document.querySelectorAll("li");

    for (const item of items) {
      movies.push({
        poster: item.querySelector("img")?.getAttribute("src") || "",
        title: item.querySelector("a")?.title || "",
        id:
          item.querySelector("a")?.getAttribute("href")?.split("/").pop() || "",
      });
    }

    return movies;
  }

  return {
    playing: extractMovies(playing),
    coming: extractMovies(coming),
    special: extractMovies(special),
  };
});
