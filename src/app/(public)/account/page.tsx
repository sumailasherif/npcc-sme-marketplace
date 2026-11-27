import Link from "next/link";
import {
  ArrowRight,
  Receipt,
  Storefront,
  User,
  UserCircle,
} from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { formatDate, formatPrice } from "@/lib/format";
import { getOrders } from "@/lib/orders";

export default async function AccountPage() {
  const orders = await getOrders();

  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">Account</h1>

      <section className="mt-4 flex items-center gap-3 rounded-card border border-ink-100 bg-surface p-4">
        <span className="grid size-12 place-items-center rounded-full bg-teal-50 text-teal-700">
          <User aria-hidden="true" className="size-6" />
        </span>
        <div>
          <p className="text-body font-semibold text-ink-900">Sherif S.</p>
          <p className="text-caption text-ink-500">Rose Hill · English</p>
        </div>
      </section>

      {/* Two separate spaces: a business shop and personal second-hand */}
      <section
        aria-label="Your spaces"
        className="mt-4 grid gap-3 tablet:grid-cols-2"
      >
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 rounded-card bg-white p-4 ring-1 ring-ink-100 hover:ring-teal-500"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-button bg-teal-700 text-white">
            <Storefront aria-hidden="true" className="size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-caption font-semibold text-teal-700">
              Bazar Business
            </span>
            <span className="block text-body font-semibold text-ink-900">
              Your shop dashboard
            </span>
            <span className="block text-caption text-ink-500">
              Catalogue, orders, invoices and AI assistant
            </span>
          </span>
          <ArrowRight aria-hidden="true" className="size-5 text-ink-500" />
        </Link>
        <Link
          href="/preloved/me"
          className="group flex items-center gap-3 rounded-card bg-white p-4 ring-1 ring-ink-100 hover:ring-plum-700"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-button bg-plum-900 text-white">
            <UserCircle aria-hidden="true" className="size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-caption font-semibold text-leaf-700">
              Bazar Pre-loved
            </span>
            <span className="block text-body font-semibold text-ink-900">
              My Pre-loved
            </span>
            <span className="block text-caption text-ink-500">
              Your ads, offers, messages and SafePay
            </span>
          </span>
          <ArrowRight aria-hidden="true" className="size-5 text-ink-500" />
        </Link>
      </section>

      <section aria-labelledby="orders-title" className="mt-6">
        <h2 id="orders-title" className="text-h2 text-ink-900">
          Orders from shops
        </h2>

        {orders.length === 0 ? (
          <div className="mt-3 rounded-card border border-dashed border-ink-300 bg-surface p-8 text-center">
            <Receipt
              aria-hidden="true"
              className="mx-auto size-8 text-ink-500"
            />
            <p className="mt-2 text-body font-semibold text-ink-900">
              No orders yet
            </p>
            <p className="mt-1 text-body text-ink-700">
              Your first order will appear here with its receipt.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex min-h-11 items-center rounded-button bg-teal-500 px-4 text-body font-semibold text-white"
            >
              Browse shops
            </Link>
          </div>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {orders.map((order) => (
              <li key={order.token}>
                <Link
                  href={`/o/${order.token}`}
                  className="flex items-center justify-between gap-3 rounded-card border border-ink-100 bg-surface p-4 hover:border-teal-500"
                >
                  <span>
                    <span className="block text-body font-semibold text-ink-900">
                      {order.orderNo}
                    </span>
                    <span className="text-caption text-ink-500">
                      {formatDate(order.createdAt)} · {order.items.length} items
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-body font-bold tabular-price text-ink-900">
                      {formatPrice(order.total)}
                    </span>
                    <span className="text-caption text-teal-700">
                      {order.paymentMethod === "juice"
                        ? "Juice"
                        : "Cash on delivery"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 grid gap-2 tablet:grid-cols-2">
        <Link
          href="/for-you"
          className="rounded-card border border-ink-100 bg-surface p-4 text-body font-semibold text-ink-900 hover:border-teal-500"
        >
          For you
        </Link>
        <Link
          href="/saved"
          className="rounded-card border border-ink-100 bg-surface p-4 text-body font-semibold text-ink-900 hover:border-teal-500"
        >
          Saved
        </Link>
      </section>
    </MarketShell>
  );
}
