import { timestamp, pgTable, text, serial, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "../roleBased";

export const forum = pgTable("forum", {
  id: serial("id").notNull().primaryKey(),
  usersInForum: text("users_in_forum").array().$type<Array<string>>(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  createdByUserId: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    messages: json("messages"),
});

export const forumRelations = relations(forum, ({ one, many }) => ({
  forumToCreatedByUser: one(users, {
    fields: [forum.createdByUserId],
    references: [users.id],
  }),
}));
