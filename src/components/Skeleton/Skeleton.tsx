import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { skeletonVariants } from "@nuka/components/Skeleton/Skeleton.variants";

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
