/** Mauritius districts plus Rodrigues. Values match the database enum. */
export const districts = [
  "port_louis",
  "pamplemousses",
  "riviere_du_rempart",
  "flacq",
  "grand_port",
  "savanne",
  "black_river",
  "plaines_wilhems",
  "moka",
  "rodrigues",
] as const;

export type District = (typeof districts)[number];

export const DISTRICT_LABELS: Record<District, string> = {
  port_louis: "Port Louis",
  pamplemousses: "Pamplemousses",
  riviere_du_rempart: "Rivière du Rempart",
  flacq: "Flacq",
  grand_port: "Grand Port",
  savanne: "Savanne",
  black_river: "Black River",
  plaines_wilhems: "Plaines Wilhems",
  moka: "Moka",
  rodrigues: "Rodrigues",
};
