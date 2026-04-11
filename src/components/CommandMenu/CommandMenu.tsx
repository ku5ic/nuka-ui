import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Portal } from "@nuka/utils/portal";
import { useScrollLock } from "@nuka/utils/use-scroll-lock";
import { useEscapeKey } from "@nuka/utils/use-escape-key";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { Icon } from "@nuka/components/Icon";
import { Text } from "@nuka/components/Text";
import {
  CommandMenuContext,
  useCommandMenuContext,
} from "@nuka/components/CommandMenu/CommandMenuContext";

export interface CommandMenuProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function getVisibleItems(
  listRef: React.RefObject<HTMLDivElement | null>,
): HTMLElement[] {
  if (listRef.current == null) return [];
  return Array.from(
    listRef.current.querySelectorAll<HTMLElement>(
      '[role="option"]:not([hidden])',
    ),
  );
}

function CommandMenu({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: CommandMenuProps) {
  const [open, setOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );

  const [filter, setFilter] = React.useState("");
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
  const [visibleCount, setVisibleCount] = React.useState(0);

  const baseId = React.useId();
  const listboxId = `${baseId}-listbox`;
  const inputId = `${baseId}-input`;
  const listRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);

  useScrollLock(open);
  useEscapeKey(
    React.useCallback(() => setOpen(false), [setOpen]),
    open,
  );

  // Update visibleCount after each filter change
  React.useEffect(() => {
    if (!open) return;
    const count = getVisibleItems(listRef).length;
    setVisibleCount(count);
  }, [open, filter]);

  // Save focus on open, restore on close
  React.useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement as HTMLElement | null;
    } else if (restoreRef.current != null) {
      restoreRef.current.focus();
      restoreRef.current = null;
    }
  }, [open]);

  // Reset filter and active item when closing
  React.useEffect(() => {
    if (!open) {
      setFilter("");
      setActiveItemId(null);
    }
  }, [open]);

  const contextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: setOpen,
      filter,
      setFilter,
      activeItemId,
      setActiveItemId,
      visibleCount,
      baseId,
      listboxId,
      inputId,
      listRef,
    }),
    [
      open,
      setOpen,
      filter,
      activeItemId,
      visibleCount,
      baseId,
      listboxId,
      inputId,
    ],
  );

  if (!open) return null;

  return (
    <CommandMenuContext value={contextValue}>
      <Portal>
        <div
          className={cn(
            "fixed inset-0 z-(--nuka-z-modal)",
            "bg-(--nuka-bg-overlay)",
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={cn(
            "fixed z-(--nuka-z-modal)",
            "left-1/2 top-[20%] -translate-x-1/2",
            "w-full max-w-lg",
            "rounded-(--radius-xl) border border-(--nuka-border-base)",
            "bg-(--nuka-bg-base) shadow-(--nuka-shadow-modal)",
            "overflow-hidden",
          )}
        >
          {children}
        </div>
      </Portal>
    </CommandMenuContext>
  );
}

CommandMenu.displayName = "CommandMenu";

const SearchIcon = () => (
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
);

export interface CommandMenuInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {}

const CommandMenuInput = React.forwardRef<
  HTMLInputElement,
  CommandMenuInputProps
>(({ className, ...props }, ref) => {
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

  // Focus input when the menu opens
  React.useEffect(() => {
    if (ctx.open) {
      requestAnimationFrame(() => {
        internalRef.current?.focus();
      });
    }
  }, [ctx.open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = getVisibleItems(ctx.listRef);

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (items.length === 0) return;
        const currentIdx = items.findIndex((el) => el.id === ctx.activeItemId);
        const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % items.length;
        const next = items[nextIdx];
        if (next != null) {
          ctx.setActiveItemId(next.id);
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (items.length === 0) return;
        const currentIdx = items.findIndex((el) => el.id === ctx.activeItemId);
        const prevIdx =
          currentIdx === -1
            ? items.length - 1
            : (currentIdx - 1 + items.length) % items.length;
        const prev = items[prevIdx];
        if (prev != null) {
          ctx.setActiveItemId(prev.id);
        }
        break;
      }
      case "Home": {
        e.preventDefault();
        const first = items[0];
        if (first != null) {
          ctx.setActiveItemId(first.id);
        }
        break;
      }
      case "End": {
        e.preventDefault();
        const last = items[items.length - 1];
        if (last != null) {
          ctx.setActiveItemId(last.id);
        }
        break;
      }
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
});

CommandMenuInput.displayName = "CommandMenuInput";

export interface CommandMenuListProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandMenuList = React.forwardRef<HTMLDivElement, CommandMenuListProps>(
  ({ className, ...props }, ref) => {
    const ctx = useCommandMenuContext();
    const composedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        ctx.listRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          ref.current = node;
        }
      },
      [ref, ctx.listRef],
    );

    return (
      <div
        ref={composedRef}
        id={ctx.listboxId}
        role="listbox"
        aria-label="Suggestions"
        className={cn("overflow-y-auto max-h-80 p-(--space-1)", className)}
        {...props}
      />
    );
  },
);

CommandMenuList.displayName = "CommandMenuList";

export interface CommandMenuEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandMenuEmpty = React.forwardRef<
  HTMLDivElement,
  CommandMenuEmptyProps
>(({ className, children, ...props }, ref) => {
  const ctx = useCommandMenuContext();

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
});

CommandMenuEmpty.displayName = "CommandMenuEmpty";

export interface CommandMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
}

const CommandMenuGroup = React.forwardRef<
  HTMLDivElement,
  CommandMenuGroupProps
>(({ heading, className, children, ...props }, ref) => {
  const headingId = React.useId();
  const groupRef = React.useRef<HTMLDivElement>(null);
  const [hasVisibleItems, setHasVisibleItems] = React.useState(true);
  const ctx = useCommandMenuContext();

  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      groupRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    },
    [ref],
  );

  React.useEffect(() => {
    if (groupRef.current == null) return;
    const visible =
      groupRef.current.querySelector('[role="option"]:not([hidden])') !== null;
    setHasVisibleItems(visible);
  }, [ctx.filter]);

  return (
    <div
      ref={composedRef}
      role="group"
      aria-labelledby={heading != null ? headingId : undefined}
      hidden={!hasVisibleItems || undefined}
      className={cn(className)}
      {...props}
    >
      {heading != null && (
        <div
          id={headingId}
          role="presentation"
          className={cn(
            "text-xs font-medium text-(--nuka-text-muted)",
            "px-(--space-3) py-(--space-2)",
          )}
        >
          {heading}
        </div>
      )}
      {children}
    </div>
  );
});

CommandMenuGroup.displayName = "CommandMenuGroup";

export interface CommandMenuItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  value?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

const CommandMenuItem = React.forwardRef<HTMLDivElement, CommandMenuItemProps>(
  (
    { value, disabled = false, onSelect, className, children, ...props },
    ref,
  ) => {
    const ctx = useCommandMenuContext();
    const itemId = React.useId();
    const internalRef = React.useRef<HTMLDivElement>(null);

    const composedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          ref.current = node;
        }
      },
      [ref],
    );

    const isFiltered =
      value != null &&
      ctx.filter !== "" &&
      !value.toLowerCase().includes(ctx.filter.toLowerCase());

    const isActive = ctx.activeItemId === itemId;

    // Auto-scroll active item into view
    React.useEffect(() => {
      if (isActive && internalRef.current != null) {
        internalRef.current.scrollIntoView({ block: "nearest" });
      }
    }, [isActive]);

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
      ctx.onOpenChange(false);
    };

    return (
      <div
        ref={composedRef}
        id={itemId}
        role="option"
        aria-selected={isActive}
        aria-disabled={disabled || undefined}
        hidden={isFiltered || undefined}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-(--space-2)",
          "px-(--space-3) py-(--space-2)",
          "rounded-(--radius-md) text-sm cursor-default",
          "select-none",
          isActive && "bg-(--nuka-bg-muted)",
          disabled ? "text-(--nuka-text-disabled)" : "text-(--nuka-text-base)",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CommandMenuItem.displayName = "CommandMenuItem";

export interface CommandMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

const CommandMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  CommandMenuShortcutProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn("ml-auto text-xs text-(--nuka-text-muted)", className)}
    {...props}
  />
));

CommandMenuShortcut.displayName = "CommandMenuShortcut";

export {
  CommandMenu,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuShortcut,
};
