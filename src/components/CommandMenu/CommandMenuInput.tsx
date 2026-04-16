"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { getRovingIndex } from "@nuka/utils/roving-index";
import { useCommandMenuContext } from "@nuka/components/CommandMenu/CommandMenu.context";
import {
  getVisibleItems,
  SearchIcon,
} from "@nuka/components/CommandMenu/CommandMenu.utils";

export interface CommandMenuInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  ref?: React.Ref<HTMLInputElement> | undefined;
}

function CommandMenuInput({ ref, className, ...props }: CommandMenuInputProps) {
  const ctx = useCommandMenuContext();
  const internalRef = React.useRef<HTMLInputElement>(null);
  const composedRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    },
    [ref],
  );

  React.useEffect(() => {
    if (ctx.open) {
      requestAnimationFrame(() => {
        internalRef.current?.focus();
      });
    }
  }, [ctx.open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = getVisibleItems(ctx.listRef);
    const currentIdx = items.findIndex((el) => el.id === ctx.activeItemId);
    const nextIdx = getRovingIndex(e.key, currentIdx, items.length, "vertical");

    if (nextIdx !== undefined) {
      e.preventDefault();
      const next = items[nextIdx];
      if (next != null) {
        ctx.setActiveItemId(next.id);
      }
      return;
    }

    switch (e.key) {
      case "Enter": {
        e.preventDefault();
        if (ctx.activeItemId != null) {
          const activeEl = document.getElementById(ctx.activeItemId);
          if (
            activeEl != null &&
            activeEl.getAttribute("aria-disabled") !== "true"
          ) {
            activeEl.click();
          }
        }
        break;
      }
      case "Tab": {
        ctx.onOpenChange(false);
        break;
      }
      default:
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ctx.setFilter(e.target.value);
    ctx.setActiveItemId(null);
  };

  const activedescendant = ctx.activeItemId ?? undefined;

  return (
    <div
      className={cn(
        "flex items-center gap-(--space-2) px-(--space-3)",
        "border-b border-(--nuka-border-base)",
      )}
    >
      <Icon size="sm" color="muted">
        <SearchIcon />
      </Icon>
      <input
        ref={composedRef}
        id={ctx.inputId}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={true}
        aria-controls={ctx.listboxId}
        aria-activedescendant={activedescendant}
        value={ctx.filter}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex-1 bg-transparent py-(--space-3)",
          "text-sm text-(--nuka-text-base)",
          "placeholder:text-(--nuka-text-muted)",
          "outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}

CommandMenuInput.displayName = "CommandMenuInput";

export { CommandMenuInput };
