import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn(className)} {...props} />
  ),
);

TableBody.displayName = "TableBody";

export { TableBody };
