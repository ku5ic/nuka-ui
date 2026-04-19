"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement> | undefined;
}

function TableFooter({ ref, className, ...props }: TableFooterProps) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-(--nuka-border-base)",
        "bg-(--nuka-bg-subtle)",
        "text-(--nuka-text-muted) font-[number:var(--font-weight-medium)]",
        className,
      )}
      {...props}
    />
  );
}

TableFooter.displayName = "TableFooter";

export { TableFooter };
