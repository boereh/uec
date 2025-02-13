import { drizzle } from '#utils/database'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { and, gte } from 'drizzle-orm'

dayjs.extend(utc)

export default defineEventHandler(async (event) => {
	const movies = await drizzle
		.select({
			id: moviesSchema.id,
			title: moviesSchema.title,
			poster: moviesSchema.poster,
			special: moviesSchema.special,
			released: moviesSchema.released,
		})
		.from(moviesSchema)

	const showings = await drizzle
		.select()
		.from(showingSchema)
		.where(gte(showingSchema.date, dayjs.utc().subtract(1, 'day').toDate()))

	return movies.filter((movie) => {
		if (movie.special) return true
		if (dayjs(movie.released).unix() > dayjs().unix()) return true

		return showings.findIndex((x) => x.movie_id === movie.id) >= 0
	})
})
