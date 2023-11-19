import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { company } from "../db/schema/company";
import { number, optional } from "valibot";

const insertCompanySchema = createInsertSchema(company, {
  id: optional(number()),
});
