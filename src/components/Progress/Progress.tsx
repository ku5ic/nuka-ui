import * as React from "react";
import { cva, type VariantProps } from "@vault/utils/variants";
import { cn } from "@vault/utils/cn";

const progressTrackVariants = cva(
  ["w-full overflow-hidden rounded-full bg-[var(--vault-bg-muted)]"],
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const progressFillVariants = cva(
  ["h-full rounded-full transition-[width] duration-300"],
  {
    variants: {
      intent: {
        default: "",
        danger: "",
        success: "",
        warning: "",
      },
    },
    compoundVariants: [
      {
        intent: "default",
        className: "bg-[var(--vault-accent-bg)]",
      },
      {
        intent: "danger",
        className: "bg-[var(--vault-danger-base)]",
      },
      {
        intent: "success",
        className: "bg-[var(--vault-success-base)]",
      },
      {
        intent: "warning",
        className: "bg-[var(--vault-warning-base)]",
      },
    ],
    defaultVariants: {
      intent: "default",
    },
  },
);

export type ProgressTrackVariantProps = VariantProps<typeof progressTrackVariants>;
export type ProgressFillVariantProps = VariantProps<typeof progressFillVariants>;
export type ProgressVariantProps = ProgressTrackVariantProps & ProgressFillVariantProps;

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    ProgressVariantProps {
  value?: number;
  label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, size, intent, value, label, ...props }, ref) => {
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
              "w-[33%] vault-progress-indeterminate animate-[vault-progress-indeterminate_1.5s_ease-in-out_infinite]",
          )}
          style={isIndeterminate ? undefined : { width: `${String(value)}%` }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress, progressTrackVariants, progressFillVariants };
