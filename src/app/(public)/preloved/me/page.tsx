import Link from "next/link";
import {
  ArrowRight,
  ChatCircle,
  IdentificationCard,
  Plus,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react/ssr";

import { PrelovedShell } from "@/components/preloved/preloved-shell";
import { Photo } from "@/components/ui/photo";
import {
  myListings,
  myPurchases,
  myThreads,
  wallet,
  type MyListingStatus,
  type PurchaseState,
} from "@/lib/demo/preloved";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "My Pre-loved" };

const listingStatus: Record<MyListingStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-leaf-700" },
  review: { label: "In review", dot: "bg-yellow-500" },
  sold: { label: "Sold", dot: "bg-ink-500" },
};

const purchaseStatus: Record<PurchaseState, { label: string; dot: string }> = {
  offer: { label: "Offer sent", dot: "bg-yellow-500" },
  held: { label: "In SafePay", dot: "bg-lime-400" },
  done: { label: "Completed", dot: "bg-leaf-700" },
};

function Dot({ label, dot }: { label: string; dot: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-ink-900">
      <span aria-hidden="true" className={cn("size-2 rounded-full", dot)} />
      {label}
    </span>
  );
}

export default function MyPrelovedPage() {
  const live = myListings.filter((l) => l.status === "live").length;
  const unread = myThreads.reduce((sum, t) => sum + t.unread, 0);

  return (
    <PrelovedShell active="me" search={false}>
      {/* Who you are here: a verified person, not a shop */}
      <section className="flex flex-wrap items-center gap-4">
        <span
          aria-hidden="true"
          className="grid size-14 place-items-center rounded-full bg-plum-100 font-heading text-h3 font-extrabold text-plum-900"
        >
          SS
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-h1 text-ink-900">My Pre-loved</h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-500">
            <span className="inline-flex items-center gap-1 font-semibold text-leaf-700">
              <IdentificationCard aria-hidden="true" className="size-4" />
              ID verified
            </span>
            <span className="inline-flex items-center gap-1">
              <Star
                aria-hidden="true"
                className="size-3.5 text-yellow-500"
                weight="fill"
              />
              4.9 from 7 deals
            </span>
            <span>Sherif S. · Rose Hill</span>
          </p>
        </div>
      </section>

      {/* Money and activity at a glance */}
      <section
        aria-label="Summary"
        className="mt-5 grid grid-cols-3 gap-3 desktop:grid-cols-4"
      >
        <Link
          href="/preloved/wallet"
          className="col-span-3 flex flex-col justify-between rounded-card bg-plum-900 p-4 text-white desktop:col-span-1"
        >
          <span className="flex items-center gap-1.5 text-caption text-white/75">
            <ShieldCheck aria-hidden="true" className="size-4" />
            SafePay balance
          </span>
          <span className="mt-2 font-heading text-[1.75rem] font-extrabold tabular-price">
            {formatPrice(wallet.available)}
          </span>
          <span className="mt-1 inline-flex items-center gap-1 text-caption font-semibold">
            Withdraw to Juice
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </span>
        </Link>
        <Stat label="Held for your sales" value={formatPrice(wallet.held)} />
        <Stat label="Live ads" value={String(live)} />
        <Stat label="Unread messages" value={String(unread)} />
      </section>

      <div className="mt-8 grid gap-8 desktop:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-8">
          {/* Selling */}
          <section aria-labelledby="selling-title">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 id="selling-title" className="text-h2 text-ink-900">
                Selling
              </h2>
              <Link
                href="/sell/new"
                className="inline-flex min-h-11 items-center gap-1 text-body font-semibold text-leaf-700 hover:underline"
              >
                <Plus aria-hidden="true" className="size-4" weight="bold" />
                Post an ad
              </Link>
            </div>
            <ul className="divide-y divide-ink-100 rounded-card bg-white ring-1 ring-ink-100">
              {myListings.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/preloved/${item.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-sand-50"
                  >
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-button bg-ink-100">
                      <Photo name={item.photo} alt="" sizes="64px" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body font-semibold text-ink-900">
                        {item.title}
                      </span>
                      <span className="block font-heading text-body font-bold tabular-price text-ink-900">
                        {formatPrice(item.price)}
                      </span>
                      <span className="block text-caption text-ink-500">
                        {item.status === "review"
                          ? "A person checks every ad before it goes live"
                          : `${item.views} views · ${item.offers} ${item.offers === 1 ? "offer" : "offers"} · posted ${item.posted}`}
                      </span>
                    </span>
                    <Dot {...listingStatus[item.status]} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Buying */}
          <section aria-labelledby="buying-title">
            <h2 id="buying-title" className="mb-3 text-h2 text-ink-900">
              Buying
            </h2>
            <ul className="divide-y divide-ink-100 rounded-card bg-white ring-1 ring-ink-100">
              {myPurchases.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={
                      item.state === "done"
                        ? `/preloved/${item.slug}`
                        : `/preloved/${item.slug}/deal`
                    }
                    className="flex items-center gap-3 p-3 hover:bg-sand-50"
                  >
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-button bg-ink-100">
                      <Photo name={item.photo} alt="" sizes="64px" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body font-semibold text-ink-900">
                        {item.title}
                        <span className="font-normal text-ink-500">
                          {" "}
                          · {item.seller}
                        </span>
                      </span>
                      <span className="block font-heading text-body font-bold tabular-price text-ink-900">
                        {formatPrice(item.amount)}
                      </span>
                      <span className="block text-caption text-ink-500">
                        {item.note}
                      </span>
                    </span>
                    <Dot {...purchaseStatus[item.state]} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Messages */}
        <section aria-labelledby="messages-title" id="messages">
          <h2 id="messages-title" className="mb-3 text-h2 text-ink-900">
            Messages
          </h2>
          <ul className="divide-y divide-ink-100 rounded-card bg-white ring-1 ring-ink-100">
            {myThreads.map((thread) => (
              <li key={`${thread.slug}-${thread.name}`}>
                <Link
                  href={`/preloved/${thread.slug}/deal`}
                  className="flex items-start gap-3 p-3 hover:bg-sand-50"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-plum-100 text-caption font-bold text-plum-900"
                  >
                    {thread.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-body font-semibold text-ink-900">
                        {thread.name}
                      </span>
                      <span className="shrink-0 text-caption text-ink-500">
                        {thread.time}
                      </span>
                    </span>
                    <span className="block truncate text-caption text-ink-500">
                      {thread.item}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 line-clamp-2 text-body",
                        thread.unread ? "text-ink-900" : "text-ink-700",
                      )}
                    >
                      {thread.last}
                    </span>
                  </span>
                  {thread.unread ? (
                    <span className="mt-1 grid min-w-5 place-items-center rounded-full bg-leaf-700 px-1 font-mono text-[11px] font-bold leading-5 text-white">
                      <span className="sr-only">Unread: </span>
                      {thread.unread}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-start gap-2 text-caption text-ink-500">
            <ChatCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Keep deals in Bazar chat. SafePay can only help with deals it can
            see.
          </p>
        </section>
      </div>
    </PrelovedShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card bg-white p-3 ring-1 ring-ink-100 tablet:p-4">
      <p className="text-caption text-ink-500">{label}</p>
      <p className="mt-2 font-heading text-h3 tabular-price text-ink-900 tablet:text-h1">
        {value}
      </p>
    </div>
  );
}
