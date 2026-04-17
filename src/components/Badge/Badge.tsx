"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  badgeVariants,
  type BadgeVariantProps,
} from "@nuka/components/Badge/Badge.variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  ref?: React.Ref<HTMLSpanElement> | undefined;
  asChild?: boolean;
}

function Badge({
  ref,
  className,
  variant,
  intent,
  size,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      ref={ref}
      className={cn(badgeVariants({ variant, intent, size }), className)}
      {...props}
    />
  );
}

Badge.displayName = "Badge";

export { Badge, badgeVariants };
