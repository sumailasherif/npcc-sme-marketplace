import Link from "next/link";
import {
  ChatCircle,
  MagnifyingGlass,
  Plus,
  SquaresFour,
  UserCircle,
} from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";

type Section = "browse" | "me" | "post";

const tabs: { id: Section; href: string; label: string }[] = [
  { id: "browse", href: "/preloved", label: "Browse" },
  { id: "me", href: "/preloved/me", label: "My Pre-loved" },
];

/**
 * Pre-loved is its own space for people selling and buying second-hand.
 * Plum header + leaf-green actions, so it never looks like a business shop.
 */
export function PrelovedShell({
  children,
  active = "browse",
  search = true,
}: {
  children: React.ReactNode;
  active?: Section;
  search?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-sand-50">
      <header className="bg-plum-900 text-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3 px-4 py-2 tablet:px-6 desktop:px-8">
          <Link
            href="/"
            aria-label="Bazar home"
            className="flex min-h-11 items-center font-heading text-[1.375rem] font-extrabold tracking-[-0.03em] text-white/70 hover:text-white"
          >
            bazar
          </Link>
          <Link
            href="/preloved"
            className="flex min-h-11 items-center rounded-chip bg-leaf-700 px-2 font-heading text-body font-bold"
          >
            Pre-loved
          </Link>

          <nav
            aria-label="Pre-loved"
            className="ml-4 hidden items-center gap-1 tablet:flex"
          >
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                aria-current={active === tab.id ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-button px-3 text-body font-semibold",
                  active === tab.id
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white",
                )}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/sell/new"
            className="ml-auto inline-flex min-h-11 items-center gap-1 rounded-button bg-leaf-700 px-4 text-body font-semibold text-white hover:bg-[#166b16]"
          >
            <Plus aria-hidden="true" className="size-4" weight="bold" />
            Post an ad
          </Link>
        </div>

        {search ? (
          <form
            action="/preloved"
            className="mx-auto w-full max-w-[1200px] px-4 pb-3 tablet:px-6 desktop:px-8"
          >
            <label className="flex min-h-12 items-center gap-2 rounded-button bg-white px-3">
              <MagnifyingGlass
                aria-hidden="true"
                className="size-5 text-ink-900"
              />
              <input
                name="q"
                type="search"
                placeholder="Search second-hand phones, furniture, bikes…"
                aria-label="Search Pre-loved"
                className="min-h-11 flex-1 bg-transparent text-body text-ink-900 outline-none placeholder:text-ink-500"
              />
            </label>
          </form>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-24 pt-5 tablet:px-6 tablet:pb-12 desktop:px-8">
        {children}
      </main>

      <nav
        aria-label="Pre-loved"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-ink-100 bg-white pb-[env(safe-area-inset-bottom)] tablet:hidden"
      >
        <BottomLink
          href="/preloved"
          label="Browse"
          current={active === "browse"}
          icon={<SquaresFour aria-hidden="true" className="size-6" />}
        />
        <BottomLink
          href="/preloved/me#messages"
          label="Messages"
          icon={<ChatCircle aria-hidden="true" className="size-6" />}
        />
        <Link
          href="/sell/new"
          className="flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-caption text-ink-700"
        >
          <span className="grid size-9 place-items-center rounded-full bg-leaf-700 text-white">
            <Plus aria-hidden="true" className="size-5" weight="bold" />
          </span>
          Post
        </Link>
        <BottomLink
          href="/preloved/me"
          label="My Pre-loved"
          current={active === "me"}
          icon={<UserCircle aria-hidden="true" className="size-6" />}
        />
      </nav>
    </div>
  );
}

function BottomLink({
  href,
  label,
  icon,
  current = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  current?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-caption",
        current ? "font-semibold text-leaf-700" : "text-ink-500",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
