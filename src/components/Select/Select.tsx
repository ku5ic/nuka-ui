import * as React from "react";
import { useControllableState } from "@nuka/utils/use-controllable-state";
import { composeRefs } from "@nuka/utils/slot";
import { SelectContext } from "@nuka/components/Select/SelectContext";
import type { SelectContextValue } from "@nuka/components/Select/SelectContext";

export interface SelectProps {
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

interface OptionEntry {
  label: string;
  ref: HTMLElement | null;
  disabled: boolean;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      name,
    },
    ref,
  ) => {
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

    const optionsRef = React.useRef(new Map<string, OptionEntry>());
    const [registryVersion, setRegistryVersion] = React.useState(0);
    const bumpRegistry = React.useCallback(() => {
      setRegistryVersion((v) => v + 1);
    }, []);
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

    const registerOption = React.useCallback(
      (optionValue: string, label: string, ref: HTMLElement | null) => {
        const existing = optionsRef.current.get(optionValue);
        optionsRef.current.set(optionValue, {
          label,
          ref,
          disabled: existing?.disabled ?? false,
        });
        bumpRegistry();
      },
      [bumpRegistry],
    );

    const unregisterOption = React.useCallback(
      (optionValue: string) => {
        optionsRef.current.delete(optionValue);
        bumpRegistry();
      },
      [bumpRegistry],
    );

    const getOptions = React.useCallback((): string[] => {
      return Array.from(optionsRef.current.keys());
    }, []);

    const getOptionLabel = React.useCallback(
      (optionValue: string): string | undefined => {
        return optionsRef.current.get(optionValue)?.label;
      },
      [],
    );

    const getOptionRef = React.useCallback(
      (optionValue: string): HTMLElement | null | undefined => {
        return optionsRef.current.get(optionValue)?.ref;
      },
      [],
    );

    const isOptionDisabled = React.useCallback(
      (optionValue: string): boolean => {
        return optionsRef.current.get(optionValue)?.disabled ?? false;
      },
      [],
    );

    const registerDisabledOption = React.useCallback(
      (optionValue: string, optionDisabled: boolean) => {
        const existing = optionsRef.current.get(optionValue);
        if (existing) {
          existing.disabled = optionDisabled;
        }
      },
      [],
    );

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
      // registryVersion is read to invalidate the memo when options register/unregister
      void registryVersion;
      return {
        open: currentOpen,
        value: currentValue,
        highlightedValue,
        disabled,
        listboxId,
        onOpenChange: handleOpenChange,
        onValueChange: handleValueChange,
        onHighlightChange: setHighlightedValue,
        registerOption,
        unregisterOption,
        getOptions,
        getOptionLabel,
        getOptionRef,
        isOptionDisabled,
        registerDisabledOption,
      };
    }, [
      currentOpen,
      currentValue,
      highlightedValue,
      disabled,
      listboxId,
      handleOpenChange,
      handleValueChange,
      registerOption,
      unregisterOption,
      getOptions,
      getOptionLabel,
      getOptionRef,
      isOptionDisabled,
      registerDisabledOption,
      registryVersion,
    ]);

    return (
      <SelectContext value={contextValue}>
        <div
          ref={composeRefs(ref, rootRef)}
          className="relative inline-block w-full"
        >
          {children}
          {name !== undefined && (
            <input type="hidden" name={name} value={currentValue ?? ""} />
          )}
        </div>
      </SelectContext>
    );
  },
);

Select.displayName = "Select";

export { Select };
