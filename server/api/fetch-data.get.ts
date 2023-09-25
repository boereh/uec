import { lastfetchedSchema } from '#utils/database.schema'
import { drizzle } from '#utils/database'
import dayjs from 'dayjs'
import { gte } from 'drizzle-orm'

export default defineEventHandler(async () => {
	const last = await drizzle
		.select()
		.from(lastfetchedSchema)
		.where(gte(lastfetchedSchema.date, dayjs.utc().subtract(6, 'days').toDate()))

	if (last.length < 1 || dayjs.utc(last[0].date).add(6, 'days').unix() <= dayjs.utc().unix()) {
		await drizzle.insert(lastfetchedSchema).values({
			date: dayjs.utc().toDate(),
		})

		$fetch(`${process.env.AWS_LAMBDA_FN_URL}/movies`)
		$fetch(`${process.env.AWS_LAMBDA_FN_URL}/showings`)

		return 'ok'
	}

	return 'not yet'
})
