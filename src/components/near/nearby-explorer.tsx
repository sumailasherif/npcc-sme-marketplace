"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Crosshair, MapPin, SealCheck, Star } from "@phosphor-icons/react";

import { Photo } from "@/components/ui/photo";
import type { Partner } from "@/lib/catalog/types";
import {
  defaultOrigin,
  distanceKm,
  districtCentres,
  formatDistance,
  isOpen,
} from "@/lib/geo";
import { cn } from "@/lib/utils";

export type NearbyShop = Partner & { km: number; openNow: boolean };

const NearbyMap = dynamic(() => import("@/components/near/nearby-map"), {
  ssr: false,
  loading: () => (
    <div className="grid size-full place-items-center bg-ink-100 text-caption text-ink-500">
      Loading map…
    </div>
  ),
});

const radii: { km: number | null; label: string }[] = [
  { km: 1, label: "1 km" },
  { km: 2, label: "2 km" },
  { km: 5, label: "5 km" },
  { km: 10, label: "10 km" },
  { km: null, label: "Any distance" },
];

type Origin = { label: string; lat: number; lng: number };
type LocateState = "idle" | "locating" | "denied";

/**
 * "Near you": businesses on a map and in a list, nearest first.
 * The location is only used in the browser; it is never sent to Bazar.
 */
export function NearbyExplorer({
  partners,
  categories,
  nowIso,
}: {
  partners: Partner[];
  categories: { slug: string; name: string }[];
  /** Server time, so open/closed matches between server and browser. */
  nowIso: string;
}) {
  const [origin, setOrigin] = useState<Origin>(defaultOrigin);
  const [radiusKm, setRadiusKm] = useState<number | null>(2);
  const [openOnly, setOpenOnly] = useState(false);
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [locate, setLocate] = useState<LocateState>("idle");
  const listRef = useRef<HTMLUListElement>(null);

  const shops: NearbyShop[] = useMemo(() => {
    const now = new Date(nowIso);
    return partners
      .map((p) => ({
        ...p,
        km: distanceKm(origin, p.location),
        openNow: isOpen(p.hours, now),
      }))
      .filter(
        (p) =>
          (radiusKm === null || p.km <= radiusKm) &&
          (!openOnly || (p.claimed && p.openNow)) &&
          (!category || p.categories.includes(category)),
      )
      .sort((a, b) => a.km - b.km);
  }, [partners, origin, radiusKm, openOnly, category, nowIso]);

  function locateMe() {
    if (!("geolocation" in navigator)) {
      setLocate("denied");
      return;
    }
    setLocate("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          label: "your location",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocate("idle");
      },
      () => setLocate("denied"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }

  function pickTown(name: string) {
    const centre = districtCentres[name];
    if (centre) setOrigin({ label: name, ...centre });
  }

  /** From the map: highlight the card and, on desktop, scroll the list to it. */
  function selectFromMap(slug: string) {
    setSelected(slug);
    const list = listRef.current;
    const item = document.getElementById(`near-${slug}`);
    if (list && item && list.scrollHeight > list.clientHeight) {
      list.scrollTo({
        top: item.offsetTop - list.offsetTop - 8,
        behavior: "smooth",
      });
    }
  }

  const radiusLabel =
    radiusKm === null ? "Any distance" : `Within ${radiusKm} km`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-h1 text-ink-900">Businesses near you</h1>
          <p className="mt-0.5 flex items-center gap-1 text-body text-ink-700">
            <MapPin aria-hidden="true" className="size-4 text-lime-700" />
            Near{" "}
            <span className="font-semibold text-ink-900">{origin.label}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={locateMe}
            disabled={locate === "locating"}
            className="inline-flex min-h-11 items-center gap-2 rounded-button bg-lime-400 px-4 text-body font-semibold text-ink-900 hover:bg-lime-300 disabled:opacity-70"
          >
            <Crosshair aria-hidden="true" className="size-4" weight="bold" />
            {locate === "locating" ? "Finding you…" : "Use my location"}
          </button>
          <label className="flex min-h-11 items-center gap-2 rounded-button bg-white px-3 text-body ring-1 ring-ink-100">
            <span className="text-ink-500">Or near</span>
            <select
              value={districtCentres[origin.label] ? origin.label : ""}
              onChange={(e) => pickTown(e.target.value)}
              className="min-h-10 cursor-pointer bg-transparent font-semibold text-ink-900 outline-none"
            >
              <option value="" disabled>
                Pick a town
              </option>
              {Object.keys(districtCentres)
                .sort()
                .map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>
      <p className="mt-2 text-caption text-ink-500" aria-live="polite">
        {locate === "denied"
          ? "We couldn’t get your location. Pick a town instead, or allow location for this site."
          : "Your location stays in your browser. Bazar doesn’t save it."}
      </p>

      {/* Filters */}
      <div className="no-scrollbar -mx-4 mt-4 flex items-center gap-2 overflow-x-auto px-4 tablet:mx-0 tablet:flex-wrap tablet:px-0">
        {radii.map(({ km, label }) => (
          <button
            key={label}
            type="button"
            aria-pressed={radiusKm === km}
            onClick={() => setRadiusKm(km)}
            className={cn(
              "inline-flex min-h-9 shrink-0 items-center rounded-full px-3 text-caption font-semibold",
              radiusKm === km
                ? "bg-ink-900 text-white"
                : "bg-white text-ink-700 ring-1 ring-ink-100 hover:ring-ink-300",
            )}
          >
            {label}
          </button>
        ))}
        <span
          aria-hidden="true"
          className="mx-1 h-5 w-px shrink-0 bg-ink-300"
        />
        <button
          type="button"
          aria-pressed={openOnly}
          onClick={() => setOpenOnly((v) => !v)}
          className={cn(
            "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-caption font-semibold",
            openOnly
              ? "bg-leaf-700 text-white"
              : "bg-white text-ink-700 ring-1 ring-ink-100 hover:ring-ink-300",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-full",
              openOnly ? "bg-white" : "bg-leaf-700",
            )}
          />
          Open now
        </button>
        <label className="inline-flex min-h-9 shrink-0 items-center rounded-full bg-white px-3 text-caption font-semibold text-ink-700 ring-1 ring-ink-100">
          <span className="sr-only">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="cursor-pointer bg-transparent outline-none"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 desktop:grid-cols-[400px_1fr]">
        {/* Map first on phones, on the right on desktop */}
        <div className="relative isolate z-0 h-[44vh] min-h-[280px] overflow-hidden rounded-card ring-1 ring-ink-100 desktop:sticky desktop:top-20 desktop:order-2 desktop:h-[calc(100vh-7rem)]">
          <NearbyMap
            origin={origin}
            radiusKm={radiusKm}
            shops={shops}
            selected={selected}
            onSelect={selectFromMap}
          />
        </div>

        <section aria-labelledby="near-list-title" className="desktop:order-1">
          <div className="flex items-baseline justify-between gap-2">
            <h2 id="near-list-title" className="text-h2 text-ink-900">
              {radiusLabel}
            </h2>
            <p className="text-caption text-ink-500">
              {shops.length} {shops.length === 1 ? "business" : "businesses"} ·
              nearest first
            </p>
          </div>

          {shops.length > 0 ? (
            <ul
              ref={listRef}
              className="mt-3 flex flex-col gap-2 desktop:max-h-[calc(100vh-11rem)] desktop:overflow-y-auto desktop:pr-1"
            >
              {shops.map((shop) => (
                <li key={shop.slug} id={`near-${shop.slug}`}>
                  <Link
                    href={`/s/${shop.slug}`}
                    onMouseEnter={() => setSelected(shop.slug)}
                    onFocus={() => setSelected(shop.slug)}
                    className={cn(
                      "flex items-center gap-3 rounded-card bg-white p-3 ring-1 transition-shadow hover:shadow-e2",
                      selected === shop.slug
                        ? "ring-2 ring-ink-900"
                        : "ring-ink-100",
                    )}
                  >
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-button bg-ink-100">
                      <Photo name={shop.cover} alt="" sizes="64px" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1">
                        <span className="truncate font-heading text-h3 text-ink-900">
                          {shop.branch
                            ? `${shop.name} ${shop.branch}`
                            : shop.name}
                        </span>
                        {shop.verified ? (
                          <SealCheck
                            aria-label="Verified business"
                            className="size-4 shrink-0 text-lime-700"
                            weight="fill"
                          />
                        ) : null}
                      </span>
                      <span className="block truncate text-caption text-ink-500">
                        {shop.tag} · {shop.district} ·{" "}
                        <span className="font-semibold text-ink-900">
                          {formatDistance(shop.km)}
                        </span>
                      </span>
                      {!shop.claimed ? (
                        <span className="mt-1 inline-flex rounded-chip bg-ink-100 px-1.5 py-0.5 text-caption font-semibold text-ink-700">
                          Not on Bazar yet
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "mt-1 inline-flex rounded-chip px-1.5 py-0.5 text-caption font-semibold",
                            shop.openNow
                              ? "bg-leaf-50 text-leaf-700"
                              : "bg-ink-100 text-ink-700",
                          )}
                        >
                          {shop.openNow
                            ? `Open · closes ${shop.hours.close}`
                            : `Closed · opens ${shop.hours.open}`}
                        </span>
                      )}
                    </span>
                    {shop.claimed ? (
                      <span className="flex shrink-0 items-center gap-1 self-start text-caption font-semibold text-ink-900">
                        <Star
                          aria-hidden="true"
                          className="size-3.5 text-yellow-500"
                          weight="fill"
                        />
                        {shop.rating}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 rounded-card border border-dashed border-ink-300 bg-white p-6 text-center">
              <p className="text-body font-semibold text-ink-900">
                No businesses here yet
              </p>
              <p className="mt-1 text-body text-ink-700">
                Try a bigger distance
                {openOnly ? " or include closed shops" : ""}.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setRadiusKm(null)}
                  className="min-h-11 rounded-button bg-lime-400 px-4 text-body font-semibold text-ink-900 hover:bg-lime-300"
                >
                  Show any distance
                </button>
                {openOnly ? (
                  <button
                    type="button"
                    onClick={() => setOpenOnly(false)}
                    className="min-h-11 rounded-button bg-white px-4 text-body font-semibold text-ink-900 ring-1 ring-ink-300"
                  >
                    Include closed
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
