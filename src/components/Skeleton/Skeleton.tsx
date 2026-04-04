import * as React from "react";
import { cva } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";

const skeletonVariants = cva(
  ["animate-pulse bg-[var(--nuka-bg-muted)]"],
  {
    variants: {
      shape: {
        rect: "rounded-[var(--radius-md)]",
        circle: "rounded-full aspect-square",
        text: "rounded-[var(--radius-sm)] h-[1em]",
      },
    },
    defaultVariants: {
      shape: "rect",
    },
  },
);

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rect" | "circle" | "text";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        aria-hidden="true"
        className={cn(skeletonVariants({ shape }), className)}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
