export type DeliveryMethod = "delivery" | "grabbit" | "pickup";

/** Flat Grabbit Express fee for the demo. Real quotes come from the partner API. */
export const GRABBIT_FEE = 75;

export function deliveryFeeFor(
  method: DeliveryMethod,
  shopFee: number,
): number {
  if (method === "pickup") return 0;
  if (method === "grabbit") return GRABBIT_FEE;
  return shopFee;
}

export const deliveryLabels: Record<DeliveryMethod, string> = {
  delivery: "Shop delivery",
  grabbit: "Grabbit Express",
  pickup: "Pickup",
};
