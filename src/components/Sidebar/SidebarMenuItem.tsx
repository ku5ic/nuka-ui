import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn(className)} {...props} />
  ),
);

SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };
