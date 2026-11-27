import { categories, partners, products } from "@/lib/catalog/data";
import type { Category, Partner, Product } from "@/lib/catalog/types";

const categoryMap = new Map(categories.map((c) => [c.slug, c]));
const partnerMap = new Map(partners.map((p) => [p.slug, p]));
const productMap = new Map(products.map((p) => [p.slug, p]));

export { categories, partners, products };

export function getCategory(slug: string): Category | undefined {
  return categoryMap.get(slug);
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

export function searchCatalog(query: string): {
  partners: Partner[];
  products: Product[];
} {
  const q = query.trim().toLowerCase();
  if (!q) return { partners: [], products: [] };
  return {
    partners: partners.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q),
    ),
    products: products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.note.toLowerCase().includes(q),
    ),
  };
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
