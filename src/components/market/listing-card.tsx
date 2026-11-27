import Link from "next/link";
import { Heart } from "@phosphor-icons/react/ssr";

import { Photo } from "@/components/ui/photo";
import type { Listing } from "@/lib/demo/preloved";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const conditionTone: Record<Listing["condition"], string> = {
  Mint: "bg-white text-leaf-700",
  Good: "bg-white text-ink-900",
  Fair: "bg-yellow-100 text-ink-900",
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/preloved/${listing.slug}`} className="group flex flex-col">
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[10px] bg-[#e7e2d8]">
        <Photo
          name={listing.photo}
          alt={listing.title}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span
          className={cn(
            "absolute left-2 top-2 rounded-full px-2 py-1 text-[11px] font-bold",
            conditionTone[listing.condition],
          )}
        >
          {listing.condition}
        </span>
        <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white/90 text-ink-700 transition-colors group-hover:text-[#1b7a1b]">
          <Heart aria-hidden="true" className="size-4" />
        </span>
      </span>
      <span className="mt-2 flex items-baseline justify-between gap-2">
        <span className="min-w-0 truncate text-body font-semibold text-ink-900 decoration-[#1b7a1b] decoration-2 underline-offset-4 group-hover:underline">
          {listing.title}
        </span>
        <span className="shrink-0 text-body font-bold tabular-price text-[#166b16]">
          {formatPrice(listing.price)}
        </span>
      </span>
      <span className="mt-0.5 truncate text-caption text-ink-500">
        {listing.negotiable ? "Negotiable · " : ""}
        {listing.district} · {listing.distance}
      </span>
    </Link>
  );
}
