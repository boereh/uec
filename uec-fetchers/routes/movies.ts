import { JSDOM } from 'jsdom'
import { moviesSchema } from '../../server/utils/database.schema'
import { drizzle } from '../../server/utils/database'
import { Movie } from '../../assets/scripts/types/movies'

type FetchMovieDataArg = {
	title: string
	id: number
	poster: string
	special: boolean
}

async function FetchMovieData(movie: FetchMovieDataArg): Promise<Movie> {
	console.log('doing', movie.title)

	const contents = await $fetch<string>(`https://www.uecmovies.com/movies/details/${movie.id}`)
	const dom = new JSDOM(contents)

	const description = dom.window.document.querySelector<HTMLAnchorElement>('#movie-details p.movie-synopsis').innerHTML

	const genre = dom.window.document
		.querySelector<HTMLSpanElement>('.movie-info-field')
		.innerHTML.split(',')
		.map((x) => x.trim())

	let released = dom.window.document
		.querySelector<HTMLSpanElement>('.movie-info-field:nth-of-type(2)')
		.innerHTML.split(' ')
		.slice(2)
		.map((x) => x.trim())
		.join(' ')
		.trim()

	const mpaa = dom.window.document.querySelector<HTMLSpanElement>('#movie-details div.movie-info > span:nth-of-type(3)').innerHTML.split(' ')[2].trim()

	const runtime = Number(dom.window.document.querySelector<HTMLSpanElement>('#movie-details div.movie-info > span:nth-of-type(4)').innerHTML.split(' ')[1])

	const director = dom.window.document
		.querySelector<HTMLSpanElement>('#movie-details div.movie-info:nth-of-type(2) > span')
		.innerHTML.slice(9)
		.split(',')
		.map((x) => x.trim())

	const actors = dom.window.document
		.querySelector<HTMLSpanElement>('#movie-details div.movie-info:nth-of-type(3) > span')
		.innerHTML.slice(7)
		.split(',')
		.map((x) => x.trim())

	let youtube = null

	try {
		youtube = dom.window.document.querySelector<HTMLIFrameElement>('#movie-details div.videoSlide > iframe').src
	} catch (error) {}

	return {
		...movie,
		released,
		genre,
		description,
		director,
		mpaa,
		actors,
		youtube,
		runtime,
	}
}

export default defineEventHandler(async () => {
	for (const url of ['nowplaying', 'comingsoon', 'specialevents']) {
		const contents = await $fetch<string>(`https://www.uecmovies.com/movies/${url}`)
		const dom = new JSDOM(contents)
		const list = dom.window.document.querySelectorAll('a')

		for (const item of list) {
			const movie = await FetchMovieData({
				title: item.getAttribute('title') || '',
				id: Number(item.href.split('/').at(-1)),
				poster: item.querySelector('img')?.src || '',
				special: url === 'specialevents',
			})

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
	}

	console.log('finished')
	
  return 'Ok'
})
