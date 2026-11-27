import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Clock, MapPin, Receipt } from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { Photo } from "@/components/ui/photo";
import { deliveryLabels } from "@/lib/delivery-fees";
import { formatPrice } from "@/lib/format";
import { getOrder } from "@/lib/orders";

const steps = ["Placed", "Confirmed", "Preparing", "Delivered"] as const;

export default async function OrderPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const order = await getOrder((await params).token);
  if (!order) notFound();

  const paid = order.paymentMethod === "juice";

  return (
    <MarketShell>
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <span className="grid size-16 place-items-center rounded-full bg-success-500 text-white">
            <CheckCircle aria-hidden="true" className="size-8" weight="fill" />
          </span>
          <h1 className="mt-4 text-h1 text-ink-900">Order placed</h1>
          <p className="mt-1 text-body text-ink-700">
            The shop has 30 minutes to confirm.
          </p>
        </div>

        <div className="mt-6 rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-caption text-ink-500">Order</p>
              <p className="text-h3 tabular-price text-ink-900">
                {order.orderNo}
              </p>
            </div>
            <span className="rounded-full bg-lime-100 px-3 py-1 text-caption font-semibold text-lime-700">
              Placed
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {order.items.map((item) => (
              <div key={item.slug} className="flex items-center gap-2">
                <span className="relative size-10 shrink-0 overflow-hidden rounded-button bg-ink-100">
                  <Photo name={item.photo} alt="" sizes="40px" />
                </span>
                <span className="min-w-0 flex-1 text-body text-ink-900">
                  {item.qty} × {item.name}
                </span>
                <span className="text-body tabular-price text-ink-700">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <dl className="mt-4 flex flex-col gap-2 border-t border-ink-100 pt-3 text-body">
            <div className="flex justify-between text-ink-700">
              <dt>Subtotal</dt>
              <dd className="tabular-price">{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink-700">
              <dt>{deliveryLabels[order.deliveryMethod]}</dt>
              <dd className="tabular-price">
                {formatPrice(order.deliveryFee)}
              </dd>
            </div>
            <div className="flex justify-between text-h3 text-ink-900">
              <dt>Total</dt>
              <dd className="tabular-price">{formatPrice(order.total)}</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-start gap-2 rounded-button bg-lime-50 p-3 text-body text-lime-700">
            <Receipt aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p>
              {paid
                ? "Paid with Juice. No cash needed at the door."
                : "Cash on delivery. Keep the exact amount if you can."}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Progress</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`grid size-7 place-items-center rounded-full text-caption font-bold ${
                    index === 0
                      ? "bg-lime-400 text-ink-900"
                      : "bg-ink-100 text-ink-500"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={
                    index === 0
                      ? "text-body font-semibold text-ink-900"
                      : "text-body text-ink-500"
                  }
                >
                  {step}
                </span>
                {index === 0 ? (
                  <span className="ml-auto inline-flex items-center gap-1 text-caption text-lime-700">
                    <Clock aria-hidden="true" className="size-3" />
                    now
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Deliver to</h2>
          <p className="mt-2 flex items-start gap-2 text-body text-ink-700">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {order.buyer.name}
              <br />
              {order.buyer.address}
              <br />
              {order.buyer.phone}
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {order.deliveryMethod !== "pickup" ? (
            <Link
              href={`/o/${order.token}/track`}
              className="inline-flex min-h-11 items-center rounded-button bg-lime-400 px-4 text-body font-semibold text-ink-900"
            >
              Track delivery
            </Link>
          ) : null}
          <Link
            href="/account"
            className="inline-flex min-h-11 items-center rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700"
          >
            My orders
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700"
          >
            Keep browsing
          </Link>
        </div>
      </div>
    </MarketShell>
  );
}
