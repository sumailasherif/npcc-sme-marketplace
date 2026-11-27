import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

import { RotatingBadge } from "@/components/motion/rotating-badge";

/**
 * Closing brand moment: a full-width lime band with a giant "bazar"
 * wordmark, the tagline and the two ways in (shop, or open a shop).
 */
export function BrandBand() {
  return (
    <section
      aria-labelledby="brand-band-title"
      className="relative mt-16 ml-[calc(50%-50vw)] w-screen overflow-hidden bg-lime-400 text-ink-900"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-4 pt-12 tablet:px-6 tablet:pt-16 desktop:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id="brand-band-title"
              className="max-w-[16ch] font-heading text-[1.75rem] font-bold leading-[2.1rem] tracking-[-0.02em] tablet:text-[2.5rem] tablet:leading-[2.9rem]"
            >
              Discover Mauritian businesses and shop smarter
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink-900 px-6 text-body-l font-semibold text-lime-400 hover:bg-ink-800"
              >
                Start exploring
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/sell"
                className="inline-flex min-h-12 items-center rounded-full px-6 text-body-l font-semibold text-ink-900 ring-2 ring-ink-900 hover:bg-ink-900 hover:text-lime-400"
              >
                Open your shop
              </Link>
            </div>
          </div>
          <RotatingBadge
            href="/sell"
            label="Open your shop on Bazar"
            ring="Open your shop · Bazar Business · "
            tone="dark"
            className="hidden tablet:grid"
          />
        </div>
      </div>

      {/* Giant wordmark, bleeding off the bottom edge */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-6 select-none text-center font-heading text-[27vw] font-extrabold leading-[0.78] tracking-[-0.07em] text-ink-900"
      >
        bazar
      </p>
    </section>
  );
}
