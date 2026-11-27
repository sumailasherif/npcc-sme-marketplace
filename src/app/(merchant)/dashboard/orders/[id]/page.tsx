import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Package } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { orders } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);
  if (!order) notFound();

  return (
    <div>
      <Link href="/dashboard/orders" className="text-caption text-ink-500">
        ← Orders
      </Link>
      <PageHeader
        title={order.id}
        description={`${order.customer} · ${order.district} · ${order.placedAt}`}
        actions={
          <Badge tone={order.status === "New" ? "coral" : "teal"}>
            {order.status}
          </Badge>
        }
      />

      <div className="mt-5 grid gap-4 desktop:grid-cols-[1.5fr_1fr]">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Items</h2>
          <ul className="mt-3 flex flex-col gap-2 text-body text-ink-700">
            <li className="flex justify-between gap-2">
              <span>2 × Gato patate</span>
              <span className="tabular-price">{formatPrice(500)}</span>
            </li>
            <li className="flex justify-between gap-2">
              <span>1 × Samosa (10)</span>
              <span className="tabular-price">{formatPrice(150)}</span>
            </li>
            <li className="flex justify-between gap-2 border-t border-ink-100 pt-2 font-semibold text-ink-900">
              <span>Total</span>
              <span className="tabular-price">{formatPrice(order.total)}</span>
            </li>
          </ul>
          <p className="mt-3 text-caption text-ink-500">
            Payment: {order.payment}. No escrow on shop orders.
          </p>
        </section>

        <aside className="rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Fulfilment</h2>
          <ul className="mt-3 flex flex-col gap-3 text-body text-ink-700">
            <li className="flex items-center gap-2">
              <Package aria-hidden="true" className="size-4 text-lime-700" />
              Confirm order
            </li>
            <li className="flex items-center gap-2">
              <Clock aria-hidden="true" className="size-4 text-ink-500" />
              Prepare
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 text-ink-500" />
              Deliver or pickup
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <button className="min-h-11 rounded-button bg-lime-400 text-body font-semibold text-ink-900">
              Confirm order
            </button>
            <button className="min-h-11 rounded-button border border-ink-300 bg-surface text-body font-semibold text-ink-700">
              Message customer
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
