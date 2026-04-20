"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Portal } from "@nuka/utils/portal";
import { useScrollLock } from "@nuka/hooks/use-scroll-lock";
import { useEscapeKey } from "@nuka/hooks/use-escape-key";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { getActiveElement } from "@nuka/utils/get-active-element";
import { CommandMenuContext } from "@nuka/components/CommandMenu/CommandMenu.context";
import { getVisibleItems } from "@nuka/components/CommandMenu/CommandMenu.utils";

export interface CommandMenuProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
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

  React.useEffect(() => {
    if (!open) return;
    const count = getVisibleItems(listRef).length;
    setVisibleCount(count);
  }, [open, filter]);

  React.useEffect(() => {
    if (open) {
      restoreRef.current = getActiveElement() as HTMLElement | null;
    } else if (restoreRef.current != null) {
      restoreRef.current.focus();
      restoreRef.current = null;
    }
  }, [open]);

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
          data-slot="overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
          data-slot="dialog"
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

export { CommandMenu };
