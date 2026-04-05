import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  resolveResponsiveClasses,
  gapClasses,
  colGapClasses,
  rowGapClasses,
  colsClasses,
} from "@nuka/utils/responsive";
import type { Responsive, GapScale, ColCount } from "@nuka/utils/responsive";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: Responsive<ColCount>;
  gap?: Responsive<GapScale>;
  colGap?: Responsive<GapScale>;
  rowGap?: Responsive<GapScale>;
  asChild?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 1,
      gap = "none",
      colGap,
      rowGap,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          "grid",
          ...resolveResponsiveClasses(cols, colsClasses),
          ...resolveResponsiveClasses(gap, gapClasses),
          ...resolveResponsiveClasses(colGap, colGapClasses),
          ...resolveResponsiveClasses(rowGap, rowGapClasses),
          className,
        )}
        {...props}
      />
    );
  },
);

Grid.displayName = "Grid";

export { Grid };
