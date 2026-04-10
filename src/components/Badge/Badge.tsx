import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center",
    "font-medium leading-none whitespace-nowrap",
    "rounded-full",
  ],
  {
    variants: {
      variant: {
        solid: [],
        subtle: [],
        outline: ["border"],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "px-(--space-2) py-(--space-1) text-xs",
        md: "px-(--space-3) py-(--space-1) text-xs",
        lg: "px-(--space-3) py-(--space-2) text-sm",
      },
    },

    // Manual matrix: variant names (solid/subtle/outline) differ from the shared
    // utility's axis (primary/secondary/outline/ghost). See ADR-006.
    compoundVariants: [
      {
        variant: "solid",
        intent: "default",
        className: ["bg-(--nuka-accent-bg)", "text-(--nuka-accent-fg)"],
      },
      {
        variant: "solid",
        intent: "danger",
        className: ["bg-(--nuka-danger-base)", "text-(--nuka-danger-fg)"],
      },
      {
        variant: "solid",
        intent: "success",
        className: ["bg-(--nuka-success-base)", "text-(--nuka-success-fg)"],
      },
      {
        variant: "solid",
        intent: "warning",
        className: ["bg-(--nuka-warning-base)", "text-(--nuka-warning-fg)"],
      },

      {
        variant: "subtle",
        intent: "default",
        className: ["bg-(--nuka-bg-muted)", "text-(--nuka-text-base)"],
      },
      {
        variant: "subtle",
        intent: "danger",
        className: ["bg-(--nuka-danger-bg)", "text-(--nuka-danger-text)"],
      },
      {
        variant: "subtle",
        intent: "success",
        className: ["bg-(--nuka-success-bg)", "text-(--nuka-success-text)"],
      },
      {
        variant: "subtle",
        intent: "warning",
        className: ["bg-(--nuka-warning-bg)", "text-(--nuka-warning-text)"],
      },

      {
        variant: "outline",
        intent: "default",
        className: [
          "border-(--nuka-accent-border)",
          "text-(--nuka-accent-text)",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-(--nuka-danger-border)",
          "text-(--nuka-danger-text)",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-(--nuka-success-border)",
          "text-(--nuka-success-text)",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-(--nuka-warning-border)",
          "text-(--nuka-warning-text)",
        ],
      },
    ],

    defaultVariants: {
      variant: "solid",
      intent: "default",
      size: "md",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, intent, size }), className)}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
