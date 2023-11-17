import { decimal, integer, pgEnum, serial } from "drizzle-orm/pg-core";
import { timestamp, pgTable, text } from "drizzle-orm/pg-core";
import {
  type InferSelectModel,
  type InferInsertModel,
  relations,
} from "drizzle-orm";
import { companyAdmin } from "./companyAdmin";
import { employee } from "./employees";

export const rolesEnum = pgEnum("roles", [
  "companyAdmin",
  "employee",
  "siteAdmin",
]);
export type roleLiteral = Pick<SelectUser, "role">["role"];

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  role: rolesEnum("role").notNull().default("employee"),
  company: text("company"),
});
export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const usersRelations = relations(users, ({ one, many }) => ({
  userToProfile: one(profile, {
    fields: [users.id],
    references: [profile.userId],
  }),
  userToAdminDetails: one(companyAdmin, {
    fields: [users.id],
    references: [companyAdmin.userId],
  }),
  userToEmployeeDetails: one(employee, {
    fields: [users.id],
    references: [employee.userId],
  }),
}));

export const safetyEnum = pgEnum("safety", [
  "Cautious",
  "Middle-of-the-road",
  "Daring",
]);
export const typeOfRetirementEnum = pgEnum("typeOfRetirement", [
  "Like a king/queen",
  "I am happy the way i am",
  "Like a monk",
]);
export const profile = pgTable("profile", {
  id: serial("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),

  salary: decimal("salary", { precision: 12, scale: 2 }).notNull(),
  workExperience: integer("work_experience").notNull(),
  age: integer("age").notNull(),
  goalRetirementAge: integer("goal_retirement_age").notNull(),
  safetyInRetirement: safetyEnum("safety_in_retirement").notNull(),
  typeOfRetirement: typeOfRetirementEnum("type_of_retirement").notNull(),

  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});
