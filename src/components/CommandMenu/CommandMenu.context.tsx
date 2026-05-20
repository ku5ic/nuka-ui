"use client";
import { createContext, use } from "react";

export interface CommandMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filter: string;
  setFilter: (value: string) => void;
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
  visibleCount: number;
  registerItemVisibility: (id: string, visible: boolean) => void;
  unregisterItem: (id: string) => void;
  baseId: string;
  listboxId: string;
  inputId: string;
  listRef: React.RefObject<HTMLDivElement | null>;
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);

function useCommandMenuContext(): CommandMenuContextValue {
  const ctx = use(CommandMenuContext);
  if (ctx === null) {
    throw new Error(
      "CommandMenu compound components must be used within <CommandMenu>.",
    );
  }
  return ctx;
}

export interface CommandMenuGroupContextValue {
  registerItemVisibility: (id: string, visible: boolean) => void;
  unregisterItem: (id: string) => void;
}

const CommandMenuGroupContext =
  createContext<CommandMenuGroupContextValue | null>(null);

export { CommandMenuContext, useCommandMenuContext, CommandMenuGroupContext };
