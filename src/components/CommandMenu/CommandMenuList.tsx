"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useCommandMenuContext } from "@nuka/components/CommandMenu/CommandMenu.context";

export interface CommandMenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function CommandMenuList({ ref, className, ...props }: CommandMenuListProps) {
  const ctx = useCommandMenuContext();
  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      ctx.listRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    },
    [ref, ctx.listRef],
  );

  return (
    <div
      ref={composedRef}
      id={ctx.listboxId}
      role="listbox"
      aria-label="Suggestions"
      className={cn("overflow-y-auto max-h-80 p-(--space-1)", className)}
      {...props}
    />
  );
}

CommandMenuList.displayName = "CommandMenuList";

export { CommandMenuList };
