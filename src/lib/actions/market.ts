"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getCart, readCartLines, writeCartLines } from "@/lib/cart";
import { getProduct } from "@/lib/catalog/queries";
import { deliveryFeeFor } from "@/lib/delivery-fees";
import { createOrder } from "@/lib/orders";

export async function addToCart(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") ?? "");
  const qty = Number(formData.get("qty") ?? 1);
  if (!getProduct(slug) || !Number.isFinite(qty)) return;

  const lines = await readCartLines();
  const existing = lines.find((line) => line.slug === slug);
  if (existing) {
    existing.qty = Math.min(20, existing.qty + Math.max(1, qty));
  } else {
    lines.push({ slug, qty: Math.max(1, Math.min(20, qty)) });
  }
  await writeCartLines(lines);
  revalidatePath("/cart");
  revalidatePath("/p/[slug]");
}

export async function setCartQty(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") ?? "");
  const qty = Number(formData.get("qty") ?? 0);
  if (!getProduct(slug) || !Number.isFinite(qty)) return;

  const lines = (await readCartLines())
    .map((line) => (line.slug === slug ? { ...line, qty } : line))
    .filter((line) => line.qty > 0);
  await writeCartLines(lines);
  revalidatePath("/cart");
}

export async function removeFromCart(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") ?? "");
  const lines = (await readCartLines()).filter((line) => line.slug !== slug);
  await writeCartLines(lines);
  revalidatePath("/cart");
}

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^5\d{7}$/, "phone"),
  address: z.string().trim().min(5, "address").max(200),
  note: z.string().trim().max(200).optional(),
  deliveryMethod: z.enum(["delivery", "grabbit", "pickup"]),
  paymentMethod: z.enum(["juice", "cod"]),
});

export type CheckoutState = {
  errors?: Record<string, string>;
  formError?: string;
};

export async function placeOrder(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const parsed = checkoutSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    note: formData.get("note") || undefined,
    deliveryMethod: formData.get("deliveryMethod"),
    paymentMethod: formData.get("paymentMethod"),
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] ??= issue.message;
    }
    return { errors };
  }

  const cart = await getCart();
  if (cart.items.length === 0) return { formError: "empty" };

  const deliveryFee = deliveryFeeFor(
    parsed.data.deliveryMethod,
    cart.deliveryFee,
  );
  const order = await createOrder({
    items: cart.items,
    subtotal: cart.subtotal,
    deliveryFee,
    total: cart.subtotal + deliveryFee,
    buyer: {
      name: parsed.data.name,
      phone: `+230${parsed.data.phone}`,
      address: parsed.data.address,
      note: parsed.data.note,
    },
    deliveryMethod: parsed.data.deliveryMethod,
    paymentMethod: parsed.data.paymentMethod,
  });

  await writeCartLines([]);
  redirect(`/o/${order.token}`);
}
