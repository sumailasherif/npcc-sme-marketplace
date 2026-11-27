import Link from "next/link";
import { Check, Clock, ShieldCheck } from "@phosphor-icons/react/ssr";

import { PrelovedShell } from "@/components/preloved/preloved-shell";
import { Photo } from "@/components/ui/photo";
import { formatPrice } from "@/lib/format";

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; price?: string; condition?: string }>;
}) {
  const params = await searchParams;
  const title = params.title || "iPhone 11 64GB · small scratch";
  const price = Number(params.price) || 9500;
  const condition = params.condition || "Good";

  return (
    <PrelovedShell active="post" search={false}>
      <div className="mx-auto max-w-lg">
        <p className="text-caption font-semibold text-leaf-700">Preview</p>
        <h1 className="mt-1 text-h1 text-ink-900">
          Check it before publishing
        </h1>

        <div className="mt-4 rounded-card border border-ink-100 bg-surface p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-button bg-ink-100">
            <Photo name="iphone-11" alt={title} sizes="100vw" />
            <span className="absolute left-2 top-2 rounded-chip bg-white/95 px-2 py-1 text-caption font-bold text-leaf-700">
              {condition}
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-2">
            <p className="text-h2 tabular-price text-success-700">
              {formatPrice(price)}
            </p>
            <span className="rounded-chip bg-ink-100 px-2 py-1 text-caption font-semibold text-ink-700">
              Negotiable
            </span>
          </div>
          <p className="mt-1 text-body font-semibold text-ink-900">{title}</p>
          <p className="mt-1 text-caption text-ink-500">
            Battery 84%. Unlocked. Small scratch on the back, screen is clean.
            Charger included.
          </p>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-card bg-[#f6fbf8] p-3">
          <span className="grid size-9 place-items-center rounded-full bg-white text-success-700">
            <ShieldCheck aria-hidden="true" className="size-5" weight="fill" />
          </span>
          <div>
            <p className="text-body font-semibold text-ink-900">Ravi S.</p>
            <p className="text-caption text-ink-500">
              ID verified · member since 2024
            </p>
          </div>
        </div>

        <ul className="mt-3 flex flex-col gap-1 text-body text-ink-700">
          <li className="flex items-center gap-2">
            <Check aria-hidden="true" className="size-4 text-success-700" />
            Meet in a public place
          </li>
          <li className="flex items-center gap-2">
            <Check aria-hidden="true" className="size-4 text-success-700" />
            Buyer inspects before paying
          </li>
          <li className="flex items-center gap-2">
            <Check aria-hidden="true" className="size-4 text-success-700" />
            SafePay holds the payment
          </li>
        </ul>

        <div className="mt-4 flex items-start gap-2 rounded-card bg-leaf-50 p-3 text-body text-leaf-700">
          <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            First listing goes to review. A human checks photos, ID match and
            category. Usually under 24 hours.
          </p>
        </div>

        <Link
          href="/sell/listings"
          className="mt-5 flex min-h-11 items-center justify-center rounded-button bg-leaf-700 px-4 text-body font-semibold text-white hover:bg-plum-700"
        >
          Publish for review
        </Link>
      </div>
    </PrelovedShell>
  );
}
