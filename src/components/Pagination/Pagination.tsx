"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement> | undefined;
  "aria-label"?: string;
}

function Pagination({
  ref,
  "aria-label": ariaLabel = "Pagination",
  className,
  ...props
}: PaginationProps) {
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("mx-auto flex w-full justify-center", className)}
      data-slot="root"
      {...props}
    />
  );
}

Pagination.displayName = "Pagination";

export { Pagination };
