import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { useFormField } from "@nuka/components/FormField/FormFieldContext";

const inputVariants = cva(
  [
    "w-full",
    "rounded-(--radius-md)",
    "border",
    "bg-(--nuka-input-bg)",
    "text-(--nuka-text-base)",
    "placeholder:text-(--nuka-text-muted)",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nuka-border-focus)",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:bg-(--nuka-input-bg-readonly) read-only:cursor-default",
    "transition-colors duration-150",
  ],
  {
    variants: {
      intent: {
        default: "border-(--nuka-input-border) hover:border-(--nuka-input-border-hover)",
        danger: "border-(--nuka-danger-border)",
        success: "border-(--nuka-success-border)",
        warning: "border-(--nuka-warning-border)",
      },
      size: {
        sm: "px-(--space-3) py-(--space-2) text-xs",
        md: "px-(--space-4) py-(--space-3) text-sm",
        lg: "px-(--space-6) py-(--space-4) text-base",
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
