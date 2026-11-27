import Link from "next/link";
import { Storefront } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";

/**
 * A round lime button with text circling it, turning slowly
 * (stops for reduced motion). The link text is the accessible name.
 */
export function RotatingBadge({
  href,
  label,
  ring,
  tone = "light",
  className,
}: {
  href: string;
  /** Accessible name, e.g. "Open your shop on Bazar". */
  label: string;
  /** Text around the circle, e.g. "OPEN YOUR SHOP · BAZAR BUSINESS · ". */
  ring: string;
  /** "light" text for dark backgrounds, "dark" for lime. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group relative grid size-32 place-items-center rounded-full",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full animate-spin-slow"
      >
        <defs>
          <path
            id="badge-ring"
            d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
          />
        </defs>
        <text
          className={cn(
            "font-heading text-[9px] font-semibold uppercase tracking-[0.2em]",
            tone === "dark" ? "fill-ink-900" : "fill-white",
          )}
        >
          <textPath href="#badge-ring">{ring}</textPath>
        </text>
      </svg>
      <span
        className={cn(
          "grid size-[4.5rem] place-items-center rounded-full transition-transform duration-300 group-hover:scale-110",
          tone === "dark"
            ? "bg-ink-900 text-lime-400"
            : "bg-lime-400 text-ink-900",
        )}
      >
        <Storefront aria-hidden="true" className="size-7" weight="bold" />
      </span>
    </Link>
  );
}
