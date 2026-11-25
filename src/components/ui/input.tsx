import { cn } from "@/lib/utils";

/** Shared look for text inputs, selects and textareas (spec: Input). */
export const fieldBase = cn(
  "w-full min-h-11 rounded-button border border-input bg-surface px-3 text-body-l text-ink-900",
  "placeholder:text-ink-500",
  "focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-primary",
  "aria-invalid:border-error-600",
  "disabled:bg-ink-100 disabled:text-ink-500",
);

type InputProps = React.ComponentProps<"input"> & {
  /** Text shown inside the field on the left, e.g. "Rs" or "+230". */
  prefix?: string;
};

export function Input({ className, prefix, ...props }: InputProps) {
  if (!prefix) {
    return <input className={cn(fieldBase, className)} {...props} />;
  }
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-body-l text-ink-500"
      >
        {prefix}
      </span>
      <input
        className={cn(
          fieldBase,
          "pl-[calc(0.75rem+var(--prefix-w))]",
          className,
        )}
        style={
          { "--prefix-w": `${prefix.length + 1}ch` } as React.CSSProperties
        }
        {...props}
      />
    </div>
  );
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-24 py-2", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select className={cn(fieldBase, "appearance-auto", className)} {...props}>
      {children}
    </select>
  );
}
