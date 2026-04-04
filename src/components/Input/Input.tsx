import * as React from "react";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const inputVariants = cva(
  [
    "w-full",
    "rounded-[var(--radius-md)]",
    "border",
    "bg-[var(--vault-input-bg)]",
    "text-[var(--vault-text-base)]",
    "placeholder:text-[var(--vault-text-subtle)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vault-border-focus)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:bg-[var(--vault-input-bg-readonly)] read-only:cursor-default",
    "transition-colors duration-150",
  ],
  {
    variants: {
      intent: {
        default: "border-[var(--vault-input-border)] hover:border-[var(--vault-input-border-hover)]",
        danger: "border-[var(--vault-danger-border)]",
        success: "border-[var(--vault-success-border)]",
        warning: "border-[var(--vault-warning-border)]",
      },
      size: {
        sm: "px-[var(--space-3)] py-[var(--space-2)] text-xs",
        md: "px-[var(--space-4)] py-[var(--space-3)] text-sm",
        lg: "px-[var(--space-6)] py-[var(--space-4)] text-base",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
);

export type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, intent, size, ...props }, ref) => {
    const ariaInvalid = props["aria-invalid"] ?? (intent === "danger" ? true : undefined);

    return (
      <input
        ref={ref}
        className={cn(inputVariants({ intent, size }), className)}
        {...props}
        aria-invalid={ariaInvalid}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
