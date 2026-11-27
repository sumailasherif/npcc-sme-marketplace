import Link from "next/link";

import { Photo } from "@/components/ui/photo";
import { getPartner } from "@/lib/catalog/queries";
import type { Product } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const partner = getPartner(product.shopSlug);

  return (
    <Link href={`/p/${product.slug}`} className="group flex flex-col">
      <span className="relative block aspect-square overflow-hidden rounded-button bg-ink-100">
        <Photo
          name={product.photo}
          alt={product.name}
          sizes="(max-width: 768px) 50vw, 200px"
          className="transition-transform duration-200 ease-out group-hover:scale-[1.03]"
        />
      </span>
      <span className="mt-2 font-heading text-[1rem] font-bold tabular-price text-ink-900">
        {formatPrice(product.price)}
      </span>
      <span className="line-clamp-2 text-body text-ink-900 group-hover:underline">
        {product.name}
      </span>
      <span className="mt-0.5 truncate text-caption text-ink-500">
        {partner?.name ?? "Bazar"}
      </span>
    </Link>
  );
}
