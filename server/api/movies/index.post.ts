import { drizzle } from '#utils/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { and, gte } from 'drizzle-orm'

dayjs.extend(utc)

export default defineEventHandler(async () => {
	const movies = await drizzle
		.select({
			id: moviesSchema.id,
			title: moviesSchema.title,
			poster: moviesSchema.poster,
			special: moviesSchema.special,
			released: moviesSchema.released,
		})
		.from(moviesSchema)

	const date = dayjs.utc(new Date()).startOf('day').toDate()
	const hoursInSeconds = dayjs.utc(new Date()).hour() * 60 * 60
	const minutesInSeconds = dayjs.utc(new Date()).hour() * 60
	const seconds = dayjs.utc(new Date()).hour()
	const time = (seconds + minutesInSeconds + hoursInSeconds) * 1000

	const showings = await drizzle
		.select()
		.from(showingSchema)
		.where(and(gte(showingSchema.date, date), gte(showingSchema.time, time)))

	return movies.filter((movie) => {
		if (movie.special) return true
		if (dayjs(movie.released).unix() > dayjs().unix()) return true

		return showings.findIndex((x) => x.movie_id === movie.id) >= 0
	})
})
