import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { DATABASE_URL } from "./config/env";
import * as schema from "./drizzle";

const pool = new Pool({
    connectionString: DATABASE_URL,
});

const db = drizzle({ client: pool, schema });

export default db;