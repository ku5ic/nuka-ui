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

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Responsive<Direction>;
  gap?: Responsive<GapScale>;
  align?: Responsive<Align>;
  justify?: Responsive<Justify>;
  wrap?: Responsive<Wrap>;
  asChild?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "column",
      gap = "none",
      align,
      justify,
      wrap,
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
  },
);

Stack.displayName = "Stack";

export { Stack };
