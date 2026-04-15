import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  hasSubmenu?: boolean;
}

const NavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ hasSubmenu: _hasSubmenu, className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("relative group list-none", className)}
      {...props}
    />
  ),
);

NavItem.displayName = "NavItem";

export { NavItem };
