import * as React from "react";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const textareaVariants = cva(
  [
    "w-full",
    "rounded-[var(--radius-md)]",
    "border",
    "bg-[var(--vault-input-bg)]",
    "text-[var(--vault-text-base)]",
    "placeholder:text-[var(--vault-text-subtle)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vault-border-focus)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "resize-y",
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

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariantProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, intent, size, ...props }, ref) => {
    const ariaInvalid = props["aria-invalid"] ?? (intent === "danger" ? true : undefined);

    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ intent, size }), className)}
        {...props}
        aria-invalid={ariaInvalid}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
