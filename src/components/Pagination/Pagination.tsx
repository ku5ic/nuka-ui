import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  "aria-label"?: string;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ "aria-label": ariaLabel = "Pagination", className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  ),
);

Pagination.displayName = "Pagination";

export { Pagination };
