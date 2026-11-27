"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({
  href,
  label,
  icon,
  exact = false,
  variant = "sidebar",
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
  variant?: "sidebar" | "bottom";
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  if (variant === "bottom") {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-caption",
          active ? "text-teal-700" : "text-ink-500",
        )}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-button px-3 text-body",
        active
          ? "bg-teal-50 font-semibold text-teal-700"
          : "text-ink-700 hover:bg-ink-100",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
