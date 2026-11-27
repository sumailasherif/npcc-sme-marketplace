import { Package, Sparkle } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { productRows } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

const low = productRows.filter((product) => product.status !== "Active");

export default function InventoryPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Inventory"
        description="Stock value, low stock and what to reorder next."
      />

      <div className="mt-5 grid gap-3 tablet:grid-cols-3">
        <Stat
          label="Low stock"
          value="4"
          note="samosa, gato coco"
          tone="warn"
        />
        <Stat label="Out of stock" value="1" note="fresh bread" tone="warn" />
        <Stat label="Stock value" value={formatPrice(12500)} note="at cost" />
      </div>

      <section className="mt-5 rounded-card border border-ink-100 bg-surface p-4">
        <h2 className="text-h3 text-ink-900">Needs restocking</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {low.map((product) => (
            <li
              key={product.slug}
              className="flex items-center gap-3 border-b border-ink-100 pb-2 last:border-0"
            >
              <Package aria-hidden="true" className="size-5 text-ink-500" />
              <span className="min-w-0 flex-1">
                <span className="block text-body font-semibold text-ink-900">
                  {product.name}
                </span>
                <span className="text-caption text-ink-500">
                  {product.stock} left · {formatPrice(product.price)}
                </span>
              </span>
              <Badge tone={product.status === "Out" ? "coral" : "yellow"}>
                {product.status}
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 flex items-start gap-2 rounded-card bg-yellow-100 p-4 text-body text-ink-900">
        <Sparkle
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-yellow-500"
          weight="fill"
        />
        <p>
          <strong className="font-semibold">AI forecast.</strong> Samosa will
          run out Friday at 11:00 at the current pace. Bake 40% more.
        </p>
      </div>
    </div>
  );
}
