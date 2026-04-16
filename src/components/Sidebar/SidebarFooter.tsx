"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function SidebarFooter({ ref, className, ...props }: SidebarFooterProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3) py-(--space-3)",
        "border-t border-(--nuka-border-base)",
        className,
      )}
      {...props}
    />
  );
}

SidebarFooter.displayName = "SidebarFooter";

export { SidebarFooter };
