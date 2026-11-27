import Link from "next/link";
import {
  ArrowRight,
  ChartLineUp,
  Receipt,
  SealCheck,
  Sparkle,
  Storefront,
} from "@phosphor-icons/react/ssr";

import { ListingCard } from "@/components/market/listing-card";
import { MarketShell } from "@/components/market/market-shell";
import { ProductCard } from "@/components/market/product-card";
import { SectionHeader } from "@/components/market/section-header";
import { ShopTile } from "@/components/market/shop-tile";
import { SocialBadges } from "@/components/market/social-badges";
import { Photo } from "@/components/ui/photo";
import {
  categories,
  featuredShops,
  getPartner,
  popularProducts,
  productsByShop,
} from "@/lib/catalog/queries";
import { listings } from "@/lib/demo/preloved";
import { formatPrice } from "@/lib/format";

const spotlightSlug = "atelier-volan";

const businessTools = [
  {
    Icon: Storefront,
    title: "A real storefront",
    text: "One link for your catalogue, prices and stock. Share it on Instagram, Facebook and WhatsApp.",
  },
  {
    Icon: Receipt,
    title: "Orders and invoices",
    text: "Take orders with Juice or cash on delivery. Invoices are made for you.",
  },
  {
    Icon: Sparkle,
    title: "AI assistant",
    text: "Writes product listings from a photo and drafts replies to customers.",
  },
  {
    Icon: ChartLineUp,
    title: "Know your numbers",
    text: "Sales, profit and what to restock, in plain words.",
  },
];

export default function Home() {
  const spotlight = getPartner(spotlightSlug);
  const spotlightProducts = productsByShop(spotlightSlug).slice(0, 3);
  const shops = featuredShops(8).filter((p) => p.slug !== spotlightSlug);
  const popular = popularProducts(12);

  // One listing per photo, so the strip never repeats an image.
  const seenPhotos = new Set<string>();
  const preloved = listings
    .filter((l) => !seenPhotos.has(l.photo) && seenPhotos.add(l.photo))
    .slice(0, 4);

  return (
    <MarketShell>
      {/* Featured storefront: Bazar's job is to make SMEs look their best */}
      {spotlight ? (
        <section
          aria-labelledby="spotlight-title"
          className="grid overflow-hidden rounded-card bg-white ring-1 ring-ink-100 desktop:grid-cols-[1fr_1.15fr]"
        >
          <div className="order-2 flex flex-col p-4 tablet:p-6 desktop:order-1 desktop:p-8">
            <p className="text-caption font-semibold text-coral-700">
              Business of the week
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-button bg-ink-900 font-heading text-h3 font-extrabold text-white"
              >
                {spotlight.logo}
              </span>
              <div className="min-w-0">
                <h1
                  id="spotlight-title"
                  className="flex items-center gap-1.5 text-h1 text-ink-900"
                >
                  {spotlight.name}
                  {spotlight.verified ? (
                    <SealCheck
                      aria-label="Verified business"
                      className="size-6 shrink-0 text-teal-500"
                      weight="fill"
                    />
                  ) : null}
                </h1>
                <p className="text-caption text-ink-500">
                  {spotlight.tag} · {spotlight.district} · ★ {spotlight.rating}{" "}
                  ({spotlight.reviews} reviews)
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-body-l text-ink-700">
              {spotlight.tagline}
            </p>
            {spotlight.socials ? (
              <SocialBadges socials={spotlight.socials} className="mt-3" />
            ) : null}

            <ul className="mt-5 grid grid-cols-3 gap-2">
              {spotlightProducts.map((product) => (
                <li key={product.slug}>
                  <Link href={`/p/${product.slug}`} className="group block">
                    <span className="relative block aspect-square overflow-hidden rounded-button bg-ink-100">
                      <Photo
                        name={product.photo}
                        alt={product.name}
                        sizes="140px"
                      />
                    </span>
                    <span className="mt-1 block truncate text-caption text-ink-700 group-hover:underline">
                      {product.name}
                    </span>
                    <span className="block font-heading text-body font-bold tabular-price text-ink-900">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2 desktop:mt-auto desktop:pt-6">
              <Link
                href={`/s/${spotlight.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-button bg-teal-500 px-5 text-body font-semibold text-white hover:bg-teal-700"
              >
                Visit the shop
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <div className="relative order-1 min-h-[220px] bg-ink-100 tablet:min-h-[320px] desktop:order-2">
            <Photo
              name={spotlight.cover}
              alt={`${spotlight.name} workshop`}
              priority
              sizes="(max-width: 1280px) 100vw, 640px"
            />
          </div>
        </section>
      ) : null}

      {/* Categories: one scrollable row */}
      <nav aria-label="Categories" className="mt-8">
        <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 tablet:-mx-6 tablet:px-6 desktop:mx-0 desktop:justify-between desktop:px-0">
          {categories.map((category) => (
            <li key={category.slug} className="w-[84px] shrink-0 snap-start">
              <Link
                href={`/c/${category.slug}`}
                className="group flex flex-col items-center gap-1.5 text-center"
              >
                <span className="relative block size-[68px] overflow-hidden rounded-full bg-ink-100 ring-teal-500 ring-offset-2 ring-offset-sand-50 group-hover:ring-2">
                  <Photo name={category.photo} alt="" sizes="68px" />
                </span>
                <span className="line-clamp-2 text-caption font-semibold leading-tight text-ink-900">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Products: dense grid, price first */}
      <section aria-labelledby="popular-title" className="mt-10">
        <SectionHeader
          id="popular-title"
          title="Trending on Bazar"
          href="/for-you"
        />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-5 tablet:grid-cols-4 desktop:grid-cols-6">
          {popular.map((product, index) => (
            <li
              key={product.slug}
              className={index >= 8 ? "hidden tablet:block" : undefined}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      {/* Shops as brands */}
      <section aria-labelledby="shops-title" className="mt-12">
        <SectionHeader
          id="shops-title"
          title="Shops on Bazar"
          note="Mauritian businesses, verified and in one place"
          href="/search"
        />
        <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 tablet:-mx-6 tablet:px-6 desktop:mx-0 desktop:grid desktop:grid-cols-3 desktop:gap-4 desktop:overflow-visible desktop:px-0">
          {shops.slice(0, 6).map((partner) => (
            <li key={partner.slug} className="shrink-0 desktop:shrink">
              <ShopTile partner={partner} />
            </li>
          ))}
        </ul>
      </section>

      {/* Pre-loved: classifieds from individuals */}
      <section aria-labelledby="preloved-title" className="mt-12">
        <SectionHeader
          id="preloved-title"
          title="Pre-loved"
          note="Second-hand from people across Mauritius, paid with SafePay"
          href="/preloved"
        />
        <ul className="grid grid-cols-2 gap-3 tablet:grid-cols-4">
          {preloved.map((listing) => (
            <li key={listing.slug}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
        <Link
          href="/sell/verify"
          className="mt-4 flex min-h-11 items-center justify-center rounded-button bg-white text-body font-semibold text-ink-900 ring-1 ring-ink-300 hover:ring-ink-900 tablet:inline-flex tablet:px-5"
        >
          Post an ad for free
        </Link>
      </section>

      {/* For businesses: storefront + business support + AI */}
      <section
        aria-labelledby="business-title"
        className="mt-12 rounded-card bg-teal-700 p-5 text-white tablet:p-8"
      >
        <div className="desktop:flex desktop:items-end desktop:justify-between desktop:gap-8">
          <div className="max-w-xl">
            <h2 id="business-title" className="text-h1">
              Run your business from one place
            </h2>
            <p className="mt-2 text-body-l text-white/85">
              Keep selling on Facebook, Instagram and WhatsApp. Bazar gives you
              the shop, the paperwork and an assistant behind them.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-button bg-white px-5 text-body font-semibold text-teal-700 hover:bg-teal-50 desktop:mt-0"
          >
            Open your shop
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 border-t border-white/20 pt-6 tablet:grid-cols-2 desktop:grid-cols-4">
          {businessTools.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-3 desktop:flex-col">
              <Icon aria-hidden="true" className="size-6 shrink-0" />
              <div>
                <h3 className="text-h3">{title}</h3>
                <p className="mt-1 text-body text-white/80">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </MarketShell>
  );
}
