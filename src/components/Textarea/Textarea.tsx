import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/utils/use-form-field-props";

const textareaVariants = cva(
  [
    "w-full",
    "rounded-(--radius-md)",
    "border",
    "bg-(--nuka-input-bg)",
    "text-(--nuka-text-base)",
    "placeholder:text-(--nuka-text-muted)",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nuka-border-focus)",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "resize-y",
    "transition-colors duration-150",
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

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariantProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      <textarea
        ref={ref}
        id={field.resolvedId}
        className={cn(textareaVariants({ intent, size }), className)}
        {...props}
        aria-invalid={ariaInvalid}
        aria-describedby={field.ariaDescribedBy}
        aria-required={field.ariaRequired}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
