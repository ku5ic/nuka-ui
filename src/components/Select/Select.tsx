"use client";
import * as React from "react";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { useOptionRegistry } from "@nuka/hooks/use-option-registry";
import { composeRefs } from "@nuka/utils/slot";
import { SelectContext } from "@nuka/components/Select/Select.context";
import type { SelectContextValue } from "@nuka/components/Select/Select.context";

export interface SelectProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  children: React.ReactNode;
  value?: string | undefined;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  name?: string;
}

function Select({
  ref,
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  name,
}: SelectProps) {
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
  const [highlightedValue, setHighlightedValue] = React.useState<
    string | undefined
  >(undefined);

  const registry = useOptionRegistry();
  const rootRef = React.useRef<HTMLDivElement>(null);

  const generatedId = React.useId();
  const listboxId = `${generatedId}-listbox`;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        setHighlightedValue(undefined);
      }
    },
    [setOpen],
  );

  // TODO: extract to useOutsideClick or migrate to Floating UI useDismiss
  // when SelectContent moves to Portal rendering (deferred from audit batch 2).
  // Close on outside click. Manual listener because Select uses absolute
  // positioning (ADR-013), not Floating UI. A Portal + useFloating refactor
  // would unify this with useDismiss but requires rearchitecting SelectContent.
  React.useEffect(() => {
    if (!currentOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        handleOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [currentOpen, handleOpenChange]);

  const contextValue: SelectContextValue = React.useMemo(() => {
    void registry.registryVersion;
    return {
      open: currentOpen,
      value: currentValue,
      highlightedValue,
      disabled,
      listboxId,
      onOpenChange: handleOpenChange,
      onValueChange: handleValueChange,
      onHighlightChange: setHighlightedValue,
      registerOption: registry.registerOption,
      unregisterOption: registry.unregisterOption,
      getOptions: registry.getOptions,
      getOptionLabel: registry.getOptionLabel,
      getOptionRef: registry.getOptionRef,
      isOptionDisabled: registry.isOptionDisabled,
      registerDisabledOption: registry.registerDisabledOption,
    };
  }, [
    currentOpen,
    currentValue,
    highlightedValue,
    disabled,
    listboxId,
    handleOpenChange,
    handleValueChange,
    registry,
  ]);

  return (
    <SelectContext value={contextValue}>
      <div
        ref={composeRefs(ref, rootRef)}
        data-slot="root"
        className="relative inline-block w-full"
      >
        {children}
        {name !== undefined && (
          <input type="hidden" name={name} value={currentValue ?? ""} />
        )}
      </div>
    </SelectContext>
  );
}

Select.displayName = "Select";

export { Select };
