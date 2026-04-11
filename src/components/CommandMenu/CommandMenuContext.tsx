import { createContext, useContext } from "react";

export interface CommandMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filter: string;
  setFilter: (value: string) => void;
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
  visibleCount: number;
  baseId: string;
  listboxId: string;
  inputId: string;
  listRef: React.RefObject<HTMLDivElement | null>;
}

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);

function useCommandMenuContext(): CommandMenuContextValue {
  const ctx = useContext(CommandMenuContext);
  if (ctx === null) {
    throw new Error(
      "CommandMenu compound components must be used within <CommandMenu>.",
    );
  }
  return ctx;
}

export { CommandMenuContext, useCommandMenuContext };
