import {
  mysqlTable,
  text,
  date,
  int,
  json,
  boolean,
} from "drizzle-orm/mysql-core";

export const moviesSchema = mysqlTable("movies", {
  id: int("id").notNull().autoincrement().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  genre: json("genre").notNull(),
  director: text("director").notNull(),
  actors: json("actors").notNull(),
  mpaa: text("mpaa").notNull(),
  runtime: int("runtime").notNull(),
  released: date("released").notNull(),
  special: boolean("special").notNull(),
  youtube: text("youtube").notNull(),
  poster: text("poster").notNull(),
});

export const showingSchema = mysqlTable("showing", {
  id: int("id").notNull().autoincrement().primaryKey(),
  movie_id: int("movie_id")
    .references(() => moviesSchema.id)
    .notNull(),
  theatre_id: int("theatre_id")
    .references(() => theatresSchema.id)
    .notNull(),
  time: int("time").notNull(),
  date: date("date").notNull(),
});
