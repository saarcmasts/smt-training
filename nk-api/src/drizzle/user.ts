import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core"

export const user = pgTable('user', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    lastLogin: timestamp().defaultNow(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});

export default user;