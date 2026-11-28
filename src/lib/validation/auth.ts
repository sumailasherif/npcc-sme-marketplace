import { z } from "zod";

/** Sign-in rules. Messages are translation keys under "Validation". */
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ message: "emailFormat" }));

export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, { message: "codeFormat" });

export const passwordSchema = z
  .string()
  .min(6, { message: "passwordShort" })
  .max(128, { message: "passwordShort" });

