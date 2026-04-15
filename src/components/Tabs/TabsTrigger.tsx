"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useTabsContext } from "@nuka/components/Tabs/Tabs.context";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, className, onClick, onFocus, ...props }, ref) => {
    const ctx = useTabsContext();
    const isSelected = ctx.value === value;
    const triggerId = `${ctx.baseId}-trigger-${value}`;
    const panelId = `${ctx.baseId}-panel-${value}`;

    const isFocusTarget = ctx.focusedValue
      ? ctx.focusedValue === value
      : isSelected;

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      ctx.setFocusedValue(value);
      if (ctx.activationMode === "automatic") {
        ctx.onValueChange(value);
      }
      onFocus?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.onValueChange(value);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={triggerId}
        aria-selected={isSelected}
        aria-controls={panelId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={isFocusTarget ? 0 : -1}
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap",
          "text-[length:var(--font-size-sm)]",
          "font-[number:var(--font-weight-medium)]",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-(--nuka-border-focus)",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer",
          "px-(--space-3) py-(--space-2)",
          "text-(--nuka-text-muted)",
          "hover:text-(--nuka-text-base)",
          "data-[state=active]:text-(--nuka-text-base)",
          "rounded-(--radius-md)",
          "data-[state=active]:bg-(--nuka-bg-base)",
          "data-[state=active]:shadow-sm",
          className,
        )}
        onFocus={handleFocus}
        onClick={handleClick}
        {...props}
      />
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export { TabsTrigger };
