import * as React from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { DatePickerContext } from "@nuka/components/DatePicker/DatePicker.context";
import type { DatePickerContextValue } from "@nuka/components/DatePicker/DatePicker.context";
import {
  defaultFormatDate,
  defaultParseDate,
  clampDate,
} from "@nuka/components/DatePicker/DatePicker.utils";

export interface DatePickerProps {
  children: React.ReactNode;
  value?: Date | undefined;
  defaultValue?: Date | undefined;
  onValueChange?: (date: Date | undefined) => void;
  disabled?: boolean | undefined;
  min?: Date | undefined;
  max?: Date | undefined;
  formatDate?: ((date: Date) => string) | undefined;
  parseDate?: ((input: string) => Date | null) | undefined;
  locale?: string | undefined;
}

function DatePicker({
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  min,
  max,
  formatDate,
  parseDate,
  locale,
}: DatePickerProps) {
  const effectiveFormatDate = formatDate ?? defaultFormatDate;
  const effectiveParseDate = parseDate ?? defaultParseDate;
  const [selectedDate, setSelectedDate] = useControllableState(
    controlledValue,
    defaultValue,
    onValueChange,
  );

  const [open, setOpen] = React.useState(false);

  const today = React.useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const initialFocusDate = React.useMemo(() => {
    if (selectedDate !== undefined) return selectedDate;
    return clampDate(today, min, max);
  }, [selectedDate, today, min, max]);

  const [focusedDate, setFocusedDate] = React.useState(initialFocusDate);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        const target = selectedDate ?? clampDate(today, min, max);
        setFocusedDate(target);
      }
    },
    [selectedDate, today, min, max],
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const baseId = React.useId();
  const triggerButtonRef = React.useRef<HTMLButtonElement>(null);
  const focusCalendarOnOpen = React.useRef(false);

  const contextValue: DatePickerContextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      selectedDate,
      onSelectedDateChange: setSelectedDate,
      focusedDate,
      setFocusedDate,
      disabled,
      min,
      max,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      baseId,
      triggerButtonRef,
      focusCalendarOnOpen,
      formatDate: effectiveFormatDate,
      parseDate: effectiveParseDate,
      locale,
    }),
    [
      open,
      handleOpenChange,
      selectedDate,
      setSelectedDate,
      focusedDate,
      setFocusedDate,
      disabled,
      min,
      max,
      refs,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      baseId,
      triggerButtonRef,
      focusCalendarOnOpen,
      effectiveFormatDate,
      effectiveParseDate,
      locale,
    ],
  );

  return <DatePickerContext value={contextValue}>{children}</DatePickerContext>;
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
export {
  DatePickerInput,
  type DatePickerInputProps,
} from "@nuka/components/DatePicker/DatePickerInput";
export {
  DatePickerCalendar,
  type DatePickerCalendarProps,
} from "@nuka/components/DatePicker/DatePickerCalendar";
