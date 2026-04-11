import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { Text } from "@nuka/components/Text";
import {
  checkboxWrapperVariants,
  checkboxIndicatorVariants,
  type CheckboxVariantProps,
} from "@nuka/components/Checkbox/Checkbox.variants";

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

export { Checkbox };
