import * as React from "react";

import type { ComboboxContextValue } from "@nuka/components/Combobox/Combobox.types";

const ComboboxContext = React.createContext<ComboboxContextValue | undefined>(
  undefined,
);

export function useComboboxContext(): ComboboxContextValue {
  const context = React.useContext(ComboboxContext);
  if (context === undefined) {
    throw new Error(
      "useComboboxContext must be used within a <Combobox> component",
    );
  }
  return context;
}

export { ComboboxContext };
export type { ComboboxContextValue };
