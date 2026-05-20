"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import {
  useCommandMenuContext,
  CommandMenuGroupContext,
} from "@nuka/components/CommandMenu/CommandMenu.context";

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
  useCommandMenuContext();

  const [visibleItemIds, setVisibleItemIds] = React.useState(
    () => new Set<string>(),
  );
  const hasVisibleItems = visibleItemIds.size > 0;

  const registerItemVisibility = React.useCallback(
    (id: string, visible: boolean) => {
      setVisibleItemIds((prev) => {
        const next = new Set(prev);
        if (visible) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    },
    [],
  );

  const unregisterItem = React.useCallback((id: string) => {
    setVisibleItemIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const groupContextValue = React.useMemo(
    () => ({ registerItemVisibility, unregisterItem }),
    [registerItemVisibility, unregisterItem],
  );

  return (
    <CommandMenuGroupContext value={groupContextValue}>
      <div
        ref={ref}
        role="group"
        aria-labelledby={heading != null ? headingId : undefined}
        hidden={!hasVisibleItems || undefined}
        className={cn(className)}
        data-slot="group"
        {...props}
      >
        {heading != null && (
          <div
            id={headingId}
            role="presentation"
            data-slot="group-heading"
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
    </CommandMenuGroupContext>
  );
}

CommandMenuGroup.displayName = "CommandMenuGroup";

export { CommandMenuGroup };
