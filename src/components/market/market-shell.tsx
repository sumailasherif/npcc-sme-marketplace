import Link from "next/link";
import {
  Heart,
  House,
  MagnifyingGlass,
  MapPin,
  ShoppingCart,
  User,
} from "@phosphor-icons/react/ssr";

import { Logo } from "@/components/brand/logo";
import { NavLink } from "@/components/nav-link";
import { getCartCount } from "@/lib/cart";

export async function MarketShell({
  children,
  hero,
}: {
  children: React.ReactNode;
  /** Full-width block between the header and the page content. */
  hero?: React.ReactNode;
}) {
  const count = await getCartCount();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header
        className={
          hero
            ? // Floats as a pill over the black hero (and the page below).
              "sticky top-0 z-30 h-[72px] px-2 pt-2 text-white tablet:px-4 tablet:pt-3"
            : "sticky top-0 z-30 bg-ink-900 text-white"
        }
      >
        <div
          className={
            hero
              ? "mx-auto flex w-full max-w-[1200px] items-center gap-3 rounded-full bg-ink-900/95 py-1.5 pl-4 pr-2 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
              : "mx-auto flex w-full max-w-[1200px] items-center gap-3 px-4 py-2 tablet:px-6 desktop:px-8"
          }
        >
          <Link
            href="/"
            aria-label="Bazar home"
            className="flex min-h-11 shrink-0 items-center"
          >
            <Logo />
          </Link>
          <Link
            href="/search"
            className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-4 text-body text-ink-500 ring-2 ring-transparent transition-colors hover:ring-lime-400"
          >
            <MagnifyingGlass
              aria-hidden="true"
              className="size-4 text-ink-700"
            />
            <span className="truncate">Search products and shops</span>
          </Link>
          <nav
            aria-label="Main"
            className="hidden items-center gap-1 text-body font-semibold text-white/80 tablet:flex"
          >
            <Link
              href="/near"
              className="flex min-h-11 items-center whitespace-nowrap rounded-button px-2.5 hover:bg-white/10 hover:text-white"
            >
              Near you
            </Link>
            <Link
              href="/preloved"
              className="flex min-h-11 items-center whitespace-nowrap rounded-button px-2.5 hover:bg-white/10 hover:text-white"
            >
              Pre-loved
            </Link>
            <Link
              href="/saved"
              className="flex min-h-11 items-center whitespace-nowrap rounded-button px-2.5 hover:bg-white/10 hover:text-white"
            >
              Saved
            </Link>
            <Link
              href="/account"
              className="flex min-h-11 items-center whitespace-nowrap rounded-button px-2.5 hover:bg-white/10 hover:text-white"
            >
              Account
            </Link>
          </nav>
          <Link
            href="/sell"
            className="hidden min-h-11 shrink-0 items-center rounded-full bg-lime-400 px-5 text-body font-semibold text-ink-900 shadow-[0_0_24px_-6px_rgb(212_245_60/0.7)] hover:bg-lime-300 tablet:flex"
          >
            Sell
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative grid size-11 shrink-0 place-items-center rounded-button text-white hover:bg-white/10"
          >
            <ShoppingCart aria-hidden="true" className="size-6" />
            {count > 0 ? (
              <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-lime-400 px-1 font-mono text-[11px] font-bold leading-5 text-ink-900">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </header>

      {/* The hero slides up under the floating header */}
      {hero ? <div className="-mt-[72px]">{hero}</div> : null}

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-24 pt-4 tablet:px-6 tablet:pb-12 tablet:pt-6 desktop:px-8">
        {children}
      </main>

      <footer className="bg-ink-900 pb-20 text-white/70 tablet:pb-0">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-6 text-caption tablet:flex-row tablet:items-center tablet:justify-between tablet:px-6 desktop:px-8">
          <p>
            <Logo size="sm" /> · Discover Mauritian businesses
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/sell" className="hover:text-lime-400">
              Sell on Bazar
            </Link>
            <Link href="/preloved" className="hover:text-lime-400">
              Pre-loved
            </Link>
            <Link href="/account" className="hover:text-lime-400">
              Your orders
            </Link>
            <Link href="/photos/CREDITS.md" className="hover:text-lime-400">
              Photo credits
            </Link>
          </nav>
        </div>
      </footer>

      <nav
        aria-label="Marketplace"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink-100 bg-cream-50 pb-[env(safe-area-inset-bottom)] tablet:hidden"
      >
        <NavLink
          href="/"
          label="Home"
          exact
          variant="bottom"
          icon={<House aria-hidden="true" className="size-6" />}
        />
        <NavLink
          href="/search"
          label="Search"
          variant="bottom"
          icon={<MagnifyingGlass aria-hidden="true" className="size-6" />}
        />
        <NavLink
          href="/near"
          label="Near you"
          variant="bottom"
          icon={<MapPin aria-hidden="true" className="size-6" />}
        />
        <NavLink
          href="/saved"
          label="Saved"
          variant="bottom"
          icon={<Heart aria-hidden="true" className="size-6" />}
        />
        <NavLink
          href="/account"
          label="Account"
          variant="bottom"
          icon={<User aria-hidden="true" className="size-6" />}
        />
      </nav>
    </div>
  );
}
