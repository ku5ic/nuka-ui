import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("py-(--space-2)", className)} {...props} />
  ),
);

SidebarGroup.displayName = "SidebarGroup";

export { SidebarGroup };
