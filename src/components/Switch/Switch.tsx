"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { Text } from "@nuka/components/Text";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import {
  switchVariants,
  switchThumbVariants,
  type SwitchVariantProps,
} from "@nuka/components/Switch/Switch.variants";

export interface SwitchProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    SwitchVariantProps {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
}

function Switch({
  ref,
  className,
  size,
  checked: controlledChecked,
  defaultChecked,
  onChange,
  children,
  id,
  disabled,
  ...props
}: SwitchProps) {
  const field = useFormFieldProps(
    {
      id,
      disabled,
      "aria-describedby": props["aria-describedby"],
    },
    { skipInvalid: true },
  );
  const [isChecked, setChecked] = useControllableState(
    controlledChecked,
    defaultChecked ?? false,
    onChange,
  );

  const handleClick = () => {
    setChecked(!isChecked);
  };

  // Translation distance per size: track width - thumb width - 2*border.
  // sm 40 - 16 - 4 = 20 -> translate-x-5 (but translate-x-4 preserves prior
  // visual). md 48 - 20 - 4 = 24. lg 56 - 24 - 4 = 28.
  const translateClass = {
    sm: isChecked ? "translate-x-4" : "translate-x-0",
    md: isChecked ? "translate-x-5" : "translate-x-0",
    lg: isChecked ? "translate-x-6" : "translate-x-0",
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
          isChecked ? "bg-(--nuka-accent-bg)" : "bg-(--nuka-border-strong)",
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
        <Text as="span" size="sm">
          {children}
        </Text>
      )}
    </div>
  );
}

Switch.displayName = "Switch";

export { Switch, switchVariants, switchThumbVariants };
