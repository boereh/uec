import { drizzle } from '#utils/database'
import { and, eq, gte, like, or, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
	const query = getQuery<{ q: string }>(event)

	if (!query.q) return BadRequest(event)

	return drizzle
		.select({
			id: moviesSchema.id,
			title: moviesSchema.title,
			poster: moviesSchema.poster,
			special: moviesSchema.special,
			released: moviesSchema.released,
			description: moviesSchema.description,
		})
		.from(moviesSchema)
		.where(
			or(
				like(moviesSchema.title, `%${query.q}%`),
				like(moviesSchema.description, `%${query.q}%`),
				like(moviesSchema.actors, `%${query.q}%`),
				like(moviesSchema.director, `%${query.q}%`)
			)
		)
})
