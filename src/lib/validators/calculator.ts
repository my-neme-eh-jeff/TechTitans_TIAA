import { enumType, number, object, optional, string } from "valibot";
import {
  safetyInRetirementOptionsArray,
  typeOfRetirementOptionsArray,
} from "../db/schema/roleBased";

export const CalculatorSchema = object({
  salary: string(),
  workExperience: string(),
  age: string(),
  goalRetirementAge: string(),
  safetyInRetirement: string(),
  typeOfRetirement: string(),
});
