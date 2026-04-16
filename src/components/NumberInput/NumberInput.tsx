"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import {
  inputVariants,
  type InputVariantProps,
} from "@nuka/components/Input/Input.variants";

export interface NumberInputProps
  extends
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "type" | "onChange"
    >,
    InputVariantProps {
  ref?: React.Ref<HTMLInputElement> | undefined;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  showControls?: boolean;
  incrementLabel?: string;
  decrementLabel?: string;
}

function clamp(value: number, min?: number, max?: number): number {
  let clamped = value;
  if (min !== undefined && clamped < min) clamped = min;
  if (max !== undefined && clamped > max) clamped = max;
  return clamped;
}

function NumberInput({
  ref,
  className,
  intent,
  size,
  value: controlledValue,
  defaultValue,
  min,
  max,
  step = 1,
  onValueChange,
  showControls = true,
  incrementLabel = "Increment",
  decrementLabel = "Decrement",
  id,
  disabled,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: NumberInputProps) {
  const field = useFormFieldProps({
    id,
    disabled,
    "aria-invalid": props["aria-invalid"],
    "aria-describedby": props["aria-describedby"],
    "aria-required": props["aria-required"],
  });

  const [currentValue, setCurrentValue] = useControllableState(
    controlledValue,
    defaultValue ?? clamp(0, min, max),
    onValueChange,
  );

  const [editText, setEditText] = React.useState<string | null>(null);
  const inputValue = editText ?? String(currentValue);

  if (process.env.NODE_ENV !== "production") {
    if (!ariaLabel && !ariaLabelledBy && !field.resolvedId) {
      console.warn(
        "[nuka-ui] NumberInput: provide aria-label, aria-labelledby, or wrap in FormField for accessibility.",
      );
    }
  }

  const atMin = min !== undefined && currentValue <= min;
  const atMax = max !== undefined && currentValue >= max;

  const nudge = (direction: 1 | -1) => {
    setCurrentValue(clamp(currentValue + step * direction, min, max));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setEditText(raw);
    if (raw === "" || raw === "-") return;
    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) {
      setCurrentValue(clamp(parsed, min, max));
    }
  };

  const handleBlur = () => {
    if (editText === "" || editText === "-") {
      setCurrentValue(clamp(currentValue, min, max));
    }
    setEditText(null);
  };

  const controlButton = (
    direction: "increment" | "decrement",
    isDisabled: boolean,
    icon: React.ReactNode,
  ) => (
    <button
      type="button"
      aria-label={direction === "increment" ? incrementLabel : decrementLabel}
      tabIndex={0}
      disabled={field.resolvedDisabled === true || isDisabled}
      onClick={() => nudge(direction === "increment" ? 1 : -1)}
      className={cn(
        "inline-flex items-center justify-center",
        "px-(--space-2) text-(--nuka-text-muted)",
        "hover:text-(--nuka-text-base) hover:bg-(--nuka-bg-muted)",
        "disabled:opacity-50 disabled:pointer-events-none",
        "transition-colors cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nuka-border-focus)",
        direction === "decrement" && "rounded-l-(--radius-md)",
        direction === "increment" && "rounded-r-(--radius-md)",
      )}
    >
      <Icon size="sm">{icon as React.ReactElement}</Icon>
    </button>
  );

  const minusSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const plusSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const ariaInvalid =
    field.ariaInvalid ?? (intent === "danger" ? true : undefined);

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("inline-flex items-stretch", className)}
    >
      {showControls && controlButton("decrement", atMin, minusSvg)}
      <input
        ref={ref}
        type="number"
        id={field.resolvedId}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        disabled={field.resolvedDisabled}
        className={cn(
          inputVariants({ intent, size }),
          "text-center rounded-none",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          !showControls && "rounded-(--radius-md)",
        )}
        aria-invalid={ariaInvalid}
        aria-describedby={field.ariaDescribedBy}
        aria-required={field.ariaRequired}
        {...props}
      />
      {showControls && controlButton("increment", atMax, plusSvg)}
    </div>
  );
}

NumberInput.displayName = "NumberInput";

export { NumberInput };
