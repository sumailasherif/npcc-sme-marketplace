import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Package,
  Sparkle,
  Warning,
} from "@phosphor-icons/react/ssr";

import { WeekBars } from "@/components/business/week-bars";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";
import { Table, Td } from "@/components/ui/table";
import { requireUser } from "@/lib/auth";
import { kpis, orders, weekRevenue } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";
import { getMyShop } from "@/lib/shops";

const statusTone = {
  New: "coral",
  Preparing: "yellow",
  Ready: "teal",
  Delivered: "green",
} as const;

export default async function DashboardHome() {
  const user = await requireUser();
  const shop = await getMyShop(user.id);
  if (!shop) redirect("/dashboard/onboarding");

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-caption text-ink-500">Tuesday 26 Nov</p>
          <h1 className="mt-1 text-h1 text-ink-900">
            Good morning, {shop.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-body text-ink-700">
            Here is what needs your attention today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="outline">Demo data</Badge>
          <Link
            href={`/s/${shop.slug}`}
            className="inline-flex min-h-11 items-center rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700"
          >
            Preview shop
          </Link>
        </div>
      </header>

      <section className="grid gap-3 tablet:grid-cols-2 desktop:grid-cols-4">
        {kpis.map((kpi) => (
          <Stat
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.note}
            tone={kpi.tone}
          />
        ))}
      </section>

      <div className="grid gap-4 desktop:grid-cols-[1.6fr_1fr]">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-body font-semibold text-teal-700"
            >
              See all
            </Link>
          </div>
          <div className="mt-3">
            <Table headers={["Order", "Customer", "Items", "Total", "Status"]}>
              {orders.slice(0, 4).map((order) => (
                <tr key={order.id}>
                  <Td>
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="font-semibold text-ink-900"
                    >
                      {order.id}
                    </Link>
                    <span className="block text-caption text-ink-500">
                      {order.placedAt}
                    </span>
                  </Td>
                  <Td>
                    <span className="block text-ink-900">{order.customer}</span>
                    <span className="block text-caption text-ink-500">
                      {order.district}
                    </span>
                  </Td>
                  <Td className="tabular-price">{order.items}</Td>
                  <Td className="tabular-price">{formatPrice(order.total)}</Td>
                  <Td>
                    <Badge tone={statusTone[order.status]}>
                      {order.status}
                    </Badge>
                  </Td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <aside className="rounded-card border border-teal-100 bg-[#f7fcfc] p-4">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-teal-50 text-teal-700">
              <Sparkle aria-hidden="true" className="size-5" weight="fill" />
            </span>
            <div>
              <h2 className="text-h3 text-ink-900">Morning brief</h2>
              <p className="text-caption text-ink-500">
                3 things worth your time
              </p>
            </div>
          </div>

          <ul className="mt-3 flex flex-col divide-y divide-teal-100">
            <li className="flex items-center gap-2 py-2">
              <Clock aria-hidden="true" className="size-4 text-coral-700" />
              <span className="flex-1 text-body text-ink-900">
                Confirm 2 orders before 10:00
              </span>
              <Link
                href="/dashboard/orders"
                className="text-caption font-semibold text-teal-700"
              >
                Open
              </Link>
            </li>
            <li className="flex items-center gap-2 py-2">
              <Package aria-hidden="true" className="size-4 text-yellow-500" />
              <span className="flex-1 text-body text-ink-900">
                Samosa sells out on Fridays
              </span>
              <Link
                href="/dashboard/analytics"
                className="text-caption font-semibold text-teal-700"
              >
                See
              </Link>
            </li>
            <li className="flex items-center gap-2 py-2">
              <Sparkle aria-hidden="true" className="size-4 text-teal-700" />
              <span className="flex-1 text-body text-ink-900">
                Invoice GM-0039 is ready
              </span>
              <Link
                href="/dashboard/invoices"
                className="text-caption font-semibold text-teal-700"
              >
                Review
              </Link>
            </li>
          </ul>
          <p className="mt-2 text-caption text-ink-500">
            Every draft waits for your approval.
          </p>
        </aside>
      </div>

      <div className="grid gap-4 desktop:grid-cols-2">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">This week</h2>
            <Link
              href="/dashboard/analytics"
              className="text-body font-semibold text-teal-700"
            >
              Analytics
            </Link>
          </div>
          <WeekBars data={weekRevenue} className="mt-3" />
          <p className="mt-2 text-caption text-ink-500">
            Friday is consistently your best day. Stock up on samosa.
          </p>
        </section>

        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">Needs attention</h2>
            <Link
              href="/dashboard/inventory"
              className="text-body font-semibold text-teal-700"
            >
              Open
            </Link>
          </div>
          <ul className="mt-3 flex flex-col gap-3 text-body">
            <li className="flex gap-2">
              <Warning
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-coral-700"
              />
              <span>
                <span className="block font-semibold text-ink-900">
                  2 orders not confirmed
                </span>
                <span className="block text-caption text-ink-500">
                  Response score drops after 30 minutes.
                </span>
              </span>
            </li>
            <li className="flex gap-2">
              <Package
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-yellow-500"
              />
              <span>
                <span className="block font-semibold text-ink-900">
                  4 products low on stock
                </span>
                <span className="block text-caption text-ink-500">
                  Samosa, gato coco and fresh bread.
                </span>
              </span>
            </li>
          </ul>
          <Link
            href="/dashboard/products"
            className="mt-4 inline-flex min-h-11 items-center gap-1 text-body font-semibold text-teal-700"
          >
            Manage products <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
