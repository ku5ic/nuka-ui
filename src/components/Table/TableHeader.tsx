import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement> | undefined;
}

function TableHeader({ ref, className, ...props }: TableHeaderProps) {
  return (
    <thead
      ref={ref}
      className={cn("border-b border-(--nuka-border-base)", className)}
      {...props}
    />
  );
}

TableHeader.displayName = "TableHeader";

export { TableHeader };
