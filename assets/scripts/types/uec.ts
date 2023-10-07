export type Movie = {
  id: number
  title: string
  description: string
  genre: string[]
  director: string[]
  actors: string[]
  mpaa: string
  runtime: number
  released: string
  special: boolean
  youtube: string | null
  poster: string
}

export type Theatre = {
  [k: string]: any
  name: string
  id: number
  address: string
  phone: string
  state: string
  features: string[]
  concessions: string[]
  timezone: string
}
