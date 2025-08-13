import { relations } from 'drizzle-orm';
import { Auth, users } from './index';

export const authRelation = relations(users, ({ one, many }) => ({
    auth: one(Auth, {
        fields: [users.id],
        references: [Auth.userid]
    })
}));