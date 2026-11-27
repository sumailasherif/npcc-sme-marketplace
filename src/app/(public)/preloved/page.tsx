import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "@phosphor-icons/react/ssr";

import { ListingCard } from "@/components/market/listing-card";
import { PrelovedShell } from "@/components/preloved/preloved-shell";
import { Photo } from "@/components/ui/photo";
import { listings } from "@/lib/demo/preloved";

export const metadata: Metadata = {
  title: "Pre-loved · Bazar",
  description:
    "Verified second-hand phones, furniture, kids and home goods in Mauritius.",
};

const categories = [
  { label: "Phones", value: "phones", photo: "iphone-red" },
  { label: "Furniture", value: "furniture", photo: "desk" },
  { label: "Home", value: "home", photo: "plant" },
  { label: "Fashion", value: "fashion", photo: "fabric" },
  { label: "Kids", value: "kids", photo: "baby" },
  { label: "Bikes", value: "kids", photo: "bike" },
  { label: "Audio", value: "audio", photo: "earrings" },
  { label: "More", value: "all", photo: "basket" },
];

function categoryOf(slug: string): string {
  if (slug.startsWith("iphone")) return "phones";
  if (slug === "wooden-desk") return "furniture";
  if (slug === "kids-bicycle") return "kids";
  if (slug === "woven-sun-hat" || slug === "rattan-basket") return "home";
  if (slug === "gold-hoop-earrings" || slug === "potted-monstera")
    return "home";
  return "home";
}

export default async function PrelovedPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    cat?: string;
    max?: string;
    neg?: string;
  }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").toLowerCase().trim();

  const results = listings.filter((listing) => {
    if (
      params.cat &&
      params.cat !== "all" &&
      categoryOf(listing.slug) !== params.cat
    ) {
      return false;
    }
    if (params.max && listing.price > Number(params.max)) return false;
    if (params.neg === "1" && !listing.negotiable) return false;
    if (
      q &&
      !`${listing.title} ${listing.description} ${listing.district}`
        .toLowerCase()
        .includes(q)
    ) {
      return false;
    }
    return true;
  });

  return (
    <PrelovedShell>
      <section aria-labelledby="explore-title" className="">
        <h1 id="explore-title" className="text-h1 text-ink-900">
          Buy and sell second-hand
        </h1>
        <p className="mt-1 text-body text-ink-700">
          From verified people across Mauritius. Not shops.
        </p>
        <div className="no-scrollbar -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 tablet:mx-0 tablet:gap-6 tablet:px-0">
          {categories.map(({ label, value, photo }) => (
            <Link
              key={`${label}-${value}`}
              href={`/preloved?cat=${value}`}
              className="group flex w-[76px] shrink-0 flex-col items-center gap-1.5 text-center tablet:w-[88px]"
            >
              <span className="relative block size-[68px] overflow-hidden rounded-full bg-white ring-leaf-700 ring-offset-2 ring-offset-sand-50 group-hover:ring-2 tablet:size-20">
                <Photo
                  name={photo}
                  alt=""
                  sizes="(max-width: 768px) 22vw, 10vw"
                  className="transition-transform duration-200 ease-out group-hover:scale-[1.04]"
                />
              </span>
              <span className="text-caption font-semibold text-ink-900 group-hover:underline group-hover:underline-offset-4">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-5 flex items-center gap-2 rounded-card bg-leaf-50 p-3 text-body text-ink-900">
        <ShieldCheck
          aria-hidden="true"
          className="size-5 shrink-0 text-leaf-700"
          weight="fill"
        />
        <p>
          <strong className="font-semibold">SafePay protected.</strong> Pay only
          when you confirm the item matches.
        </p>
      </div>

      <section aria-labelledby="nearby-title" className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="nearby-title" className="text-h2 text-ink-900">
              Latest ads
            </h2>
            <p className="mt-0.5 text-caption text-ink-500">
              {results.length} ads
            </p>
          </div>
          <Link
            href="/preloved"
            className="flex min-h-11 items-center text-body font-semibold text-leaf-700 hover:underline"
          >
            See all
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/preloved"
            className="inline-flex min-h-9 items-center rounded-full bg-plum-900 px-3 text-caption font-semibold text-white"
          >
            All
          </Link>
          <Link
            href="/preloved?max=5000"
            className="inline-flex min-h-9 items-center rounded-full border border-ink-300 bg-white px-3 text-caption text-ink-700"
          >
            Under Rs 5k
          </Link>
          <Link
            href="/preloved?neg=1"
            className="inline-flex min-h-9 items-center rounded-full border border-ink-300 bg-white px-3 text-caption text-ink-700"
          >
            Negotiable
          </Link>
        </div>

        {results.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-7 tablet:grid-cols-3 desktop:grid-cols-4">
            {results.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-card border border-dashed border-ink-300 bg-white p-8 text-center">
            <p className="text-body font-semibold text-ink-900">
              No listings in this filter yet
            </p>
            <p className="mt-1 text-body text-ink-700">
              Try another category or clear the search.
            </p>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-card bg-yellow-100 p-4">
        <h2 className="text-body font-semibold text-ink-900">
          Stay safe on Pre-loved
        </h2>
        <p className="mt-1 text-caption leading-relaxed text-ink-700">
          Meet in a public place, inspect before paying, and keep the chat in
          Bazar so SafePay can help if something is wrong.
        </p>
      </section>
    </PrelovedShell>
  );
}
