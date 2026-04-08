import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/utils/use-form-field-props";
import { Text } from "@nuka/components/Text";

const checkboxWrapperVariants = cva(
  ["inline-flex items-center gap-(--space-2)", "cursor-pointer", "select-none"],
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
    "rounded-(--radius-sm)",
    "border",
    "text-(--nuka-text-inverse)",
    "transition-colors duration-150",
    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
    "peer-focus-visible:outline-(--nuka-border-focus)",
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
          "border-(--nuka-input-border)",
          "peer-checked:bg-(--nuka-accent-bg)",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "danger",
        className: [
          "border-(--nuka-danger-border)",
          "peer-checked:bg-(--nuka-danger-base)",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "success",
        className: [
          "border-(--nuka-success-border)",
          "peer-checked:bg-(--nuka-success-base)",
          "peer-checked:border-transparent",
        ],
      },
      {
        intent: "warning",
        className: [
          "border-(--nuka-warning-border)",
          "peer-checked:bg-(--nuka-warning-base)",
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

export type CheckboxVariantProps = VariantProps<
  typeof checkboxIndicatorVariants
>;

export interface CheckboxProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    CheckboxVariantProps {
  children?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, intent, size, children, id, disabled, ...props }, ref) => {
    const {
      resolvedId,
      resolvedDisabled,
      ariaInvalid,
      ariaDescribedBy,
      ariaRequired,
    } = useFormFieldProps({
      id,
      disabled,
      "aria-invalid": props["aria-invalid"],
      "aria-describedby": props["aria-describedby"],
      "aria-required": props["aria-required"],
    });

    return (
      <label
        className={cn(
          checkboxWrapperVariants({ size }),
          resolvedDisabled ? "cursor-not-allowed" : undefined,
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          id={resolvedId}
          disabled={resolvedDisabled}
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
        {children && <Text as="span">{children}</Text>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export {
  Checkbox,
  checkboxIndicatorVariants as checkboxVariants,
  checkboxWrapperVariants,
};
