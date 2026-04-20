"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  orientation?: ScrollAreaOrientation;
  /** Inline style value. Justified: consumer-provided dimension cannot be
   *  expressed as a static class without generating arbitrary Tailwind values. */
  maxHeight?: string;
  /** Inline style value. Same justification as maxHeight. */
  maxWidth?: string;
}

const orientationClasses: Record<ScrollAreaOrientation, string> = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-y-hidden overflow-x-auto",
  both: "overflow-auto",
};

function ScrollArea({
  ref,
  className,
  orientation = "vertical",
  maxHeight,
  maxWidth,
  style,
  tabIndex,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      ref={ref}
      tabIndex={tabIndex ?? 0}
      className={cn(
        "nuka-scroll-area",
        "[scrollbar-width:thin]",
        "[scrollbar-color:var(--nuka-scroll-thumb)_var(--nuka-scroll-track)]",
        orientationClasses[orientation],
        className,
      )}
      style={{ ...style, maxHeight, maxWidth }}
      data-slot="root"
      {...props}
    />
  );
}

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
