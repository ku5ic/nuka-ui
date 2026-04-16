import * as React from "react";
import { cn } from "@nuka/utils/cn";

export interface CommandMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement> | undefined;
}

function CommandMenuShortcut({
  ref,
  className,
  ...props
}: CommandMenuShortcutProps) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("ml-auto text-xs text-(--nuka-text-muted)", className)}
      {...props}
    />
  );
}

CommandMenuShortcut.displayName = "CommandMenuShortcut";

export { CommandMenuShortcut };
