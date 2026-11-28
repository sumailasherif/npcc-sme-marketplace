import { z } from "zod";

import { districts } from "@/lib/districts";

/**
 * Shop rules, shared by the browser form and the server action.
 * Error messages are translation keys (see "Validation" in messages/*.json).
 * The database enforces the same rules again (supabase/migrations).
 */

export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "app",
  "auth",
  "bazar",
  "dashboard",
  "help",
  "login",
  "logout",
  "new",
  "onboarding",
  "privacy",
  "settings",
  "shop",
  "shops",
  "signup",
  "support",
  "terms",
  "www",
]);

export const SLUG_PATTERN = /^[a-z0-9]([a-z0-9-]{1,38})[a-z0-9]$/;

/**
 * Turns a shop name into a link-friendly slug:
 * "Gâteaux Chez Marie!" -> "gateaux-chez-marie"
 */
export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/['’]/g, "") // "Rosie's" -> "rosies", not "rosie-s"
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");
}

/**
 * Accepts the ways people type a Mauritius mobile number and returns
 * E.164 (+2305xxxxxxx), or null if it is not a Mauritius mobile.
 * "5123 4567", "+230 5123 4567", "230-5123-4567", "0023051234567"
 */
export function normalizeMuMobile(input: string): string | null {
  let digits = input.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("230"))
    digits = digits.slice(3);
  return /^5\d{7}$/.test(digits) ? `+230${digits}` : null;
}

/** "+23051234567" -> "+230 5123 4567" for display. */
export function formatMuMobile(e164: string): string {
  const m = /^\+230(\d{4})(\d{4})$/.exec(e164);
  return m ? `+230 ${m[1]} ${m[2]}` : e164;
}

/** wa.me link with an optional pre-filled message. */
export function whatsappLink(e164: string, text?: string): string {
  const base = `https://wa.me/${e164.replace(/\D/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { message: "tooLong" })
    .transform((v) => (v === "" ? undefined : v))
    .optional();

export const shopSlugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(SLUG_PATTERN, { message: "slugFormat" })
  .refine((s) => !RESERVED_SLUGS.has(s), { message: "slugReserved" });

export const createShopSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "nameTooShort" })
    .max(60, { message: "tooLong" }),
  slug: shopSlugSchema,
  categoryId: z.uuid({ message: "required" }),
  district: z.enum(districts, { message: "required" }),
  whatsappPhone: z.string().transform((v, ctx) => {
    const phone = normalizeMuMobile(v);
    if (!phone) {
      ctx.addIssue({ code: "custom", message: "phoneFormat" });
      return z.NEVER;
    }
    return phone;
  }),
  description: optionalText(500),
  logoUrl: z
    .url({ message: "required" })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export type CreateShopInput = z.input<typeof createShopSchema>;
export type CreateShopData = z.output<typeof createShopSchema>;
