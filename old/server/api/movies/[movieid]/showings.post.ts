import { BadRequest } from "~/server/utils/responses";
import { showingSchema } from "#utils/database.schema";
import { drizzle } from "#utils/database";
import { eq, gte, and } from "drizzle-orm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import Theatres from "~/assets/scripts/theatres";

dayjs.extend(utc);
dayjs.extend(tz);

export default defineEventHandler(async (event) => {
  const date = await readRawBody(event);
  const tid = getCookie(event, "uec-theatre");
  const movieid = getRouterParam(event, "movieid");

  if (!tid || !movieid || !date) return BadRequest(event);

  const theatre = Theatres.find(({ id }) => id === Number(id));

  if (!theatre) return BadRequest(event, "No theatre");

  const showings = await drizzle
    .select()
    .from(showingSchema)
    .where(
      and(
        eq(showingSchema.theatre_id, Number(tid)),
        eq(showingSchema.movie_id, Number(movieid)),
        gte(
          showingSchema.date,
          dayjs.tz(date, theatre.timezone).startOf("day").toDate()
        )
      )
    );

  return showings;
});
