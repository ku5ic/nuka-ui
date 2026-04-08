import * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

export interface DropdownMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | undefined>(
  undefined,
);

function useDropdownMenuContext(): DropdownMenuContextValue {
  const context = React.useContext(DropdownMenuContext);
  if (context === undefined) {
    throw new Error(
      "useDropdownMenuContext must be used within a <DropdownMenu> component",
    );
  }
  return context;
}

export { DropdownMenuContext, useDropdownMenuContext };
