import type { NextRequest } from "next/server";

import { fail, notConfigured, ok } from "@/lib/api";
import { getShopBySlug, shopUrl } from "@/lib/shops";

/** A public shop by its link, e.g. GET /api/shops/rosies-cakes */
export async function GET(_request: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const blocked = notConfigured();
  if (blocked) return blocked;

  const { slug } = await ctx.params;
  const shop = await getShopBySlug(slug);
  if (!shop) return fail(404, "notFound");

  // The owner's id is not needed by visitors.
  const publicShop: Partial<typeof shop> = { ...shop };
  delete publicShop.owner_id;
  return ok({ shop: { ...publicShop, url: shopUrl(shop.slug) } });
}
