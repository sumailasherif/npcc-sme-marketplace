import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  ChartLineUp,
  MapPin,
  Money,
  Receipt,
  SealCheck,
  ShoppingBagOpen,
  Sparkle,
  Storefront,
  Truck,
} from "@phosphor-icons/react/ssr";

import { BrandBand } from "@/components/market/brand-band";
import { BusinessSearch } from "@/components/market/business-search";
import { HeroStage, type RingCard } from "@/components/market/hero-stage";
import { ListingCard } from "@/components/market/listing-card";
import { MarketShell } from "@/components/market/market-shell";
import {
  NumbersSection,
  type NumberPanel,
} from "@/components/market/numbers-section";
import { ProductCard } from "@/components/market/product-card";
import { SectionHeader } from "@/components/market/section-header";
import { ShopPreview } from "@/components/market/shop-preview";
import { ShopTile } from "@/components/market/shop-tile";
import { valueIcons } from "@/components/market/value-badge";
import { Reveal } from "@/components/motion/reveal";
import { PhoneMapPreview } from "@/components/near/phone-map-preview";
import { Photo } from "@/components/ui/photo";
import {
  categories,
  categoryProductCount,
  featuredInCategory,
  getCategory,
  partnersByCategory,
  partners,
  partnersByValue,
  popularProducts,
} from "@/lib/catalog/queries";
import { pinColor } from "@/lib/catalog/pin-colors";
import { values } from "@/lib/catalog/values";
import { listings } from "@/lib/demo/preloved";
import { defaultOrigin, distanceKm } from "@/lib/geo";

const trending = ["Car rental", "Hotel", "Biryani", "iPhone", "Sofa"];

// The curved strip in the hero: real places, plus what Bazar does for
// shoppers, businesses and travellers.
const ringCards: RingCard[] = [
  { kind: "photo", photo: "mu-caudan-umbrellas", eyebrow: "Shoppers", label: "Shop Mauritian, smarter" },
  { kind: "photo", photo: "cover-food-hall", label: "Restaurants & food courts" },
  { kind: "type", tone: "lime", eyebrow: "Businesses", label: "Your shop online in minutes" },
  { kind: "photo", photo: "mu-supermarket", label: "Groceries, delivered" },
  { kind: "photo", photo: "mu-beach-resort", eyebrow: "Travellers", label: "Hotels, booked direct" },
  { kind: "type", tone: "ink", eyebrow: "Businesses", label: "Invoices made for you" },
  { kind: "photo", photo: "cat-car-rental", label: "Car rental by the day" },
  { kind: "photo", photo: "mu-la-croisette", label: "Malls & arcades" },
  { kind: "type", tone: "cream", eyebrow: "AI assistant", label: "Your numbers in plain words" },
  { kind: "photo", photo: "cover-phone-hand", label: "Phones & repairs" },
  { kind: "photo", photo: "mu-caudan-harbour", eyebrow: "Near you", label: "See who's open now" },
  { kind: "type", tone: "lime", eyebrow: "Pre-loved", label: "Sell what you don't use" },
];

const bigCategories = [
  "restaurants",
  "groceries",
  "hotels",
  "car-rental",
  "malls",
  "electronics",
];

const shopRows = ["restaurants", "hotels", "car-rental", "groceries"];

const benefits = [
  {
    Icon: Money,
    title: "Juice or cash on delivery",
    text: "Pay the way you already do.",
  },
  {
    Icon: Truck,
    title: "Delivered island-wide",
    text: "Or collect from the shop.",
  },
  {
    Icon: SealCheck,
    title: "Every business checked",
    text: "Registration and ID, before they go live.",
  },
  {
    Icon: ShoppingBagOpen,
    title: "One cart, many shops",
    text: "Order from several businesses at once.",
  },
];

const nearChips = [
  { label: "Restaurants", color: pinColor("restaurants") },
  { label: "Supermarkets", color: pinColor("groceries") },
  { label: "Hotels", color: pinColor("hotels") },
  { label: "Car rental", color: pinColor("car-rental") },
  { label: "Beauty", color: pinColor("beauty") },
];

const businessTools = [
  { Icon: Storefront, text: "A storefront and one link for all your channels" },
  { Icon: Receipt, text: "Orders, stock and invoices" },
  { Icon: Sparkle, text: "AI assistant for listings and replies" },
  { Icon: ChartLineUp, text: "Your numbers in plain words" },
];

const guides = [
  "Photograph your products with your phone",
  "VAT and invoices for small businesses",
  "Turn Instagram followers into orders",
];

const explore = [
  "Biryani",
  "Food court",
  "Supermarket",
  "Hotel",
  "Guesthouse",
  "SUV",
  "Compact car",
  "Gift card",
  "Screen repair",
  "iPhone",
  "Manicure",
  "Sofa",
  "Dining set",
  "Gato coco",
  "Bouquet",
  "Summer dress",
  "Headwrap",
];

export default function Home() {
  const popular = popularProducts(12);
  const onBazar = partners.filter((p) => p.claimed);

  const numberPanels: NumberPanel[] = [
    {
      value: onBazar.length,
      label: "verified businesses",
      text: "Every one checked against its business registration and the owner's ID before it goes live.",
      photo: "cat-malls",
    },
    {
      value: categories.length,
      label: "sectors, one search",
      text: "From restaurants and supermarkets to hotels, car rental and phone repairs.",
      photo: "cover-food-hall",
    },
    {
      value: new Set(onBazar.map((p) => p.district)).size,
      label: "towns across Mauritius",
      text: "See what is near you on the map, and who is open right now.",
      photo: "hero-resort",
    },
    {
      value: 3,
      label: "languages",
      text: "English, French and Kreol Morisien, for buyers and for business owners.",
      photo: "hero-grocer",
    },
  ];

  // Nearest shops to the default origin, for the phone preview.
  const nearPreview = partners
    .map((p) => ({
      ...p,
      km: distanceKm(defaultOrigin, p.location),
      openNow: true,
    }))
    .filter((p) => p.km <= 1.5)
    .sort((a, b) => a.km - b.km)
    .slice(0, 9);

  // A different photo on every value card.
  const usedCovers = new Set<string>();
  const valueCards = values.map((value) => {
    const shops = partnersByValue(value.slug);
    const cover =
      shops.find((p) => !usedCovers.has(p.cover))?.cover ?? shops[0]?.cover;
    if (cover) usedCovers.add(cover);
    return { ...value, count: shops.length, cover };
  });

  // One listing per photo, so the strip never repeats an image.
  const seenPhotos = new Set<string>();
  const preloved = listings
    .filter((l) => !seenPhotos.has(l.photo) && seenPhotos.add(l.photo))
    .slice(0, 4);

  return (
    <MarketShell
      hero={
        <HeroStage
          cards={ringCards}
          preview={<ShopPreview slug="kaskad-food-court" />}
          copy={
            <div className="mx-auto flex max-w-[1040px] flex-col items-center px-4 pt-[92px] text-center tablet:px-6 tablet:pt-[104px]">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/5 py-1 pl-1 pr-3 text-caption text-white/80 ring-1 ring-white/15">
                <span className="grid size-6 place-items-center rounded-full bg-lime-400 text-ink-900">
                  <Storefront aria-hidden="true" className="size-3.5" weight="bold" />
                </span>
                The marketplace for Mauritian businesses
              </p>
              <h1
                id="hero-title"
                className="mt-4 font-heading text-[clamp(1.75rem,4.6vw,3.25rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em]"
              >
                Discover Mauritian businesses{" "}
                <span className="text-lime-400">and shop smarter</span>
              </h1>
              <p className="mt-3 max-w-[620px] text-body text-white/70 tablet:text-body-l">
                Restaurants, supermarkets, hotels, car rental and more, from
                verified local businesses. For SMEs: a shop, invoices and an AI
                assistant.
              </p>
              <BusinessSearch className="mt-5 w-full max-w-[860px] text-left shadow-[0_18px_60px_-20px_rgb(212_245_60/0.55)]" />
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="text-caption text-white/60">Popular</span>
                {trending.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="inline-flex min-h-9 items-center rounded-full px-3 text-caption font-semibold text-white ring-1 ring-white/25 hover:bg-lime-400 hover:text-ink-900 hover:ring-lime-400"
                  >
                    {term}
                  </Link>
                ))}
                <Link
                  href="/sell"
                  className="inline-flex min-h-9 items-center gap-1 px-2 text-caption font-semibold text-lime-400 underline-offset-4 hover:underline"
                >
                  Run a business? Open your shop
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            </div>
          }
        />
      }
    >
      {/* Categories: big photo cards, then the rest as chips */}
      <Reveal>
        <section
          aria-labelledby="categories-title"
          className="mt-6 tablet:mt-10"
        >
          <div className="text-center">
            <h2 id="categories-title" className="text-h1 text-ink-900">
              Shop by category
            </h2>
            <p className="mt-1 text-body text-ink-500">
              Browse Mauritian businesses by what they sell
            </p>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-3 tablet:grid-cols-3 tablet:gap-4">
            {bigCategories.map((slug, index) => {
              const category = getCategory(slug);
              if (!category) return null;
              const shopCount = partnersByCategory(slug).length;
              const productCount = categoryProductCount(slug);
              return (
                <li key={slug}>
                  <Link
                    href={`/c/${slug}`}
                    className="group relative block aspect-square overflow-hidden rounded-card bg-ink-100 tablet:aspect-[5/4]"
                  >
                    <Photo
                      name={category.photo}
                      alt=""
                      priority={index < 2}
                      sizes="(max-width: 768px) 50vw, 380px"
                      className="transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/25 to-transparent"
                    />
                    <span className="absolute inset-x-3 bottom-3 text-white tablet:inset-x-5 tablet:bottom-5">
                      <span className="block font-heading text-h3 font-bold tablet:text-h1">
                        {category.name}
                      </span>
                      <span className="block text-caption text-white/85">
                        {shopCount} {shopCount === 1 ? "shop" : "shops"} ·{" "}
                        {productCount}{" "}
                        {productCount === 1 ? "product" : "products"}
                      </span>
                      <span className="mt-1 hidden items-center gap-1 text-caption font-semibold tablet:mt-2 tablet:inline-flex">
                        Shop now
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {categories
              .filter((c) => !bigCategories.includes(c.slug))
              .map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/c/${category.slug}`}
                    className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-body font-semibold text-ink-900 ring-1 ring-ink-100 hover:ring-ink-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </Reveal>

      {/* Near you: the map, shown on a phone */}
      <Reveal>
        <section
          aria-labelledby="near-title"
          className="mt-14 grid items-center gap-8 overflow-hidden rounded-sheet bg-ink-900 p-6 text-white tablet:p-10 desktop:grid-cols-[1fr_auto] desktop:gap-16 desktop:px-16"
        >
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-chip bg-lime-400 px-2 py-0.5 text-caption font-bold text-ink-900">
              <MapPin aria-hidden="true" className="size-3.5" weight="fill" />
              Near you
            </p>
            <h2
              id="near-title"
              className="mt-3 max-w-[14ch] font-heading text-[2rem] font-extrabold leading-[2.4rem] tracking-[-0.02em] text-lime-400 tablet:text-[2.5rem] tablet:leading-[2.9rem]"
            >
              Discover businesses around you
            </h2>
            <p className="mt-3 max-w-md text-body-l text-white/80">
              See restaurants, shops, hotels and services on a live map, sorted
              by distance, with who is open right now.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {nearChips.map(({ label, color }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-caption font-semibold text-white"
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </li>
              ))}
            </ul>
            <Link
              href="/near"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-lime-400 px-6 text-body-l font-semibold text-ink-900 hover:bg-lime-300"
            >
              Open the map
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <PhoneMapPreview origin={defaultOrigin} shops={nearPreview} />
        </section>
      </Reveal>

      {/* Featured shops: businesses first, one row per category */}
      <section aria-labelledby="featured-title" className="mt-12">
        <h2 id="featured-title" className="text-h1 text-ink-900">
          Featured shops
        </h2>
        <p className="text-body text-ink-500">
          Mauritian businesses, picked by category
        </p>
        <div className="mt-2 flex flex-col gap-8">
          {shopRows.map((slug) => {
            const category = getCategory(slug);
            if (!category) return null;
            const shops = featuredInCategory(slug, 4);
            return (
              <div key={slug}>
                <SectionHeader
                  id={`row-${slug}`}
                  level={3}
                  title={category.name}
                  href={`/c/${slug}`}
                  linkLabel={`All ${category.name.toLowerCase()}`}
                />
                <ul className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 tablet:mx-0 tablet:grid tablet:grid-cols-4 tablet:gap-4 tablet:overflow-visible tablet:px-0">
                  {shops.map((partner) => (
                    <li
                      key={partner.slug}
                      className="w-[220px] shrink-0 snap-start tablet:w-auto"
                    >
                      <ShopTile partner={partner} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <NumbersSection panels={numberPanels} />

      {/* Products */}
      <Reveal>
        <section aria-labelledby="popular-title" className="mt-14">
          <SectionHeader
            id="popular-title"
            title="Trending on Bazar"
            href="/for-you"
          />
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 tablet:grid-cols-4 desktop:grid-cols-6">
            {popular.map((product, index) => (
              <li
                key={product.slug}
                className={index >= 8 ? "hidden tablet:block" : undefined}
              >
                <ProductCard
                  product={product}
                  badge={index < 3 ? "Bestseller" : undefined}
                />
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Shop by what matters */}
      <Reveal>
        <section aria-labelledby="values-title" className="mt-14">
          <SectionHeader
            id="values-title"
            title="Shop by what matters"
            note="Find businesses that share what you care about"
          />
          <ul className="grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-4">
            {valueCards.map(({ slug, label, blurb, count, cover }) => {
              const Icon = valueIcons[slug];
              return (
                <li key={slug}>
                  <Link
                    href={`/v/${slug}`}
                    className="group flex h-full flex-col"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-card bg-ink-100">
                      {cover ? (
                        <Photo
                          name={cover}
                          alt=""
                          sizes="(max-width: 768px) 50vw, 280px"
                          className="transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </span>
                    <span className="mt-2 flex items-center gap-1.5 font-heading text-h3 text-ink-900 group-hover:underline group-hover:underline-offset-4">
                      <Icon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-lime-700"
                      />
                      {label}
                    </span>
                    <span className="hidden text-caption text-ink-700 tablet:block">
                      {blurb}
                    </span>
                    <span className="text-caption text-ink-500">
                      {count} shops
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="flex flex-col justify-center rounded-card bg-white p-4 ring-1 ring-ink-100">
              <SealCheck
                aria-hidden="true"
                className="size-6 text-lime-700"
                weight="fill"
              />
              <p className="mt-2 text-body font-semibold text-ink-900">
                How we check
              </p>
              <p className="mt-1 text-caption text-ink-700">
                Businesses choose their values when they join. We check each one
                before the badge goes live.
              </p>
            </li>
          </ul>
        </section>
      </Reveal>

      {/* Why buy here */}
      <section
        aria-label="Why shop on Bazar"
        className="mt-14 grid grid-cols-2 gap-3 desktop:grid-cols-4 desktop:gap-4"
      >
        {benefits.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="flex flex-col gap-1.5 rounded-sheet bg-white p-4 ring-1 ring-ink-100 tablet:p-5"
          >
            <span className="grid size-11 place-items-center rounded-full bg-lime-400">
              <Icon aria-hidden="true" className="size-5 text-ink-900" />
            </span>
            <p className="mt-1 text-body font-bold text-ink-900">{title}</p>
            <p className="text-caption text-ink-800">{text}</p>
          </div>
        ))}
      </section>

      {/* Pre-loved: classifieds from individuals */}
      <Reveal>
        <section aria-labelledby="preloved-title" className="mt-14">
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
      </Reveal>

      {/* For businesses: storefront, tools and support */}
      <Reveal>
        <section
          aria-labelledby="business-title"
          className="mt-14 grid gap-6 rounded-sheet bg-ink-900 p-5 text-white tablet:p-10 desktop:grid-cols-[1.2fr_1fr] desktop:gap-10"
        >
          <div>
            <p className="inline-flex rounded-chip bg-lime-400 px-2 py-0.5 text-caption font-bold text-ink-900">
              Bazar Business
            </p>
            <h2
              id="business-title"
              className="mt-3 font-heading text-[2rem] font-extrabold leading-[2.4rem] tracking-[-0.02em] text-lime-400"
            >
              Grow your business with Bazar
            </h2>
            <p className="mt-2 max-w-lg text-body-l text-white/80">
              Keep selling on Facebook, Instagram and WhatsApp. Bazar gives you
              the storefront, the paperwork and an assistant behind them.
            </p>
            <ul className="mt-5 grid gap-3 tablet:grid-cols-2">
              {businessTools.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-body">
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-lime-400"
                  />
                  <span className="text-white/90">{text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sell"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-button bg-lime-400 px-5 text-body font-semibold text-ink-900 hover:bg-lime-300"
            >
              Open your shop
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="rounded-card bg-ink-800 p-4 ring-1 ring-white/10 tablet:p-5">
            <p className="flex items-center gap-2 text-body font-semibold text-white">
              <BookOpenText
                aria-hidden="true"
                className="size-5 text-lime-400"
              />
              Bazar Academy
              <span className="rounded-chip bg-white/10 px-1.5 py-0.5 text-caption font-semibold text-white/80">
                Coming soon
              </span>
            </p>
            <p className="mt-1 text-caption text-white/60">
              Free, short guides for running a small business in Mauritius.
            </p>
            <ul className="mt-3 divide-y divide-white/10">
              {guides.map((guide) => (
                <li key={guide} className="py-2.5 text-body text-white/90">
                  {guide}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <BrandBand />

      {/* More to explore */}
      <nav aria-labelledby="explore-title" className="mt-14">
        <h2 id="explore-title" className="text-h2 text-ink-900">
          More to explore
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {explore.map((term) => (
            <li key={term}>
              <Link
                href={`/search?q=${encodeURIComponent(term)}`}
                className="inline-flex min-h-9 items-center rounded-full bg-white px-3 text-caption text-ink-700 ring-1 ring-ink-100 hover:text-ink-900 hover:ring-ink-300"
              >
                {term}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </MarketShell>
  );
}
