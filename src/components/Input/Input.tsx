import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { useFormField } from "@nuka/components/FormField/FormFieldContext";

const inputVariants = cva(
  [
    "w-full",
    "rounded-[var(--radius-md)]",
    "border",
    "bg-[var(--nuka-input-bg)]",
    "text-[var(--nuka-text-base)]",
    "placeholder:text-[var(--nuka-text-muted)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nuka-border-focus)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:bg-[var(--nuka-input-bg-readonly)] read-only:cursor-default",
    "transition-colors duration-150",
  ],
  {
    variants: {
      intent: {
        default: "border-[var(--nuka-input-border)] hover:border-[var(--nuka-input-border-hover)]",
        danger: "border-[var(--nuka-danger-border)]",
        success: "border-[var(--nuka-success-border)]",
        warning: "border-[var(--nuka-warning-border)]",
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
  ({ className, intent, size, id, ...props }, ref) => {
    const ctx = useFormField();

    const resolvedId = id ?? (ctx.fieldId || undefined);

    const ariaInvalid =
      props["aria-invalid"] ??
      (ctx.hasError ? true : undefined) ??
      (intent === "danger" ? true : undefined);

    const contextDescribedBy = [
      ctx.hasError ? ctx.errorId : "",
      ctx.hintId || "",
    ]
      .filter(Boolean)
      .join(" ");

    const ariaDescribedBy =
      [props["aria-describedby"], contextDescribedBy]
        .filter(Boolean)
        .join(" ") || undefined;

    const ariaRequired =
      props["aria-required"] ?? (ctx.required ? true : undefined);

    return (
      <input
        ref={ref}
        id={resolvedId}
        className={cn(inputVariants({ intent, size }), className)}
        {...props}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        aria-required={ariaRequired}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
