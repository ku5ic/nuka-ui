"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn("my-(--space-1) h-px bg-(--nuka-border-base)", className)}
      {...props}
    />
  ),
);

SelectSeparator.displayName = "SelectSeparator";

export { SelectSeparator };
