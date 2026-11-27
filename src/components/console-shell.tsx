import Link from "next/link";

import { NavLink } from "@/components/nav-link";
import { cn } from "@/lib/utils";

export type ConsoleItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function ConsoleShell({
  brand,
  caption,
  items,
  children,
  tone = "market",
}: {
  brand: string;
  caption: string;
  items: ConsoleItem[];
  children: React.ReactNode;
  tone?: "market" | "admin" | "delivery";
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col desktop:flex-row">
      <aside
        className={cn(
          "hidden w-60 shrink-0 border-r border-ink-100 bg-surface p-4 desktop:flex desktop:flex-col",
          tone === "admin" && "bg-[#fcfbf8]",
          tone === "delivery" && "bg-[#f7fbf7]",
        )}
      >
        <Link href="/" className="flex min-h-11 items-center gap-2 px-2">
          <span className="grid size-8 place-items-center rounded-lg bg-ink-900 font-heading text-body font-extrabold text-white">
            B
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-body font-bold text-ink-900">
              {brand}
            </span>
            <span className="text-[11px] text-ink-500">{caption}</span>
          </span>
        </Link>
        <nav aria-label={brand} className="mt-6 flex flex-col gap-1">
          {items.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
        <div className="mt-auto rounded-card bg-ink-900 p-3 text-caption text-white">
          <p className="font-semibold">Demo workspace</p>
          <p className="mt-1 text-white/70">
            Real actions are disabled until Supabase is connected.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-ink-100 bg-surface px-4 py-2 tablet:px-6 desktop:hidden">
          <Link href="/" className="flex min-h-11 items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-ink-900 font-heading text-body font-extrabold text-white">
              B
            </span>
            <span className="font-heading text-body font-bold text-ink-900">
              {brand}
            </span>
          </Link>
          <span className="text-caption text-ink-500">{caption}</span>
        </header>

        <main className="flex-1 px-4 pb-24 pt-6 tablet:px-6 desktop:px-8 desktop:pb-8">
          {children}
        </main>

        <nav
          aria-label={brand}
          className="fixed inset-x-0 bottom-0 z-20 flex border-t border-ink-100 bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur desktop:hidden"
        >
          {items.slice(0, 5).map((item) => (
            <NavLink
              key={item.href}
              {...item}
              variant="bottom"
              exact={
                item.href.endsWith("dashboard") || item.href.endsWith("admin")
              }
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
