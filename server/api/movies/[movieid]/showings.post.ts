import { BadRequest } from '~/server/utils/responses'
import { showingSchema } from '#utils/database.schema'
import { drizzle } from '#utils/database'
import { eq, gte, and } from 'drizzle-orm'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default defineEventHandler(async (event) => {
    const tid = await readBody<string>(event)
    const movieid = getRouterParam(event, 'movieid')

    if (!tid || !movieid) return BadRequest(event)

    const showings = await drizzle
        .select()
        .from(showingSchema)
        .where(
            and(
                eq(showingSchema.theatre_id, Number(tid)),
                eq(showingSchema.movie_id, Number(movieid)),
                gte(
                    showingSchema.date,
                    dayjs(dayjs().format('YYYY-MM-DD')).toDate()
                )
            )
        )

    return showings
})
