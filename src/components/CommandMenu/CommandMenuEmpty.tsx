"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { useCommandMenuContext } from "@nuka/components/CommandMenu/CommandMenu.context";

export interface CommandMenuEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

function CommandMenuEmpty({
  ref,
  className,
  children,
  ...props
}: CommandMenuEmptyProps) {
  const ctx = useCommandMenuContext();

  if (ctx.visibleCount > 0) return null;

  return (
    <div
      ref={ref}
      role="presentation"
      className={cn("py-(--space-8) text-center", className)}
      data-slot="empty"
      {...props}
    >
      <Text size="sm" color="muted">
        {children}
      </Text>
    </div>
  );
}

CommandMenuEmpty.displayName = "CommandMenuEmpty";

export { CommandMenuEmpty };
