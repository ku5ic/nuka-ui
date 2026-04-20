"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function SidebarHeader({ ref, className, ...props }: SidebarHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3) py-(--space-4)",
        "border-b border-(--nuka-border-base)",
        className,
      )}
      data-slot="header"
      {...props}
    />
  );
}

SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };
