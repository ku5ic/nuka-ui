"use client";
import { createContext, use } from "react";

export interface TableContextValue {
  variant: "default" | "bordered";
}

const TableContext = createContext<TableContextValue>({ variant: "default" });

function useTableContext(): TableContextValue {
  return use(TableContext);
}

export { TableContext, useTableContext };
