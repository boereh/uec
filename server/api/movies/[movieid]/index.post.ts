import { BadRequest } from '~/server/utils/responses'
import { moviesSchema } from '#utils/database.schema'
import { drizzle } from '#utils/database'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const movieid = getRouterParam(event, 'movieid')
    if (!movieid) return BadRequest(event)

    const movies = await drizzle
        .select()
        .from(moviesSchema)
        .where(eq(moviesSchema.id, Number(movieid)))

    if (movies.length < 1) return BadRequest(event)

    return movies[0]
})
