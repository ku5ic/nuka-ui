import * as React from "react";
import { Slot, composeRefs } from "@nuka/utils/slot";
import { useTooltipContext } from "@nuka/components/Tooltip/TooltipContext";

export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const ctx = useTooltipContext();
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
  },
);

TooltipTrigger.displayName = "TooltipTrigger";

export { TooltipTrigger };
