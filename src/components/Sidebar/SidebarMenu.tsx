import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-col gap-(--space-0.5) list-none", className)}
      {...props}
    />
  ),
);

SidebarMenu.displayName = "SidebarMenu";

export { SidebarMenu };
