"use client";
import * as React from "react";

import type { ComboboxContextValue } from "@nuka/components/Combobox/Combobox.types";

const ComboboxContext = React.createContext<ComboboxContextValue | undefined>(
  undefined,
);

export function useComboboxContext(): ComboboxContextValue {
  const context = React.use(ComboboxContext);
  if (context === undefined) {
    throw new Error(
      "useComboboxContext must be used within a <Combobox> component",
    );
  }
  return context;
}

export interface ComboboxGroupContextValue {
  registerItemVisibility: (id: string, visible: boolean) => void;
  unregisterItem: (id: string) => void;
}

const ComboboxGroupContext =
  React.createContext<ComboboxGroupContextValue | null>(null);

export { ComboboxContext, ComboboxGroupContext };
export type { ComboboxContextValue };
