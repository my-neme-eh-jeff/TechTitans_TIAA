import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  serial,
  decimal,
  json,
} from "drizzle-orm/pg-core";
import { companyAdmin } from "../roleBased/companyAdmin";
import { employee } from "../roleBased/employees";
import {
  type InferSelectModel,
} from "drizzle-orm";

export const company = pgTable("company", {
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  logo: text("logo"),
  website: text("website").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  industry: text("industry").notNull(),

  //12digit(precision).2digit(scale)
  //make these array of json 

  totalRevenue: text("total_revenue"),
  revenueFromUs: text("revenue_from_us"),
  stockPrice: text("stock_price"),
  numberOfRetirementPlans: text("number_of_retirement_plans"),


  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});
export type SelectCompany = InferSelectModel<typeof company>;


export const companyRelations = relations(company, ({ one, many }) => ({
  companyToAdmin: many(companyAdmin),
  companyToEmployee: one(employee, {
    fields: [company.id],
    references: [employee.companyId],
  }),
}));
