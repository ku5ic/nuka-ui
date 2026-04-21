"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import { resolveResponsiveClasses, gapClasses } from "@nuka/utils/responsive";
import type { Responsive, GapScale } from "@nuka/utils/responsive";

type Sidebar = "left" | "right";
type SideWidth = "sm" | "md" | "lg" | "xl";
type StackBelow = "sm" | "md" | "lg" | "xl";

export interface SplitLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  sidebar?: Sidebar;
  sideWidth?: SideWidth;
  stackBelow?: StackBelow;
  gap?: Responsive<GapScale>;
  asChild?: boolean;
}

type LayoutKey = `${Sidebar}-${SideWidth}-${StackBelow}`;

// prettier-ignore
const layoutClasses: Record<LayoutKey, string> = {
  "right-sm-sm": "grid-cols-1 sm:grid-cols-[1fr_240px]",
  "right-sm-md": "grid-cols-1 md:grid-cols-[1fr_240px]",
  "right-sm-lg": "grid-cols-1 lg:grid-cols-[1fr_240px]",
  "right-sm-xl": "grid-cols-1 xl:grid-cols-[1fr_240px]",
  "right-md-sm": "grid-cols-1 sm:grid-cols-[1fr_320px]",
  "right-md-md": "grid-cols-1 md:grid-cols-[1fr_320px]",
  "right-md-lg": "grid-cols-1 lg:grid-cols-[1fr_320px]",
  "right-md-xl": "grid-cols-1 xl:grid-cols-[1fr_320px]",
  "right-lg-sm": "grid-cols-1 sm:grid-cols-[1fr_400px]",
  "right-lg-md": "grid-cols-1 md:grid-cols-[1fr_400px]",
  "right-lg-lg": "grid-cols-1 lg:grid-cols-[1fr_400px]",
  "right-lg-xl": "grid-cols-1 xl:grid-cols-[1fr_400px]",
  "right-xl-sm": "grid-cols-1 sm:grid-cols-[1fr_480px]",
  "right-xl-md": "grid-cols-1 md:grid-cols-[1fr_480px]",
  "right-xl-lg": "grid-cols-1 lg:grid-cols-[1fr_480px]",
  "right-xl-xl": "grid-cols-1 xl:grid-cols-[1fr_480px]",
  "left-sm-sm":  "grid-cols-1 sm:grid-cols-[240px_1fr]",
  "left-sm-md":  "grid-cols-1 md:grid-cols-[240px_1fr]",
  "left-sm-lg":  "grid-cols-1 lg:grid-cols-[240px_1fr]",
  "left-sm-xl":  "grid-cols-1 xl:grid-cols-[240px_1fr]",
  "left-md-sm":  "grid-cols-1 sm:grid-cols-[320px_1fr]",
  "left-md-md":  "grid-cols-1 md:grid-cols-[320px_1fr]",
  "left-md-lg":  "grid-cols-1 lg:grid-cols-[320px_1fr]",
  "left-md-xl":  "grid-cols-1 xl:grid-cols-[320px_1fr]",
  "left-lg-sm":  "grid-cols-1 sm:grid-cols-[400px_1fr]",
  "left-lg-md":  "grid-cols-1 md:grid-cols-[400px_1fr]",
  "left-lg-lg":  "grid-cols-1 lg:grid-cols-[400px_1fr]",
  "left-lg-xl":  "grid-cols-1 xl:grid-cols-[400px_1fr]",
  "left-xl-sm":  "grid-cols-1 sm:grid-cols-[480px_1fr]",
  "left-xl-md":  "grid-cols-1 md:grid-cols-[480px_1fr]",
  "left-xl-lg":  "grid-cols-1 lg:grid-cols-[480px_1fr]",
  "left-xl-xl":  "grid-cols-1 xl:grid-cols-[480px_1fr]",
};

function SplitLayout({
  ref,
  className,
  sidebar = "right",
  sideWidth = "md",
  stackBelow = "md",
  gap = "none",
  asChild = false,
  children,
  ...props
}: SplitLayoutProps) {
  if (process.env.NODE_ENV !== "production") {
    const count = React.Children.count(children);
    if (count !== 2) {
      console.warn(
        `SplitLayout expects exactly 2 children (main + sidebar), received ${String(count)}.`,
      );
    }
  }

  const Comp = asChild ? Slot : "div";
  const key: LayoutKey = `${sidebar}-${sideWidth}-${stackBelow}`;

  return (
    <Comp
      ref={ref}
      className={cn(
        "grid",
        layoutClasses[key],
        ...resolveResponsiveClasses(gap, gapClasses),
        className,
      )}
      data-slot="root"
      {...props}
    >
      {children}
    </Comp>
  );
}

SplitLayout.displayName = "SplitLayout";

export { SplitLayout };
