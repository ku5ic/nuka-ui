import * as React from "react";
import { Slot, composeRefs } from "@vault/utils/slot";
import { usePopoverContext } from "@vault/components/Popover/PopoverContext";

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild = false, children, ...props }, ref) => {
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
});

PopoverTrigger.displayName = "PopoverTrigger";

export { PopoverTrigger };
