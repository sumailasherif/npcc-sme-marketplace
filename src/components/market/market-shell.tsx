import Link from "next/link";
import {
  Heart,
  House,
  MagnifyingGlass,
  ShoppingCart,
  User,
} from "@phosphor-icons/react/ssr";

import { NavLink } from "@/components/nav-link";
import { getCartCount } from "@/lib/cart";

export async function MarketShell({ children }: { children: React.ReactNode }) {
  const count = await getCartCount();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3 px-4 py-2 tablet:px-6 desktop:px-8">
          <Link
            href="/"
            className="flex min-h-11 items-center font-heading text-[1.375rem] font-extrabold tracking-[-0.03em] text-teal-700"
          >
            bazar
          </Link>
          <Link
            href="/search"
            className="flex min-h-11 flex-1 items-center gap-2 rounded-button bg-sand-50 px-3 text-body text-ink-500 ring-1 ring-ink-100 transition-colors hover:ring-ink-300"
          >
            <MagnifyingGlass
              aria-hidden="true"
              className="size-4 text-ink-700"
            />
            <span className="truncate">Search products and shops</span>
          </Link>
          <nav
            aria-label="Main"
            className="hidden items-center gap-1 text-body font-semibold text-ink-700 tablet:flex"
          >
            <Link
              href="/preloved"
              className="flex min-h-11 items-center rounded-button px-3 hover:bg-sand-50"
            >
              Pre-loved
            </Link>
            <Link
              href="/saved"
              className="flex min-h-11 items-center rounded-button px-3 hover:bg-sand-50"
            >
              Saved
            </Link>
            <Link
              href="/account"
              className="flex min-h-11 items-center rounded-button px-3 hover:bg-sand-50"
            >
              Account
            </Link>
          </nav>
          <Link
            href="/sell"
            className="hidden min-h-11 shrink-0 items-center rounded-button bg-coral-700 px-4 text-body font-semibold text-white hover:bg-coral-500 hover:text-ink-900 tablet:flex"
          >
            Sell
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative grid size-11 shrink-0 place-items-center rounded-button text-ink-900 hover:bg-sand-50"
          >
            <ShoppingCart aria-hidden="true" className="size-6" />
            {count > 0 ? (
              <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-coral-700 px-1 font-mono text-[11px] font-bold leading-5 text-white">
                {count}
              </span>
            ) : null}
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-24 pt-4 tablet:px-6 tablet:pb-12 tablet:pt-6 desktop:px-8">
        {children}
      </main>

      <footer className="border-t border-ink-100 bg-white pb-20 tablet:pb-0">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-6 text-caption text-ink-500 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-6 desktop:px-8">
          <p>
            <span className="font-heading text-body font-extrabold text-teal-700">
              bazar
            </span>{" "}
            · Local shops in Mauritius
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/sell" className="hover:text-ink-900">
              Sell on Bazar
            </Link>
            <Link href="/preloved" className="hover:text-ink-900">
              Pre-loved
            </Link>
            <Link href="/account" className="hover:text-ink-900">
              Your orders
            </Link>
            <Link href="/photos/CREDITS.md" className="hover:text-ink-900">
              Photo credits
            </Link>
          </nav>
        </div>
      </footer>

      <nav
        aria-label="Marketplace"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink-100 bg-white pb-[env(safe-area-inset-bottom)] tablet:hidden"
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
