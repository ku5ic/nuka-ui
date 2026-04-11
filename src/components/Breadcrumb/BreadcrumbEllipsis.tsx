import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface BreadcrumbEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    className={cn("flex items-center justify-center size-6", className)}
    {...props}
  >
    <span aria-hidden="true">...</span>
    <span className="sr-only">More pages</span>
  </span>
));

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export { BreadcrumbEllipsis };
