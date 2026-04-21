"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { TableContext } from "@nuka/components/Table/Table.context";
import type { TableContextValue } from "@nuka/components/Table/Table.context";
import {
  tableVariants,
  type TableVariantProps,
} from "@nuka/components/Table/Table.variants";

export interface TableProps
  extends React.HTMLAttributes<HTMLDivElement>, TableVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  caption: string;
}

// Ref forwards to the outer <div> wrapper, not the inner <table>.
// Consumers who need the <table> element directly can use a callback ref
// on a child or query the DOM. This is an acceptable tradeoff for the
// overflow-x-auto scroll wrapper pattern.
function Table({
  ref,
  caption,
  variant = "default",
  className,
  children,
  ...props
}: TableProps) {
  const contextValue: TableContextValue = React.useMemo(
    () => ({ variant: variant ?? "default" }),
    [variant],
  );

  return (
    <TableContext value={contextValue}>
      <div
        ref={ref}
        data-slot="root"
        data-variant={variant}
        className={cn(tableVariants({ variant }), className)}
        {...props}
      >
        <table data-slot="table" className="w-full border-collapse text-sm">
          <caption data-slot="caption" className="sr-only">
            {caption}
          </caption>
          {children}
        </table>
      </div>
    </TableContext>
  );
}

Table.displayName = "Table";

export { Table };
