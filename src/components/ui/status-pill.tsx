import { CheckCircle, Clock, XCircle } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";

const styles = {
  verified: {
    className: "bg-success-500/15 text-success-700",
    Icon: CheckCircle,
  },
  pending: { className: "bg-yellow-100 text-ink-900", Icon: Clock },
  rejected: { className: "bg-ink-100 text-ink-700", Icon: XCircle },
} as const;

/** Verification badge. Text plus icon, never colour alone (spec: Accessibility). */
export function VerificationPill({
  status,
  label,
  className,
}: {
  status: keyof typeof styles;
  label: string;
  className?: string;
}) {
  const { className: tone, Icon } = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption",
        tone,
        className,
      )}
    >
      <Icon aria-hidden="true" weight="fill" className="size-4" />
      {label}
    </span>
  );
}
