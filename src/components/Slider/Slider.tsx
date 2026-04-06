import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { useFormField } from "@nuka/components/FormField/FormFieldContext";

const sliderWrapperVariants = cva(
  [
    "relative flex items-center w-full",
  ],
  {
    variants: {
      size: {
        sm: "min-h-[24px]",
        md: "min-h-[24px]",
        lg: "min-h-[24px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const sliderTrackVariants = cva(
  [
    "relative w-full rounded-full",
    "bg-[var(--nuka-border-base)]",
  ],
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const sliderFillVariants = cva(
  [
    "absolute left-0 top-0 h-full rounded-full",
    "transition-[width] duration-75",
  ],
  {
    variants: {
      intent: {
        default: "bg-[var(--nuka-accent-bg)]",
        danger: "bg-[var(--nuka-danger-base)]",
        success: "bg-[var(--nuka-success-base)]",
        warning: "bg-[var(--nuka-warning-base)]",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

const sliderThumbVariants = cva(
  [
    "absolute top-1/2 -translate-y-1/2",
    "rounded-full",
    "border-2 border-[var(--nuka-bg-base)]",
    "shadow-sm",
    "transition-[left] duration-75",
    "pointer-events-none",
  ],
  {
    variants: {
      intent: {
        default: "bg-[var(--nuka-accent-bg)]",
        danger: "bg-[var(--nuka-danger-base)]",
        success: "bg-[var(--nuka-success-base)]",
        warning: "bg-[var(--nuka-warning-base)]",
      },
      size: {
        sm: "w-3.5 h-3.5",
        md: "w-[18px] h-[18px]",
        lg: "w-[22px] h-[22px]",
      },
    },
    defaultVariants: {
      intent: "default",
      size: "md",
    },
  },
);

const sliderValueVariants = cva(
  [
    "tabular-nums text-[var(--nuka-text-muted)]",
    "ml-[var(--space-3)]",
    "select-none",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const THUMB_SIZES = {
  sm: 14,
  md: 18,
  lg: 22,
} as const;

export type SliderVariantProps = VariantProps<typeof sliderFillVariants> &
  VariantProps<typeof sliderThumbVariants>;

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange">,
    SliderVariantProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  showValue?: boolean;
}

/**
 * Custom range slider built on a visually-replaced native `<input type="range">`.
 *
 * WCAG 2.5.7: Dragging alternative satisfied by native keyboard support
 * (Arrow keys, Home, End, Page Up/Down).
 */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      intent,
      size,
      value: controlledValue,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      showValue = false,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const ctx = useFormField();

    const [internalValue, setInternalValue] = React.useState(
      controlledValue ?? defaultValue ?? min,
    );
    const [focused, setFocused] = React.useState(false);

    const currentValue = controlledValue ?? internalValue;
    const percentage = ((currentValue - min) / (max - min)) * 100;
    const resolvedSize = size ?? "md";
    const thumbOffset = THUMB_SIZES[resolvedSize] / 2;

    const resolvedId = id ?? (ctx.fieldId || undefined);
    const resolvedDisabled = disabled ?? (ctx.disabled ? true : undefined);

    const ariaInvalid =
      props["aria-invalid"] ?? (ctx.hasError ? true : undefined);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = Number(e.target.value);
      setInternalValue(numericValue);
      onValueChange?.(numericValue);
    };

    return (
      <div className={cn(sliderWrapperVariants({ size }), className)}>
        {/* Native input: invisible, covers full interactive area */}
        <input
          type="range"
          ref={ref}
          id={resolvedId}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={resolvedDisabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          aria-required={ariaRequired}
          {...props}
        />

        {/* Track */}
        <div className={sliderTrackVariants({ size })} aria-hidden="true">
          {/* Fill */}
          <div
            className={sliderFillVariants({ intent })}
            style={{ width: `${String(percentage)}%` }}
            data-testid="slider-fill"
          />

          {/* Thumb */}
          <div
            className={cn(
              sliderThumbVariants({ intent, size }),
              focused && "outline-2 outline-offset-2 outline-[var(--nuka-border-focus)]",
            )}
            style={{ left: `calc(${String(percentage)}% - ${String(thumbOffset)}px)` }}
            data-testid="slider-thumb"
          />
        </div>

        {/* Optional value display */}
        {showValue && (
          <span aria-hidden="true" className={sliderValueVariants({ size })}>
            {currentValue}
          </span>
        )}
      </div>
    );
  },
);

Slider.displayName = "Slider";

export {
  Slider,
  sliderWrapperVariants,
  sliderTrackVariants,
  sliderFillVariants,
  sliderThumbVariants,
  sliderValueVariants,
};
