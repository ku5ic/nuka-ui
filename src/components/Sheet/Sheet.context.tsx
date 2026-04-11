import { createContext, useContext } from "react";

export interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  hasDescription: boolean;
  setHasDescription: (value: boolean) => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(): SheetContextValue {
  const context = useContext(SheetContext);
  if (context === null) {
    throw new Error("Sheet compound components must be used within <Sheet>");
  }
  return context;
}

export { SheetContext, useSheetContext };
