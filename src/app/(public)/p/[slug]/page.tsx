import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Star,
  WhatsappLogo,
} from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { Photo } from "@/components/ui/photo";
import { addToCart } from "@/lib/actions/market";
import {
  getCategory,
  getPartner,
  getProduct,
  productsByCategory,
} from "@/lib/catalog/queries";
import { formatPrice } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} · Bazar`,
    description: product.note,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const partner = getPartner(product.shopSlug);
  const similar = productsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  return (
    <MarketShell>
      <nav aria-label="Breadcrumb" className="text-caption text-ink-500">
        <Link href="/" className="hover:text-ink-900">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/c/${product.category}`} className="hover:text-ink-900">
          {product.category.replaceAll("-", " ")}
        </Link>
      </nav>

      <div className="mt-3 grid gap-6 tablet:grid-cols-2 tablet:items-start">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-ink-100">
            <Photo
              name={product.photo}
              alt={product.name}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <p className="mt-2 text-[11px] text-ink-500">
            From {partner?.name ?? "a local shop"} · {partner?.district}
          </p>
        </div>

        <div className="tablet:pt-2">
          <p className="text-caption text-lime-700">
            {getCategory(product.category)?.name ?? product.category}
          </p>
          <h1 className="mt-1 font-heading text-[clamp(2.1rem,5vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink-900">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-body text-ink-700">
            <Star
              aria-hidden="true"
              className="size-4 text-yellow-500"
              weight="fill"
            />
            <span className="font-semibold">4.9</span>
            <span className="text-ink-500">· 68 reviews</span>
          </div>
          <p className="mt-4 text-h2 tabular-price text-ink-900">
            {formatPrice(product.price)}
            {product.unit ? (
              <span className="text-body-l font-normal text-ink-500">
                {" "}
                / {product.unit}
              </span>
            ) : null}
          </p>
          <p className="mt-3 max-w-md text-body-l text-ink-700">
            {product.note}.{" "}
            {product.unit
              ? "Ask the business for availability, then confirm with them directly."
              : "From a verified local business."}
          </p>

          {product.unit ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/23051234567?text=${encodeURIComponent(
                  `Hello! Is the ${product.name} available? I saw it on Bazar.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime-400 px-6 text-body font-semibold text-ink-900 hover:bg-lime-300"
              >
                <WhatsappLogo
                  aria-hidden="true"
                  className="size-5"
                  weight="fill"
                />
                Enquire on WhatsApp
              </a>
              {partner ? (
                <Link
                  href={`/s/${partner.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-body font-semibold text-ink-900 ring-1 ring-ink-300 hover:ring-ink-900"
                >
                  See all from {partner.name}
                </Link>
              ) : null}
            </div>
          ) : (
            <>
              <form
                action={addToCart}
                className="mt-6 flex flex-wrap items-end gap-3"
              >
                <input type="hidden" name="slug" value={product.slug} />
                <label className="flex flex-col gap-1 text-caption font-semibold text-ink-700">
                  Quantity
                  <input
                    type="number"
                    name="qty"
                    min={1}
                    max={20}
                    defaultValue={1}
                    className="min-h-11 w-24 rounded-button border border-ink-900/15 bg-white/70 px-3 text-body"
                  />
                </label>
                <button
                  type="submit"
                  className="min-h-11 rounded-full bg-ink-900 px-6 text-body font-semibold text-white transition-colors hover:bg-ink-800"
                >
                  Add to cart
                </button>
              </form>
              <div className="mt-5 flex items-start gap-2 rounded-[10px] bg-lime-50 p-3 text-body text-lime-700">
                <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <p>
                  Order before 14:00 for same-day delivery in Rose Hill, Beau
                  Bassin and Quatre Bornes.
                </p>
              </div>
            </>
          )}

          {partner ? (
            <Link
              href={`/s/${partner.slug}`}
              className="mt-5 flex items-center gap-3 border-t border-ink-900/10 pt-4"
            >
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-ink-100">
                <Photo name={partner.cover} alt="" sizes="48px" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-body font-semibold text-ink-900">
                  {partner.name}
                  <ShieldCheck
                    aria-label="Verified"
                    className="size-4 text-success-700"
                    weight="fill"
                  />
                </span>
                <span className="block text-caption text-ink-500">
                  {partner.district} · verified shop
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="size-4 text-ink-500" />
            </Link>
          ) : null}
        </div>
      </div>

      {similar.length > 0 ? (
        <section aria-labelledby="similar-title" className="mt-10">
          <h2 id="similar-title" className="text-h3 text-ink-900">
            Similar products
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-7 tablet:grid-cols-4">
            {similar.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </MarketShell>
  );
}
