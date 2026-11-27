import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SealCheck } from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { SectionHeader } from "@/components/market/section-header";
import { ShopTile } from "@/components/market/shop-tile";
import { valueIcons } from "@/components/market/value-badge";
import { partnersByValue, productsByValue } from "@/lib/catalog/queries";
import { getValue, values } from "@/lib/catalog/values";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return values.map((value) => ({ slug: value.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const value = getValue((await params).slug);
  if (!value) return {};
  return {
    title: `${value.label} · Bazar`,
    description: `${value.label} businesses in Mauritius. ${value.blurb}`,
  };
}

export default async function ValuePage({ params }: Props) {
  const value = getValue((await params).slug);
  if (!value) notFound();

  const shops = partnersByValue(value.slug);
  // One product per shop first, so a single shop never fills the grid.
  const seen = new Set<string>();
  const all = productsByValue(value.slug);
  const firstPerShop = all.filter(
    (p) => !seen.has(p.shopSlug) && seen.add(p.shopSlug),
  );
  const products = [
    ...firstPerShop,
    ...all.filter((p) => !firstPerShop.includes(p)),
  ].slice(0, 12);
  const Icon = valueIcons[value.slug];

  return (
    <MarketShell>
      <nav aria-label="Breadcrumb" className="text-caption text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/#values-title" className="hover:text-ink-900">
          Shop by what matters
        </Link>
      </nav>

      <header className="mt-3">
        <h1 className="flex items-center gap-2 font-heading text-display text-ink-900">
          <Icon aria-hidden="true" className="size-8 shrink-0 text-lime-700" />
          {value.label}
        </h1>
        <p className="mt-1 max-w-xl text-body-l text-ink-700">{value.blurb}</p>
        <p className="mt-1 text-caption text-ink-500">
          {shops.length} shops · {all.length} products
        </p>
        <p className="mt-3 flex max-w-xl items-start gap-2 rounded-card bg-white p-3 text-caption text-ink-700 ring-1 ring-ink-100">
          <SealCheck
            aria-hidden="true"
            className="size-4 shrink-0 text-lime-700"
            weight="fill"
          />
          <span>
            <strong className="font-semibold text-ink-900">
              How we check:
            </strong>{" "}
            {value.check}
          </span>
        </p>
      </header>

      <nav aria-label="Other values" className="mt-5">
        <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 tablet:mx-0 tablet:flex-wrap tablet:px-0">
          {values.map((other) => (
            <li key={other.slug} className="shrink-0">
              <Link
                href={`/v/${other.slug}`}
                aria-current={other.slug === value.slug ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-9 items-center rounded-full px-3 text-caption font-semibold",
                  other.slug === value.slug
                    ? "bg-ink-900 text-white"
                    : "bg-white text-ink-700 ring-1 ring-ink-100 hover:ring-ink-300",
                )}
              >
                {other.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="shops-title" className="mt-8">
        <SectionHeader id="shops-title" title="Shops" />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 tablet:grid-cols-3 desktop:grid-cols-4">
          {shops.map((partner) => (
            <li key={partner.slug}>
              <ShopTile partner={partner} highlight={value.slug} />
            </li>
          ))}
        </ul>
      </section>

      {products.length > 0 ? (
        <section aria-labelledby="products-title" className="mt-12">
          <SectionHeader id="products-title" title="From these shops" />
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 tablet:grid-cols-4 desktop:grid-cols-6">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </MarketShell>
  );
}
