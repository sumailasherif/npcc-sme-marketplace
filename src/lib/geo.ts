/** Location helpers for "Near you". Pure functions, safe on server and client. */

export type LatLng = { lat: number; lng: number };

/** Approximate town centres for the districts used in the demo data. */
export const districtCentres: Record<string, LatLng> = {
  "Port Louis": { lat: -20.1619, lng: 57.4989 },
  "Beau Bassin": { lat: -20.2258, lng: 57.4686 },
  "Rose Hill": { lat: -20.2401, lng: 57.4717 },
  "Quatre Bornes": { lat: -20.2654, lng: 57.4791 },
  Vacoas: { lat: -20.2981, lng: 57.4783 },
  Curepipe: { lat: -20.3163, lng: 57.5259 },
  Moka: { lat: -20.2192, lng: 57.4958 },
  "Grand Baie": { lat: -20.0182, lng: 57.5802 },
  Savanne: { lat: -20.5155, lng: 57.5194 },
  Trianon: { lat: -20.2486, lng: 57.4943 },
  "Beau Plan": { lat: -20.0975, lng: 57.5737 },
  Souillac: { lat: -20.5167, lng: 57.5167 },
};

/** Where the map starts before someone shares their location. */
export const defaultOrigin = {
  label: "Rose Hill",
  ...districtCentres["Rose Hill"],
};

/** Great-circle distance in kilometres. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** "450 m" under 1 km, otherwise "2.3 km". */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.max(50, Math.round((km * 1000) / 50) * 50)} m`;
  return `${km < 10 ? km.toFixed(1) : Math.round(km)} km`;
}

export type Hours = { open: string; close: string };

/** Minutes since midnight in Mauritius (UTC+4, no daylight saving). */
export function mauritiusMinutes(date: Date): number {
  return ((date.getUTCHours() + 4) % 24) * 60 + date.getUTCMinutes();
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function isOpen(hours: Hours, date: Date): boolean {
  const now = mauritiusMinutes(date);
  return now >= toMinutes(hours.open) && now < toMinutes(hours.close);
}

/**
 * A stable point near a district centre, so demo shops spread out instead of
 * stacking on one pin. Up to about 1.2 km away, same result every time.
 */
export function scatter(centre: LatLng, seed: string): LatLng {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const angle = ((hash % 360) * Math.PI) / 180;
  const km = 0.15 + ((hash >>> 9) % 1000) / 1000;
  return {
    lat: centre.lat + (km / 111) * Math.sin(angle),
    lng:
      centre.lng +
      (km / (111 * Math.cos((centre.lat * Math.PI) / 180))) * Math.cos(angle),
  };
}
