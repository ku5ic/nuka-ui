"use client";

import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement> | undefined;
}

function TableBody({ ref, className, ...props }: TableBodyProps) {
  return (
    <tbody ref={ref} className={cn(className)} data-slot="body" {...props} />
  );
}

TableBody.displayName = "TableBody";

export { TableBody };
