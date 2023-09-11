import { PublicVerify } from '~/composables/jwt'

type Body = {
    name: {
        first: string
        last: string
    }
    email: string
    password: string
    state: string
    theatre_id: number
}

export default defineEventHandler(async (event) => {
    const body = await readBody<Body>(event)

    // prettier-ignore
    if (!body.email || !body.password || !body.state || !body.theatre_id || !body.name.first || !body.name.last) return BadRequest(event)

    const passwordPayload = PublicVerify<string>(body.password)
})
