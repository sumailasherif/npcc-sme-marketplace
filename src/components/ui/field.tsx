import { WarningCircle } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";

type FieldProps = {
  /** id of the input inside; links the label, helper and error to it. */
  htmlFor: string;
  label: string;
  helper?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Label + input + helper text + error message (spec: Input states).
 * Give the input: id={htmlFor}, aria-invalid, aria-describedby={describedBy(...)}.
 */
export function Field({
  htmlFor,
  label,
  helper,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-label text-ink-900">
        {label}
      </label>
      {children}
      {helper && !error ? (
        <p id={`${htmlFor}-helper`} className="text-caption text-ink-500">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-center gap-1 text-caption text-error-600"
        >
          <WarningCircle aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** aria-describedby value for an input inside <Field>. */
export function describedBy(
  id: string,
  opts: { helper?: unknown; error?: unknown },
) {
  if (opts.error) return `${id}-error`;
  if (opts.helper) return `${id}-helper`;
  return undefined;
}
