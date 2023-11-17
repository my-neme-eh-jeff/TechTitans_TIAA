import { timestamp, pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { users } from "..";
import { company } from "../../company";
import { relations } from "drizzle-orm";

export const companyAdmin = pgTable("company_admin", {
  id: serial("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  companyId: integer("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  position: text("position").notNull(),
  department: text("department").notNull(),
});

export const companyAdminRelations = relations(companyAdmin, ({ one, many }) => ({
  companyAdminToCompany: one(company, {
    fields: [companyAdmin.companyId],
    references: [company.id],
  }),
}));
