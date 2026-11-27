import { categories, partners, products } from "@/lib/catalog/data";
import type { Category, Partner, Product, Value } from "@/lib/catalog/types";

const categoryMap = new Map(categories.map((c) => [c.slug, c]));
const partnerMap = new Map(partners.map((p) => [p.slug, p]));
const productMap = new Map(products.map((p) => [p.slug, p]));

export { categories, partners, products };

export function getCategory(slug: string): Category | undefined {
  return categoryMap.get(slug);
}

/** "KFC Cathedral Square" for branches, otherwise the name. */
export function displayName(partner: Partner): string {
  return partner.branch ? `${partner.name} ${partner.branch}` : partner.name;
}

export function getPartner(slug: string): Partner | undefined {
  return partnerMap.get(slug);
}

export function getProduct(slug: string): Product | undefined {
  return productMap.get(slug);
}

export function partnersByCategory(slug: string): Partner[] {
  return partners.filter((p) => p.categories.includes(slug));
}

export function productsByShop(slug: string): Product[] {
  return products.filter((p) => p.shopSlug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function featuredProducts(limit = 4): Product[] {
  return products.slice(0, limit);
}

export function nearbyPartners(limit = 3): Partner[] {
  return [...partners]
    .sort(
      (a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance),
    )
    .slice(0, limit);
}

export type SearchFilters = { district?: string; category?: string };

/** Districts that have at least one business, A to Z. */
export function districts(): string[] {
  return [...new Set(partners.map((p) => p.district))].sort();
}

/**
 * Find businesses and products. A business matches on its name, category,
 * district, tagline or anything it sells. District and category narrow both.
 * With filters but no words, it lists every business that fits.
 */
export function searchCatalog(
  query: string,
  { district, category }: SearchFilters = {},
): { partners: Partner[]; products: Product[] } {
  const q = query.trim().toLowerCase();
  if (!q && !district && !category) return { partners: [], products: [] };

  const inScope = (p: Partner) =>
    (!district || p.district === district) &&
    (!category || p.categories.includes(category));

  const matchingProducts = products.filter((product) => {
    const shop = partnerMap.get(product.shopSlug);
    if (!shop || !inScope(shop)) return false;
    if (category && product.category !== category) return false;
    return (
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.note.toLowerCase().includes(q)
    );
  });
  const sellsMatch = new Set(matchingProducts.map((p) => p.shopSlug));

  const matchingPartners = partners.filter((p) => {
    if (!inScope(p)) return false;
    if (!q) return true;
    return (
      sellsMatch.has(p.slug) ||
      [p.name, p.tag, p.district, p.tagline ?? ""].some((field) =>
        field.toLowerCase().includes(q),
      )
    );
  });

  return { partners: matchingPartners, products: matchingProducts };
}

export function categoryProductCount(slug: string): number {
  return productsByCategory(slug).length;
}

/**
 * Products spread across categories (in category order), one shop at a time,
 * so a single shop or a single kind of product never fills a row.
 */
export function popularProducts(limit = 12): Product[] {
  const queues = categories.map((c) => {
    const seen = new Set<string>();
    return products.filter((p) => {
      if (p.category !== c.slug || seen.has(p.shopSlug)) return false;
      seen.add(p.shopSlug);
      return true;
    });
  });
  const picked: Product[] = [];
  for (let round = 0; picked.length < limit; round++) {
    let added = false;
    for (const queue of queues) {
      if (queue[round] && picked.length < limit) {
        picked.push(queue[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  return picked;
}

/** Shops with a storefront story (tagline), for featured placements. */
export function featuredShops(limit = 8): Partner[] {
  return partners.filter((p) => p.tagline).slice(0, limit);
}

export function partnersByValue(value: Value): Partner[] {
  return partners.filter((p) => p.values.includes(value));
}

export function productsByValue(value: Value): Product[] {
  const shops = new Set(partnersByValue(value).map((p) => p.slug));
  return products.filter((p) => shops.has(p.shopSlug));
}

/**
 * Featured shops for one category: storefronts with a story first, and never
 * two shops with the same cover photo in one row.
 */
export function featuredInCategory(slug: string, limit = 4): Partner[] {
  const shops = partnersByCategory(slug)
    .filter((p) => p.claimed)
    .sort((a, b) => Number(Boolean(b.tagline)) - Number(Boolean(a.tagline)));
  const covers = new Set<string>();
  return shops
    .filter((p) => !covers.has(p.cover) && covers.add(p.cover))
    .slice(0, limit);
}
