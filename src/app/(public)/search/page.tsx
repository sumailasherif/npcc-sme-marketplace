import type { Metadata } from "next";
import Link from "next/link";

import { BusinessSearch } from "@/components/market/business-search";
import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { SectionHeader } from "@/components/market/section-header";
import { ShopTile } from "@/components/market/shop-tile";
import {
  categories,
  districts,
  getCategory,
  searchCatalog,
} from "@/lib/catalog/queries";

export const metadata: Metadata = { title: "Search · Bazar" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; district?: string; cat?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  // Ignore values that aren't real districts or categories.
  const district = districts().includes(params.district ?? "")
    ? params.district
    : undefined;
  const category = getCategory(params.cat ?? "");
  const results = searchCatalog(query, {
    district,
    category: category?.slug,
  });
  const searched = Boolean(query || district || category);

  const summary = [
    query ? `“${query}”` : null,
    category ? category.name : null,
    district ? `in ${district}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">Find a business or product</h1>

      <BusinessSearch
        className="mt-4 shadow-none"
        query={query}
        district={district}
        category={category?.slug}
      />

      {searched ? (
        <p className="mt-4 text-body text-ink-700" aria-live="polite">
          <span className="font-semibold text-ink-900">
            {results.partners.length} businesses
          </span>{" "}
          and {results.products.length} products for {summary}
        </p>
      ) : (
        <section aria-labelledby="browse-title" className="mt-8">
          <h2 id="browse-title" className="text-h2 text-ink-900">
            Browse categories
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/c/${c.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-body text-ink-900 ring-1 ring-ink-100 hover:ring-ink-300"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-h2 text-ink-900">Businesses by district</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {districts().map((d) => (
              <li key={d}>
                <Link
                  href={`/search?district=${encodeURIComponent(d)}`}
                  className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-body text-ink-900 ring-1 ring-ink-100 hover:ring-ink-300"
                >
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.partners.length > 0 ? (
        <section aria-labelledby="shops-title" className="mt-6">
          <SectionHeader id="shops-title" title="Businesses" />
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 tablet:grid-cols-3 desktop:grid-cols-4">
            {results.partners.map((partner) => (
              <li key={partner.slug}>
                <ShopTile partner={partner} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {results.products.length > 0 ? (
        <section aria-labelledby="products-title" className="mt-10">
          <SectionHeader id="products-title" title="Products" />
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 tablet:grid-cols-4 desktop:grid-cols-6">
            {results.products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {searched &&
      results.partners.length === 0 &&
      results.products.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-ink-300 bg-white p-8 text-center">
          <p className="text-body-l font-semibold text-ink-900">
            Nothing matched {summary}
          </p>
          <p className="mt-1 text-body text-ink-700">
            Try another district, all categories, or a simpler word.
          </p>
        </div>
      ) : null}
    </MarketShell>
  );
}
