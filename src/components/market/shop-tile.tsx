import Link from "next/link";
import { SealCheck, Star } from "@phosphor-icons/react/ssr";

import { SocialBadges } from "@/components/market/social-badges";
import { Photo } from "@/components/ui/photo";
import type { Partner } from "@/lib/catalog/types";

/** Brand-first storefront card: cover, logo, name, rating and channels. */
export function ShopTile({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/s/${partner.slug}`}
      className="group flex h-full w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-card bg-white ring-1 ring-ink-100 transition-shadow hover:shadow-e2 desktop:w-auto"
    >
      <span className="relative block aspect-[16/9] bg-ink-100">
        <Photo
          name={partner.cover}
          alt=""
          sizes="(max-width: 1280px) 260px, 280px"
        />
      </span>
      <span className="relative flex flex-1 flex-col px-3 pb-3">
        <span
          aria-hidden="true"
          className="-mt-6 mb-2 grid size-12 place-items-center rounded-button bg-ink-900 font-heading text-body font-extrabold text-white ring-4 ring-white"
        >
          {partner.logo}
        </span>
        <span className="flex items-center gap-1">
          <span className="truncate font-heading text-h3 text-ink-900 group-hover:underline">
            {partner.name}
          </span>
          {partner.verified ? (
            <SealCheck
              aria-label="Verified business"
              className="size-4 shrink-0 text-teal-500"
              weight="fill"
            />
          ) : null}
        </span>
        <span className="flex items-center gap-1 text-caption text-ink-500">
          <Star
            aria-hidden="true"
            className="size-3.5 text-yellow-500"
            weight="fill"
          />
          <span className="font-semibold text-ink-900">{partner.rating}</span>
          <span>({partner.reviews})</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">
            {partner.tag} · {partner.district}
          </span>
        </span>
        {partner.tagline ? (
          <span className="mt-2 line-clamp-2 text-body text-ink-700">
            {partner.tagline}
          </span>
        ) : null}
        {partner.socials?.length ? (
          <SocialBadges socials={partner.socials} className="mt-auto pt-3" />
        ) : null}
      </span>
    </Link>
  );
}
