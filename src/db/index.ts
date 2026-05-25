import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "[db] DATABASE_URL manquant — auth et historique désactivés jusqu'à configuration.",
  );
}

const client = connectionString
  ? postgres(connectionString, { max: 10 })
  : null;

export const db = client ? drizzle(client, { schema }) : null;

export type Db = NonNullable<typeof db>;
