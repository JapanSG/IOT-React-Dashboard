import { drizzle as drizzlePgsql } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

const url = process.env.DATABASE_URL;

const drizzle = drizzlePgsql({
  casing: "snake_case",
  connection: {
    connectionString: url,
  },
  schema,
});

export default drizzle;