import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium leading-none whitespace-nowrap",
    "rounded-[var(--radius-md)]",
    "border border-transparent",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vault-border-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--vault-accent-bg)]",
          "text-[var(--vault-text-inverse)]",
          "hover:bg-[var(--vault-accent-bg-hover)]",
          "active:bg-[var(--vault-accent-bg-active)]",
        ],
        secondary: [
          "bg-[var(--vault-bg-muted)]",
          "text-[var(--vault-text-base)]",
          "border-[var(--vault-border-base)]",
          "hover:bg-[var(--vault-bg-subtle)]",
          "hover:border-[var(--vault-border-strong)]",
        ],
        ghost: [
          "bg-transparent",
          "text-[var(--vault-text-base)]",
          "hover:bg-[var(--vault-bg-muted)]",
        ],
        danger: [
          "bg-[var(--vault-danger-bg)]",
          "text-[var(--vault-danger-text)]",
          "border-[var(--vault-danger-border)]",
          "hover:brightness-95",
        ],
      },
      size: {
        sm: "px-[var(--space-3)] py-[var(--space-2)] text-[var(--font-size-sm)]",
        md: "px-[var(--space-4)] py-[var(--space-3)] text-[var(--font-size-md)]",
        lg: "px-[var(--space-6)] py-[var(--space-4)] text-[var(--font-size-lg)]",
      },
    },
    defaultVariants: {
      variant: "primary",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
