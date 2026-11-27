import "server-only";

import { cookies } from "next/headers";

import type { CartItem } from "@/lib/cart";
import type { DeliveryMethod } from "@/lib/delivery-fees";

const COOKIE = "bazar_orders";
const MAX_ORDERS = 10;

export type PaymentMethod = "juice" | "cod";
export type { DeliveryMethod };

export type MarketOrder = {
  token: string;
  orderNo: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  buyer: { name: string; phone: string; address: string; note?: string };
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  status: "placed";
};

function decode(raw: string | undefined): MarketOrder[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function encode(orders: MarketOrder[]): string {
  return Buffer.from(
    JSON.stringify(orders.slice(0, MAX_ORDERS)),
    "utf8",
  ).toString("base64url");
}

export async function createOrder(input: {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  buyer: MarketOrder["buyer"];
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
}): Promise<MarketOrder> {
  const store = await cookies();
  const token = crypto.randomUUID().replaceAll("-", "").slice(0, 16);
  const order: MarketOrder = {
    token,
    orderNo: `GM-${String(1042 + Math.floor(Math.random() * 800)).padStart(4, "0")}`,
    createdAt: new Date().toISOString(),
    ...input,
    status: "placed",
  };

  const existing = decode(store.get(COOKIE)?.value);
  store.set(COOKIE, encode([order, ...existing]), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return order;
}

export async function getOrders(): Promise<MarketOrder[]> {
  const store = await cookies();
  return decode(store.get(COOKIE)?.value);
}

export async function getOrder(
  token: string,
): Promise<MarketOrder | undefined> {
  return (await getOrders()).find((order) => order.token === token);
}
