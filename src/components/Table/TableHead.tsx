"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { useTableContext } from "@nuka/components/Table/Table.context";

const ariaSortMap = {
  asc: "ascending",
  desc: "descending",
  none: "none",
} as const;

const SortAscIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

const SortDescIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </svg>
);

export type SortDirection = "asc" | "desc" | "none";

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      sortable = false,
      sortDirection = "none",
      onSort,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { variant } = useTableContext();
    const isBordered = variant === "bordered";

    return (
      <th
        ref={ref}
        scope="col"
        aria-sort={sortable ? ariaSortMap[sortDirection] : undefined}
        className={cn(
          "text-left font-medium text-(--nuka-text-muted)",
          "px-(--space-4) py-(--space-3)",
          isBordered && "border-r border-(--nuka-border-base) last:border-r-0",
          className,
        )}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={onSort}
            className={cn(
              "group inline-flex items-center gap-(--space-1)",
              "rounded-(--radius-sm)",
              "-mx-(--space-1) px-(--space-1)",
              "hover:bg-(--nuka-bg-muted)",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-(--nuka-border-focus)",
            )}
          >
            {children}
            <Icon size="sm">
              {sortDirection === "desc" ? (
                <SortDescIcon />
              ) : (
                <span
                  className={cn(
                    sortDirection === "none" &&
                      "opacity-0 group-hover:opacity-50",
                  )}
                >
                  <SortAscIcon />
                </span>
              )}
            </Icon>
          </button>
        ) : (
          children
        )}
      </th>
    );
  },
);

TableHead.displayName = "TableHead";

export { TableHead };
