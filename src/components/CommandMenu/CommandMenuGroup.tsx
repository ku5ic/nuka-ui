"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useCommandMenuContext } from "@nuka/components/CommandMenu/CommandMenu.context";

export interface CommandMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  heading?: string;
}

function CommandMenuGroup({
  ref,
  heading,
  className,
  children,
  ...props
}: CommandMenuGroupProps) {
  const headingId = React.useId();
  const groupRef = React.useRef<HTMLDivElement>(null);
  const [hasVisibleItems, setHasVisibleItems] = React.useState(true);
  const ctx = useCommandMenuContext();

  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      groupRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    },
    [ref],
  );

  React.useEffect(() => {
    if (groupRef.current == null) return;
    const visible =
      groupRef.current.querySelector('[role="option"]:not([hidden])') !== null;
    setHasVisibleItems(visible);
  }, [ctx.filter]);

  return (
    <div
      ref={composedRef}
      role="group"
      aria-labelledby={heading != null ? headingId : undefined}
      hidden={!hasVisibleItems || undefined}
      className={cn(className)}
      {...props}
    >
      {heading != null && (
        <div
          id={headingId}
          role="presentation"
          className={cn(
            "text-xs font-[number:var(--font-weight-medium)] text-(--nuka-text-muted)",
            "px-(--space-3) py-(--space-2)",
          )}
        >
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

CommandMenuGroup.displayName = "CommandMenuGroup";

export { CommandMenuGroup };
