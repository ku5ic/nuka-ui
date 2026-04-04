import * as React from "react";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const codeVariants = cva(
  [
    "font-mono",
    "rounded-[var(--radius-sm)]",
    "px-[var(--space-1)] py-0.5",
    "leading-none",
    // Reserve border space so layout does not shift between subtle and outline variants.
    "border border-transparent",
  ],
  {
    variants: {
      variant: {
        subtle: [],
        outline: [],
        ghost: [],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "text-[length:var(--font-size-xs)]",
        md: "text-[length:var(--font-size-sm)]",
        lg: "text-[length:var(--font-size-md)]",
      },
    },

    compoundVariants: [
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
          "border-[var(--vault-border-strong)]",
          "text-[var(--vault-text-base)]",
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

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: ["text-[var(--vault-text-muted)]"],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ["text-[var(--vault-danger-text)]"],
      },
      {
        variant: "ghost",
        intent: "success",
        className: ["text-[var(--vault-success-text)]"],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: ["text-[var(--vault-warning-text)]"],
      },
    ],

    defaultVariants: {
      variant: "subtle",
      intent: "default",
      size: "md",
    },
  },
);

export type CodeVariantProps = VariantProps<typeof codeVariants>;

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    CodeVariantProps {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, intent, size, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(codeVariants({ variant, intent, size }), className)}
        {...props}
      />
    );
  },
);

Code.displayName = "Code";

export { Code, codeVariants };
