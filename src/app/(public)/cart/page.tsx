import Link from "next/link";
import { Trash } from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { Photo } from "@/components/ui/photo";
import { removeFromCart, setCartQty } from "@/lib/actions/market";
import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default async function CartPage() {
  const cart = await getCart();

  if (cart.items.length === 0) {
    return (
      <MarketShell>
        <div className="mx-auto max-w-lg rounded-card border border-dashed border-ink-300 bg-surface p-10 text-center">
          <h1 className="text-h2 text-ink-900">Your cart is empty</h1>
          <p className="mt-2 text-body text-ink-700">
            Add something from a shop or browse a category to get started.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex min-h-11 items-center rounded-button bg-lime-400 px-5 text-body font-semibold text-ink-900"
          >
            Browse shops
          </Link>
        </div>
      </MarketShell>
    );
  }

  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">Your cart</h1>
      <p className="mt-1 text-body text-ink-700">
        {cart.count} item{cart.count === 1 ? "" : "s"} from local shops
      </p>

      <div className="mt-6 grid gap-6 desktop:grid-cols-[1.4fr_1fr]">
        <ul className="flex flex-col gap-2">
          {cart.items.map((item) => (
            <li
              key={item.slug}
              className="flex items-center gap-3 rounded-card border border-ink-100 bg-surface p-3"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-button bg-ink-100">
                <Photo name={item.photo} alt={item.name} sizes="64px" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-body font-semibold text-ink-900">
                  {item.name}
                </p>
                <p className="text-caption text-ink-500">
                  {item.shopName} · {item.district}
                </p>
                <p className="mt-1 text-body font-bold tabular-price text-ink-900">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <form action={setCartQty}>
                  <input type="hidden" name="slug" value={item.slug} />
                  <input type="hidden" name="qty" value={item.qty - 1} />
                  <button
                    type="submit"
                    aria-label={`Decrease ${item.name}`}
                    className="grid size-9 place-items-center rounded-full border border-ink-300 text-body"
                  >
                    −
                  </button>
                </form>
                <span className="min-w-6 text-center text-body font-semibold tabular-price">
                  {item.qty}
                </span>
                <form action={setCartQty}>
                  <input type="hidden" name="slug" value={item.slug} />
                  <input type="hidden" name="qty" value={item.qty + 1} />
                  <button
                    type="submit"
                    aria-label={`Increase ${item.name}`}
                    className="grid size-9 place-items-center rounded-full border border-ink-300 text-body"
                  >
                    +
                  </button>
                </form>
                <form action={removeFromCart}>
                  <input type="hidden" name="slug" value={item.slug} />
                  <button
                    type="submit"
                    aria-label={`Remove ${item.name}`}
                    className="grid size-9 place-items-center rounded-full text-ink-500 hover:bg-ink-100"
                  >
                    <Trash aria-hidden="true" className="size-4" />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Summary</h2>
          <dl className="mt-3 flex flex-col gap-2 text-body">
            <div className="flex justify-between text-ink-700">
              <dt>Subtotal</dt>
              <dd className="tabular-price">{formatPrice(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink-700">
              <dt>Delivery</dt>
              <dd className="tabular-price">{formatPrice(cart.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink-100 pt-2 text-h3 text-ink-900">
              <dt>Total</dt>
              <dd className="tabular-price">{formatPrice(cart.total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-4 flex min-h-11 items-center justify-center rounded-button bg-ink-900 px-4 text-body font-semibold text-white hover:bg-ink-800"
          >
            Checkout
          </Link>
          <p className="mt-2 text-caption text-ink-500">
            Juice or cash on delivery. No escrow on shop orders.
          </p>
        </aside>
      </div>
    </MarketShell>
  );
}
