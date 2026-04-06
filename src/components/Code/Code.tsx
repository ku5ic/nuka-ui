import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const codeVariants = cva(
  [
    "font-mono",
    "rounded-(--radius-sm)",
    "px-(--space-1) py-0.5",
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
          "bg-(--nuka-bg-muted)",
          "text-(--nuka-text-base)",
        ],
      },
      {
        variant: "subtle",
        intent: "danger",
        className: [
          "bg-(--nuka-danger-bg)",
          "text-(--nuka-danger-text)",
        ],
      },
      {
        variant: "subtle",
        intent: "success",
        className: [
          "bg-(--nuka-success-bg)",
          "text-(--nuka-success-text)",
        ],
      },
      {
        variant: "subtle",
        intent: "warning",
        className: [
          "bg-(--nuka-warning-bg)",
          "text-(--nuka-warning-text)",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-(--nuka-border-strong)",
          "text-(--nuka-text-base)",
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

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: ["text-(--nuka-text-muted)"],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ["text-(--nuka-danger-text)"],
      },
      {
        variant: "ghost",
        intent: "success",
        className: ["text-(--nuka-success-text)"],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: ["text-(--nuka-warning-text)"],
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
