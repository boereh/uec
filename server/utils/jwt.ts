import jwt from 'jsonwebtoken'

function ScrambleKey(...keys: (string | undefined)[]) {
    let length = 0

    for (const key of keys) {
        if (!key) continue
        if (length >= key.length) continue

        length = key.length
    }

    return [...Array(length)]
        .map((_, index) => {
            const result: string[] = []

            for (const key of keys) result.push((key && key.at(index)) || '')

            return result.join('')
        })
        .join('')
}

export const Sign = (payload: string | object, key?: string) => {
    return jwt.sign(payload, ScrambleKey(process.env.JWT_KEY, key))
}

export const Verify = <T = any>(token: string, key?: string) => {
    return jwt.verify(token, ScrambleKey(process.env.JWT_KEY, key)) as T
}
