"use client";
import { createContext, useContext } from "react";

export interface TabsContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
  activationMode: "automatic" | "manual";
  baseId: string;
  focusedValue: string | undefined;
  setFocusedValue: (value: string | undefined) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error("Tabs compound components must be used within <Tabs>");
  }
  return context;
}

export { TabsContext, useTabsContext };
