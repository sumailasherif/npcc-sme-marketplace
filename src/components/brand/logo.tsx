import { cn } from "@/lib/utils";

/**
 * Bazar wordmark: black "bazar" on a lime block. Works on black and on cream,
 * so the brand looks the same everywhere. Wrap it in a Link where needed.
 */
export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-button bg-lime-400 font-heading font-extrabold leading-none tracking-[-0.04em] text-ink-900",
        size === "sm" && "px-1.5 py-1 text-body-l",
        size === "md" && "px-2 py-1.5 text-[1.25rem]",
        size === "lg" && "px-3 py-2 text-[1.75rem]",
        className,
      )}
    >
      bazar
    </span>
  );
}
