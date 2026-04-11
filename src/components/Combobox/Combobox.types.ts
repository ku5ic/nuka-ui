import type * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

import type { ComboboxTriggerVariantProps } from "@nuka/components/Combobox/Combobox.variants";

export interface OptionEntry {
  label: string;
  ref: HTMLElement | null;
  disabled: boolean;
}

export interface ComboboxProps {
  children: React.ReactNode;
  value?: string | undefined;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  freeText?: boolean;
  name?: string;
}

export interface ComboboxTriggerProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    ComboboxTriggerVariantProps {
  placeholder?: string;
}

export interface ComboboxContentProps {
  className?: string;
  children: React.ReactNode;
}

export interface ComboboxInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {}

export interface ComboboxListboxProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ComboboxOptionProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onSelect?: () => void;
}

export interface ComboboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ComboboxContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string | undefined;
  onValueChange: (value: string) => void;
  filterText: string;
  setFilterText: (text: string) => void;
  activeDescendantId: string | undefined;
  setActiveDescendantId: (id: string | undefined) => void;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
  freeText: boolean;
  listboxId: string;
  inputId: string;
  listRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  highlightOnOpenRef: React.RefObject<"first" | "last" | null>;
  registerOption: (
    value: string,
    label: string,
    ref: HTMLElement | null,
  ) => void;
  unregisterOption: (value: string) => void;
  getOptions: () => string[];
  getOptionLabel: (value: string) => string | undefined;
  getOptionRef: (value: string) => HTMLElement | null | undefined;
  isOptionDisabled: (value: string) => boolean;
  registerDisabledOption: (value: string, disabled: boolean) => void;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
}
