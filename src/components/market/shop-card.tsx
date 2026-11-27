import Link from "next/link";
import { ShieldCheck, Star } from "@phosphor-icons/react/ssr";

import { Photo } from "@/components/ui/photo";
import type { Partner } from "@/lib/catalog/types";

export function ShopCard({ partner }: { partner: Partner }) {
  return (
    <Link href={`/s/${partner.slug}`} className="group flex flex-col">
      <span className="relative block aspect-[16/10] overflow-hidden rounded-[10px] bg-ink-100">
        <Photo
          name={partner.cover}
          alt={partner.name}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/55 to-transparent" />
        <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-ink-900">
          {partner.open}
        </span>
        {partner.verified ? (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#166b16]">
            <ShieldCheck aria-hidden="true" className="size-3" weight="fill" />
            Verified
          </span>
        ) : null}
      </span>
      <span className="mt-2 flex items-center gap-1">
        <span className="truncate font-heading text-[1.05rem] font-semibold text-ink-900 decoration-coral-700 decoration-2 underline-offset-4 group-hover:underline">
          {partner.name}
        </span>
      </span>
      <span className="mt-0.5 truncate text-caption text-ink-500">
        {partner.tag} · {partner.district}
      </span>
      <span className="mt-0.5 flex items-center gap-1 text-caption text-ink-700">
        <Star
          aria-hidden="true"
          className="size-3 text-yellow-500"
          weight="fill"
        />
        <span className="font-semibold">{partner.rating}</span>
        <span className="text-ink-500">
          ({partner.reviews}) · {partner.distance}
        </span>
      </span>
    </Link>
  );
}
