"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import type { ComboboxListboxProps } from "@nuka/components/Combobox/Combobox.types";
import { useComboboxContext } from "@nuka/components/Combobox/Combobox.context";

function ComboboxListbox({
  ref,
  className,
  children,
  ...props
}: ComboboxListboxProps) {
  const ctx = useComboboxContext();

  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      ctx.listRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref != null) ref.current = node;
    },
    [ref, ctx.listRef],
  );

  const { filterText, setVisibleCount, listRef } = ctx;

  // Count visible options for ComboboxEmpty. Layout effect avoids
  // flash-of-empty-state by updating before paint.
  React.useLayoutEffect(() => {
    if (listRef.current == null) return;
    const count = listRef.current.querySelectorAll(
      '[role="option"]:not([hidden])',
    ).length;
    setVisibleCount(count);
  }, [filterText, setVisibleCount, listRef]);

  return (
    <div
      ref={composedRef}
      id={ctx.listboxId}
      role="listbox"
      aria-label="Options"
      className={cn("max-h-[280px] overflow-y-auto p-(--space-1)", className)}
      {...props}
    >
      {children}
    </div>
  );
}

ComboboxListbox.displayName = "ComboboxListbox";

export { ComboboxListbox };
