import * as React from "react";
import { Slot } from "@nuka/utils/slot";
import { cn } from "@nuka/utils/cn";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import {
  CollapsibleContext,
  useCollapsibleContext,
} from "./CollapsibleContext";

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

    const contextValue = React.useMemo(
      () => ({ open, onOpenChange: setOpen, contentId, disabled }),
      [open, setOpen, contentId, disabled],
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

export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ asChild = false, className, onClick, ...props }, ref) => {
  const { open, onOpenChange, contentId, disabled } =
    useCollapsibleContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpenChange(!open);
    onClick?.(e);
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      data-state={open ? "open" : "closed"}
      className={className}
      onClick={handleClick}
      {...props}
    />
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { open, contentId } = useCollapsibleContext();

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out",
        "data-[state=open]:grid-rows-[1fr]",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
