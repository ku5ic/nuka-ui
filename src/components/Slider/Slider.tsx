"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import {
  sliderWrapperVariants,
  sliderTrackVariants,
  sliderFillVariants,
  sliderThumbVariants,
  sliderValueVariants,
  type SliderVariantProps,
} from "@nuka/components/Slider/Slider.variants";

const THUMB_SIZES = {
  sm: 24,
  md: 18,
  lg: 22,
} as const;

export interface SliderProps
  extends
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "type" | "onChange"
    >,
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
    const field = useFormFieldProps({
      id,
      disabled,
      "aria-invalid": props["aria-invalid"],
      "aria-describedby": props["aria-describedby"],
      "aria-required": props["aria-required"],
    });

    const [currentValue, setCurrentValue] = useControllableState(
      controlledValue,
      defaultValue ?? min,
      onValueChange,
    );
    const [focused, setFocused] = React.useState(false);
    const percentage = ((currentValue - min) / (max - min)) * 100;
    const resolvedSize = size ?? "md";
    const thumbOffset = THUMB_SIZES[resolvedSize] / 2;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(Number(e.target.value));
    };

    return (
      <div className={cn(sliderWrapperVariants({ size }), className)}>
        {/* Native input: invisible, covers full interactive area */}
        <input
          type="range"
          ref={ref}
          id={field.resolvedId}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={field.resolvedDisabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-invalid={field.ariaInvalid}
          aria-describedby={field.ariaDescribedBy}
          aria-required={field.ariaRequired}
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
              focused &&
                "outline-2 outline-offset-2 outline-(--nuka-border-focus)",
            )}
            style={{
              left: `calc(${String(percentage)}% - ${String(thumbOffset)}px)`,
            }}
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
