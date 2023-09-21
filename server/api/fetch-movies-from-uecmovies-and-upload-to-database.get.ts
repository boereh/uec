import puppeteer from 'puppeteer'
import { moviesSchema } from '#utils/database.schema'
import { drizzle } from '#utils/database'
import { Movie } from '~/assets/scripts/types/movies'

export default defineEventHandler(async () => {
	const browser = await puppeteer.launch({ headless: 'new' })
	const page = await browser.newPage()
	const movies: Movie[] = []

	let moviesToProcess: Movie[] = []

	for (const url of ['nowplaying', 'comingsoon', 'specialevents']) {
		await page.goto(`https://www.uecmovies.com/movies/${url}`)

		const urlMovies = (await page.$$eval(
			'a',
			(els, url) => {
				return [...els].map((el) => ({
					title: el.getAttribute('title') || '',
					id: Number(el.href.split('/').at(-1)),
					poster: el.querySelector('img')?.src || '',
					special: url === 'specialevents',
				}))
			},
			url
		)) as Movie[]

		moviesToProcess = [...moviesToProcess, ...urlMovies]
	}

	for (const movie of moviesToProcess) {
		if (!!movies.find((x) => x.id === movie.id)) continue

		console.log('doing ', movie.title)

		await page.goto(`https://www.uecmovies.com/movies/details/${movie.id}`)

		movie.description = await page.$eval(
			'#movie-details p.movie-synopsis',
			(x) => x.innerText
		)

		movie.genre = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(1)',
			(el) => el.innerText.split(',').map((x) => x.trim())
		)

		movie.released = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(2)',
			(el) =>
				el.innerText
					.split(' ')
					.slice(2)
					.map((x) => x.trim())
					.join(' ')
					.trim()
		)

		movie.mpaa = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(3)',
			(el) => el.innerText.split(' ')[2].trim()
		)

		movie.runtime = await page.$eval(
			'#movie-details div.movie-info > span:nth-of-type(4)',
			(el) => Number(el.innerText.split(' ')[1])
		)

		movie.director = await page.$eval(
			'#movie-details div.movie-info:nth-of-type(2) > span',
			(el) =>
				el.innerText
					.slice(9)
					.split(',')
					.map((x) => x.trim())
		)

		movie.actors = await page.$eval(
			'#movie-details div.movie-info:nth-of-type(3) > span',
			(el) =>
				el.innerText
					.slice(7)
					.split(',')
					.map((x) => x.trim())
		)

		try {
			movie.youtube = await page.$eval(
				'#movie-details div.videoSlide > iframe',
				(el) => el.src
			)
		} catch (error) {}

		await drizzle
			.insert(moviesSchema)
			.ignore()
			.values({
				id: movie.id,
				title: movie.title,
				description: movie.description,
				genre: movie.genre,
				director: movie.director,
				actors: movie.actors,
				mpaa: movie.mpaa,
				runtime: movie.runtime,
				released: new Date(movie.released),
				special: movie.special,
				youtube: movie.youtube || '',
				poster: movie.poster,
			})

		console.log('done', movie.title)
	}

	browser.close()
})
