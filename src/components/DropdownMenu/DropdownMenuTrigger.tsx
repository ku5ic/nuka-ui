import * as React from "react";
import { Slot, composeRefs } from "@nuka/utils/slot";
import { useDropdownMenuContext } from "@nuka/components/DropdownMenu/DropdownMenu.context";

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ asChild = false, children, ...props }, ref) => {
  const ctx = useDropdownMenuContext();
  const composedRef = composeRefs(ref, ctx.refs.setReference);
  const Comp = asChild ? Slot : "button";
  const triggerProps = ctx.getReferenceProps(props);

  return (
    <Comp
      ref={composedRef}
      type={asChild ? undefined : "button"}
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      // Safe: Floating UI's getReferenceProps() returns Record<string, unknown>;
      // values are standard DOM event handlers (onClick, onKeyDown, etc.).
      {...(triggerProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </Comp>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export { DropdownMenuTrigger };
