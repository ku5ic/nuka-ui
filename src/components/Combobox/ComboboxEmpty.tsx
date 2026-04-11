import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import type { ComboboxEmptyProps } from "@nuka/components/Combobox/Combobox.types";
import { useComboboxContext } from "@nuka/components/Combobox/Combobox.context";

const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useComboboxContext();

    if (ctx.visibleCount > 0) return null;

    return (
      <div
        ref={ref}
        role="presentation"
        className={cn("py-(--space-8) text-center", className)}
        {...props}
      >
        <Text size="sm" color="muted">
          {children}
        </Text>
      </div>
    );
  },
);

ComboboxEmpty.displayName = "ComboboxEmpty";

export { ComboboxEmpty };
