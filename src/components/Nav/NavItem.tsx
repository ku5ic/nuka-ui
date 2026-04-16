import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface NavItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
  hasSubmenu?: boolean;
}

function NavItem({
  ref,
  hasSubmenu: _hasSubmenu,
  className,
  ...props
}: NavItemProps) {
  return (
    <li
      ref={ref}
      className={cn("relative group list-none", className)}
      {...props}
    />
  );
}

NavItem.displayName = "NavItem";

export { NavItem };
