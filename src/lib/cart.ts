import "server-only";

import { cookies } from "next/headers";

import { getPartner, getProduct } from "@/lib/catalog/queries";
import type { CartLine } from "@/lib/catalog/types";

const COOKIE = "bazar_cart";
const MAX_QTY = 20;

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  photo: string;
  shopSlug: string;
  shopName: string;
  district: string;
};

export type Cart = {
  items: CartItem[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
};

function decode(raw: string | undefined): CartLine[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is CartLine =>
          typeof line?.slug === "string" && Number.isInteger(line?.qty),
      )
      .map((line) => ({
        slug: line.slug,
        qty: Math.min(MAX_QTY, Math.max(1, line.qty)),
      }))
      .filter((line) => Boolean(getProduct(line.slug)));
  } catch {
    return [];
  }
}

function encode(lines: CartLine[]): string {
  return Buffer.from(JSON.stringify(lines), "utf8").toString("base64url");
}

export async function readCartLines(): Promise<CartLine[]> {
  const store = await cookies();
  return decode(store.get(COOKIE)?.value);
}

export async function writeCartLines(lines: CartLine[]): Promise<void> {
  const store = await cookies();
  const clean = lines
    .filter((line) => Boolean(getProduct(line.slug)))
    .map((line) => ({
      slug: line.slug,
      qty: Math.min(MAX_QTY, Math.max(1, line.qty)),
    }))
    .filter((line) => line.qty > 0);

  store.set(COOKIE, encode(clean), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getCart(): Promise<Cart> {
  const lines = await readCartLines();
  const items = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    if (!product) return [];
    const partner = getPartner(product.shopSlug);
    return [
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        qty: line.qty,
        photo: product.photo,
        shopSlug: product.shopSlug,
        shopName: partner?.name ?? "Bazar",
        district: partner?.district ?? "",
      },
    ];
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = items.length > 0 ? 50 : 0;

  return {
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

export async function getCartCount(): Promise<number> {
  const lines = await readCartLines();
  return lines.reduce((sum, line) => sum + line.qty, 0);
}
