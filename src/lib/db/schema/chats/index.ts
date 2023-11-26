import { relations, type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { timestamp, pgTable, text, serial, pgEnum, integer } from "drizzle-orm/pg-core";
import { users } from "../roleBased";

export const rolesEnum = pgEnum("roles_for_chat", ["system", "user"]);
export const messages = pgTable("messages", {
  id: serial("id").notNull().primaryKey(),
  messages: text("messages").notNull(),
  role: rolesEnum("role").notNull().default("user"),
  chatId: integer("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
});

export const chats = pgTable("chats", {
  id: serial("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  topic: text("topic"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});
export type SelectChat = InferSelectModel<typeof chats>;

export const messagesRelation = relations(messages, ({ one, many }) => ({
  messageToChat: one(chats, {
    fields: [messages.id],
    references: [chats.id],
  }),
}));
export const chatsRelation = relations(chats, ({ one, many }) => ({
  chatToMessage: many(messages),
  chatToUser: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
}));
