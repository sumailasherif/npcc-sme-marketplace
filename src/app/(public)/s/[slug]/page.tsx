import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  MapPin,
  Package,
  ShieldCheck,
  Star,
  WhatsappLogo,
} from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { ValueBadge } from "@/components/market/value-badge";
import { ShopHeader } from "@/components/shop-header";
import { SiteHeader } from "@/components/site-header";
import { Photo } from "@/components/ui/photo";
import type { Locale } from "@/i18n/config";
import { displayName, getPartner, productsByShop } from "@/lib/catalog/queries";
import type { Partner } from "@/lib/catalog/types";
import { categoryName } from "@/lib/database.types";
import { getShopBySlug, shopUrl } from "@/lib/shops";
import { whatsappLink } from "@/lib/validation/shop";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const demo = getPartner(slug);
  if (demo) {
    return {
      title: `${demo.name} · Bazar`,
      description: `${demo.tag} in ${demo.district}. Order on Bazar.`,
      openGraph: {
        type: "website",
        siteName: "Bazar",
        title: demo.name,
        description: `${demo.tag} in ${demo.district}`,
        images: [{ url: `/photos/${demo.cover}.jpg`, alt: demo.name }],
      },
    };
  }

  const shop = await getShopBySlug(slug);
  if (!shop) return {};
  const t = await getTranslations("Shop");
  const description =
    shop.description || t("metaDescription", { name: shop.name });

  return {
    title: `${shop.name} · Bazar`,
    description,
    alternates: { canonical: shopUrl(shop.slug) },
    openGraph: {
      type: "website",
      siteName: "Bazar",
      title: shop.name,
      description,
      url: shopUrl(shop.slug),
      images: shop.logo_url
        ? [{ url: shop.logo_url, alt: shop.name }]
        : undefined,
    },
    twitter: { card: "summary" },
  };
}

/**
 * A real business listed from public facts only. No photos, rating or
 * products of theirs; the owner can claim it for free.
 */
function UnclaimedListing({ partner }: { partner: Partner }) {
  const { lat, lng } = partner.location;
  return (
    <MarketShell>
      <section className="overflow-hidden rounded-sheet bg-ink-900 text-white">
        <div className="relative h-44 tablet:h-72">
          <Photo
            name={partner.cover}
            alt={partner.cover === "listing-placeholder" ? "" : partner.name}
            sizes="100vw"
            priority
          />
        </div>
        <div className="p-5 tablet:p-8">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-caption font-semibold text-white/85">
            Not on Bazar yet
          </p>
          <h1 className="mt-3 font-heading text-[2rem] font-extrabold leading-[2.4rem] tracking-[-0.02em] text-lime-400">
            {displayName(partner)}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-body text-white/80">
            <span>{partner.tag}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden="true" className="size-4" />
              {partner.district} (approximate location)
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-body font-semibold text-ink-900 hover:bg-lime-400"
            >
              <MapPin aria-hidden="true" className="size-4" weight="fill" />
              Get directions
            </a>
            <Link
              href="/sell"
              className="inline-flex min-h-11 items-center rounded-full bg-lime-400 px-5 text-body font-semibold text-ink-900 hover:bg-lime-300"
            >
              Is this your business? Claim it for free
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-card bg-white p-5 ring-1 ring-ink-100">
        <h2 className="text-h3 text-ink-900">About this listing</h2>
        <p className="mt-1 max-w-xl text-body text-ink-700">
          This page only shows public information so people can find{" "}
          {partner.name}. The business has not joined Bazar, so there are no
          products, prices or reviews here. Once the owner claims it, they can
          add photos, opening hours and take orders.
        </p>
        <Link
          href={`/c/${partner.categories[0]}`}
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink-900 px-5 text-body font-semibold text-lime-400 hover:bg-ink-800"
        >
          See {partner.tag.toLowerCase()} on Bazar
        </Link>
      </div>
    </MarketShell>
  );
}

function DemoShop({ slug }: { slug: string }) {
  const partner = getPartner(slug);
  if (!partner) notFound();
  if (!partner.claimed) return <UnclaimedListing partner={partner} />;
  const products = productsByShop(partner.slug);

  return (
    <MarketShell>
      <div className="relative h-44 overflow-hidden rounded-card bg-ink-900 tablet:h-56">
        <Photo name={partner.cover} alt={partner.name} sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div>
            <h1 className="font-heading text-h1 text-white">{partner.name}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-caption text-white/85">
              <span>{partner.tag}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin aria-hidden="true" className="size-3" />
                {partner.district}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5">
                <Star
                  aria-hidden="true"
                  className="size-3 text-yellow-500"
                  weight="fill"
                />
                {partner.rating} ({partner.reviews})
              </span>
            </p>
          </div>
          <a
            href={`https://wa.me/23051234567?text=${encodeURIComponent(
              `Hello! I saw ${partner.name} on Bazar.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-button bg-white px-4 text-body font-semibold text-ink-900"
          >
            <WhatsappLogo aria-hidden="true" className="size-5" weight="fill" />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-caption">
        {partner.verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-success-500/15 px-2.5 py-1 font-semibold text-success-700">
            <ShieldCheck aria-hidden="true" className="size-4" weight="fill" />
            Verified shop
          </span>
        ) : null}
        <span className="rounded-full bg-ink-100 px-2.5 py-1 text-ink-700">
          {partner.open}
        </span>
        <span className="text-ink-500">
          Delivery in {partner.district} · cash or Juice
        </span>
      </div>

      {partner.values.length > 0 ? (
        <ul
          aria-label="What this business stands for"
          className="mt-3 flex flex-wrap gap-2"
        >
          {partner.values.map((value) => (
            <li key={value}>
              <Link href={`/v/${value}`} className="block hover:opacity-80">
                <ValueBadge value={value} />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {products.length > 0 ? (
        <section aria-labelledby="products-title" className="mt-6">
          <div className="flex items-end justify-between gap-3">
            <h2 id="products-title" className="text-h2 text-ink-900">
              Products
            </h2>
            <span className="text-caption text-ink-500">
              {products.length} items
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 tablet:grid-cols-3 desktop:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-card border border-dashed border-ink-300 bg-surface px-4 py-10 text-center">
          <Package aria-hidden="true" className="size-10 text-ink-500" />
          <h2 className="text-h3 text-ink-900">No products yet</h2>
          <p className="max-w-sm text-body text-ink-700">
            This shop is adding its products. Message them on WhatsApp to order.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/c/${partner.categories[0]}`}
          className="rounded-full border border-ink-300 bg-surface px-4 py-2 text-body text-ink-700"
        >
          More {partner.tag.toLowerCase()}
        </Link>
        <Link
          href="/preloved"
          className="rounded-full border border-ink-300 bg-surface px-4 py-2 text-body text-ink-700"
        >
          Browse Pre-loved
        </Link>
      </div>
    </MarketShell>
  );
}

export default async function ShopPage({ params }: Props) {
  const slug = (await params).slug;
  if (getPartner(slug)) return <DemoShop slug={slug} />;

  const shop = await getShopBySlug(slug);
  if (!shop) notFound();

  const [t, td, locale] = await Promise.all([
    getTranslations("Shop"),
    getTranslations("Districts"),
    getLocale(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 pt-2 pb-10 tablet:px-6">
        <ShopHeader
          name={shop.name}
          logoUrl={shop.logo_url}
          verified={shop.verification_status === "verified"}
          verifiedLabel={t("verified")}
          unverifiedLabel={t("unverified")}
          categoryLabel={
            shop.category ? categoryName(shop.category, locale as Locale) : null
          }
          districtLabel={td(shop.district)}
          description={shop.description}
          whatsappHref={whatsappLink(
            shop.whatsapp_phone,
            t("chatMessage", { name: shop.name }),
          )}
          chatLabel={t("chat")}
        />

        <section className="flex flex-col items-center gap-2 rounded-card border border-dashed bg-surface px-4 py-10 text-center">
          <Package aria-hidden="true" className="size-10 text-ink-500" />
          <h2 className="text-h3">{t("noProducts")}</h2>
          <p className="max-w-sm text-body text-ink-700">
            {t("noProductsBody")}
          </p>
        </section>
      </main>
    </div>
  );
}
