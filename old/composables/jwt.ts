import Cryptr from 'cryptr'

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

export const PublicSign = (payload: string | object, key?: string) => {
    const runtimeConfig = useRuntimeConfig()

    const cryptr = new Cryptr(ScrambleKey(runtimeConfig.public.CRYPTR_KEY, key))

    if (typeof payload === 'object') payload = JSON.stringify(payload)

    return cryptr.encrypt(payload)
}

export const PublicVerify = <T = any>(token: string, key?: string) => {
    const runtimeConfig = useRuntimeConfig()

    const cryptr = new Cryptr(ScrambleKey(runtimeConfig.public.CRYPTR_KEY, key))

    const payload = cryptr.decrypt(token)

    try {
        return JSON.parse(payload) as T
    } catch (error) {
        return payload as T
    }
}
