import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto px-(--space-2) py-(--space-2)",
        className,
      )}
      {...props}
    />
  ),
);

SidebarContent.displayName = "SidebarContent";

export { SidebarContent };
