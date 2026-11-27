import { redirect } from "next/navigation";

import { MarketShell } from "@/components/market/market-shell";
import { Photo } from "@/components/ui/photo";
import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

import { CheckoutForm } from "./checkout-form";

export default async function CheckoutPage() {
  const cart = await getCart();
  if (cart.items.length === 0) redirect("/cart");

  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">Checkout</h1>
      <p className="mt-1 text-body text-ink-700">
        Two steps: details, then payment. No account needed.
      </p>

      <div className="mt-6 grid gap-6 desktop:grid-cols-[1.4fr_1fr]">
        <section className="rounded-card border border-ink-100 bg-surface p-4 tablet:p-6">
          <CheckoutForm
            subtotal={cart.subtotal}
            deliveryFee={cart.deliveryFee}
          />
        </section>

        <aside className="h-fit rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Your order</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {cart.items.map((item) => (
              <li key={item.slug} className="flex items-center gap-2">
                <span className="relative size-10 shrink-0 overflow-hidden rounded-button bg-ink-100">
                  <Photo name={item.photo} alt="" sizes="40px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-body font-semibold text-ink-900">
                    {item.name}
                  </span>
                  <span className="text-caption text-ink-500">
                    {item.qty} × {formatPrice(item.price)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 flex flex-col gap-2 border-t border-ink-100 pt-3 text-body">
            <div className="flex justify-between text-ink-700">
              <dt>Subtotal</dt>
              <dd className="tabular-price">{formatPrice(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink-700">
              <dt>Delivery</dt>
              <dd className="tabular-price">{formatPrice(cart.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between text-h3 text-ink-900">
              <dt>Total</dt>
              <dd className="tabular-price">{formatPrice(cart.total)}</dd>
            </div>
          </dl>
          <p className="mt-3 rounded-button bg-lime-50 p-3 text-caption text-lime-700">
            Shop orders are paid directly with Juice or cash on delivery.
            SafePay escrow is only for Pre-loved resale.
          </p>
        </aside>
      </div>
    </MarketShell>
  );
}
