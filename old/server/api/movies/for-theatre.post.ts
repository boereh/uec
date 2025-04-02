import { drizzle } from "#utils/database";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import Theatres from "~/assets/scripts/theatres";
import { and, eq, gte } from "drizzle-orm";

dayjs.extend(utc);
dayjs.extend(tz);

export default defineEventHandler(async (event) => {
  const tid = Number(await readBody<string>(event));
  const theatre = Theatres.find((x) => x.id === tid);

  if (!theatre) return BadRequest(event);

  const movies = await drizzle
    .select({
      id: moviesSchema.id,
      title: moviesSchema.title,
      date: showingSchema.date,
    })
    .from(moviesSchema)
    .innerJoin(
      showingSchema,
      and(
        eq(showingSchema.movie_id, moviesSchema.id),
        eq(showingSchema.theatre_id, tid)
      )
    )
    .where(gte(showingSchema.date, dayjs.utc().startOf("day").toDate()));

  return movies;
});
