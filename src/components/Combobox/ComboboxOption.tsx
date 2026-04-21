"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import type { ComboboxOptionProps } from "@nuka/components/Combobox/Combobox.types";
import { useComboboxContext } from "@nuka/components/Combobox/Combobox.context";
import { getLabel } from "@nuka/components/Combobox/Combobox.utils";

function ComboboxOption({
  ref,
  value,
  disabled = false,
  className,
  children,
  onSelect,
}: ComboboxOptionProps) {
  const ctx = useComboboxContext();
  const internalRef = React.useRef<HTMLDivElement>(null);

  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref != null) ref.current = node;
    },
    [ref],
  );

  const isSelected = ctx.value === value;
  const optionId = `${ctx.listboxId}-option-${value}`;
  const label = getLabel(children);

  const isFiltered =
    ctx.filterText !== "" &&
    !label.toLowerCase().includes(ctx.filterText.toLowerCase());

  const isActive = ctx.activeDescendantId === optionId;

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

  React.useEffect(() => {
    if (isActive && internalRef.current != null) {
      if (typeof internalRef.current.scrollIntoView === "function") {
        internalRef.current.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isActive]);

  const handleClick = () => {
    if (disabled) return;
    ctx.onValueChange(value);
    onSelect?.();
    ctx.onOpenChange(false);
  };

  return (
    <div
      ref={composedRef}
      id={optionId}
      data-slot="item"
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      hidden={isFiltered || undefined}
      className={cn(
        "px-(--space-3) py-(--space-2)",
        "text-sm",
        "cursor-pointer",
        "select-none",
        "text-(--nuka-text-base)",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        isSelected &&
          !isActive &&
          "bg-(--nuka-accent-bg-subtle) text-(--nuka-accent-text)",
        isActive && "bg-(--nuka-bg-muted) outline-none",
        !isSelected && !isActive && !disabled && "hover:bg-(--nuka-bg-muted)",
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

ComboboxOption.displayName = "ComboboxOption";

export { ComboboxOption };
