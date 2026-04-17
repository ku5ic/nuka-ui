"use client";

import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  asChild?: boolean;
}

function BreadcrumbLink({
  ref,
  asChild = false,
  className,
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        "text-(--nuka-text-muted)",
        "hover:text-(--nuka-text-base)",
        "transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-(--nuka-border-focus)",
        "rounded-(--radius-sm)",
        className,
      )}
      {...props}
    />
  );
}

BreadcrumbLink.displayName = "BreadcrumbLink";

export { BreadcrumbLink };
