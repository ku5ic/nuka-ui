"use client";
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
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { DropdownMenuContext } from "@nuka/components/DropdownMenu/DropdownMenu.context";
import type { DropdownMenuContextValue } from "@nuka/components/DropdownMenu/DropdownMenu.context";

export interface DropdownMenuProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DropdownMenu({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: DropdownMenuProps) {
  const [currentOpen, handleOpenChange] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );

  const { refs, floatingStyles, context } = useFloating({
    open: currentOpen,
    onOpenChange: handleOpenChange,
    placement: "bottom-start" as Placement,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const contextValue: DropdownMenuContextValue = React.useMemo(
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

  return (
    <DropdownMenuContext value={contextValue}>{children}</DropdownMenuContext>
  );
}

DropdownMenu.displayName = "DropdownMenu";

export { DropdownMenu };
