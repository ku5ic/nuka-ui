import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-mono",
    "rounded-(--radius-sm)",
    "border border-(--nuka-border-base)",
    "bg-(--nuka-bg-subtle)",
    "text-(--nuka-text-base)",
  ],
  {
    variants: {
      size: {
        sm: "min-h-5 px-(--space-1) text-[length:var(--font-size-xs)] leading-(--line-height-normal)",
        md: "min-h-6 px-(--space-2) text-[length:var(--font-size-sm)] leading-(--line-height-normal)",
        lg: "min-h-8 px-(--space-3) text-[length:var(--font-size-md)] leading-(--line-height-normal)",
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
