import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/index.ts",
  driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL || ''
  }
});