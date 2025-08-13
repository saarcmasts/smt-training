import { relations } from "drizzle-orm";
import { auth } from "./auth";
import { users } from "./user";

export const usersRelations = relations(users, ({ one }) => ({
    auth: one(auth, {
        fields: [users.id],
        references: [auth.userid]
    })
}));

export default usersRelations;