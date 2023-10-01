import { BadRequest } from '~/server/utils/responses'
import { showingSchema } from '#utils/database.schema'
import { drizzle } from '#utils/database'
import { eq, gte, and } from 'drizzle-orm'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

type Body = {
	id: number
	date: Date
}

dayjs.extend(utc)

export default defineEventHandler(async (event) => {
	const { id: tid, date } = await readBody<Body>(event)
	const movieid = getRouterParam(event, 'movieid')

	if (!tid || !movieid || !date) return BadRequest(event)

	const showings = await drizzle
		.select()
		.from(showingSchema)
		.where(and(eq(showingSchema.theatre_id, Number(tid)), eq(showingSchema.movie_id, Number(movieid))))

	console.log(showings, dayjs(date).startOf('day').toDate())

	return showings
})
