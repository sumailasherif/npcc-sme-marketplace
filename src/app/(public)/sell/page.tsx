import Link from "next/link";
import {
  ArrowRight,
  Check,
  Storefront,
  UserCircle,
} from "@phosphor-icons/react/ssr";

import { MarketShell } from "@/components/market/market-shell";

export const metadata = { title: "Sell on Bazar" };

const business = [
  "Your own storefront and link, alongside Facebook, Instagram and WhatsApp",
  "Catalogue, stock, orders and invoices",
  "Juice or cash on delivery, paid out to your account",
  "AI assistant for listings, replies and your numbers",
];

const individual = [
  "Post an ad in minutes from your phone",
  "Chat and make offers inside Bazar",
  "SafePay holds the money until the buyer confirms",
  "ID checked once; buyers never see your documents",
];

export default function SellPage() {
  return (
    <MarketShell>
      <h1 className="text-h1 text-ink-900">How do you want to sell?</h1>
      <p className="mt-1 max-w-xl text-body-l text-ink-700">
        Businesses and individuals sell in different places on Bazar, with
        different tools and rules.
      </p>

      <div className="mt-6 grid gap-4 tablet:grid-cols-2">
        {/* Business: teal, recurring, catalogue */}
        <section
          aria-labelledby="business-title"
          className="flex flex-col rounded-card bg-white ring-2 ring-teal-500"
        >
          <div className="rounded-t-card bg-teal-700 p-5 text-white">
            <Storefront aria-hidden="true" className="size-7" />
            <p className="mt-3 text-caption font-semibold text-white/80">
              Bazar Business
            </p>
            <h2 id="business-title" className="text-h2">
              I run a business
            </h2>
            <p className="mt-1 text-body text-white/85">
              A shop, a home kitchen, a studio or a brand with products to sell
              again and again.
            </p>
          </div>
          <ul className="flex flex-1 flex-col gap-2 p-5">
            {business.map((item) => (
              <li key={item} className="flex gap-2 text-body text-ink-700">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-teal-500"
                  weight="bold"
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="p-5 pt-0">
            <Link
              href="/dashboard"
              className="flex min-h-11 items-center justify-center gap-2 rounded-button bg-teal-500 px-5 text-body font-semibold text-white hover:bg-teal-700"
            >
              Open your shop
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <p className="mt-2 text-center text-caption text-ink-500">
              Business details are checked before you go live.
            </p>
          </div>
        </section>

        {/* Individual: plum/leaf, one-off, second-hand */}
        <section
          aria-labelledby="individual-title"
          className="flex flex-col rounded-card bg-white ring-2 ring-plum-700"
        >
          <div className="rounded-t-card bg-plum-900 p-5 text-white">
            <UserCircle aria-hidden="true" className="size-7" />
            <p className="mt-3 text-caption font-semibold text-white/80">
              Bazar Pre-loved
            </p>
            <h2 id="individual-title" className="text-h2">
              I&apos;m selling my own things
            </h2>
            <p className="mt-1 text-body text-white/85">
              A phone, a desk, a bike or clothes you no longer use. One item at
              a time.
            </p>
          </div>
          <ul className="flex flex-1 flex-col gap-2 p-5">
            {individual.map((item) => (
              <li key={item} className="flex gap-2 text-body text-ink-700">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-leaf-700"
                  weight="bold"
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="p-5 pt-0">
            <Link
              href="/sell/verify"
              className="flex min-h-11 items-center justify-center gap-2 rounded-button bg-leaf-700 px-5 text-body font-semibold text-white hover:bg-plum-700"
            >
              Post an ad
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <p className="mt-2 text-center text-caption text-ink-500">
              Not for food, medicine, counterfeits or stock for resale.
            </p>
          </div>
        </section>
      </div>
    </MarketShell>
  );
}
