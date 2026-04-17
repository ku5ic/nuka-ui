"use client";

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
  ref?: React.Ref<HTMLDivElement> | undefined;
  cols?: Responsive<ColCount>;
  gap?: Responsive<GapScale>;
  colGap?: Responsive<GapScale>;
  rowGap?: Responsive<GapScale>;
  asChild?: boolean;
}

function Grid({
  ref,
  className,
  cols = 1,
  gap = "none",
  colGap,
  rowGap,
  asChild = false,
  ...props
}: GridProps) {
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
}

Grid.displayName = "Grid";

export { Grid };
