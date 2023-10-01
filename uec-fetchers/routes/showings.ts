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
	timezone: string
}

function ShowingExists(arr: Showing[], showing: Showing) {
	return (
		arr.findIndex((x) => {
			const date = dayjs.tz(showing.date, showing.timezone).toISOString() === dayjs.tz(x.date, x.timezone).toISOString()
			const movie_id = Number(showing.movie_id) === Number(x.movie_id)
			const theatre_id = Number(showing.theatre_id) === Number(x.theatre_id)

			return date && movie_id && theatre_id
		}) >= 0
	)
}

type DoDatesArgs = {
	date: string
	theatre: (typeof theatres)[0]
	showings: Showing[]
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
				timezone: args.theatre.timezone,
			}

			if (ShowingExists(args.showings, showing)) continue

			// console.log(showing)
			await drizzle.insert(showingSchema).values(showing)

			inserted++
		}
	}

	return inserted
}

export default defineEventHandler(async () => {
	const showings = await drizzle.select().from(showingSchema)

	for (const theatre of theatres) {
		const url = `https://www.uecmovies.com/theatres/details/${theatre.id}`
		const dom = new JSDOM(await $fetch<string>(url))
		const dates = dom.window.document.querySelectorAll<HTMLOptionElement>('select#showdate > option')
		let toawait: Promise<number>[] = []

		for (const date of dates) {
			toawait.push(
				DoDates({
					date: date.value,
					showings,
					theatre,
					url,
				})
			)
		}

		const inserted = (await Promise.all(toawait)).reduce((p, c) => p + c, 0)

		console.log('done ', theatre.name, 'with', inserted, 'inserted')
	}

	console.log('finished')

	return 'Ok'
})
