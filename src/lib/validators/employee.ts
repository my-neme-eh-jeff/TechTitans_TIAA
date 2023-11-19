import { object, string } from "valibot";

export const InsertEmployeeSchema = object({
  phoneNumber: string(),
  companyId: string(),
  userId: string(),
  department: string(),
  position: string(),
});
