import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Bazar button (spec: Components > Button).
 * Variants: primary (lime, black text), cta (black), secondary (outline), ghost, destructive.
 * Sizes: sm / md / lg. Every size is at least 44px tall (minimum touch target).
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-button",
    "font-sans text-label whitespace-nowrap select-none",
    "transition-colors duration-200 ease-out",
    "disabled:pointer-events-none disabled:bg-ink-100 disabled:text-ink-500 disabled:border-transparent",
    "data-[loading=true]:pointer-events-none data-[loading=true]:opacity-80",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-pressed active:bg-primary-pressed",
        cta: "bg-cta text-cta-foreground hover:brightness-95 active:brightness-90",
        secondary:
          "border border-ink-900 bg-surface text-ink-900 hover:bg-lime-50 active:bg-lime-100",
        ghost:
          "text-ink-900 underline-offset-4 hover:bg-lime-50 hover:underline active:bg-lime-100",
        destructive:
          "bg-destructive text-white hover:brightness-95 active:brightness-90",
      },
      size: {
        sm: "min-h-11 px-3",
        md: "min-h-11 px-4",
        lg: "min-h-12 px-6 text-body-l font-semibold",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Shows a spinner and blocks clicks while an action runs. */
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading}
      aria-busy={loading || undefined}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
