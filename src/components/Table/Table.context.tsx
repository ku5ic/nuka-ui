"use client";
import { createContext, useContext } from "react";

export interface TableContextValue {
  variant: "default" | "bordered";
}

const TableContext = createContext<TableContextValue>({ variant: "default" });

function useTableContext(): TableContextValue {
  return useContext(TableContext);
}

export { TableContext, useTableContext };
