import * as React from "react";
import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { TooltipContext } from "@vault/components/Tooltip/TooltipContext";
import type { TooltipContextValue } from "@vault/components/Tooltip/TooltipContext";

export interface TooltipProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delay?: number;
  side?: "top" | "right" | "bottom" | "left";
}

function Tooltip({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  delay = 600,
  side = "top",
}: TooltipProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const currentOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const { refs, floatingStyles, context } = useFloating({
    open: currentOpen,
    onOpenChange: handleOpenChange,
    placement: side,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { open: delay, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const contextValue: TooltipContextValue = React.useMemo(
    () => ({
      open: currentOpen,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      currentOpen,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    ],
  );

  return <TooltipContext value={contextValue}>{children}</TooltipContext>;
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
