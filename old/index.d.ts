declare global {
	namespace NodeJS {
		interface ProcessEnv {
			EDGE_CONFIG: string
			AWS_LAMBDA_FN_URL: string

			// Any random string
			CRYPTR_KEY: string
			JWT_KEY: string

			// PlanetScale database credentials
			PS_HOST: string
			PS_PASSWORD: string
			PS_USERNAME: string
		}
	}
}

export {}
