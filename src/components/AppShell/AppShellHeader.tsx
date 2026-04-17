"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface AppShellHeaderProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  border?: boolean;
}

function AppShellHeader({
  ref,
  border = true,
  className,
  ...props
}: AppShellHeaderProps) {
  return (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-(--nuka-z-header)",
        "flex items-center gap-(--space-3)",
        "px-(--space-4) py-(--space-3)",
        "bg-(--nuka-bg-base)",
        border && "border-b border-(--nuka-border-base)",
        className,
      )}
      {...props}
    />
  );
}

AppShellHeader.displayName = "AppShellHeader";

export { AppShellHeader };
