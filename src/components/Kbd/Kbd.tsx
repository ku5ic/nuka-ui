import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  kbdVariants,
  type KbdVariantProps,
} from "@nuka/components/Kbd/Kbd.variants";

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>, KbdVariantProps {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
