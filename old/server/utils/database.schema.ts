import { mysqlTable, text, date, datetime, int, json, boolean, timestamp, tinytext } from 'drizzle-orm/mysql-core'

export const moviesSchema = mysqlTable('movies', {
  id: int('id').notNull().autoincrement().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  genre: json('genre').$type<string[]>().notNull(),
  director: text('director').$type<string[]>().notNull(),
  actors: json('actors').$type<string[]>().notNull(),
  mpaa: text('mpaa').notNull(),
  runtime: int('runtime').notNull(),
  released: date('released').notNull(),
  special: boolean('special').notNull(),
  youtube: text('youtube').notNull(),
  poster: text('poster').notNull(),
})

export const showingSchema = mysqlTable('showing', {
  id: int('id').notNull().autoincrement().primaryKey(),
  movie_id: int('movie_id')
    .references(() => moviesSchema.id)
    .notNull(),
  theatre_id: int('theatre_id')
    .references(() => theatresSchema.id)
    .notNull(),
  date: timestamp('date').notNull(),
})

export const featuredSchema = mysqlTable('featured', {
  id: int('id').notNull().autoincrement().primaryKey(),
  movie_id: int('movie_id'),
  url: tinytext('url').notNull(),
  title: tinytext('title'),
})

export const theatresSchema = mysqlTable('theatres', {
  id: int('id').notNull().autoincrement().primaryKey(),
  name: text('name').notNull(),
  features: json('features').$type<string[]>().notNull(),
  concessions: json('description').$type<string[]>().notNull(),
  state: text('state').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  pricing: json('pricing').notNull(),
})

export const lastfetchedSchema = mysqlTable('last_fetched', {
  id: int('id').notNull().autoincrement().primaryKey(),
  date: datetime('date').notNull(),
})
