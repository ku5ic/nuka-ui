import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium leading-none whitespace-nowrap",
    "rounded-[var(--radius-md)]",
    "border",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[var(--nuka-border-focus)]",
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
          "bg-[var(--nuka-accent-bg)]",
          "text-[var(--nuka-text-inverse)]",
          "hover:bg-[var(--nuka-accent-bg-hover)]",
          "active:bg-[var(--nuka-accent-bg-active)]",
        ],
      },
      {
        variant: "primary",
        intent: "danger",
        className: [
          "bg-[var(--nuka-danger-base)]",
          "text-[var(--nuka-text-inverse)]",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },
      {
        variant: "primary",
        intent: "success",
        className: [
          "bg-[var(--nuka-success-base)]",
          "text-[var(--nuka-text-inverse)]",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },
      {
        variant: "primary",
        intent: "warning",
        className: [
          "bg-[var(--nuka-warning-base)]",
          "text-[var(--nuka-text-inverse)]",
          "hover:brightness-90",
          "active:brightness-80",
        ],
      },

      // secondary
      {
        variant: "secondary",
        intent: "default",
        className: [
          "bg-[var(--nuka-bg-muted)]",
          "text-[var(--nuka-text-base)]",
          "border-[var(--nuka-border-base)]",
          "hover:bg-[var(--nuka-bg-subtle)]",
          "hover:border-[var(--nuka-border-strong)]",
        ],
      },
      {
        variant: "secondary",
        intent: "danger",
        className: [
          "bg-[var(--nuka-danger-bg)]",
          "text-[var(--nuka-danger-text)]",
          "border-[var(--nuka-danger-border)]",
          "hover:brightness-95",
        ],
      },
      {
        variant: "secondary",
        intent: "success",
        className: [
          "bg-[var(--nuka-success-bg)]",
          "text-[var(--nuka-success-text)]",
          "border-[var(--nuka-success-border)]",
          "hover:brightness-95",
        ],
      },
      {
        variant: "secondary",
        intent: "warning",
        className: [
          "bg-[var(--nuka-warning-bg)]",
          "text-[var(--nuka-warning-text)]",
          "border-[var(--nuka-warning-border)]",
          "hover:brightness-95",
        ],
      },

      // outline
      {
        variant: "outline",
        intent: "default",
        className: [
          "border-[var(--nuka-accent-border)]",
          "text-[var(--nuka-accent-text)]",
          "hover:bg-[var(--nuka-accent-bg-subtle)]",
        ],
      },
      {
        variant: "outline",
        intent: "danger",
        className: [
          "border-[var(--nuka-danger-border)]",
          "text-[var(--nuka-danger-text)]",
          "hover:bg-[var(--nuka-danger-bg)]",
        ],
      },
      {
        variant: "outline",
        intent: "success",
        className: [
          "border-[var(--nuka-success-border)]",
          "text-[var(--nuka-success-text)]",
          "hover:bg-[var(--nuka-success-bg)]",
        ],
      },
      {
        variant: "outline",
        intent: "warning",
        className: [
          "border-[var(--nuka-warning-border)]",
          "text-[var(--nuka-warning-text)]",
          "hover:bg-[var(--nuka-warning-bg)]",
        ],
      },

      // ghost
      {
        variant: "ghost",
        intent: "default",
        className: [
          "text-[var(--nuka-text-base)]",
          "hover:bg-[var(--nuka-bg-muted)]",
        ],
      },
      {
        variant: "ghost",
        intent: "danger",
        className: [
          "text-[var(--nuka-danger-text)]",
          "hover:bg-[var(--nuka-danger-bg)]",
        ],
      },
      {
        variant: "ghost",
        intent: "success",
        className: [
          "text-[var(--nuka-success-text)]",
          "hover:bg-[var(--nuka-success-bg)]",
        ],
      },
      {
        variant: "ghost",
        intent: "warning",
        className: [
          "text-[var(--nuka-warning-text)]",
          "hover:bg-[var(--nuka-warning-bg)]",
        ],
      },

      // link
      {
        variant: "link",
        intent: "default",
        className: ["text-[var(--nuka-accent-text)]"],
      },
      {
        variant: "link",
        intent: "danger",
        className: ["text-[var(--nuka-danger-text)]"],
      },
      {
        variant: "link",
        intent: "success",
        className: ["text-[var(--nuka-success-text)]"],
      },
      {
        variant: "link",
        intent: "warning",
        className: ["text-[var(--nuka-warning-text)]"],
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
