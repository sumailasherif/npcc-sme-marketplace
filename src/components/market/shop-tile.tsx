import Link from "next/link";
import { SealCheck, Star } from "@phosphor-icons/react/ssr";

import { ValueBadge } from "@/components/market/value-badge";
import { Photo } from "@/components/ui/photo";
import { displayName } from "@/lib/catalog/queries";
import type { Partner, Value } from "@/lib/catalog/types";

/**
 * Brand storefront card: big photo, then a black panel with the name, where
 * they are, rating and one value in lime. One link for the whole card.
 */
export function ShopTile({
  partner,
  highlight,
}: {
  partner: Partner;
  /** Show this value's badge when the shop has it (e.g. on a value page). */
  highlight?: Value;
}) {
  const value =
    highlight && partner.values.includes(highlight)
      ? highlight
      : partner.values[0];
  return (
    <Link
      href={`/s/${partner.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-ink-900 text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-lime-400"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-ink-800">
        <Photo
          name={partner.cover}
          alt=""
          sizes="(max-width: 768px) 220px, 280px"
          className="transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 grid size-9 place-items-center rounded-button bg-lime-400 font-heading text-caption font-extrabold text-ink-900"
        >
          {partner.logo}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-3">
        <span className="flex items-center gap-1">
          <span className="truncate font-heading text-h3 text-white">
            {displayName(partner)}
          </span>
          {partner.verified ? (
            <SealCheck
              aria-label="Verified business"
              className="size-4 shrink-0 text-lime-400"
              weight="fill"
            />
          ) : null}
        </span>
        {partner.claimed ? (
          <span className="mt-0.5 flex items-center gap-1 text-caption text-white/70">
            <span className="truncate">{partner.district}</span>
            <span aria-hidden="true">·</span>
            <Star
              aria-hidden="true"
              className="size-3.5 shrink-0 text-yellow-500"
              weight="fill"
            />
            <span className="font-semibold text-white">{partner.rating}</span>
            <span>({partner.reviews})</span>
          </span>
        ) : (
          <>
            <span className="mt-0.5 truncate text-caption text-white/70">
              {partner.tag} · {partner.district}
            </span>
            <span className="mt-3 self-start rounded-full bg-white/10 px-2 py-0.5 text-caption font-semibold text-white/85">
              Not on Bazar yet
            </span>
          </>
        )}
        {value && partner.claimed ? (
          <ValueBadge value={value} tone="dark" className="mt-3 self-start" />
        ) : null}
      </span>
    </Link>
  );
}
