"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useCommandMenuContext } from "@nuka/components/CommandMenu/CommandMenu.context";

export interface CommandMenuItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  value?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

function CommandMenuItem({
  ref,
  value,
  disabled = false,
  onSelect,
  className,
  children,
  ...props
}: CommandMenuItemProps) {
  const ctx = useCommandMenuContext();
  const itemId = React.useId();
  const internalRef = React.useRef<HTMLDivElement>(null);

  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    },
    [ref],
  );

  const isFiltered =
    value != null &&
    ctx.filter !== "" &&
    !value.toLowerCase().includes(ctx.filter.toLowerCase());

  const isActive = ctx.activeItemId === itemId;

  React.useEffect(() => {
    if (isActive && internalRef.current != null) {
      internalRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [isActive]);

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    ctx.onOpenChange(false);
  };

  return (
    <div
      ref={composedRef}
      id={itemId}
      role="option"
      aria-selected={isActive}
      aria-disabled={disabled || undefined}
      hidden={isFiltered || undefined}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-(--space-2)",
        "px-(--space-3) py-(--space-2)",
        "rounded-(--radius-md) text-sm cursor-default",
        "select-none",
        isActive && "bg-(--nuka-bg-muted)",
        disabled ? "text-(--nuka-text-disabled)" : "text-(--nuka-text-base)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

CommandMenuItem.displayName = "CommandMenuItem";

export { CommandMenuItem };
