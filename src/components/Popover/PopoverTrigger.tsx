"use client";
import * as React from "react";
import { Slot, composeRefs } from "@nuka/utils/slot";
import { usePopoverContext } from "@nuka/components/Popover/Popover.context";

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  asChild?: boolean;
}

function PopoverTrigger({
  ref,
  asChild = false,
  children,
  ...props
}: PopoverTriggerProps) {
  const ctx = usePopoverContext();
  const composedRef = composeRefs(ref, ctx.refs.setReference);

  const Comp = asChild ? Slot : "button";

  const triggerProps = ctx.getReferenceProps(props);

  return (
    <Comp
      ref={composedRef}
      type={asChild ? undefined : "button"}
      {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </Comp>
  );
}

PopoverTrigger.displayName = "PopoverTrigger";

export { PopoverTrigger };
