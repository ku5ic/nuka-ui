"use client";
import * as React from "react";
import { Input } from "@nuka/components/Input";
import { EmptyState } from "@nuka/components/EmptyState";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@nuka/components/Table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@nuka/components/Pagination";
import type { SortDirection } from "@nuka/components/Table";

export interface DataTableColumn<TRow> {
  key: keyof TRow & string;
  header: string;
  sortable?: boolean;
  cell?: (value: TRow[keyof TRow & string], row: TRow) => React.ReactNode;
}

export interface DataTableProps<TRow extends object> {
  data: TRow[];
  columns: DataTableColumn<TRow>[];
  caption: string;
  rowKey?: keyof TRow & string;
  pageSize?: number;
  filterable?: boolean;
  filterPlaceholder?: string;
  emptyMessage?: string;
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  const pageSet = new Set<number>();
  pageSet.add(1);
  pageSet.add(totalPages);
  pageSet.add(currentPage);
  if (currentPage - 1 >= 1) pageSet.add(currentPage - 1);
  if (currentPage + 1 <= totalPages) pageSet.add(currentPage + 1);

  return Array.from(pageSet).sort((a, b) => a - b);
}

// DataTable is a generic function component. React.forwardRef does not support
// generics cleanly in React 19. Consumers interact with DataTable at the data
// level (columns, rows), not the DOM level, so ref forwarding is not needed.
function DataTable<TRow extends object>({
  data,
  columns,
  caption,
  rowKey,
  pageSize = 10,
  filterable = false,
  filterPlaceholder,
  emptyMessage = "No results found",
}: DataTableProps<TRow>) {
  const [filterValue, setFilterValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sort, setSort] = React.useState<{
    key: string;
    direction: SortDirection;
  } | null>(null);

  const hasFilteredRef = React.useRef(false);
  const filterId = React.useId();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hasFilteredRef.current = true;
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
    setSort((prev) => {
      if (prev?.key !== key) {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      if (prev.direction === "desc") {
        return null;
      }
      return null;
    });
  };

  const filteredData = React.useMemo(() => {
    if (filterValue === "") return data;

    const lower = filterValue.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.key];
        return String(value).toLowerCase().includes(lower);
      }),
    );
  }, [data, columns, filterValue]);

  const sortedData = React.useMemo(() => {
    if (sort === null) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = String(a[sort.key as keyof TRow] ?? "");
      const bVal = String(b[sort.key as keyof TRow] ?? "");
      const cmp = aVal.localeCompare(bVal);
      return sort.direction === "desc" ? -cmp : cmp;
    });
  }, [filteredData, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const pageData = sortedData.slice(startIndex, startIndex + pageSize);
  const showPagination = totalPages > 1;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-(--space-4)">
      {filterable && (
        <div>
          <label htmlFor={filterId} className="sr-only">
            Filter {caption}
          </label>
          <Input
            id={filterId}
            type="search"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder={filterPlaceholder}
            size="sm"
          />
        </div>
      )}

      {filteredData.length === 0 ? (
        <EmptyState heading={emptyMessage} />
      ) : (
        <Table caption={caption}>
          <TableHeader>
            <TableRow>
              {columns.map((col) => {
                const isSortable = col.sortable === true;
                return (
                  <TableHead
                    key={col.key}
                    {...(isSortable
                      ? {
                          sortable: true,
                          sortDirection:
                            sort !== null && sort.key === col.key
                              ? sort.direction
                              : "none",
                          onSort: () => handleSort(col.key),
                        }
                      : {})}
                  >
                    {col.header}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((row, rowIndex) => (
              <TableRow key={rowKey != null ? String(row[rowKey]) : rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.cell != null
                      ? col.cell(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {showPagination && filteredData.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious asChild>
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                />
              </PaginationPrevious>
            </PaginationItem>

            {pages.map((page, i) => {
              const prev = pages[i - 1];
              const showEllipsis = prev != null && page - prev > 1;

              return (
                <React.Fragment key={page}>
                  {showEllipsis && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink asChild isActive={page === currentPage}>
                      <button
                        type="button"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </PaginationLink>
                  </PaginationItem>
                </React.Fragment>
              );
            })}

            <PaginationItem>
              <PaginationNext asChild>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                />
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div role="status" className="sr-only">
        {hasFilteredRef.current
          ? `Showing ${String(filteredData.length)} ${filteredData.length === 1 ? "result" : "results"}`
          : ""}
      </div>
    </div>
  );
}

DataTable.displayName = "DataTable";

export { DataTable };
