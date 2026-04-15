"use client";
import * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

export interface TooltipContextValue {
  open: boolean;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(
  undefined,
);

export function useTooltipContext(): TooltipContextValue {
  const context = React.useContext(TooltipContext);
  if (context === undefined) {
    throw new Error(
      "useTooltipContext must be used within a <Tooltip> component",
    );
  }
  return context;
}

export { TooltipContext };
