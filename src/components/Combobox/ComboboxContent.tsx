"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Portal } from "@nuka/utils/portal";
import type { ComboboxContentProps } from "@nuka/components/Combobox/Combobox.types";
import { useComboboxContext } from "@nuka/components/Combobox/Combobox.context";

const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ className, children }, ref) => {
    const ctx = useComboboxContext();

    // When closed, render children in a hidden container so ComboboxOption
    // can register labels for the trigger to display. When open, render
    // in a Portal with Floating UI positioning.
    if (!ctx.open) {
      return (
        <div ref={ref} hidden>
          {children}
        </div>
      );
    }

    return (
      <Portal>
        <div
          ref={(node) => {
            if (typeof ref === "function") ref(node);
            else if (ref != null) ref.current = node;
            ctx.refs.setFloating(node);
          }}
          style={ctx.floatingStyles}
          {...ctx.getFloatingProps()}
          className={cn(
            "z-(--nuka-z-dropdown)",
            "bg-(--nuka-bg-base)",
            "border border-(--nuka-border-base)",
            "rounded-(--radius-md)",
            "shadow-(--nuka-shadow-overlay)",
            "overflow-hidden",
            className,
          )}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

ComboboxContent.displayName = "ComboboxContent";

export { ComboboxContent };
