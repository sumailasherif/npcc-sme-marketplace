import { fail, notConfigured, ok } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { shopSlugSchema, slugify } from "@/lib/validation/shop";

/**
 * Is a shop link free? Used live while a seller types their shop name.
 * GET /api/shops/slug-check?name=Rosie's Cakes   or   ?slug=rosies-cakes
 */
export async function GET(request: Request) {
  const blocked = notConfigured();
  if (blocked) return blocked;

  const params = new URL(request.url).searchParams;
  const slug = params.get("slug") ?? slugify(params.get("name") ?? "");
  const parsed = shopSlugSchema.safeParse(slug);
  if (!parsed.success) return fail(400, parsed.error.issues[0]?.message ?? "slugFormat", { slug });

  const supabase = await createClient();
  const { data } = await supabase.from("shops").select("id").eq("slug", parsed.data).maybeSingle();
  return ok({ slug: parsed.data, available: !data });
}
