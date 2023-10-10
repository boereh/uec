import { drizzle } from '#utils/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { and, eq, gte } from 'drizzle-orm'

dayjs.extend(utc)

export default defineEventHandler(async (event) => {
  const tid = getCookie(event, 'uec-theatre')

  if (!tid) return BadRequest(event)

  const movies = await drizzle
    .select({
      id: moviesSchema.id,
      title: moviesSchema.title,
      date: showingSchema.date,
    })
    .from(moviesSchema)
    .innerJoin(showingSchema, and(eq(showingSchema.movie_id, moviesSchema.id), eq(showingSchema.theatre_id, Number(tid))))

  return movies
})
