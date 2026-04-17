"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  ref?: React.Ref<HTMLUListElement> | undefined;
}

function NavigationMenuList({
  ref,
  className,
  ...props
}: NavigationMenuListProps) {
  return (
    <ul
      ref={ref}
      className={cn(
        "flex items-center gap-(--space-1)",
        "list-none",
        className,
      )}
      {...props}
    />
  );
}

NavigationMenuList.displayName = "NavigationMenuList";

export { NavigationMenuList };
