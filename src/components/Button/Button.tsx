import * as React from "react";
import { Slot } from "@vault/utils/slot";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium leading-none whitespace-nowrap",
    "rounded-[var(--radius-md)]",
    "border",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[var(--vault-border-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: ["border-transparent"],
        secondary: [],
        outline: ["bg-transparent"],
        ghost: ["bg-transparent", "border-transparent"],
        link: [
          "bg-transparent",
          "border-transparent",
          "underline-offset-4",
          "hover:underline",
          "rounded-none",
          "px-0 py-0",
        ],
      },
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "px-[var(--space-3)] py-[var(--space-2)] text-xs",
        md: "px-[var(--space-4)] py-[var(--space-3)] text-sm",
        lg: "px-[var(--space-6)] py-[var(--space-4)] text-base",
      },
    },

    compoundVariants: [
      // primary
      {
        variant: "primary",
        intent: "default",
        className: [
          "bg-[var(--vault-accent-bg)]",
          "text-[var(--vault-text-inverse)]",
          "hover:bg-[var(--vault-accent-bg-hover)]",
          "active:bg-[var(--vault-accent-bg-active)]",
        ],
      },
      {
        variant: "primary",
        intent: "danger",
        className: [
          "bg-[var(--vault-danger-base)]",
          "text-[var(--vault-text-inverse)]",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },
      {
        variant: "primary",
        intent: "success",
        className: [
          "bg-[var(--vault-success-base)]",
          "text-[var(--vault-text-inverse)]",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },
      {
        variant: "primary",
        intent: "warning",
        className: [
          "bg-[var(--vault-warning-base)]",
          "text-[var(--vault-text-inverse)]",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },

      // secondary
      {
        variant: "secondary",
        intent: "default",
        className: [
          "bg-[var(--vault-bg-muted)]",
          "text-[var(--vault-text-base)]",
          "border-[var(--vault-border-base)]",
          "hover:bg-[var(--vault-bg-subtle)]",
          "hover:border-[var(--vault-border-strong)]",
        ],
      },
      {
        variant: "secondary",
        intent: "danger",
        className: [
          "bg-[var(--vault-danger-bg)]",
          "text-[var(--vault-danger-text)]",
          "border-[var(--vault-danger-border)]",
          "hover:brightness-95",
        ],
      },
      {
        variant: "secondary",
        intent: "success",
        className: [
          "bg-[var(--vault-success-bg)]",
          "text-[var(--vault-success-text)]",
          "border-[var(--vault-success-border)]",
          "hover:brightness-95",
        ],
      },
      {
        variant: "secondary",
        intent: "warning",
        className: [
          "bg-[var(--vault-warning-bg)]",
          "text-[var(--vault-warning-text)]",
          "border-[var(--vault-warning-border)]",
          "hover:brightness-95",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-[var(--vault-accent-border)]",
          "text-[var(--vault-accent-text)]",
          "hover:bg-[var(--vault-accent-bg-subtle)]",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-[var(--vault-danger-border)]",
          "text-[var(--vault-danger-text)]",
          "hover:bg-[var(--vault-danger-bg)]",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-[var(--vault-success-border)]",
          "text-[var(--vault-success-text)]",
          "hover:bg-[var(--vault-success-bg)]",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-[var(--vault-warning-border)]",
          "text-[var(--vault-warning-text)]",
          "hover:bg-[var(--vault-warning-bg)]",
        ],
      },

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: [
          "text-[var(--vault-text-base)]",
          "hover:bg-[var(--vault-bg-muted)]",
        ],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: [
          "text-[var(--vault-danger-text)]",
          "hover:bg-[var(--vault-danger-bg)]",
        ],
      },
      {
        variant: "ghost",
        intent: "success",
        className: [
          "text-[var(--vault-success-text)]",
          "hover:bg-[var(--vault-success-bg)]",
        ],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: [
          "text-[var(--vault-warning-text)]",
          "hover:bg-[var(--vault-warning-bg)]",
        ],
      },

      // link
      {
        variant: "link",
        intent: "default",
        className: ["text-[var(--vault-accent-text)]"],
      },
      {
        variant: "link",
        intent: "danger",
        className: ["text-[var(--vault-danger-text)]"],
      },
      {
        variant: "link",
        intent: "success",
        className: ["text-[var(--vault-success-text)]"],
      },
      {
        variant: "link",
        intent: "warning",
        className: ["text-[var(--vault-warning-text)]"],
      },
    ],

    defaultVariants: {
      variant: "primary",
      intent: "default",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, intent, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
