import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  note,
  tone = "default",
  className,
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "default" | "good" | "warn";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-ink-100 bg-surface p-4",
        className,
      )}
    >
      <p className="text-caption text-ink-500">{label}</p>
      <p className="mt-1 text-h2 tabular-price text-ink-900">{value}</p>
      {note ? (
        <p
          className={cn(
            "mt-1 text-caption",
            tone === "good" && "text-success-700",
            tone === "warn" && "text-coral-700",
            tone === "default" && "text-ink-500",
          )}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}
