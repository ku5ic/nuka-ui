"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  asChild?: boolean;
  active?: boolean;
}

function NavLink({
  ref,
  asChild = false,
  active = false,
  className,
  ...props
}: NavLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center",
        "rounded-(--radius-md) px-(--space-3) py-(--space-2)",
        "text-sm font-[number:var(--font-weight-medium)]",
        "text-(--nuka-text-base)",
        "select-none",
        "hover:bg-(--nuka-bg-muted)",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        active && "text-(--nuka-accent-text)",
        className,
      )}
      data-slot="link"
      {...props}
    />
  );
}

NavLink.displayName = "NavLink";

export { NavLink };
