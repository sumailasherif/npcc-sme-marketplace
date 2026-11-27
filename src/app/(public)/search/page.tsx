import type { Metadata } from "next";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { ShopCard } from "@/components/market/shop-card";
import { categories, searchCatalog } from "@/lib/catalog/queries";

export const metadata: Metadata = { title: "Search · Bazar" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = ((await searchParams).q ?? "").trim();
  const results = searchCatalog(query);

  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">Search</h1>

      <form
        action="/search"
        className="mt-4 flex min-h-12 items-center gap-2 rounded-button border border-ink-100 bg-surface px-3"
      >
        <MagnifyingGlass aria-hidden="true" className="size-5 text-ink-500" />
        <input
          name="q"
          type="search"
          defaultValue={query}
          placeholder="gato, plumber, achards, crafts…"
          aria-label="Search"
          className="min-h-11 flex-1 bg-transparent text-body text-ink-900 outline-none placeholder:text-ink-500"
        />
        <button
          type="submit"
          className="min-h-9 rounded-button bg-teal-500 px-3 text-body font-semibold text-white"
        >
          Search
        </button>
      </form>

      {query ? (
        <p className="mt-3 text-body text-ink-700">
          {results.partners.length + results.products.length} results for “
          {query}”
        </p>
      ) : (
        <div className="mt-6">
          <h2 className="text-h3 text-ink-900">Browse categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/c/${category.slug}`}
                className="rounded-full border border-ink-300 bg-surface px-3 py-2 text-body text-ink-700 hover:border-teal-500"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {results.partners.length > 0 ? (
        <section aria-labelledby="shops-title" className="mt-6">
          <h2 id="shops-title" className="text-h3 text-ink-900">
            Shops
          </h2>
          <div className="mt-3 flex flex-col gap-2">
            {results.partners.map((partner) => (
              <ShopCard key={partner.slug} partner={partner} />
            ))}
          </div>
        </section>
      ) : null}

      {results.products.length > 0 ? (
        <section aria-labelledby="products-title" className="mt-6">
          <h2 id="products-title" className="text-h3 text-ink-900">
            Products
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2 tablet:grid-cols-4">
            {results.products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      {query &&
      results.partners.length === 0 &&
      results.products.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-ink-300 bg-surface p-8 text-center">
          <p className="text-body-l font-semibold text-ink-900">
            Nothing matched “{query}”
          </p>
          <p className="mt-1 text-body text-ink-700">
            Try a category, a shop name or a simpler word.
          </p>
        </div>
      ) : null}
    </MarketShell>
  );
}
