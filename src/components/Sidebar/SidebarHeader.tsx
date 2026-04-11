import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3) py-(--space-4)",
        "border-b border-(--nuka-border-base)",
        className,
      )}
      {...props}
    />
  ),
);

SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };
