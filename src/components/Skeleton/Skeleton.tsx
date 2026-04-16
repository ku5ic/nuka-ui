import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { skeletonVariants } from "@nuka/components/Skeleton/Skeleton.variants";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  shape?: "rect" | "circle" | "text";
}

function Skeleton({ ref, className, shape, ...props }: SkeletonProps) {
  return (
    <div
      ref={ref}
      {...props}
      aria-hidden="true"
      className={cn(skeletonVariants({ shape }), className)}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
