import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  badgeVariants,
  type BadgeVariantProps,
} from "@nuka/components/Badge/Badge.variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, intent, size }), className)}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
