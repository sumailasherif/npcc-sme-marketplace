/**
 * Row types for the tables the app uses, hand-written to match
 * supabase/migrations. (Replace with `supabase gen types` once the CLI is
 * linked to the project.)
 */
import type { District } from "@/lib/districts";
import type { Locale } from "@/i18n/config";

export type UserRole = "buyer" | "merchant" | "admin";
export type VerificationStatus = "pending" | "verified" | "rejected";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string | null;
  phone: string | null;
  preferred_language: Locale;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  slug: string;
  name_en: string;
  name_fr: string;
  name_mfe: string;
  parent_id: string | null;
  type: "product" | "service";
  sort_order: number;
};

export type Shop = {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  whatsapp_phone: string;
  district: District;
  address: string | null;
  logo_url: string | null;
  cover_url: string | null;
  verification_status: VerificationStatus;
  rating_avg: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
};

/** Picks the category name in the visitor's language. */
export function categoryName(category: Category, locale: Locale): string {
  return locale === "fr"
    ? category.name_fr
    : locale === "mfe"
      ? category.name_mfe
      : category.name_en;
}
