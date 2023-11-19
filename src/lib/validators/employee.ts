import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { number, optional } from "valibot";
import { employee } from "../db/schema/roleBased/employees";

export const InsertEmployeeSchema = createInsertSchema(employee, {
  id: optional(number()),
});



