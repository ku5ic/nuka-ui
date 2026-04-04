import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { useFormField } from "@nuka/components/FormField/FormFieldContext";

const checkboxWrapperVariants = cva(
  [
    "inline-flex items-center gap-[var(--space-2)]",
    "cursor-pointer",
    "select-none",
  ],
  {
    variants: {
      size: {
        sm: "min-h-6 min-w-6 text-xs",
        md: "min-h-6 min-w-6 text-sm",
        lg: "min-h-6 min-w-6 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const checkboxIndicatorVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-[var(--radius-sm)]",
    "border",
    "text-[var(--nuka-text-inverse)]",
    "transition-colors duration-150",
    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
    "peer-focus-visible:outline-[var(--nuka-border-focus)]",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    "peer-checked:*:block",
  ],
  {
    variants: {
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    compoundVariants: [
      {
        intent: "default",
        className: [
          "border-[var(--nuka-input-border)]",
          "peer-checked:bg-[var(--nuka-accent-bg)]",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "danger",
        className: [
          "border-[var(--nuka-danger-border)]",
          "peer-checked:bg-[var(--nuka-danger-base)]",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "success",
        className: [
          "border-[var(--nuka-success-border)]",
          "peer-checked:bg-[var(--nuka-success-base)]",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "warning",
        className: [
          "border-[var(--nuka-warning-border)]",
          "peer-checked:bg-[var(--nuka-warning-base)]",
          "peer-checked:border-transparent",
        ],
      },
    ],
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
);

export type CheckboxVariantProps = VariantProps<typeof checkboxIndicatorVariants>;

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    CheckboxVariantProps {
  children?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, intent, size, children, id, ...props }, ref) => {
    const ctx = useFormField();

    const resolvedId = id ?? (ctx.fieldId || undefined);

    const ariaInvalid =
      props["aria-invalid"] ??
      (ctx.hasError ? true : undefined);

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
      <label
        className={cn(
          checkboxWrapperVariants({ size }),
          props.disabled ? "cursor-not-allowed" : undefined,
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          id={resolvedId}
          className="peer sr-only"
          {...props}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          aria-required={ariaRequired}
        />
        <span
          aria-hidden="true"
          className={cn(checkboxIndicatorVariants({ intent, size }))}
        >
          <svg
            className="hidden size-full p-0.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
          </svg>
        </span>
        {children && <span className="text-[var(--nuka-text-base)]">{children}</span>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxIndicatorVariants as checkboxVariants, checkboxWrapperVariants };
