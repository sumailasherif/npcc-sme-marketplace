"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Storefront } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

type Item = { href: string; label: string; icon: "home" | "shop" };

const icons = { home: House, shop: Storefront };

/**
 * Merchant navigation: bottom bar on phones, side list on desktop.
 * More items (Orders, Products, Inbox) arrive with M2-M4.
 */
export function MerchantNav({
  items,
  label,
}: {
  items: Item[];
  label: string;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className={cn(
        "fixed inset-x-0 bottom-0 z-10 border-t bg-surface pb-[env(safe-area-inset-bottom)]",
        "desktop:static desktop:w-56 desktop:border-t-0 desktop:border-r desktop:bg-transparent desktop:pb-0",
      )}
    >
      <ul className="flex desktop:flex-col desktop:gap-1 desktop:p-4">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex-1 desktop:flex-none">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-caption",
                  "desktop:min-h-11 desktop:flex-row desktop:justify-start desktop:gap-3 desktop:rounded-button desktop:px-3 desktop:text-body",
                  active
                    ? "text-teal-700 desktop:bg-teal-50"
                    : "text-ink-700 hover:text-ink-900 desktop:hover:bg-ink-100",
                )}
              >
                <Icon
                  aria-hidden="true"
                  weight={active ? "fill" : "regular"}
                  className="size-6"
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
