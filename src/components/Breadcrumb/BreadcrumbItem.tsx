"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement> | undefined;
}

function BreadcrumbItem({ ref, className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-(--space-1.5)", className)}
      {...props}
    />
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";

export { BreadcrumbItem };
