import * as React from "react";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-mono",
    "rounded-[var(--radius-sm)]",
    "border border-[var(--vault-border-base)]",
    "bg-[var(--vault-bg-subtle)]",
    "text-[var(--vault-text-base)]",
  ],
  {
    variants: {
      size: {
        sm: "min-h-5 px-[var(--space-1)] text-[length:var(--font-size-xs)] leading-[var(--line-height-normal)]",
        md: "min-h-6 px-[var(--space-2)] text-[length:var(--font-size-sm)] leading-[var(--line-height-normal)]",
        lg: "min-h-8 px-[var(--space-3)] text-[length:var(--font-size-md)] leading-[var(--line-height-normal)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type KbdVariantProps = VariantProps<typeof kbdVariants>;

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    KbdVariantProps {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
