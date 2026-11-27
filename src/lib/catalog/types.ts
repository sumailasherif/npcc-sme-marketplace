import type { Hours, LatLng } from "@/lib/geo";

export type Category = {
  slug: string;
  name: string;
  kreol: string;
  photo: string;
  icon: string;
  color: "teal" | "coral" | "yellow" | "green" | "ink";
};

export type Partner = {
  slug: string;
  name: string;
  logo: string;
  categories: string[];
  district: string;
  rating: number;
  reviews: number;
  distance: string;
  tag: string;
  open: string;
  verified: boolean;
  cover: string;
  /** One line about the business, shown on featured storefronts. */
  tagline?: string;
  /** Channels the shop already sells on; Bazar links them together. */
  socials?: Social[];
  /**
   * false for real businesses listed from public facts (name, category,
   * town) that have not joined Bazar. They show no rating, photos or
   * products, and invite the owner to claim the listing.
   */
  claimed: boolean;
  /** Branch or site, e.g. "Cathedral Square". */
  branch?: string;
  /** Map position. Demo: scattered around the district centre. */
  location: LatLng;
  /** Opening hours, Mauritius time. */
  hours: Hours;
  /** What the business stands for; drives "Shop by what matters". */
  values: Value[];
};

export type Social = "instagram" | "facebook" | "whatsapp";

export type Value =
  | "made-in-mauritius"
  | "woman-led"
  | "handmade"
  | "home-based"
  | "family"
  | "young"
  | "less-plastic";

export type Product = {
  slug: string;
  name: string;
  shopSlug: string;
  price: number;
  note: string;
  photo: string;
  category: string;
  /** Set for bookings (hotels, car rental): the price is per night or day. */
  unit?: "night" | "day";
};

export type CartLine = { slug: string; qty: number };

export type PaymentMethod = "safepay" | "juice" | "cod";
export type DeliveryMethod = "delivery" | "pickup";
export type EscrowState = "held" | "pending" | "released" | "refunded";
export type OrderStatus = "placed" | "confirmed" | "delivered";

export type OrderItem = {
  slug: string;
  name: string;
  shopSlug: string;
  shopName: string;
  price: number;
  qty: number;
  photo: string;
};

export type Order = {
  token: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  buyer: { name: string; phone: string; address: string; note?: string };
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  escrow: EscrowState;
  status: OrderStatus;
};
