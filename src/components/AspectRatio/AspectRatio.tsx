import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import { resolveRatio } from "@nuka/components/AspectRatio/AspectRatio.utils";
import type { AspectRatioValue } from "@nuka/components/AspectRatio/AspectRatio.utils";

export type { AspectRatioValue };

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: AspectRatioValue;
  asChild?: boolean;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    { ratio = "1/1", asChild = false, className, style, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn("w-full overflow-hidden", className)}
        style={{ aspectRatio: resolveRatio(ratio), ...style }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
