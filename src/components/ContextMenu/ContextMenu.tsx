import * as React from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { ContextMenuContext } from "@nuka/components/ContextMenu/ContextMenu.context";
import type { ContextMenuContextValue } from "@nuka/components/ContextMenu/ContextMenu.context";

export interface ContextMenuProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function ContextMenu({ children, onOpenChange }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: "bottom-start",
    middleware: [offset(0), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const contextValue: ContextMenuContextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      refs,
      floatingStyles,
      getFloatingProps,
    }),
    [open, handleOpenChange, refs, floatingStyles, getFloatingProps],
  );

  return (
    <ContextMenuContext value={contextValue}>{children}</ContextMenuContext>
  );
}

ContextMenu.displayName = "ContextMenu";

export { ContextMenu };
