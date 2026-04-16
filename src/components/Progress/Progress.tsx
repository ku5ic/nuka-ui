"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  progressTrackVariants,
  progressFillVariants,
  type ProgressVariantProps,
} from "@nuka/components/Progress/Progress.variants";

export interface ProgressProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    ProgressVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  value?: number;
  label?: string;
}

function Progress({
  ref,
  className,
  size,
  intent,
  value,
  label,
  ...props
}: ProgressProps) {
  const isIndeterminate = value === undefined;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-label={label ?? "Loading"}
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    >
      <div
        className={cn(
          progressFillVariants({ intent }),
          isIndeterminate &&
            "w-[33%] nuka-progress-indeterminate animate-[nuka-progress-indeterminate_1.5s_ease-in-out_infinite]",
        )}
        style={isIndeterminate ? undefined : { width: `${String(value)}%` }}
      />
    </div>
  );
}

Progress.displayName = "Progress";

export { Progress, progressTrackVariants, progressFillVariants };
