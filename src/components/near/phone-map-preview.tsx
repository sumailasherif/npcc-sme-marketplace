"use client";

import dynamic from "next/dynamic";
import { MapPin, Star } from "@phosphor-icons/react";

import type { NearbyShop } from "@/components/near/nearby-explorer";
import { Photo } from "@/components/ui/photo";
import { pinColor } from "@/lib/catalog/pin-colors";
import { formatDistance, type LatLng } from "@/lib/geo";

const NearbyMap = dynamic(() => import("@/components/near/nearby-map"), {
  ssr: false,
  loading: () => <div className="size-full bg-[#1a1a18]" />,
});

/**
 * An iPhone-style frame showing the "Near you" map and the nearest shops.
 * Decorative preview: the whole section links to /near, so the map inside
 * is not interactive and is hidden from screen readers.
 */
export function PhoneMapPreview({
  origin,
  shops,
}: {
  origin: LatLng & { label: string };
  shops: NearbyShop[];
}) {
  return (
    <div className="relative mx-auto w-[290px] shrink-0 rounded-[3rem] bg-ink-900 p-3 shadow-[0_30px_80px_rgb(0_0_0/0.45)] ring-1 ring-white/10">
      {/* Side buttons */}
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-ink-800"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-r bg-ink-800"
      />

      <div className="relative h-[580px] overflow-hidden rounded-[2.4rem] bg-[#1a1a18]">
        {/* Dynamic island */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-[500] h-7 w-24 -translate-x-1/2 rounded-full bg-black"
        />

        <div aria-hidden="true" className="absolute inset-0">
          <NearbyMap
            origin={origin}
            radiusKm={1.5}
            shops={shops}
            selected={shops[0]?.slug ?? null}
            onSelect={() => {}}
            interactive={false}
          />
        </div>

        {/* Top pill */}
        <div className="absolute inset-x-3 top-12 z-[500] flex items-center gap-2 rounded-full bg-ink-900/85 px-3 py-2 text-caption font-semibold text-white ring-1 ring-white/10 backdrop-blur">
          <MapPin
            aria-hidden="true"
            className="size-4 text-lime-400"
            weight="fill"
          />
          Near you · open now
        </div>

        {/* Bottom sheet */}
        <div className="absolute inset-x-0 bottom-0 z-[500] rounded-t-[1.6rem] bg-cream-50 px-3 pb-4 pt-2">
          <span
            aria-hidden="true"
            className="mx-auto mb-2 block h-1 w-10 rounded-full bg-ink-300"
          />
          <p className="flex items-baseline justify-between px-1 text-caption">
            <span className="font-heading text-body font-bold text-ink-900">
              Within 1.5 km
            </span>
            <span className="text-ink-500">nearest first</span>
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {shops.slice(0, 2).map((shop) => (
              <li
                key={shop.slug}
                className="flex items-center gap-2.5 rounded-2xl bg-white p-2 ring-1 ring-ink-100"
              >
                <span className="relative size-11 shrink-0 overflow-hidden rounded-xl">
                  <Photo name={shop.cover} alt="" sizes="44px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-body font-semibold text-ink-900">
                    {shop.name}
                  </span>
                  <span className="flex items-center gap-1 truncate text-caption text-ink-500">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: pinColor(shop.categories[0]) }}
                    />
                    {shop.tag} · {formatDistance(shop.km)}
                  </span>
                </span>
                <span className="flex items-center gap-0.5 text-caption font-semibold text-ink-900">
                  <Star
                    aria-hidden="true"
                    className="size-3 text-yellow-500"
                    weight="fill"
                  />
                  {shop.rating}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-center text-[10px] text-ink-500">
            Map data © OpenStreetMap contributors
          </p>
        </div>
      </div>
    </div>
  );
}
