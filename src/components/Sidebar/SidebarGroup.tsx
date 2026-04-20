"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function SidebarGroup({ ref, className, ...props }: SidebarGroupProps) {
  return (
    <div
      ref={ref}
      className={cn("py-(--space-2)", className)}
      data-slot="group"
      {...props}
    />
  );
}

SidebarGroup.displayName = "SidebarGroup";

export { SidebarGroup };
