import "server-only";

import { cache } from "react";

import type { Category, Shop } from "@/lib/database.types";
import { getPublicEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

const SHOP_COLUMNS =
  "id, owner_id, name, slug, description, category_id, whatsapp_phone, district, address, logo_url, cover_url, verification_status, rating_avg, rating_count, created_at, updated_at";

/** The current merchant's shop (one per account), or null. */
export const getMyShop = cache(async (userId: string): Promise<Shop | null> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("shops")
    .select(SHOP_COLUMNS)
    .eq("owner_id", userId)
    .maybeSingle();
  return (data as Shop | null) ?? null;
});

/** A public shop by its link. `cache` shares it between metadata and page. */
export const getShopBySlug = cache(
  async (
    slug: string,
  ): Promise<(Shop & { category: Category | null }) | null> => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("shops")
      .select(`${SHOP_COLUMNS}, category:categories(*)`)
      .eq("slug", slug.toLowerCase())
      .maybeSingle();
    return (data as (Shop & { category: Category | null }) | null) ?? null;
  },
);

export const getCategories = cache(async (): Promise<Category[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  return (data as Category[] | null) ?? [];
});

/** Absolute public link for a shop: https://.../s/{slug} */
export function shopUrl(slug: string): string {
  return `${getPublicEnv().NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/s/${slug}`;
}

/** Only accept logo URLs that point into this user's storage folder. */
export function isOwnMediaUrl(url: string, userId: string): boolean {
  const base = getPublicEnv().NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "");
  return url.startsWith(
    `${base}/storage/v1/object/public/shop-media/${userId}/`,
  );
}
