import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core"

export const auth = pgTable('auth', {
    id: uuid().defaultRandom().primaryKey(),
    loginId: varchar().notNull(),
    password: varchar().notNull(),
    lastLogin: timestamp().defaultNow(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});

export default auth;