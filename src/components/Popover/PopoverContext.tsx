import * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

export interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
}

const PopoverContext = React.createContext<PopoverContextValue | undefined>(
  undefined,
);

export function usePopoverContext(): PopoverContextValue {
  const context = React.useContext(PopoverContext);
  if (context === undefined) {
    throw new Error(
      "usePopoverContext must be used within a <Popover> component",
    );
  }
  return context;
}

export { PopoverContext };
