import * as React from "react";
import type { useFloating, useInteractions } from "@floating-ui/react";

export interface DatePickerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  onSelectedDateChange: (date: Date | undefined) => void;
  focusedDate: Date;
  setFocusedDate: (date: Date) => void;
  disabled: boolean;
  min: Date | undefined;
  max: Date | undefined;
  refs: ReturnType<typeof useFloating>["refs"];
  floatingStyles: React.CSSProperties;
  getReferenceProps: ReturnType<typeof useInteractions>["getReferenceProps"];
  getFloatingProps: ReturnType<typeof useInteractions>["getFloatingProps"];
  baseId: string;
  triggerButtonRef: React.RefObject<HTMLButtonElement | null>;
  focusCalendarOnOpen: React.RefObject<boolean>;
  formatDate: (date: Date) => string;
  parseDate: (input: string) => Date | null;
  locale: string | undefined;
}

const DatePickerContext = React.createContext<
  DatePickerContextValue | undefined
>(undefined);

export function useDatePickerContext(): DatePickerContextValue {
  const context = React.useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error(
      "useDatePickerContext must be used within a <DatePicker> component",
    );
  }
  return context;
}

export { DatePickerContext };
