"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface NavSubmenuProps extends React.HTMLAttributes<HTMLUListElement> {
  ref?: React.Ref<HTMLUListElement> | undefined;
  align?: "start" | "end";
}

function NavSubmenu({
  ref,
  align = "start",
  className,
  ...props
}: NavSubmenuProps) {
  return (
    <ul
      ref={ref}
      className={cn(
        "absolute top-10",
        align === "start" ? "left-0" : "right-0",
        "hidden group-hover:block group-focus-within:block",
        "min-w-48",
        "rounded-(--radius-md) border border-(--nuka-border-base)",
        "bg-(--nuka-bg-base) shadow-(--nuka-shadow-overlay)",
        "z-(--nuka-z-dropdown)",
        "list-none",
        "py-(--space-1)",
        className,
      )}
      {...props}
    />
  );
}

NavSubmenu.displayName = "NavSubmenu";

export { NavSubmenu };
