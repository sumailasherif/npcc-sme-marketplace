import { cn } from "@/lib/utils";

const tones = {
  teal: "bg-lime-50 text-lime-700",
  coral: "bg-lime-100 text-lime-700",
  yellow: "bg-yellow-100 text-ink-900",
  ink: "bg-ink-100 text-ink-700",
  green: "bg-success-500/15 text-success-700",
  outline: "border border-ink-300 bg-surface text-ink-700",
} as const;

export function Badge({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
