import { JSDOM } from 'jsdom'
import { featuredSchema } from '../../server/utils/database.schema'
import { drizzle } from '../../server/utils/database'
import { eq, inArray } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const [contents, featured] = await Promise.all([$fetch<string>('https://www.uecmovies.com'), drizzle.select().from(featuredSchema)])
  const dom = new JSDOM(contents)

  for (const item of dom.window.document.querySelectorAll<HTMLAnchorElement>('#featuredSlider a')) {
    let movie_id: number = null
    let title = item.querySelector<HTMLDivElement>('.slide-caption div')
    let url = item.querySelector<HTMLImageElement>('img').src
    let index = featured.findIndex((f) => f.url === url)

    if (item.href) {
      movie_id = Number(item.href.split('/').at(-1))
    }

    if (index >= 0) {
      featured.splice(index, 1)

      continue
    }

    await drizzle.insert(featuredSchema).values({
      movie_id,
      url,
      title: title ? title.innerHTML : null,
    })
  }

  if (featured.length > 0) {
    await drizzle.delete(featuredSchema).where(
      inArray(
        featuredSchema.id,
        featured.map((f) => f.id)
      )
    )
  }

  console.log('finished heros')

  return 'Ok'
})
