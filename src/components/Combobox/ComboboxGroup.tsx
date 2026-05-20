"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import type { ComboboxGroupProps } from "@nuka/components/Combobox/Combobox.types";
import { ComboboxGroupContext } from "@nuka/components/Combobox/Combobox.context";

function ComboboxGroup({
  ref,
  label,
  className,
  children,
  ...props
}: ComboboxGroupProps) {
  const headingId = React.useId();

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
    <ComboboxGroupContext value={groupContextValue}>
      <div
        ref={ref}
        role="group"
        aria-labelledby={label != null ? headingId : undefined}
        hidden={!hasVisibleItems || undefined}
        className={cn(className)}
        data-slot="group"
        {...props}
      >
        {label != null && (
          <Text
            as="div"
            size="xs"
            weight="medium"
            color="muted"
            id={headingId}
            role="presentation"
            className="px-(--space-3) py-(--space-2)"
          >
            {label}
          </Text>
        )}
        {children}
      </div>
    </ComboboxGroupContext>
  );
}

ComboboxGroup.displayName = "ComboboxGroup";

export { ComboboxGroup };
