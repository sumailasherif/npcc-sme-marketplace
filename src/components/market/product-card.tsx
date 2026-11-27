import Link from "next/link";
import { Star } from "@phosphor-icons/react/ssr";

import { Photo } from "@/components/ui/photo";
import { getPartner } from "@/lib/catalog/queries";
import type { Product } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/format";

/**
 * Product first, then the business behind it on its own line (its own link),
 * then the price. The rating shown is the shop's.
 */
export function ProductCard({
  product,
  badge,
}: {
  product: Product;
  /** Short tag over the photo, e.g. "Popular". */
  badge?: string;
}) {
  const partner = getPartner(product.shopSlug);

  return (
    <div className="flex flex-col">
      <Link href={`/p/${product.slug}`} className="group flex flex-col">
        <span className="relative block aspect-square overflow-hidden rounded-button bg-ink-100">
          <Photo
            name={product.photo}
            alt={product.name}
            sizes="(max-width: 768px) 50vw, 200px"
            className="transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          />
          {badge ? (
            <span className="absolute left-2 top-2 rounded-full bg-lime-400 px-2 py-0.5 text-caption font-bold text-ink-900">
              {badge}
            </span>
          ) : null}
        </span>
        <span className="mt-2 line-clamp-2 text-body text-ink-900 group-hover:underline">
          {product.name}
        </span>
      </Link>
      {partner ? (
        <span className="mt-0.5 flex min-w-0 items-center gap-1 text-caption text-ink-500">
          <Link
            href={`/s/${partner.slug}`}
            className="truncate hover:text-ink-900 hover:underline"
          >
            {partner.name}
          </Link>
          <Star
            aria-hidden="true"
            className="size-3 shrink-0 text-yellow-500"
            weight="fill"
          />
          <span>
            <span className="sr-only">Shop rating </span>
            {partner.rating}
          </span>
        </span>
      ) : null}
      <span className="mt-1.5 self-start rounded-full bg-ink-900 px-2.5 py-0.5 font-heading text-body font-bold tabular-price text-lime-400">
        {formatPrice(product.price)}
        {product.unit ? (
          <span className="text-caption font-normal text-white/70">
            {" "}
            / {product.unit}
          </span>
        ) : null}
      </span>
    </div>
  );
}
