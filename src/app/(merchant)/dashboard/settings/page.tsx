import Link from "next/link";
import {
  Clock,
  Gear,
  ShieldCheck,
  Sparkle,
  Storefront,
  Wallet,
} from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { business } from "@/lib/demo/business";

const rows = [
  {
    icon: Storefront,
    title: "Shop profile",
    detail: "Name, logo, cover, description",
    href: "/dashboard/onboarding",
  },
  {
    icon: Clock,
    title: "Opening hours",
    detail: "Mon–Sat · 07:00–18:00",
  },
  {
    icon: Wallet,
    title: "Delivery & fees",
    detail: "Rose Hill Rs 50 · pickup free",
  },
  {
    icon: Sparkle,
    title: "AI permissions",
    detail: "Listings on · replies on · invoices on",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    detail: "ID, address and phone confirmed",
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Shop" title="Settings" />

      <div className="mt-4 flex items-center gap-3 rounded-card border border-ink-100 bg-surface p-4">
        <span className="grid size-12 place-items-center rounded-full bg-lime-50 text-body font-bold text-lime-700">
          GM
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-body font-semibold text-ink-900">
            {business.name}
          </p>
          <p className="text-caption text-ink-500">
            {business.district} · {business.category}
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            <Badge tone="green">Verified</Badge>
            <Badge tone="outline">/s/{business.slug}</Badge>
          </div>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {rows.map(({ icon: Icon, title, detail, href }) => (
          <li key={title}>
            <Link
              href={href ?? "/dashboard/settings"}
              className="flex items-center gap-3 rounded-card border border-ink-100 bg-surface p-3 hover:border-ink-900"
            >
              <Icon aria-hidden="true" className="size-5 text-ink-500" />
              <span className="min-w-0 flex-1">
                <span className="block text-body font-semibold text-ink-900">
                  {title}
                </span>
                <span className="block text-caption text-ink-500">
                  {detail}
                </span>
              </span>
              {title === "Verification" ? (
                <Badge tone="green">Done</Badge>
              ) : (
                <Gear aria-hidden="true" className="size-4 text-ink-300" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
