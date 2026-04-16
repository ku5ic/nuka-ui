import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {
  ref?: React.Ref<HTMLUListElement> | undefined;
}

function NavList({ ref, className, ...props }: NavListProps) {
  return (
    <ul
      ref={ref}
      className={cn("flex items-center list-none gap-(--space-1)", className)}
      {...props}
    />
  );
}

NavList.displayName = "NavList";

export { NavList };
