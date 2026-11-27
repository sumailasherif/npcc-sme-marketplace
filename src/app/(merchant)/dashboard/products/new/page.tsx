import Link from "next/link";
import { Camera, Sparkle } from "@phosphor-icons/react/ssr";

import { PageHeader } from "@/components/ui/page-header";
import { Photo } from "@/components/ui/photo";

export default function NewProductPage() {
  return (
    <div>
      <Link href="/dashboard/products" className="text-caption text-ink-500">
        ← Products
      </Link>
      <PageHeader
        eyebrow="Catalogue / New"
        title="Add a product"
        description="AI drafts the listing. You review every field before publishing."
        actions={
          <div className="flex gap-2">
            <button className="min-h-11 rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700">
              Save draft
            </button>
            <button className="min-h-11 rounded-button bg-lime-400 px-4 text-body font-semibold text-ink-900">
              Publish
            </button>
          </div>
        }
      />

      <div className="mt-5 grid gap-4 desktop:grid-cols-2">
        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <h2 className="text-h3 text-ink-900">Photo</h2>
          <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-button bg-ink-100">
            <Photo name="gato-patate" alt="Gato patate" sizes="50vw" />
          </div>
          <button className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-button border border-ink-300 bg-surface px-4 text-body font-semibold text-ink-700">
            <Camera aria-hidden="true" className="size-5" />
            Replace photo
          </button>
          <div className="mt-3 flex gap-2 rounded-button bg-lime-50 p-3 text-caption text-lime-700">
            <Sparkle
              aria-hidden="true"
              className="size-4 shrink-0"
              weight="fill"
            />
            <p>
              AI read this photo: “Sweet potato cake, homemade, round, sliced.”
            </p>
          </div>
        </section>

        <section className="rounded-card border border-ink-100 bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-h3 text-ink-900">Details</h2>
            <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-caption font-semibold text-ink-900">
              AI draft · review
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-label text-ink-700">
              Title
              <input
                defaultValue="Gato patate"
                className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
              />
            </label>
            <label className="flex flex-col gap-1 text-label text-ink-700">
              Description
              <textarea
                rows={3}
                defaultValue="Sweet potato cake baked the same morning. Coconut milk, vanilla, a little nutmeg. Serves 6. No preservatives."
                className="rounded-button border border-ink-300 bg-surface p-3 text-body text-ink-900"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-label text-ink-700">
                Category
                <input
                  defaultValue="Cakes & pastries"
                  className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-label text-ink-700">
                Price (Rs)
                <input
                  type="number"
                  defaultValue={250}
                  className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-label text-ink-700">
                Stock
                <input
                  type="number"
                  defaultValue={18}
                  className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-label text-ink-700">
                Low-stock alert
                <input
                  type="number"
                  defaultValue={5}
                  className="min-h-11 rounded-button border border-ink-300 bg-surface px-3 text-body text-ink-900"
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button className="inline-flex min-h-9 items-center gap-1 rounded-button bg-ink-900 px-3 text-caption font-semibold text-white">
              <Sparkle aria-hidden="true" className="size-3" weight="fill" />
              Rewrite description
            </button>
            <button className="min-h-9 rounded-button border border-ink-300 bg-surface px-3 text-caption font-semibold text-ink-700">
              Regenerate
            </button>
            <span className="text-caption text-ink-500">
              Price came from your text, not the model.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
