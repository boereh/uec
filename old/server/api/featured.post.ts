import { featuredSchema, moviesSchema } from '../utils/database.schema'
import { drizzle } from '../utils/database'

export default defineEventHandler(async () => {
  // return drizzle.select().from(featuredSchema)

  return []
})
