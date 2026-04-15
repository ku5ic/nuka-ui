"use client";
import * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

export interface ContextMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
}

const ContextMenuContext = React.createContext<
  ContextMenuContextValue | undefined
>(undefined);

function useContextMenuContext(): ContextMenuContextValue {
  const context = React.useContext(ContextMenuContext);
  if (context === undefined) {
    throw new Error(
      "useContextMenuContext must be used within a <ContextMenu> component",
    );
  }
  return context;
}

export { ContextMenuContext, useContextMenuContext };
