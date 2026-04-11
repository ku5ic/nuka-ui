import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3) py-(--space-3)",
        "border-t border-(--nuka-border-base)",
        className,
      )}
      {...props}
    />
  ),
);

SidebarFooter.displayName = "SidebarFooter";

export { SidebarFooter };
