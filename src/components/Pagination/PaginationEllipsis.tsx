import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <>
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center size-8",
        "text-(--nuka-text-muted)",
        className,
      )}
      {...props}
    >
      ...
    </span>
    <span className="sr-only">More pages</span>
  </>
));

PaginationEllipsis.displayName = "PaginationEllipsis";

export { PaginationEllipsis };
