import { JSDOM } from 'jsdom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import { showingSchema } from '../../server/utils/database.schema'
import { drizzle } from '../../server/utils/database'
import theatres from '../../assets/json/theatres.json'

dayjs.extend(utc)
dayjs.extend(tz)

type Showing = {
  movie_id: number
  theatre_id: number
  date: Date
}

type DoDatesArgs = {
  date: string
  theatre: (typeof theatres)[0]
  showings: Showing[]
  url: string
}

type TheatresFetch = {
  theatre: (typeof theatres)[0]
  url: string
}

async function DoDates(args: DoDatesArgs) {
  const datedom = new JSDOM(await $fetch<string>(`${args.url}?showdate=${args.date}`))
  const LiElements = datedom.window.document.querySelectorAll<HTMLLIElement>('#now-playing > li')
  let inserted = 0

  for (const el of LiElements) {
    const times = el.querySelectorAll<HTMLSpanElement>('.auditoriumStyleShowtimes > span')
    const movie_id = Number(el.querySelector<HTMLAnchorElement>('.movieTimes > .movieTimesLeft > a').href.split('/').at(-1))

    for (const time of times) {
      const [t, halve] = (time.querySelector('span') || time).innerHTML.split(' ')

      const [hour, minute] = t.split(':')

      const hoursToAdd = halve === 'PM' ? 12 : 0
      const hours = 60 * (Number(hour) + hoursToAdd)
      const seconds = 60 * (Number(minute) + hours)

      const date = dayjs.tz(args.date, args.theatre.timezone).add(seconds, 'second')

      const showing = {
        movie_id,
        theatre_id: args.theatre.id,
        date: date.toDate(),
      }

      const index = args.showings.findIndex((x) => {
        const date = dayjs.tz(showing.date, args.theatre.timezone).toISOString() === dayjs.tz(x.date, args.theatre.timezone).toISOString()
        const movie_id = Number(showing.movie_id) === Number(x.movie_id)
        const theatre_id = Number(showing.theatre_id) === Number(x.theatre_id)

        return date && movie_id && theatre_id
      })

      if (index >= 0) continue

      // console.log(showing)
      await drizzle.insert(showingSchema).values(showing)

      inserted++
    }
  }

  return inserted
}

export default defineEventHandler(async () => {
  const showings = await drizzle.select().from(showingSchema)

  const tofetch = theatres.map(async (theatre) => {
    const url = `https://www.uecmovies.com/theatres/details/${theatre.id}`

    return {
      response: await $fetch<string>(url),
      theatre: theatre,
      url,
    }
  })

  const fetched = await Promise.all(tofetch)

  for (const item of fetched) {
    const dom = new JSDOM(item.response)
    const dates = dom.window.document.querySelectorAll<HTMLOptionElement>('select#showdate > option')
    const awaits: Promise<number>[] = []

    for (const date of dates) {
      const inserted = DoDates({
        date: date.value,
        showings,
        theatre: item.theatre,
        url: item.url,
      })

      awaits.push(inserted)

      // console.log('inserted', inserted, 'for', dayjs(date.value).format('MMMM DD, YYYY'), 'at', theatre.name)
    }

    const inserted = (await Promise.all(awaits)).reduce((a, b) => a + b, 0)

    console.log('done', item.theatre.name, 'with', inserted, 'inserted')
  }

  console.log('finished')

  return 'Ok'
})
