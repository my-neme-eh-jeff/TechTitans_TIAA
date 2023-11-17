import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { users } from "../db/schema/roleBased";
import { minLength, string } from "valibot";

export const LoginSchema = createInsertSchema(users, {
  password: (schema) => string([minLength(8)]),
});
