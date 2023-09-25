import { JSDOM } from 'jsdom'
import { showingSchema } from '../../server/utils/database.schema'
import { drizzle } from '../../server/utils/database'
import theatres from '../../assets/json/theatres.json'

type Showing = {
	movie_id: number
	theatre_id: number
	time: number
	date: Date
}

function ShowingExists(arr: Showing[], showing: Showing) {
	return (
		arr.findIndex((x) => {
			const date = new Date(showing.date).toDateString() !== new Date(x.date).toDateString()
			const movie_id = showing.movie_id === x.movie_id
			const theatre_id = showing.theatre_id === x.theatre_id
			const time = showing.time === x.time

			return date && movie_id && theatre_id && time
		}) >= 0
	)
}

export default defineEventHandler(async () => {
	const showings: Showing[] = await drizzle.select().from(showingSchema)

	for (const theatre of theatres) {
		console.log('doing ', theatre.name)

		const url = `https://www.uecmovies.com/theatres/details/${theatre.id}`
		const dom = new JSDOM(await $fetch<string>(url))
		const dates = dom.window.document.querySelectorAll<HTMLOptionElement>('select#showdate > option')
		let inserted = 0

		for (const date of dates) {
			const datedom = new JSDOM(await $fetch<string>(`${url}?showdate=${date}`))
			const LiElements = datedom.window.document.querySelectorAll<HTMLLIElement>('#now-playing > li')

			for (const el of LiElements) {
				const times = el.querySelectorAll<HTMLSpanElement>('.auditoriumStyleShowtimes > span')
				const movie_id = Number(el.querySelector<HTMLAnchorElement>('.movieTimes > .movieTimesLeft > a').href.split('/').at(-1))

				for (let time of times) {
					time = time.querySelector('span') || time

					const [t, halve] = time.innerHTML.split(' ')

					const [hour, minute] = t.split(':')

					const hoursToAdd = halve === 'PM' ? 12 : 0
					const hours = 60 * (Number(hour) + hoursToAdd)

					const timestamp = 60000 * (Number(minute) + hours)

					const showing = {
						movie_id,
						theatre_id: parseInt(theatre.id),
						date: new Date(date.value),
						time: timestamp,
					}

					if (ShowingExists(showings, showing)) continue

					showings.push(showing)
					const res = await drizzle.insert(showingSchema).values(showing)

					inserted += res.rowsAffected
				}
			}
		}

		console.log('done ', theatre.name, 'with', inserted, 'inserted')
	}

	console.log('finished')
})
