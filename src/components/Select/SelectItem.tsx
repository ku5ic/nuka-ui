"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { useSelect } from "@nuka/components/Select/Select.context";

export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function getLabel(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  return "";
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, disabled = false, className, children }, ref) => {
    const ctx = useSelect();
    const internalRef = React.useRef<HTMLDivElement>(null);
    const composedRef = composeRefs(ref, internalRef);

    const isSelected = ctx.value === value;
    const isHighlighted = ctx.highlightedValue === value;
    const optionId = `${ctx.listboxId}-option-${value}`;
    const label = getLabel(children);

    React.useLayoutEffect(() => {
      ctx.registerOption(value, label, internalRef.current);
      return () => {
        ctx.unregisterOption(value);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- register once on mount, unregister on unmount
    }, []);

    React.useEffect(() => {
      ctx.registerDisabledOption(value, disabled);
    }, [ctx, value, disabled]);

    const handleClick = () => {
      if (disabled) return;
      ctx.onValueChange(value);
      ctx.onOpenChange(false);
    };

    return (
      <div
        ref={composedRef}
        id={optionId}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        className={cn(
          "px-(--space-3) py-(--space-2)",
          "text-sm",
          "cursor-pointer",
          "select-none",
          "text-(--nuka-text-base)",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          isSelected &&
            !isHighlighted &&
            "bg-(--nuka-accent-bg-subtle) text-(--nuka-accent-text)",
          isHighlighted && "bg-(--nuka-bg-muted) outline-none",
          !isSelected &&
            !isHighlighted &&
            !disabled &&
            "hover:bg-(--nuka-bg-muted)",
          className,
        )}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  },
);

SelectItem.displayName = "SelectItem";

export { SelectItem };
