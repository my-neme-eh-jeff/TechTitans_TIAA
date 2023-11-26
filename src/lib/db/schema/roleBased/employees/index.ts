import {
  timestamp,
  pgTable,
  text,
  serial,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "..";
import { company } from "../../company";
import {
  relations,
  type InferSelectModel,
  type InferInsertModel,
} from "drizzle-orm";

export const statusEnum = pgEnum("status", ["approved", "pending"]);

export const employee = pgTable("employee", {
  id: serial("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  companyId: integer("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  position: text("position").notNull(),
  phoneNumber: text("phone_number").notNull(),
  department: text("department").notNull(),
  status: statusEnum("status").default("pending"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type SelectEmployee = InferSelectModel<typeof employee>;
export type InsertEmployee = InferInsertModel<typeof employee>;

export const employeeRelations = relations(employee, ({ one, many }) => ({
  employeeToCompany: one(company, {
    fields: [employee.companyId],
    references: [company.id],
  }),
}));
