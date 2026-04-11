import * as React from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { PopoverContext } from "@nuka/components/Popover/Popover.context";
import type { PopoverContextValue } from "@nuka/components/Popover/Popover.context";

export interface PopoverProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
}

function Popover({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  placement = "bottom-start",
}: PopoverProps) {
  const [currentOpen, handleOpenChange] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );

  const { refs, floatingStyles, context } = useFloating({
    open: currentOpen,
    onOpenChange: handleOpenChange,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const contextValue: PopoverContextValue = React.useMemo(
    () => ({
      open: currentOpen,
      onOpenChange: handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      currentOpen,
      handleOpenChange,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return <PopoverContext value={contextValue}>{children}</PopoverContext>;
}

Popover.displayName = "Popover";

export { Popover };
