"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import type { ComboboxInputProps } from "@nuka/components/Combobox/Combobox.types";
import { useComboboxContext } from "@nuka/components/Combobox/Combobox.context";
import { getNavigableOptions } from "@nuka/components/Combobox/Combobox.utils";

function ComboboxInput({ ref, className, ...props }: ComboboxInputProps) {
  const ctx = useComboboxContext();
  const internalRef = React.useRef<HTMLInputElement>(null);

  const composedRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref != null) ref.current = node;
    },
    [ref],
  );

  // Focus input and apply highlight directive when panel opens.
  // No rAF: by the time useEffect fires, Portal content and callback refs
  // are committed, so the input and option elements are in the DOM.
  // Empty deps: component unmounts on close and remounts on open.
  React.useEffect(() => {
    internalRef.current?.focus();

    const dir = ctx.highlightOnOpenRef.current;
    if (dir != null) {
      ctx.highlightOnOpenRef.current = null;
      const items = getNavigableOptions(ctx.listRef);
      if (items.length > 0) {
        const target = dir === "first" ? items[0] : items[items.length - 1];
        if (target != null) {
          ctx.setActiveDescendantId(target.id);
          if (typeof target.scrollIntoView === "function") {
            target.scrollIntoView({ block: "nearest" });
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount when panel opens
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = getNavigableOptions(ctx.listRef);

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (items.length === 0) return;
        const currentIdx = items.findIndex(
          (el) => el.id === ctx.activeDescendantId,
        );
        const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % items.length;
        const next = items[nextIdx];
        if (next != null) {
          ctx.setActiveDescendantId(next.id);
          if (typeof next.scrollIntoView === "function") {
            next.scrollIntoView({ block: "nearest" });
          }
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (items.length === 0) return;
        const currentIdx = items.findIndex(
          (el) => el.id === ctx.activeDescendantId,
        );
        const prevIdx =
          currentIdx === -1
            ? items.length - 1
            : (currentIdx - 1 + items.length) % items.length;
        const prev = items[prevIdx];
        if (prev != null) {
          ctx.setActiveDescendantId(prev.id);
          if (typeof prev.scrollIntoView === "function") {
            prev.scrollIntoView({ block: "nearest" });
          }
        }
        break;
      }
      case "Home": {
        e.preventDefault();
        const first = items[0];
        if (first != null) {
          ctx.setActiveDescendantId(first.id);
          if (typeof first.scrollIntoView === "function") {
            first.scrollIntoView({ block: "nearest" });
          }
        }
        break;
      }
      case "End": {
        e.preventDefault();
        const last = items[items.length - 1];
        if (last != null) {
          ctx.setActiveDescendantId(last.id);
          if (typeof last.scrollIntoView === "function") {
            last.scrollIntoView({ block: "nearest" });
          }
        }
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (ctx.activeDescendantId != null) {
          const activeEl = document.getElementById(ctx.activeDescendantId);
          if (
            activeEl != null &&
            activeEl.getAttribute("aria-disabled") !== "true"
          ) {
            activeEl.click();
          }
        } else if (ctx.freeText && ctx.filterText !== "") {
          ctx.onValueChange(ctx.filterText);
          ctx.onOpenChange(false);
          ctx.triggerRef.current?.focus();
        }
        break;
      }
      case "Escape": {
        ctx.onOpenChange(false);
        ctx.triggerRef.current?.focus();
        break;
      }
      case "Tab": {
        ctx.triggerRef.current?.focus();
        ctx.onOpenChange(false);
        break;
      }
      default:
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ctx.setFilterText(e.target.value);
    ctx.setActiveDescendantId(undefined);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3)",
        "border-b border-(--nuka-border-base)",
      )}
    >
      <Icon size="sm" color="muted">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </Icon>
      <input
        {...props}
        ref={composedRef}
        id={ctx.inputId}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={ctx.open}
        aria-controls={ctx.listboxId}
        aria-activedescendant={ctx.activeDescendantId}
        value={ctx.filterText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex-1 bg-transparent py-(--space-3)",
          "text-sm text-(--nuka-text-base)",
          "placeholder:text-(--nuka-text-muted)",
          "outline-none",
          className,
        )}
      />
    </div>
  );
}

ComboboxInput.displayName = "ComboboxInput";

export { ComboboxInput };
