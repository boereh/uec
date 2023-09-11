declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CRYPTR_KEY: string
            JWT_KEY: string

            PS_HOST: string
            PS_PASSWORD: string
            PS_USERNAME: string
        }
    }
}

export {}
