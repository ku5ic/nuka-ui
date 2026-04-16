import type * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

import type { ComboboxTriggerVariantProps } from "@nuka/components/Combobox/Combobox.variants";

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
  ref?: React.Ref<HTMLButtonElement> | undefined;
  placeholder?: string;
}

export interface ComboboxContentProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  className?: string;
  children: React.ReactNode;
}

export interface ComboboxInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  ref?: React.Ref<HTMLInputElement> | undefined;
}

export interface ComboboxListboxProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export interface ComboboxOptionProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onSelect?: () => void;
}

export interface ComboboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  label?: string;
}

export interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

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
