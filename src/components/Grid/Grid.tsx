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
import type { LayoutElement } from "@nuka/utils/polymorphic";

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  /**
   * The HTML element to render. Defaults to "div".
   *
   * When `asChild` is true, this prop is ignored and the child element
   * determines the rendered tag.
   */
  as?: LayoutElement;
  cols?: Responsive<ColCount>;
  gap?: Responsive<GapScale>;
  colGap?: Responsive<GapScale>;
  rowGap?: Responsive<GapScale>;
  asChild?: boolean;
}

function Grid({
  ref,
  className,
  as = "div",
  cols = 1,
  gap = "none",
  colGap,
  rowGap,
  asChild = false,
  ...props
}: GridProps) {
  const Comp = asChild ? Slot : as;

  return (
    <Comp
      // Safe: the `as` prop makes the element type dynamic, so ref cannot
      // satisfy any single element ref type. Each render produces one
      // concrete element, so the ref assignment is correct at runtime.
      ref={ref as React.RefObject<never>}
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
