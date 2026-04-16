"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function SidebarContent({ ref, className, ...props }: SidebarContentProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto px-(--space-2) py-(--space-2)",
        className,
      )}
      {...props}
    />
  );
}

SidebarContent.displayName = "SidebarContent";

export { SidebarContent };
