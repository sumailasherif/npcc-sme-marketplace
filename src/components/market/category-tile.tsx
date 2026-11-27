import Link from "next/link";

import { Photo } from "@/components/ui/photo";
import type { Category } from "@/lib/catalog/types";

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/c/${category.slug}`}
      className="group block w-[152px] shrink-0 snap-start tablet:w-auto"
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[10px] bg-ink-100">
        <Photo
          name={category.photo}
          alt={category.name}
          sizes="(max-width: 768px) 40vw, 16vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <span className="absolute inset-0 bg-ink-900/0 transition-colors duration-300 group-hover:bg-ink-900/10" />
      </span>
      <span className="mt-2 flex items-baseline justify-between gap-2">
        <span className="font-heading text-[1.02rem] font-semibold leading-tight text-ink-900 decoration-lime-400 decoration-2 underline-offset-4 group-hover:underline">
          {category.name}
        </span>
        <span className="shrink-0 text-[11px] text-ink-500">
          {category.kreol}
        </span>
      </span>
    </Link>
  );
}
