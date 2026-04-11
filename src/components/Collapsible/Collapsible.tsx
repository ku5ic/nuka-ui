import * as React from "react";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import {
  CollapsibleContext,
} from "@nuka/components/Collapsible/Collapsible.context";

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      defaultOpen,
      onOpenChange,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
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
  },
);

Collapsible.displayName = "Collapsible";

export { Collapsible };
