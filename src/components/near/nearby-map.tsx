"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import L from "leaflet";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import type { NearbyShop } from "@/components/near/nearby-explorer";
import type { LatLng } from "@/lib/geo";
import { darkTiles, pinColor } from "@/lib/catalog/pin-colors";
import { formatDistance } from "@/lib/geo";

const zoomForRadius = (km: number | null) =>
  km === null ? 11 : km <= 1 ? 15 : km <= 2 ? 14 : km <= 5 ? 13 : 12;

/** Keeps the map centred on the origin when it or the radius changes. */
function Recenter({
  origin,
  radiusKm,
}: {
  origin: LatLng;
  radiusKm: number | null;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView([origin.lat, origin.lng], zoomForRadius(radiusKm));
  }, [map, origin.lat, origin.lng, radiusKm]);
  return null;
}

function pinIcon(cover: string, color: string, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<span class="near-pin${active ? " is-active" : ""}" style="--pin:${color}"><img src="/photos/${cover}.jpg" alt="" /></span>`,
    iconSize: active ? [52, 52] : [40, 40],
    iconAnchor: active ? [26, 26] : [20, 20],
    popupAnchor: [0, active ? -26 : -20],
  });
}

/** Leaflet on a dark OpenStreetMap basemap with bright category pins. Browser only. */
export default function NearbyMap({
  origin,
  radiusKm,
  shops,
  selected,
  onSelect,
  interactive = true,
}: {
  origin: LatLng;
  radiusKm: number | null;
  shops: NearbyShop[];
  selected: string | null;
  onSelect: (slug: string) => void;
  /** false for previews: no dragging, zoom buttons or popups. */
  interactive?: boolean;
}) {
  const icons = useMemo(
    () =>
      new Map(
        shops.map((shop) => [
          shop.slug,
          pinIcon(
            shop.cover,
            pinColor(shop.categories[0]),
            shop.slug === selected,
          ),
        ]),
      ),
    [shops, selected],
  );

  return (
    <MapContainer
      center={[origin.lat, origin.lng]}
      zoom={zoomForRadius(radiusKm)}
      scrollWheelZoom={false}
      dragging={interactive}
      zoomControl={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      keyboard={interactive}
      attributionControl={interactive}
      className="near-map size-full"
    >
      <TileLayer attribution={darkTiles.attribution} url={darkTiles.url} />
      <Recenter origin={origin} radiusKm={radiusKm} />
      {radiusKm !== null ? (
        <Circle
          center={[origin.lat, origin.lng]}
          radius={radiusKm * 1000}
          pathOptions={{
            color: "#d4f53c",
            weight: 1.5,
            dashArray: "4 6",
            fillColor: "#d4f53c",
            fillOpacity: 0.06,
          }}
        />
      ) : null}
      <CircleMarker
        center={[origin.lat, origin.lng]}
        radius={8}
        pathOptions={{
          color: "#0e0e0c",
          weight: 3,
          fillColor: "#d4f53c",
          fillOpacity: 1,
          className: "near-me",
        }}
      />
      {shops.map((shop) => (
        <Marker
          key={shop.slug}
          position={[shop.location.lat, shop.location.lng]}
          icon={icons.get(shop.slug)}
          title={shop.name}
          alt={shop.name}
          zIndexOffset={shop.slug === selected ? 1000 : 0}
          interactive={interactive}
          keyboard={interactive}
          eventHandlers={{ click: () => onSelect(shop.slug) }}
        >
          {interactive ? (
            <Popup>
              <span className="block font-heading text-body font-bold text-ink-900">
                {shop.name}
              </span>
              <span className="block text-caption text-ink-500">
                {shop.tag} · {formatDistance(shop.km)}
              </span>
              <Link
                href={`/s/${shop.slug}`}
                className="mt-1 inline-block text-caption font-semibold text-lime-700"
              >
                View shop
              </Link>
            </Popup>
          ) : null}
        </Marker>
      ))}
    </MapContainer>
  );
}
