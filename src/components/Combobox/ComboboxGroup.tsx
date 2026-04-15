"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import type { ComboboxGroupProps } from "@nuka/components/Combobox/Combobox.types";
import { useComboboxContext } from "@nuka/components/Combobox/Combobox.context";

const ComboboxGroup = React.forwardRef<HTMLDivElement, ComboboxGroupProps>(
  ({ label, className, children, ...props }, ref) => {
    const headingId = React.useId();
    const groupRef = React.useRef<HTMLDivElement>(null);
    const [hasVisibleItems, setHasVisibleItems] = React.useState(true);
    const ctx = useComboboxContext();

    const composedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        groupRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref != null) ref.current = node;
      },
      [ref],
    );

    React.useEffect(() => {
      if (groupRef.current == null) return;
      const visible =
        groupRef.current.querySelector('[role="option"]:not([hidden])') !==
        null;
      setHasVisibleItems(visible);
    }, [ctx.filterText]);

    return (
      <div
        ref={composedRef}
        role="group"
        aria-labelledby={label != null ? headingId : undefined}
        hidden={!hasVisibleItems || undefined}
        className={cn(className)}
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
    );
  },
);

ComboboxGroup.displayName = "ComboboxGroup";

export { ComboboxGroup };
