import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { ShopCard } from "@/components/market/shop-card";
import {
  getCategory,
  partnersByCategory,
  productsByCategory,
} from "@/lib/catalog/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).slug);
  if (!category) return {};
  return {
    title: `${category.name} · Bazar`,
    description: `Verified ${category.name.toLowerCase()} shops and products in Mauritius.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).slug);
  if (!category) notFound();

  const shops = partnersByCategory(category.slug);
  const products = productsByCategory(category.slug);

  return (
    <MarketShell>
      <nav aria-label="Breadcrumb" className="text-caption text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-700">{category.name}</span>
      </nav>

      <header className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-caption text-coral-700">{category.kreol}</p>
          <h1 className="mt-1 font-heading text-display text-ink-900">
            {category.name}
          </h1>
          <p className="mt-1 text-body text-ink-700">
            {shops.length} shops · {products.length} products · Rose Hill + 10
            km
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-ink-900 px-3 py-1.5 text-caption font-semibold text-white">
            All
          </span>
          <span className="rounded-full border border-ink-900/15 bg-white/50 px-3 py-1.5 text-caption text-ink-700">
            Open now
          </span>
          <span className="rounded-full border border-ink-900/15 bg-white/50 px-3 py-1.5 text-caption text-ink-700">
            Verified
          </span>
        </div>
      </header>

      <section aria-labelledby="shops-title" className="mt-6">
        <h2 id="shops-title" className="text-h3 text-ink-900">
          Shops in {category.name.toLowerCase()}
        </h2>
        <div className="mt-3 grid gap-x-3 gap-y-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {shops.map((partner) => (
            <ShopCard key={partner.slug} partner={partner} />
          ))}
        </div>
      </section>

      <section aria-labelledby="products-title" className="mt-10">
        <h2 id="products-title" className="text-h3 text-ink-900">
          Popular in {category.name.toLowerCase()}
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-7 tablet:grid-cols-3 desktop:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </MarketShell>
  );
}
