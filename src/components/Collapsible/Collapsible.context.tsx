import { createContext, useContext } from "react";

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
  triggerId: string;
  disabled: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(): CollapsibleContextValue {
  const context = useContext(CollapsibleContext);
  if (context === null) {
    throw new Error(
      "Collapsible compound components must be used within a <Collapsible> parent.",
    );
  }
  return context;
}

export { CollapsibleContext, useCollapsibleContext };
export type { CollapsibleContextValue };
