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
        sm: "px-[var(--space-2)] py-[var(--space-1)] text-xs",
        md: "px-[var(--space-3)] py-[var(--space-1)] text-xs",
        lg: "px-[var(--space-3)] py-[var(--space-2)] text-sm",
      },
    },

    compoundVariants: [
      // solid
      {
        variant: "solid",
        intent: "default",
        className: [
          "bg-[var(--nuka-accent-bg)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },
      {
        variant: "solid",
        intent: "danger",
        className: [
          "bg-[var(--nuka-danger-base)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },
      {
        variant: "solid",
        intent: "success",
        className: [
          "bg-[var(--nuka-success-base)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },
      {
        variant: "solid",
        intent: "warning",
        className: [
          "bg-[var(--nuka-warning-base)]",
          "text-[var(--nuka-text-inverse)]",
        ],
      },

      // subtle
      {
        variant: "subtle",
        intent: "default",
        className: [
          "bg-[var(--nuka-bg-muted)]",
          "text-[var(--nuka-text-base)]",
        ],
      },
      {
        variant: "subtle",
        intent: "danger",
        className: [
          "bg-[var(--nuka-danger-bg)]",
          "text-[var(--nuka-danger-text)]",
        ],
      },
      {
        variant: "subtle",
        intent: "success",
        className: [
          "bg-[var(--nuka-success-bg)]",
          "text-[var(--nuka-success-text)]",
        ],
      },
      {
        variant: "subtle",
        intent: "warning",
        className: [
          "bg-[var(--nuka-warning-bg)]",
          "text-[var(--nuka-warning-text)]",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-[var(--nuka-accent-border)]",
          "text-[var(--nuka-accent-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-[var(--nuka-danger-border)]",
          "text-[var(--nuka-danger-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-[var(--nuka-success-border)]",
          "text-[var(--nuka-success-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-[var(--nuka-warning-border)]",
          "text-[var(--nuka-warning-text)]",
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
  extends React.HTMLAttributes<HTMLSpanElement>,
    BadgeVariantProps {
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
