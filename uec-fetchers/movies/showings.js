import 'dotenv/config'

import puppeteer from 'puppeteer'
import { showingSchema } from './database.schema.js'
import { drizzle } from './database.js'
import theatres from '../../assets/json/theatres.json'

export const handler = async () => {
	const browser = await puppeteer.launch({ headless: 'new' })

	let searches = []

	for (const theatre of theatres) {
		if (searches.length > 0) {
			await Promise.all(searches)

			searches = []
		}

		const showings = await search(browser, theatre)

		const showingsFromDB = await drizzle.select().from(showingSchema)

		for (const x of showingsFromDB) {
			const xDate = new Date(x.date).toDateString()

			const index = showings.findIndex((showing) => {
				if (new Date(showing.date).toDateString() !== xDate) return false
				if (showing.movie_id !== Number(x.movie_id)) return false
				if (showing.theatre_id !== Number(x.theatre_id)) return false
				if (Number(showing.time) !== x.time) return false

				return true
			})

			if (index >= 0) return true

			await drizzle
				.insert(showingSchema)
				.ignore()
				.values({
					movie_id: Number(x.movie_id),
					theatre_id: Number(x.theatre_id),
					time: Number(x.time),
					date: new Date(x.date),
				})
		}

		console.log('done ', theatre.name)
	}

	console.log('finsihed')

	browser.close()
}

async function search(browser, theatre) {
	const page = await browser.newPage()
	const url = `https://www.uecmovies.com/theatres/details/${theatre.id}`
	await page.goto(url)

	let showings = []
	const dates = await page.$$eval('select#showdate > option', (els) => {
		return [...els].map((x) => x.value)
	})
	console.log('processing ', theatre.name)

	for (const date of dates) {
		await page.goto(`${url}?showdate=${date}`)

		const response = await page.$$eval(
			'#now-playing > li',
			(els, { theatre_id, date }) => {
				const result = []

				for (const el of [...els]) {
					const movie_id = el
						.querySelector('.movieTimes > .movieTimesLeft > a')
						.href.split('/')
						.at(-1)

					for (const time of el.querySelectorAll(
						'.auditoriumStyleShowtimes > span'
					)) {
						const [t, halve] = time.innerText.split(' ')
						const [hour, minute] = t.split(':')

						const hoursToAdd = halve === 'PM' ? 12 : 0
						const hours = 60 * (Number(hour) + hoursToAdd)

						const timestamp = 60000 * (Number(minute) + hours)

						result.push({
							movie_id,
							theatre_id,
							date,
							time: timestamp,
						})
					}
				}

				return result
			},
			{ theatre_id: theatre.id, date }
		)

		showings = [...showings, ...response]
	}

	return showings
}

if (process.env.NODE_ENV === 'DEV') {
	handler()
}
