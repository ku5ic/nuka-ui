import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  resolveResponsiveClasses,
  aspectRatioClasses,
} from "@nuka/utils/responsive";
import type { Responsive, AspectRatioValue } from "@nuka/utils/responsive";

export type { AspectRatioValue };

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: Responsive<AspectRatioValue>;
  asChild?: boolean;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = "1/1", asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          "w-full overflow-hidden",
          ...resolveResponsiveClasses(ratio, aspectRatioClasses),
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
