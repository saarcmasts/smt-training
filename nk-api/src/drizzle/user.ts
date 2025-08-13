import { pgTable, varchar, uuid, timestamp, date, boolean, index } from "drizzle-orm/pg-core"
import auth from './auth';
import { relations } from "drizzle-orm";


export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phoneNumber: varchar('phone_number', { length: 20 }),
    addressLine1: varchar('address_line1', { length: 255 }),
    addressLine2: varchar('address_line2', { length: 255 }),
    city: varchar('city', { length: 100 }),
    state: varchar('state', { length: 100 }),
    postalCode: varchar('postal_code', { length: 20 }),
    country: varchar('country', { length: 200 }),
    dateOfBirth: date('date_of_birth'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    isActive: boolean('is_active').default(true),
    isVerified: boolean('is_verified').default(false),
    lastLogin: timestamp('last_login', { withTimezone: true }),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
}, (table) => [
    index('idx_users_email').on(table.email),
    index('idx_users_created_at').on(table.createdAt)
]);

export default users;