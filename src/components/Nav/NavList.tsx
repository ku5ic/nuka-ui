import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {}

const NavList = React.forwardRef<HTMLUListElement, NavListProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex items-center list-none gap-(--space-1)", className)}
      {...props}
    />
  ),
);

NavList.displayName = "NavList";

export { NavList };
