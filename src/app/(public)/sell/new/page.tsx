import Link from "next/link";
import { Camera, Sparkle } from "@phosphor-icons/react/ssr";

import { PrelovedShell } from "@/components/preloved/preloved-shell";
import { Photo } from "@/components/ui/photo";

export default function NewListingPage() {
  return (
    <PrelovedShell active="post" search={false}>
      <div className="mx-auto max-w-lg">
        <p className="text-caption font-semibold text-leaf-700">3 / 3</p>
        <h1 className="mt-1 text-h1 text-ink-900">New listing</h1>
        <p className="mt-1 text-body text-ink-700">
          A human checks your first listing before it goes live.
        </p>

        <form action="/sell/preview" className="mt-5 flex flex-col gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-ink-100">
            <Photo name="iphone-11" alt="iPhone 11" sizes="100vw" />
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-ink-900 px-2 py-1 text-caption font-semibold text-white">
              <Sparkle aria-hidden="true" className="size-3" weight="fill" />
              AI: iPhone 11 · 64 GB
            </span>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-button border border-ink-300 bg-surface text-body font-semibold text-ink-700"
          >
            <Camera aria-hidden="true" className="size-5" />
            Add 3 more photos
          </button>

          <label className="flex flex-col gap-1 text-label text-ink-700">
            Title
            <input
              name="title"
              defaultValue="iPhone 11 64GB · small scratch"
              className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-label text-ink-700">
              Category
              <select
                name="category"
                defaultValue="Phones"
                className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
              >
                {[
                  "Phones",
                  "Furniture",
                  "Fashion",
                  "Kids",
                  "Home",
                  "Other",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-label text-ink-700">
              Condition
              <select
                name="condition"
                defaultValue="Good"
                className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
              >
                {["Mint", "Good", "Fair"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1 text-label text-ink-700">
            Price (Rs)
            <input
              name="price"
              type="number"
              min={1}
              defaultValue={9500}
              className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
            />
          </label>

          <div className="rounded-card bg-yellow-100 p-3 text-body text-ink-900">
            <p className="font-semibold">
              Similar items sold for Rs 8,500–10,000
            </p>
            <p className="mt-1 text-caption text-ink-700">
              Based on 14 verified sales in the last 60 days. You set the final
              price.
            </p>
          </div>

          <fieldset>
            <legend className="text-label text-ink-700">Handover</legend>
            <div className="mt-2 flex flex-col gap-2">
              <label className="flex min-h-11 items-center gap-2 rounded-button border border-ink-100 bg-surface px-3 text-body">
                <input
                  type="radio"
                  name="handover"
                  value="Meet in public"
                  defaultChecked
                />
                Meet in public · buyer inspects first
              </label>
              <label className="flex min-h-11 items-center gap-2 rounded-button border border-ink-100 bg-surface px-3 text-body">
                <input type="radio" name="handover" value="Grabbit courier" />
                Grabbit courier · Rs 120 · tracked
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="min-h-11 rounded-button bg-leaf-700 px-4 text-body font-semibold text-white hover:bg-plum-700"
          >
            Preview listing
          </button>
        </form>

        <p className="mt-3 text-caption text-ink-500">
          By publishing you agree to the Pre-loved rules.{" "}
          <Link href="/sell/rules" className="text-leaf-700 underline">
            Read them
          </Link>
          .
        </p>
      </div>
    </PrelovedShell>
  );
}
