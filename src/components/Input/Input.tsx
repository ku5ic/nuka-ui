import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { fieldBaseClasses } from "@nuka/utils/field-base";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";

const inputVariants = cva(
  [
    ...fieldBaseClasses,
    "read-only:bg-(--nuka-input-bg-readonly) read-only:cursor-default",
  ],
  {
    variants: {
      intent: {
        default:
          "border-(--nuka-input-border) hover:border-(--nuka-input-border-hover)",
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
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, intent, size, id, ...props }, ref) => {
    const field = useFormFieldProps({
      id,
      "aria-invalid": props["aria-invalid"],
      "aria-describedby": props["aria-describedby"],
      "aria-required": props["aria-required"],
    });

    const ariaInvalid =
      field.ariaInvalid ?? (intent === "danger" ? true : undefined);

    return (
      <input
        ref={ref}
        id={field.resolvedId}
        className={cn(inputVariants({ intent, size }), className)}
        {...props}
        aria-invalid={ariaInvalid}
        aria-describedby={field.ariaDescribedBy}
        aria-required={field.ariaRequired}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
