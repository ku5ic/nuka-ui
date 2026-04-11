import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  spinnerVariants,
  spinnerColorVariants,
  type SpinnerVariantProps,
} from "@nuka/components/Spinner/Spinner.variants";

type SpinnerSize = NonNullable<SpinnerVariantProps["size"]>;
type SpinnerColor = NonNullable<SpinnerVariantProps["color"]>;

const strokeWidthMap = {
  sm: 2,
  md: 2.5,
  lg: 3,
} as const satisfies Record<SpinnerSize, number>;

export interface SpinnerProps
  extends
    Omit<React.ComponentPropsWithoutRef<"span">, "color">,
    SpinnerVariantProps {
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size: sizeProp, color: colorProp, label, ...props }, ref) => {
    const size: SpinnerSize = sizeProp ?? "md";
    const color: SpinnerColor = colorProp ?? "default";

    // Strict check: only boolean true triggers embedded mode
    const isHidden = props["aria-hidden"] === true;

    const strokeWidth = strokeWidthMap[size];

    return (
      <span
        ref={ref}
        {...(!isHidden && { role: "status" })}
        {...(!isHidden && !label && { "aria-label": "Loading" })}
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      >
        {label && !isHidden && <span className="sr-only">{label}</span>}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="nuka-spinner size-full"
        >
          {/* Track ring */}
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="var(--nuka-border-base)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
          {/* Animated arc */}
          <circle
            cx="12"
            cy="12"
            r="9"
            className={spinnerColorVariants({ color })}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="56.5"
            strokeDashoffset="42.4"
            fill="none"
          />
        </svg>
      </span>
    );
  },
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants, spinnerColorVariants };
