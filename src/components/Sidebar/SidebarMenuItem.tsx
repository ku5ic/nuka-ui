"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
}

function SidebarMenuItem({ ref, className, ...props }: SidebarMenuItemProps) {
  return (
    <li ref={ref} className={cn(className)} data-slot="menu-item" {...props} />
  );
}

SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };
