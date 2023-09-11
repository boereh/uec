import {
    moviesSchema,
    theatresSchema,
    showingSchema,
} from '#utils/database.schema'
import { drizzle } from '#utils/database'

import theatresJSON from '../../scripts/get theatres/theatre.json'
import showingsJSON from '../../scripts/get showing/showings.json'
import moviesJSON from '../../scripts/get movies/movies.json'

async function UploadTheatres() {
    // const ids = await drizzle
    //     .select({
    //         id: theatresSchema.id,
    //     })
    //     .from(theatresSchema)

    // const idsMapped = ids.map(({ id }) => id)

    // const filtered = [...theatresJSON].filter(
    //     (x) => !idsMapped.includes(Number(x.id))
    // )

    for (const theatre of theatresJSON) {
        await drizzle.insert(theatresSchema).ignore().values({
            id: Number(theatre.id),
            name: theatre.name,
            features: theatre.features,
            concessions: theatre.concessions,
            state: theatre.state,
            phone: theatre.phone,
            address: theatre.address,
            pricing: theatre.pricing,
        })
    }
}

async function UploadMovies() {
    for (const movie of moviesJSON) {
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
    }
}

async function UploadShowings() {
    const showings = await drizzle.select().from(showingSchema)

    console.log(showingsJSON.length)

    const filtered = [...showingsJSON].filter((x) => {
        const xDate = new Date(x.date).toDateString()

        const index = showings.findIndex((showing) => {
            if (new Date(showing.date).toDateString() !== xDate) return false
            if (showing.movie_id !== Number(x.movie_id)) return false
            if (showing.theatre_id !== Number(x.theatre_id)) return false
            if (showing.time !== x.time) return false

            return true
        })

        if (index < 0) return true

        showings.splice(index, 1)

        return false
    })

    console.log(filtered.length)

    for (const showing of filtered) {
        await drizzle.insert(showingSchema).values({
            movie_id: Number(showing.movie_id),
            theatre_id: Number(showing.theatre_id),
            time: showing.time,
            date: new Date(showing.date),
        })
    }
}

export default defineEventHandler(async () => {
    // await UploadMovies()
    // await UploadShowings()
    // await UploadTheatres()

    return 'Done'
})
