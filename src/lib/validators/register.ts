import { email, minLength, object, string, toTrimmed } from "valibot"; 

export const LoginSchema = object({
  email: string([toTrimmed(), email()]),
  password: string([toTrimmed(), minLength(8)]),
});

