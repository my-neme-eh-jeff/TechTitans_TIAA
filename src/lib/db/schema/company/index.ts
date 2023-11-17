import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, serial, decimal } from "drizzle-orm/pg-core";
import { companyAdmin } from "../roleBased/companyAdmin";
import { employee } from "../roleBased/employees";

export const company = pgTable("company", {
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  logo: text("logo").notNull(),
  website: text("website").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  industry: text("industry").notNull(),

  //12digit(precision).2digit(scale)
  revenue: decimal("revenue", { precision: 12, scale: 2 }).notNull(),
  expenses: decimal("expenses", { precision: 12, scale: 2 }).notNull(),
  netIncome: decimal("netIncome", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull(),

  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const companyRelations = relations(company, ({ one, many }) => ({
  companyToAdmin: many(companyAdmin),
  companyToEmployee: one(employee, {
    fields: [company.id],
    references: [employee.companyId],
  }),
}));
