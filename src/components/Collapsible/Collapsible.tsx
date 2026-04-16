"use client";
import * as React from "react";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { CollapsibleContext } from "@nuka/components/Collapsible/Collapsible.context";

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

function Collapsible({
  ref,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  disabled = false,
  className,
  ...props
}: CollapsibleProps) {
  const [open, setOpen] = useControllableState(
    controlledOpen,
    defaultOpen ?? false,
    onOpenChange,
  );
  const contentId = React.useId();
  const triggerId = React.useId();

  const contextValue = React.useMemo(
    () => ({ open, onOpenChange: setOpen, contentId, triggerId, disabled }),
    [open, setOpen, contentId, triggerId, disabled],
  );

  return (
    <CollapsibleContext value={contextValue}>
      <div
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={className}
        {...props}
      />
    </CollapsibleContext>
  );
}

Collapsible.displayName = "Collapsible";

export { Collapsible };
