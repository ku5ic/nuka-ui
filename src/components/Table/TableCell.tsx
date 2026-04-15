"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useTableContext } from "@nuka/components/Table/Table.context";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    const { variant } = useTableContext();
    const isBordered = variant === "bordered";

    return (
      <td
        ref={ref}
        className={cn(
          "px-(--space-4) py-(--space-3) align-middle",
          isBordered && "border-r border-(--nuka-border-base) last:border-r-0",
          className,
        )}
        {...props}
      />
    );
  },
);

TableCell.displayName = "TableCell";

export { TableCell };
