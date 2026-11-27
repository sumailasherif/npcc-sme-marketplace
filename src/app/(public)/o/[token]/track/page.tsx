import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Lightning,
  MapPin,
  Phone,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";
import { tracking } from "@/lib/demo/delivery";
import { deliveryLabels } from "@/lib/delivery-fees";
import { formatPrice } from "@/lib/format";
import { getOrder } from "@/lib/orders";

const steps = [
  {
    title: "Order confirmed",
    detail: "The shop is preparing your parcel",
    state: "done",
  },
  {
    title: "Collected by Grabbit Express",
    detail: "Rider assigned · EV scooter",
    state: "active",
  },
  {
    title: "On the way to you",
    detail: "Live tracking · ETA 25 min",
    state: "next",
  },
  {
    title: "Delivered",
    detail: "Ask for the rider's name before paying",
    state: "next",
  },
] as const;

export default async function OrderTrackPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const order = await getOrder((await params).token);
  if (!order) notFound();

  const shop = order.items[0]?.shopName ?? "the shop";

  return (
    <MarketShell>
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/o/${order.token}`}
          className="inline-flex min-h-11 items-center gap-1 text-caption font-semibold text-ink-700"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {order.orderNo}
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-h1 text-ink-900">On the way</h1>
            <p className="mt-1 text-body text-ink-700">
              {deliveryLabels[order.deliveryMethod]} · {shop}
            </p>
          </div>
          <span className="rounded-full bg-lime-50 px-3 py-1.5 text-caption font-semibold text-lime-700">
            Live
          </span>
        </div>

        <div className="relative mt-4 h-44 overflow-hidden rounded-card bg-lime-50">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(#cfe8e4 1px, transparent 1px), linear-gradient(90deg, #cfe8e4 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute left-[18%] top-[66%] h-1 w-[58%] -rotate-12 rounded-full bg-lime-400" />
          <div className="absolute left-[58%] top-[40%] grid size-10 place-items-center rounded-full bg-ink-900 text-yellow-500 shadow-[0_0_0_8px_rgba(20,120,120,0.12)]">
            <Lightning aria-hidden="true" className="size-5" weight="fill" />
          </div>
          <div className="absolute right-[16%] top-[24%] grid size-8 place-items-center rounded-full bg-white text-lime-700 shadow">
            <MapPin aria-hidden="true" className="size-4" weight="fill" />
          </div>
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-caption font-semibold text-ink-900 shadow-sm">
            <Lightning
              aria-hidden="true"
              className="size-3.5 text-lime-700"
              weight="fill"
            />
            Grabbit Express · 25 min away
          </span>
        </div>

        <section className="mt-4 rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-lime-50 text-body font-bold text-lime-700">
              RK
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body font-semibold text-ink-900">
                Ravi K. · Grabbit Express
              </p>
              <p className="text-caption text-ink-500">
                EV scooter · 4.9 ★ · 612 deliveries
              </p>
            </div>
            <a
              href="tel:+23050000000"
              aria-label="Call the rider"
              className="grid size-11 place-items-center rounded-full border border-ink-100 bg-surface text-ink-700"
            >
              <Phone aria-hidden="true" className="size-5" />
            </a>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-button bg-ink-900 px-4 py-3 text-white">
            <div>
              <p className="text-caption text-white/60">
                Give this code at the door
              </p>
              <p className="font-heading text-h2 tracking-[0.35em]">4 8 2 1</p>
            </div>
            <ShieldCheck
              aria-label="Private code"
              className="size-6 shrink-0 text-lime-400"
              weight="fill"
            />
          </div>

          <ol className="mt-4 flex flex-col">
            {steps.map((step) => (
              <li key={step.title} className="flex gap-3 py-2">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 size-3 shrink-0 rounded-full ${
                    step.state === "done"
                      ? "bg-ink-900"
                      : step.state === "active"
                        ? "border-2 border-ink-900 bg-white"
                        : "border-2 border-ink-300 bg-white"
                  }`}
                />
                <span>
                  <span
                    className={
                      step.state === "next"
                        ? "block text-body text-ink-500"
                        : "block text-body font-semibold text-ink-900"
                    }
                  >
                    {step.title}
                  </span>
                  <span className="block text-caption text-ink-500">
                    {step.detail}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-4 rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Delivery details</h2>
          <dl className="mt-3 flex flex-col gap-2 text-body">
            <div className="flex justify-between gap-2">
              <dt className="text-ink-500">Deliver to</dt>
              <dd className="text-right font-semibold text-ink-900">
                {order.buyer.address}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-ink-500">Fee</dt>
              <dd className="tabular-price font-semibold text-ink-900">
                {formatPrice(order.deliveryFee)}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-ink-500">Payment</dt>
              <dd className="font-semibold text-ink-900">
                {order.paymentMethod === "juice"
                  ? "Paid with Juice"
                  : "Cash on delivery"}
              </dd>
            </div>
          </dl>
          <Link
            href={`/track/${tracking.id}/${tracking.code}`}
            className="mt-3 inline-flex min-h-11 items-center gap-1 text-body font-semibold text-lime-700"
          >
            Open the public tracking link
          </Link>
        </section>

        <p className="mt-4 rounded-card border border-[#f0e0b0] bg-[#fff8e6] p-3 text-caption leading-relaxed text-[#6b5b2a]">
          Share the door code only with the rider when the parcel arrives. Never
          send it in chat.
        </p>
      </div>
    </MarketShell>
  );
}
