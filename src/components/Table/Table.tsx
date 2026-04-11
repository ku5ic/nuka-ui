import * as React from "react";
import { cva, type VariantProps } from "@nuka/utils/variants";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import {
  TableContext,
  useTableContext,
} from "@nuka/components/Table/Table.context";
import type { TableContextValue } from "@nuka/components/Table/Table.context";

const tableVariants = cva(["overflow-x-auto"], {
  variants: {
    variant: {
      default: "",
      bordered: ["border border-(--nuka-border-base)", "rounded-(--radius-lg)"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type TableVariantProps = VariantProps<typeof tableVariants>;

export interface TableProps
  extends React.HTMLAttributes<HTMLDivElement>, TableVariantProps {
  caption: string;
}

// Ref forwards to the outer <div> wrapper, not the inner <table>.
// Consumers who need the <table> element directly can use a callback ref
// on a child or query the DOM. This is an acceptable tradeoff for the
// overflow-x-auto scroll wrapper pattern.
const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ caption, variant = "default", className, children, ...props }, ref) => {
    const contextValue: TableContextValue = React.useMemo(
      () => ({ variant: variant ?? "default" }),
      [variant],
    );

    return (
      <TableContext value={contextValue}>
        <div
          ref={ref}
          data-variant={variant}
          className={cn(tableVariants({ variant }), className)}
          {...props}
        >
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">{caption}</caption>
            {children}
          </table>
        </div>
      </TableContext>
    );
  },
);

Table.displayName = "Table";

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn("border-b border-(--nuka-border-base)", className)}
      {...props}
    />
  ),
);

TableHeader.displayName = "TableHeader";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn(className)} {...props} />
  ),
);

TableBody.displayName = "TableBody";

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

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

export type TableRowIntent = "default" | "danger" | "success" | "warning";

const rowIntentClasses: Record<TableRowIntent, string> = {
  default: "",
  danger: "bg-(--nuka-danger-bg)",
  success: "bg-(--nuka-success-bg)",
  warning: "bg-(--nuka-warning-bg)",
};

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  intent?: TableRowIntent;
  selected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ intent = "default", selected = false, className, ...props }, ref) => (
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
      {...props}
    />
  ),
);

TableRow.displayName = "TableRow";

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

export {
  Table,
  tableVariants,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
};
