import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/utils/use-form-field-props";
import { useControllableState } from "@nuka/utils/use-controllable-state";

const switchVariants = cva(
  [
    "inline-flex items-center shrink-0",
    "rounded-full",
    "border-2 border-transparent",
    "transition-colors duration-150",
    "cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-(--nuka-border-focus)",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  [
    "block rounded-full",
    "bg-(--nuka-text-inverse)",
    "transition-transform duration-150",
    "pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SwitchVariantProps = VariantProps<typeof switchVariants>;

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    SwitchVariantProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, checked: controlledChecked, defaultChecked, onChange, children, id, disabled, ...props }, ref) => {
    const field = useFormFieldProps(
      {
        id,
        disabled,
        "aria-describedby": props["aria-describedby"],
      },
      { skipInvalid: true },
    );
    const [isChecked, setChecked] = useControllableState(controlledChecked, defaultChecked ?? false, onChange);

    const handleClick = () => {
      setChecked(!isChecked);
    };

    const translateClass = {
      sm: isChecked ? "translate-x-3" : "translate-x-0",
      md: isChecked ? "translate-x-4" : "translate-x-0",
      lg: isChecked ? "translate-x-5" : "translate-x-0",
    }[size ?? "md"];

    return (
      <div className="inline-flex items-center gap-(--space-2)">
        <button
          ref={ref}
          type="button"
          role="switch"
          id={field.resolvedId}
          aria-checked={isChecked}
          aria-describedby={field.ariaDescribedBy}
          disabled={field.resolvedDisabled}
          className={cn(
            switchVariants({ size }),
            isChecked
              ? "bg-(--nuka-accent-bg)"
              : "bg-(--nuka-border-strong)",
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          <span
            aria-hidden="true"
            className={cn(switchThumbVariants({ size }), translateClass)}
          />
        </button>
        {children && (
          <span className="text-sm text-(--nuka-text-base)">{children}</span>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch, switchVariants, switchThumbVariants };
