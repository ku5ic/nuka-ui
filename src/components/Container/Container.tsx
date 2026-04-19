"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import type { LayoutElement } from "@nuka/utils/polymorphic";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  /**
   * The HTML element to render. Defaults to "div".
   *
   * When `asChild` is true, this prop is ignored and the child element
   * determines the rendered tag.
   */
  as?: LayoutElement;
  size?: ContainerSize;
  padded?: boolean;
  centered?: boolean;
  asChild?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

function Container({
  ref,
  className,
  as = "div",
  size = "xl",
  padded = true,
  centered = true,
  asChild = false,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : as;

  return (
    <Comp
      // Safe: the `as` prop makes the element type dynamic, so ref cannot
      // satisfy any single element ref type. Each render produces one
      // concrete element, so the ref assignment is correct at runtime.
      ref={ref as React.RefObject<never>}
      className={cn(
        "w-full",
        sizeClasses[size],
        centered && "mx-auto",
        padded && "px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}

Container.displayName = "Container";

export { Container };
