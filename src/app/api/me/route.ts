import { getUser } from "@/lib/auth";
import { notConfigured, ok } from "@/lib/api";
import { getMyShop, shopUrl } from "@/lib/shops";
import { createClient } from "@/lib/supabase/server";

/**
 * Who is signed in? Used by every screen to show the right top bar and to
 * protect the business dashboard.
 * → { ok, signedIn: false }  or  { ok, signedIn: true, user, profile, shop }
 */
export async function GET() {
  const blocked = notConfigured();
  if (blocked) return blocked;

  const user = await getUser();
  if (!user) return ok({ signedIn: false });

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, phone, preferred_language, avatar_url")
    .eq("id", user.id)
    .maybeSingle();
  const shop = await getMyShop(user.id);

  return ok({
    signedIn: true,
    user,
    profile,
    shop: shop ? { ...shop, url: shopUrl(shop.slug) } : null,
  });
}
