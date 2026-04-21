"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export type TableRowIntent = "default" | "danger" | "success" | "warning";

const rowIntentClasses: Record<TableRowIntent, string> = {
  default: "",
  danger: "bg-(--nuka-danger-bg)",
  success: "bg-(--nuka-success-bg)",
  warning: "bg-(--nuka-warning-bg)",
};

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: React.Ref<HTMLTableRowElement> | undefined;
  intent?: TableRowIntent;
  selected?: boolean;
}

function TableRow({
  ref,
  intent = "default",
  selected = false,
  className,
  ...props
}: TableRowProps) {
  return (
    <tr
      ref={ref}
      aria-selected={selected ? true : undefined}
      className={cn(
        "border-b border-(--nuka-border-base) last:border-b-0",
        // Intent background first, then selected background.
        // cn() uses tailwind-merge: the last bg-* class wins.
        rowIntentClasses[intent],
        selected && "bg-(--nuka-accent-bg-subtle)",
        className,
      )}
      data-slot="row"
      {...props}
    />
  );
}

TableRow.displayName = "TableRow";

export { TableRow };
