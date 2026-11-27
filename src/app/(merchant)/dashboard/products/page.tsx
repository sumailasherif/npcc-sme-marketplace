import Link from "next/link";
import { Plus } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Photo } from "@/components/ui/photo";
import { productRows } from "@/lib/demo/business";
import { formatPrice } from "@/lib/format";

const tone = { Active: "green", Low: "yellow", Out: "coral" } as const;

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Products"
        description="One price everywhere, with stock you can trust."
        actions={
          <Link
            href="/dashboard/products/new"
            className="inline-flex min-h-11 items-center gap-1 rounded-button bg-lime-400 px-4 text-body font-semibold text-ink-900"
          >
            <Plus aria-hidden="true" className="size-4" weight="bold" />
            Add product
          </Link>
        }
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {["All 5", "Active 2", "Low 2", "Out 1"].map((item, index) => (
          <span
            key={item}
            className={
              index === 0
                ? "rounded-full bg-ink-900 px-3 py-1.5 text-caption font-semibold text-white"
                : "rounded-full border border-ink-300 bg-surface px-3 py-1.5 text-caption text-ink-700"
            }
          >
            {item}
          </span>
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {productRows.map((product) => (
          <li
            key={product.slug}
            className="flex items-center gap-3 rounded-card border border-ink-100 bg-surface p-3"
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-button bg-ink-100">
              <Photo name={product.photo} alt="" sizes="56px" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-semibold text-ink-900">
                {product.name}
              </span>
              <span className="block text-caption text-ink-500">
                {formatPrice(product.price)} · {product.stock} in stock
              </span>
            </span>
            <Badge tone={tone[product.status]}>{product.status}</Badge>
            <Link
              href="/dashboard/products/new"
              className="hidden min-h-9 items-center rounded-button border border-ink-300 px-3 text-caption font-semibold text-ink-700 tablet:inline-flex"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
