import { drizzle as Drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

export const connection = connect({
  host: process.env.PS_HOST,
  username: process.env.PS_USERNAME,
  password: process.env.PS_PASSWORD,
});

export const drizzle = Drizzle(connection);
