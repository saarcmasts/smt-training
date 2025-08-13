import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core"
import users from "./user";

export const auth = pgTable('auth', {
    id: uuid().defaultRandom().primaryKey(),
    loginId: varchar().notNull().references(() => users.email),
    password: varchar().notNull(),
    userid: uuid().notNull().references(() => users.id),
    lastLogin: timestamp().defaultNow(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});

export default auth;