import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

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
          "bg-[var(--vault-accent-bg)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },
      {
        variant: "solid",
        intent: "danger",
        className: [
          "bg-[var(--vault-danger-base)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },
      {
        variant: "solid",
        intent: "success",
        className: [
          "bg-[var(--vault-success-base)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },
      {
        variant: "solid",
        intent: "warning",
        className: [
          "bg-[var(--vault-warning-base)]",
          "text-[var(--vault-text-inverse)]",
        ],
      },

      // subtle
      {
        variant: "subtle",
        intent: "default",
        className: [
          "bg-[var(--vault-bg-muted)]",
          "text-[var(--vault-text-base)]",
        ],
      },
      {
        variant: "subtle",
        intent: "danger",
        className: [
          "bg-[var(--vault-danger-bg)]",
          "text-[var(--vault-danger-text)]",
        ],
      },
      {
        variant: "subtle",
        intent: "success",
        className: [
          "bg-[var(--vault-success-bg)]",
          "text-[var(--vault-success-text)]",
        ],
      },
      {
        variant: "subtle",
        intent: "warning",
        className: [
          "bg-[var(--vault-warning-bg)]",
          "text-[var(--vault-warning-text)]",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-[var(--vault-accent-border)]",
          "text-[var(--vault-accent-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-[var(--vault-danger-border)]",
          "text-[var(--vault-danger-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-[var(--vault-success-border)]",
          "text-[var(--vault-success-text)]",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-[var(--vault-warning-border)]",
          "text-[var(--vault-warning-text)]",
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
