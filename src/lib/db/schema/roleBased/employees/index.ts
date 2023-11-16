import { timestamp, pgTable, text, serial } from "drizzle-orm/pg-core";
import { users } from "..";
import { company } from "../../company";
import { relations } from "drizzle-orm";

export const employee = pgTable("employee", {
  id: serial("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  position: text("position").notNull(),
  department: text("department").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
