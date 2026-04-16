"use client";
// > 200 lines: root orchestrates Floating UI, option registry, and context
// value assembly; splitting further would scatter tightly coupled state.
import * as React from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
} from "@floating-ui/react";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { useOptionRegistry } from "@nuka/hooks/use-option-registry";
import { getActiveElement } from "@nuka/utils/get-active-element";
import { ComboboxContext } from "@nuka/components/Combobox/Combobox.context";
import type {
  ComboboxProps,
  ComboboxContextValue,
} from "@nuka/components/Combobox/Combobox.types";

function Combobox({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  freeText = false,
  name,
}: ComboboxProps) {
  const [currentValue, handleValueChange] = useControllableState(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const [currentOpen, setOpen] = useControllableState(
    controlledOpen,
    defaultOpen,
    onOpenChange,
  );
  const [filterText, setFilterText] = React.useState("");
  const [activeDescendantId, setActiveDescendantId] = React.useState<
    string | undefined
  >(undefined);
  const [visibleCount, setVisibleCount] = React.useState(0);

  // labelMapRef persists option labels across open/close for trigger display
  const labelMapRef = React.useRef(new Map<string, string>());
  const registry = useOptionRegistry();

  const generatedId = React.useId();
  const listboxId = `${generatedId}-listbox`;
  const inputId = `${generatedId}-input`;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const highlightOnOpenRef = React.useRef<"first" | "last" | null>(null);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        setFilterText("");
        setActiveDescendantId(undefined);
      }
    },
    [setOpen],
  );

  // Restore focus to trigger when panel closes and focus is lost to body
  const prevOpenRef = React.useRef(currentOpen);
  React.useEffect(() => {
    if (prevOpenRef.current && !currentOpen) {
      requestAnimationFrame(() => {
        const active = getActiveElement();
        if (active === document.body || active === null) {
          triggerRef.current?.focus();
        }
      });
    }
    prevOpenRef.current = currentOpen;
  }, [currentOpen]);

  // Floating UI: no useRole to avoid ARIA injection conflicts
  const { refs, floatingStyles, context } = useFloating({
    open: currentOpen,
    onOpenChange: handleOpenChange,
    placement: "bottom-start",
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${String(rects.reference.width)}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  // Wraps the hook's registerOption to also persist labels in labelMapRef
  const registerOption = React.useCallback(
    (optionValue: string, label: string, ref: HTMLElement | null) => {
      labelMapRef.current.set(optionValue, label);
      registry.registerOption(optionValue, label, ref);
    },
    [registry],
  );

  // Labels are read from labelMapRef so they persist across panel close/open
  const getOptionLabel = React.useCallback(
    (optionValue: string): string | undefined => {
      return labelMapRef.current.get(optionValue);
    },
    [],
  );

  const contextValue: ComboboxContextValue = React.useMemo(() => {
    void registry.registryVersion;
    return {
      open: currentOpen,
      onOpenChange: handleOpenChange,
      value: currentValue,
      onValueChange: handleValueChange,
      filterText,
      setFilterText,
      activeDescendantId,
      setActiveDescendantId,
      visibleCount,
      setVisibleCount,
      disabled,
      freeText,
      listboxId,
      inputId,
      listRef,
      triggerRef,
      highlightOnOpenRef,
      registerOption,
      unregisterOption: registry.unregisterOption,
      getOptions: registry.getOptions,
      getOptionLabel,
      getOptionRef: registry.getOptionRef,
      isOptionDisabled: registry.isOptionDisabled,
      registerDisabledOption: registry.registerDisabledOption,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
    };
  }, [
    currentOpen,
    handleOpenChange,
    currentValue,
    handleValueChange,
    filterText,
    activeDescendantId,
    visibleCount,
    disabled,
    freeText,
    listboxId,
    inputId,
    registerOption,
    getOptionLabel,
    registry,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  ]);

  return (
    <ComboboxContext value={contextValue}>
      {children}
      {name !== undefined && (
        <input type="hidden" name={name} value={currentValue ?? ""} />
      )}
    </ComboboxContext>
  );
}

Combobox.displayName = "Combobox";

export { Combobox };
