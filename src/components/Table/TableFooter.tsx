import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-(--nuka-border-base)",
        "bg-(--nuka-bg-subtle)",
        "text-(--nuka-text-muted) font-medium",
        className,
      )}
      {...props}
    />
  ),
);

TableFooter.displayName = "TableFooter";

export { TableFooter };
