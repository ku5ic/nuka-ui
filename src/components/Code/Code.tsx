import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

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
          "border-[var(--nuka-border-strong)]",
          "text-[var(--nuka-text-base)]",
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

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: ["text-[var(--nuka-text-muted)]"],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ["text-[var(--nuka-danger-text)]"],
      },
      {
        variant: "ghost",
        intent: "success",
        className: ["text-[var(--nuka-success-text)]"],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: ["text-[var(--nuka-warning-text)]"],
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
