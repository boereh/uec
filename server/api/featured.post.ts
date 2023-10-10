import { featuredSchema, moviesSchema } from '../../server/utils/database.schema'
import { drizzle } from '../../server/utils/database'

export default defineEventHandler(async () => {
  return drizzle.select().from(featuredSchema)
})
