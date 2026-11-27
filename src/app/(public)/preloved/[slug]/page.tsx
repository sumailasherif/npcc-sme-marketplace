import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Star } from "@phosphor-icons/react/ssr";

import { ListingCard } from "@/components/market/listing-card";
import { PrelovedShell } from "@/components/preloved/preloved-shell";
import { Photo } from "@/components/ui/photo";
import { getListing, listings } from "@/lib/demo/preloved";
import { formatPrice } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = getListing((await params).slug);
  if (!listing) return {};
  return {
    title: `${listing.title} · Pre-loved · Bazar`,
    description: listing.description,
    openGraph: { images: [{ url: `/photos/${listing.photo}.jpg` }] },
  };
}

export default async function ListingPage({ params }: Props) {
  const listing = getListing((await params).slug);
  if (!listing) notFound();

  const similar = listings
    .filter(
      (item) =>
        item.slug !== listing.slug && item.condition === listing.condition,
    )
    .slice(0, 2);

  return (
    <PrelovedShell>
      <nav aria-label="Breadcrumb" className="text-caption text-ink-500">
        <Link href="/preloved" className="hover:text-ink-900">
          Pre-loved
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-700">{listing.title}</span>
      </nav>

      <div className="mt-3 grid gap-6 tablet:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-ink-100">
          <Photo
            name={listing.photo}
            alt={listing.title}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-caption font-bold text-plum-700">
            {listing.condition}
          </span>
        </div>

        <div className="tablet:pt-2">
          <p className="text-caption font-semibold text-leaf-700">
            Second-hand
          </p>
          <h1 className="mt-1 font-heading text-[clamp(2.1rem,5vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink-900">
            {listing.title}
          </h1>
          <p className="mt-2 text-h2 tabular-price text-success-700">
            {formatPrice(listing.price)}
            {listing.negotiable ? (
              <span className="ml-2 rounded-full bg-ink-100 px-2 py-1 align-middle text-caption font-semibold text-ink-700">
                Negotiable
              </span>
            ) : null}
          </p>
          <p className="mt-1 flex items-center gap-2 text-caption text-ink-500">
            <MapPin aria-hidden="true" className="size-3" />
            {listing.district} · {listing.distance} · posted {listing.posted} ·{" "}
            {listing.views} views
          </p>

          <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-[#cdeccd] bg-leaf-50 p-3">
            <span className="grid size-10 place-items-center rounded-full bg-white text-success-700">
              <ShieldCheck
                aria-hidden="true"
                className="size-5"
                weight="fill"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 text-body font-semibold text-ink-900">
                {listing.seller}
                <ShieldCheck
                  aria-label="ID verified"
                  className="size-4 text-success-700"
                  weight="fill"
                />
              </p>
              <p className="text-caption text-ink-500">
                <Star
                  aria-hidden="true"
                  className="mr-1 inline size-3 text-yellow-500"
                  weight="fill"
                />
                {listing.sellerRating} · ID verified · replies in 1 h
              </p>
            </div>
          </div>

          <p className="mt-4 text-body-l text-ink-700">{listing.description}</p>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-body">
            <div className="rounded-button border border-ink-100 bg-surface p-3">
              <dt className="text-caption text-ink-500">Battery</dt>
              <dd className="font-semibold text-ink-900">{listing.battery}</dd>
            </div>
            <div className="rounded-button border border-ink-100 bg-surface p-3">
              <dt className="text-caption text-ink-500">Storage / size</dt>
              <dd className="font-semibold text-ink-900">{listing.storage}</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-[10px] border border-[#cdeccd] bg-leaf-50 p-3">
            <p className="text-body font-semibold text-plum-700">
              SafePay protected
            </p>
            <p className="mt-1 text-caption text-[#3f6b3f]">
              Your payment is held until you inspect the item and confirm it
              matches the listing.
            </p>
          </div>

          <div className="mt-4 grid gap-2 tablet:grid-cols-2">
            <Link
              href={`/preloved/${listing.slug}/offer`}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-leaf-700 px-4 text-body font-semibold text-white transition-colors hover:bg-plum-700"
            >
              Buy · SafePay
            </Link>
            <Link
              href={`/preloved/${listing.slug}/deal`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink-900/15 bg-white/60 px-4 text-body font-semibold text-ink-900 transition-colors hover:border-ink-900/30"
            >
              Make an offer
            </Link>
          </div>

          <div className="mt-3 rounded-[10px] border border-[#f0e0b0] bg-[#fff8e6] p-3 text-caption leading-relaxed text-[#6b5b2a]">
            Meet in a public place, inspect before paying, and never share a
            code or pay in advance.
          </div>
        </div>
      </div>

      {similar.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-h3 text-ink-900">Similar items</h2>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-7 tablet:grid-cols-4">
            {similar.map((item) => (
              <ListingCard key={item.slug} listing={item} />
            ))}
          </div>
        </section>
      ) : null}
    </PrelovedShell>
  );
}
