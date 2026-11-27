import Link from "next/link";
import {
  ArrowRight,
  LockSimple,
  SealCheck,
  Star,
  WhatsappLogo,
} from "@phosphor-icons/react/ssr";

import { Photo } from "@/components/ui/photo";
import { displayName, getPartner, productsByShop } from "@/lib/catalog/queries";
import { formatPrice } from "@/lib/format";

/**
 * A browser window showing a real Bazar shop page, built from the demo
 * catalogue, so visitors see what a business gets. Every link works.
 */
export function ShopPreview({ slug }: { slug: string }) {
  const partner = getPartner(slug);
  if (!partner) return null;
  const products = productsByShop(slug).slice(0, 4);

  return (
    <div className="overflow-hidden rounded-[20px] bg-ink-800 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/10">
      {/* Window bar */}
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-white/25" />
          <span className="size-2.5 rounded-full bg-lime-400" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1 text-caption text-white/60">
          <LockSimple aria-hidden="true" className="size-3 shrink-0" />
          <span className="truncate">
            <span className="text-white">bazar</span> / s / {partner.slug}
          </span>
        </span>
        <span aria-hidden="true" className="hidden w-[42px] tablet:block" />
      </div>

      {/* The shop page */}
      <div className="bg-cream-50 text-ink-900">
        <div className="relative h-28 tablet:h-40">
          <Photo name={partner.cover} alt="" sizes="(max-width: 768px) 100vw, 1100px" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
          <div className="absolute inset-x-4 bottom-3 flex items-end gap-3 tablet:inset-x-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-button bg-lime-400 font-heading text-caption font-extrabold text-ink-900 tablet:size-14 tablet:text-body">
              {partner.logo}
            </span>
            <div className="min-w-0 flex-1 text-white">
              <p className="flex items-center gap-1 font-heading text-body font-bold tablet:text-h3">
                <span className="truncate">{displayName(partner)}</span>
                {partner.verified ? (
                  <SealCheck
                    aria-label="Verified business"
                    className="size-4 shrink-0 text-lime-400"
                    weight="fill"
                  />
                ) : null}
              </p>
              <p className="flex items-center gap-1 text-caption text-white/80">
                {partner.district} ·
                <Star aria-hidden="true" className="size-3.5 text-yellow-500" weight="fill" />
                <span className="font-semibold text-white">{partner.rating}</span> (
                {partner.reviews} reviews)
              </p>
            </div>
            <span className="hidden min-h-10 items-center gap-1.5 rounded-full bg-cream-50 px-4 text-caption font-semibold text-ink-900 tablet:inline-flex">
              <WhatsappLogo aria-hidden="true" className="size-4" weight="fill" />
              Order on WhatsApp
            </span>
          </div>
        </div>

        <div className="p-4 tablet:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-heading text-body font-bold">Best sellers</p>
            <Link
              href={`/s/${partner.slug}`}
              className="inline-flex items-center gap-1 text-caption font-semibold underline-offset-4 hover:underline"
            >
              Visit this shop
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-4">
            {products.map((product, i) => (
              <li key={product.slug} className={i > 1 ? "hidden tablet:block" : undefined}>
                <Link href={`/p/${product.slug}`} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-button bg-ink-100">
                    <Photo
                      name={product.photo}
                      alt=""
                      sizes="(max-width: 768px) 45vw, 240px"
                      className="transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-2 block truncate text-caption font-semibold group-hover:underline tablet:text-body">
                    {product.name}
                  </span>
                  <span className="mt-1 inline-block rounded-full bg-ink-900 px-2.5 py-0.5 font-heading text-caption font-bold tabular-price text-lime-400">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
