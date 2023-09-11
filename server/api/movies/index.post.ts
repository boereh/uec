import { drizzle } from '#utils/database'
import { and, eq, gte, sql } from 'drizzle-orm'

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

    for (let index = 0; index < movies.length; index++) {
        const movie = movies[index]

        const showings = await drizzle
            .select({ count: sql<number>`count(*)` })
            .from(showingSchema)
            .where(
                and(
                    gte(showingSchema.date, new Date()),
                    eq(showingSchema.movie_id, movie.id)
                )
            )

        if (showings[0].count > 0) continue

        movies.splice(index, 1)
    }

    return movies
})
