import { enumType, number, object, string } from "valibot";

export const CalculatorSchema = object({
  userId: string(),
  salary: number(),
  workExperience: number(),
  age: number(),
  goalRetirementAge: number(),
  safetyInRetirement: enumType(["Cautious", "Middle-of-the-road", "Daring"]),
  typeOfRetirement: enumType([
    "Like a king/queen",
    "I am happy the way i am",
    "Like a monk",
  ]),
  phone: string(),
});
