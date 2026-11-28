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
