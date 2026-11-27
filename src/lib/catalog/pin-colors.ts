/**
 * Bright pin colours per category, for the dark map only (never for text on
 * cream). Each one stands out against the near-black basemap.
 */
export const pinColors: Record<string, string> = {
  restaurants: "#ff7a59",
  groceries: "#34d399",
  hotels: "#38bdf8",
  "car-rental": "#a78bfa",
  malls: "#fbbf24",
  electronics: "#d4f53c",
  beauty: "#f472b6",
  "home-living": "#2dd4bf",
  cakes: "#fb923c",
  flowers: "#fb7185",
  kids: "#facc15",
  fashion: "#c084fc",
  crafts: "#f59e0b",
};

export function pinColor(category: string | undefined): string {
  return (category && pinColors[category]) || "#d4f53c";
}

/**
 * OpenStreetMap tiles (the spec's provider, no key needed). The dark look
 * comes from a CSS filter on the tile layer (see .near-map in globals.css).
 */
export const darkTiles = {
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
