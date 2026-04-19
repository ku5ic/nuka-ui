"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import {
  resolveResponsiveClasses,
  directionClasses,
  gapClasses,
  alignClasses,
  justifyClasses,
  wrapClasses,
} from "@nuka/utils/responsive";
import type {
  Responsive,
  GapScale,
  Direction,
  Align,
  Justify,
  Wrap,
} from "@nuka/utils/responsive";
import type { LayoutElement } from "@nuka/utils/polymorphic";

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  /**
   * The HTML element to render. Defaults to "div".
   *
   * When `asChild` is true, this prop is ignored and the child element
   * determines the rendered tag.
   */
  as?: LayoutElement;
  direction?: Responsive<Direction>;
  gap?: Responsive<GapScale>;
  align?: Responsive<Align>;
  justify?: Responsive<Justify>;
  wrap?: Responsive<Wrap>;
  asChild?: boolean;
}

function Stack({
  ref,
  className,
  as = "div",
  direction = "column",
  gap = "none",
  align,
  justify,
  wrap,
  asChild = false,
  ...props
}: StackProps) {
  const Comp = asChild ? Slot : as;

  return (
    <Comp
      // Safe: the `as` prop makes the element type dynamic, so ref cannot
      // satisfy any single element ref type. Each render produces one
      // concrete element, so the ref assignment is correct at runtime.
      ref={ref as React.RefObject<never>}
      className={cn(
        "flex",
        ...resolveResponsiveClasses(direction, directionClasses),
        ...resolveResponsiveClasses(gap, gapClasses),
        ...resolveResponsiveClasses(align, alignClasses),
        ...resolveResponsiveClasses(justify, justifyClasses),
        ...resolveResponsiveClasses(wrap, wrapClasses),
        className,
      )}
      {...props}
    />
  );
}

Stack.displayName = "Stack";

export { Stack };
