"use client";
import * as React from "react";

export interface SelectContextValue {
  open: boolean;
  value: string | undefined;
  highlightedValue: string | undefined;
  disabled: boolean;
  listboxId: string;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: string) => void;
  onHighlightChange: (value: string | undefined) => void;
  registerOption: (
    value: string,
    label: string,
    ref: HTMLElement | null,
  ) => void;
  unregisterOption: (value: string) => void;
  getOptions: () => string[];
  getOptionLabel: (value: string) => string | undefined;
  getOptionRef: (value: string) => HTMLElement | null | undefined;
  isOptionDisabled: (value: string) => boolean;
  registerDisabledOption: (value: string, disabled: boolean) => void;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined,
);

export function useSelect(): SelectContextValue {
  const context = React.useContext(SelectContext);
  if (context === undefined) {
    throw new Error("useSelect must be used within a <Select> component");
  }
  return context;
}

export { SelectContext };
