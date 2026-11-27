import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react/ssr";

import { Photo } from "@/components/ui/photo";
import { getListing } from "@/lib/demo/preloved";
import { formatPrice } from "@/lib/format";

export default async function OfferPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const listing = getListing((await params).slug);
  if (!listing) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#f4f4f5]">
      <header className="flex items-center gap-3 border-b border-[#2c2c31] px-4 py-2">
        <Link
          href={`/preloved/${listing.slug}/deal`}
          aria-label="Back to deal room"
          className="grid size-11 place-items-center rounded-full border border-[#2c2c31] bg-[#1b1b1f]"
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </Link>
        <h1 className="text-h3">Offer accepted</h1>
        <span className="ml-auto rounded-full bg-[#143322] px-3 py-1 text-caption font-semibold text-[#7ee2a8]">
          SafePay
        </span>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-4">
        <div className="rounded-card border border-[#4a2616] bg-gradient-to-br from-[#2a1408] to-[#1b1b1f] p-4">
          <span className="rounded-full bg-[#ff6b2c]/20 px-2 py-1 text-caption font-semibold text-[#ffb08a]">
            SafePay protected
          </span>
          <h2 className="mt-2 font-heading text-h2">Offer accepted</h2>
          <p className="text-caption text-[#d6c2b7]">
            {listing.seller} accepted {formatPrice(8500)}
          </p>
          <p className="mt-1 font-heading text-[28px] font-bold text-[#ff6b2c]">
            {formatPrice(8500)}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-card border border-[#2c2c31] bg-[#1b1b1f] p-2">
          <span className="relative size-12 shrink-0 overflow-hidden rounded-button bg-[#2c2c31]">
            <Photo name={listing.photo} alt="" sizes="48px" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-body font-semibold">{listing.title}</p>
            <p className="text-caption text-[#a1a1aa]">
              {listing.condition} · {listing.district}
            </p>
          </div>
          <span className="rounded-full bg-[#143322] px-2 py-1 text-[11px] font-semibold text-[#7ee2a8]">
            Reserved
          </span>
        </div>

        <h3 className="mt-4 text-caption font-semibold uppercase tracking-wider text-[#a1a1aa]">
          Handover
        </h3>
        <div className="mt-2 flex flex-col gap-2">
          <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-card border border-[#2c2c31] bg-[#1b1b1f] p-3">
            <input type="radio" name="handover" defaultChecked />
            <MapPin aria-hidden="true" className="size-5 text-[#ff6b2c]" />
            <span>
              <span className="block text-body font-semibold">
                Meet in public
              </span>
              <span className="text-caption text-[#a1a1aa]">
                Today 17:30 · Rose Hill market
              </span>
            </span>
          </label>
          <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-card border border-[#2c2c31] bg-[#1b1b1f] p-3">
            <input type="radio" name="handover" />
            <Truck aria-hidden="true" className="size-5 text-[#ff6b2c]" />
            <span>
              <span className="block text-body font-semibold">
                Grabbit courier
              </span>
              <span className="text-caption text-[#a1a1aa]">
                Rs 120 · tracked · OTP
              </span>
            </span>
          </label>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-card border border-[#25452f] bg-[#132018] p-3 text-body text-[#b6f58a]">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0"
            weight="fill"
          />
          <p>
            {formatPrice(8500)} will be held in SafePay and released only when
            you confirm the item matches.
          </p>
        </div>

        <Link
          href="/preloved/complete"
          className="mt-4 flex min-h-11 items-center justify-center rounded-button bg-[#ff6b2c] px-4 text-body font-semibold text-[#111]"
        >
          Fund SafePay · {formatPrice(8500)}
        </Link>
        <p className="mt-2 text-caption text-[#a1a1aa]">
          Pay with Juice or card. Refunds go back to Juice in 1–3 working days
          if something is wrong.
        </p>
      </main>
    </div>
  );
}
