import { getUser } from "@/lib/auth";
import { fail, guardWrite, ok, readJson } from "@/lib/api";
import { isOwnMediaUrl, shopUrl } from "@/lib/shops";
import { createClient } from "@/lib/supabase/server";
import { createShopSchema } from "@/lib/validation/shop";

/**
 * Create the signed-in user's shop (from the old onboarding action).
 * Body: { name, slug, categoryId, district, whatsappPhone, description?, logoUrl? }
 * The account becomes a "merchant" automatically (database trigger).
 */
export async function POST(request: Request) {
  const blocked = guardWrite(request);
  if (blocked) return blocked;

  const user = await getUser();
  if (!user) return fail(401, "notSignedIn");

  const body = await readJson(request);
  const fields = ["name", "slug", "categoryId", "district", "whatsappPhone", "description", "logoUrl"];
  const values = Object.fromEntries(fields.map((f) => [f, String(body[f] ?? "")]));

  const parsed = createShopSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return fail(400, "validation", { errors });
  }

  const shop = parsed.data;
  if (shop.logoUrl && !isOwnMediaUrl(shop.logoUrl, user.id)) {
    return fail(400, "validation", { errors: { logoUrl: "uploadFailed" } });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("shops")
    .insert({
      owner_id: user.id,
      name: shop.name,
      slug: shop.slug,
      category_id: shop.categoryId,
      district: shop.district,
      whatsapp_phone: shop.whatsappPhone,
      description: shop.description ?? null,
      logo_url: shop.logoUrl ?? null,
    })
    .select("id, slug, name")
    .single();

  if (error) {
    // 23505 = unique violation: the link is taken, or they already have a shop.
    if (error.code === "23505") {
      return error.message.includes("owner_id")
        ? fail(409, "alreadyHasShop")
        : fail(400, "validation", { errors: { slug: "slugTaken" } });
    }
    return fail(500, "generic");
  }

  return ok({ shop: { ...data, url: shopUrl(data.slug) } }, { status: 201 });
}
