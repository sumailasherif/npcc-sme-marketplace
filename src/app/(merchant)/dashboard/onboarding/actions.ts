"use server";

import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";
import { isOwnMediaUrl } from "@/lib/shops";
import { createClient } from "@/lib/supabase/server";
import { createShopSchema } from "@/lib/validation/shop";

export type CreateShopState = {
  /** Field name -> translation key under "Validation". */
  errors?: Partial<Record<string, string>>;
  formError?: string;
  /** What the merchant typed, so the form keeps it after an error. */
  values?: Record<string, string>;
};

const FIELDS = [
  "name",
  "slug",
  "categoryId",
  "district",
  "whatsappPhone",
  "description",
  "logoUrl",
] as const;

export async function createShop(
  _prev: CreateShopState,
  formData: FormData,
): Promise<CreateShopState> {
  const user = await getUser();
  if (!user) redirect("/login?next=/dashboard/onboarding");

  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "")]),
  );

  const parsed = createShopSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      errors[field] ??= issue.message;
    }
    return { errors, values };
  }

  const shop = parsed.data;
  if (shop.logoUrl && !isOwnMediaUrl(shop.logoUrl, user.id)) {
    return { errors: { logoUrl: "uploadFailed" }, values };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("shops").insert({
    owner_id: user.id,
    name: shop.name,
    slug: shop.slug,
    category_id: shop.categoryId,
    district: shop.district,
    whatsapp_phone: shop.whatsappPhone,
    description: shop.description ?? null,
    logo_url: shop.logoUrl ?? null,
  });

  if (error) {
    // 23505 = unique violation: the link is taken, or they already have a shop.
    if (error.code === "23505") {
      if (error.message.includes("owner_id")) redirect("/dashboard");
      return { errors: { slug: "slugTaken" }, values };
    }
    return { formError: "generic", values };
  }

  redirect("/dashboard");
}
