"use client";
import * as React from "react";
import { Slot, composeRefs } from "@nuka/utils/slot";
import { useTooltipContext } from "@nuka/components/Tooltip/Tooltip.context";

export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
}

function TooltipTrigger({
  ref,
  asChild = false,
  children,
  ...props
}: TooltipTriggerProps) {
  const ctx = useTooltipContext();
  const composedRef = composeRefs(ref, ctx.refs.setReference);

  const Comp = asChild ? Slot : "button";

  const triggerProps = ctx.getReferenceProps(props);

  return (
    <Comp
      ref={composedRef}
      type={asChild ? undefined : "button"}
      data-slot="trigger"
      // Safe: Floating UI getReferenceProps() returns Record<string, unknown>;
      // values are standard DOM event handlers.
      {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </Comp>
  );
}

TooltipTrigger.displayName = "TooltipTrigger";

export { TooltipTrigger };
