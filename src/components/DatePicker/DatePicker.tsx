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
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { Portal } from "@nuka/utils/portal";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Input } from "@nuka/components/Input";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";
import { Text } from "@nuka/components/Text";
import { DatePickerContext } from "@nuka/components/DatePicker/DatePicker.context";
import type { DatePickerContextValue } from "@nuka/components/DatePicker/DatePicker.context";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateDisabled(
  date: Date,
  min: Date | undefined,
  max: Date | undefined,
): boolean {
  if (min !== undefined) {
    const minStart = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (date < minStart) return true;
  }
  if (max !== undefined) {
    const maxEnd = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (date > maxEnd) return true;
  }
  return false;
}

function defaultFormatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${String(y)}-${m}-${d}`;
}

function defaultParseDate(input: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return null;
  const maxDay = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDay) return null;
  return new Date(year, month - 1, day);
}

function buildMonthGrid(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const leadingEmpties = (firstDay + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < leadingEmpties; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function clampDate(
  date: Date,
  min: Date | undefined,
  max: Date | undefined,
): Date {
  if (min !== undefined && date < min)
    return new Date(min.getFullYear(), min.getMonth(), min.getDate());
  if (max !== undefined && date > max)
    return new Date(max.getFullYear(), max.getMonth(), max.getDate());
  return date;
}

function monthHasSelectableDays(
  year: number,
  month: number,
  min: Date | undefined,
  max: Date | undefined,
): boolean {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month, totalDays);
  if (
    min !== undefined &&
    lastOfMonth < new Date(min.getFullYear(), min.getMonth(), min.getDate())
  )
    return false;
  if (
    max !== undefined &&
    firstOfMonth > new Date(max.getFullYear(), max.getMonth(), max.getDate())
  )
    return false;
  return true;
}

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

export interface DatePickerInputProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  id?: string;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  "aria-describedby"?: string;
  "aria-required"?: React.AriaAttributes["aria-required"];
}

const DatePickerInput = React.forwardRef<HTMLDivElement, DatePickerInputProps>(
  (
    {
      className,
      placeholder = "YYYY-MM-DD",
      size,
      id,
      "aria-invalid": ariaInvalidProp,
      "aria-describedby": ariaDescribedByProp,
      "aria-required": ariaRequiredProp,
      ...props
    },
    ref,
  ) => {
    const ctx = useDatePickerContext();
    const setPositionRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          ctx.refs.setPositionReference(node);
        }
      },
      [ctx.refs],
    );
    const composedRef = composeRefs(ref, setPositionRef);

    const field = useFormFieldProps({
      id,
      "aria-invalid": ariaInvalidProp,
      "aria-describedby": ariaDescribedByProp,
      "aria-required": ariaRequiredProp,
    });

    const { selectedDate, open, formatDate: ctxFormatDate } = ctx;

    const [inputText, setInputText] = React.useState(
      selectedDate !== undefined ? ctxFormatDate(selectedDate) : "",
    );

    React.useEffect(() => {
      if (!open) {
        setInputText(
          selectedDate !== undefined ? ctxFormatDate(selectedDate) : "",
        );
      }
    }, [selectedDate, open, ctxFormatDate]);

    const ariaInvalid = field.ariaInvalid ?? undefined;

    const handleInputClick = React.useCallback(() => {
      if (!ctx.disabled && !ctx.open) {
        ctx.focusCalendarOnOpen.current = false;
        ctx.onOpenChange(true);
      }
    }, [ctx]);

    const commitValue = React.useCallback(() => {
      const parsed = ctx.parseDate(inputText);
      if (parsed !== null && !isDateDisabled(parsed, ctx.min, ctx.max)) {
        ctx.onSelectedDateChange(parsed);
      } else {
        setInputText(
          ctx.selectedDate !== undefined
            ? ctx.formatDate(ctx.selectedDate)
            : "",
        );
      }
    }, [inputText, ctx]);

    const handleInputKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitValue();
        } else if (e.key === "Escape") {
          if (ctx.open) {
            e.preventDefault();
            ctx.onOpenChange(false);
          } else {
            setInputText(
              ctx.selectedDate !== undefined
                ? ctx.formatDate(ctx.selectedDate)
                : "",
            );
          }
        } else if (e.key === "Tab") {
          if (ctx.open) {
            ctx.onOpenChange(false);
          }
        }
      },
      [commitValue, ctx],
    );

    const handleInputBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        const relatedTarget = e.relatedTarget as Node | null;
        if (
          relatedTarget &&
          ctx.refs.floating.current?.contains(relatedTarget)
        ) {
          return;
        }
        commitValue();
      },
      [commitValue, ctx.refs.floating],
    );

    const handleToggle = React.useCallback(() => {
      if (!ctx.disabled) {
        ctx.focusCalendarOnOpen.current = !ctx.open;
        ctx.onOpenChange(!ctx.open);
      }
    }, [ctx]);

    const referenceProps = ctx.getReferenceProps({});

    return (
      <div
        ref={composedRef}
        className={cn("relative inline-flex w-full items-center", className)}
        {...props}
      >
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onClick={handleInputClick}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          size={size}
          id={field.resolvedId}
          disabled={ctx.disabled || field.resolvedDisabled}
          aria-invalid={ariaInvalid}
          aria-describedby={field.ariaDescribedBy}
          aria-required={field.ariaRequired}
          className="pr-(--space-10)"
          autoComplete="off"
        />
        <button
          ref={composeRefs(
            ctx.triggerButtonRef,
            ctx.refs.setReference as React.Ref<HTMLButtonElement>,
          )}
          type="button"
          {...(referenceProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          onClick={handleToggle}
          disabled={ctx.disabled}
          aria-label="Open calendar"
          className={cn(
            "absolute right-0 top-0 bottom-0 flex items-center justify-center",
            "px-(--space-3) text-(--nuka-text-muted) hover:text-(--nuka-text-base)",
            "disabled:pointer-events-none disabled:opacity-50",
            "cursor-pointer",
          )}
        >
          <Icon size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </Icon>
        </button>
      </div>
    );
  },
);

DatePickerInput.displayName = "DatePickerInput";

export interface DatePickerCalendarProps extends React.HTMLAttributes<HTMLDivElement> {}

const DatePickerCalendar = React.forwardRef<
  HTMLDivElement,
  DatePickerCalendarProps
>(({ className, ...props }, ref) => {
  const ctx = useDatePickerContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRef = composeRefs(
    ref,
    contentRef,
    ctx.refs.setFloating as React.Ref<HTMLDivElement>,
  );

  const [displayedYear, setDisplayedYear] = React.useState(
    ctx.focusedDate.getFullYear(),
  );
  const [displayedMonth, setDisplayedMonth] = React.useState(
    ctx.focusedDate.getMonth(),
  );

  React.useEffect(() => {
    if (ctx.open) {
      setDisplayedYear(ctx.focusedDate.getFullYear());
      setDisplayedMonth(ctx.focusedDate.getMonth());
    }
  }, [ctx.open, ctx.focusedDate]);

  const focusedDayRef = React.useRef<HTMLButtonElement>(null);
  const isFirstRenderRef = React.useRef(true);

  React.useEffect(() => {
    if (!ctx.open) {
      isFirstRenderRef.current = true;
      return;
    }

    if (focusedDayRef.current) {
      if (isFirstRenderRef.current) {
        isFirstRenderRef.current = false;
        if (ctx.focusCalendarOnOpen.current) {
          requestAnimationFrame(() => {
            focusedDayRef.current?.focus();
          });
        }
      } else {
        requestAnimationFrame(() => {
          focusedDayRef.current?.focus();
        });
      }
    }
  }, [
    ctx.open,
    ctx.focusedDate,
    ctx.focusCalendarOnOpen,
    displayedYear,
    displayedMonth,
  ]);

  const labelFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(ctx.locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [ctx.locale],
  );

  const headerFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(ctx.locale, {
        month: "long",
        year: "numeric",
      }),
    [ctx.locale],
  );

  const weekdayLabels = React.useMemo(() => {
    const shortFmt = new Intl.DateTimeFormat(ctx.locale, { weekday: "short" });
    const longFmt = new Intl.DateTimeFormat(ctx.locale, { weekday: "long" });
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2026, 0, 5 + i);
      return {
        short: shortFmt.format(date),
        long: longFmt.format(date),
      };
    });
  }, [ctx.locale]);

  const weeks = React.useMemo(
    () => buildMonthGrid(displayedYear, displayedMonth),
    [displayedYear, displayedMonth],
  );

  const headerLabel = React.useMemo(
    () => headerFormatter.format(new Date(displayedYear, displayedMonth, 1)),
    [displayedYear, displayedMonth, headerFormatter],
  );

  const canGoPrev = React.useMemo(() => {
    const prevMonth = displayedMonth - 1;
    const prevYear = prevMonth < 0 ? displayedYear - 1 : displayedYear;
    const normalizedMonth = ((prevMonth % 12) + 12) % 12;
    return monthHasSelectableDays(prevYear, normalizedMonth, ctx.min, ctx.max);
  }, [displayedYear, displayedMonth, ctx.min, ctx.max]);

  const canGoNext = React.useMemo(() => {
    const nextMonth = displayedMonth + 1;
    const nextYear = nextMonth > 11 ? displayedYear + 1 : displayedYear;
    const normalizedMonth = nextMonth % 12;
    return monthHasSelectableDays(nextYear, normalizedMonth, ctx.min, ctx.max);
  }, [displayedYear, displayedMonth, ctx.min, ctx.max]);

  const goToPrevMonth = React.useCallback(() => {
    if (!canGoPrev) return;
    const d = new Date(displayedYear, displayedMonth - 1, 1);
    setDisplayedYear(d.getFullYear());
    setDisplayedMonth(d.getMonth());
    const newFocused = new Date(
      d.getFullYear(),
      d.getMonth(),
      Math.min(
        ctx.focusedDate.getDate(),
        new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
      ),
    );
    ctx.setFocusedDate(clampDate(newFocused, ctx.min, ctx.max));
  }, [canGoPrev, displayedYear, displayedMonth, ctx]);

  const goToNextMonth = React.useCallback(() => {
    if (!canGoNext) return;
    const d = new Date(displayedYear, displayedMonth + 1, 1);
    setDisplayedYear(d.getFullYear());
    setDisplayedMonth(d.getMonth());
    const newFocused = new Date(
      d.getFullYear(),
      d.getMonth(),
      Math.min(
        ctx.focusedDate.getDate(),
        new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),
      ),
    );
    ctx.setFocusedDate(clampDate(newFocused, ctx.min, ctx.max));
  }, [canGoNext, displayedYear, displayedMonth, ctx]);

  const selectDay = React.useCallback(
    (date: Date) => {
      if (isDateDisabled(date, ctx.min, ctx.max)) return;
      ctx.onSelectedDateChange(date);
      ctx.onOpenChange(false);
      requestAnimationFrame(() => {
        ctx.triggerButtonRef.current?.focus();
      });
    },
    [ctx],
  );

  const navigateToDate = React.useCallback(
    (candidate: Date, stepFn: (d: Date) => Date) => {
      let current = candidate;
      let attempts = 0;
      while (isDateDisabled(current, ctx.min, ctx.max) && attempts < 366) {
        current = stepFn(current);
        attempts++;
      }
      if (isDateDisabled(current, ctx.min, ctx.max)) return;

      ctx.setFocusedDate(current);
      if (
        current.getMonth() !== displayedMonth ||
        current.getFullYear() !== displayedYear
      ) {
        setDisplayedYear(current.getFullYear());
        setDisplayedMonth(current.getMonth());
      }
    },
    [ctx, displayedMonth, displayedYear],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const focused = ctx.focusedDate;
      let handled = true;

      switch (e.key) {
        case "ArrowLeft": {
          const candidate = new Date(
            focused.getFullYear(),
            focused.getMonth(),
            focused.getDate() - 1,
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1),
          );
          break;
        }
        case "ArrowRight": {
          const candidate = new Date(
            focused.getFullYear(),
            focused.getMonth(),
            focused.getDate() + 1,
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
          );
          break;
        }
        case "ArrowUp": {
          const candidate = new Date(
            focused.getFullYear(),
            focused.getMonth(),
            focused.getDate() - 7,
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7),
          );
          break;
        }
        case "ArrowDown": {
          const candidate = new Date(
            focused.getFullYear(),
            focused.getMonth(),
            focused.getDate() + 7,
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7),
          );
          break;
        }
        case "PageUp": {
          const prevMonthDate = new Date(
            focused.getFullYear(),
            focused.getMonth() - 1,
            1,
          );
          const maxDayInPrev = new Date(
            prevMonthDate.getFullYear(),
            prevMonthDate.getMonth() + 1,
            0,
          ).getDate();
          const candidate = new Date(
            prevMonthDate.getFullYear(),
            prevMonthDate.getMonth(),
            Math.min(focused.getDate(), maxDayInPrev),
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1),
          );
          break;
        }
        case "PageDown": {
          const nextMonthDate = new Date(
            focused.getFullYear(),
            focused.getMonth() + 1,
            1,
          );
          const maxDayInNext = new Date(
            nextMonthDate.getFullYear(),
            nextMonthDate.getMonth() + 1,
            0,
          ).getDate();
          const candidate = new Date(
            nextMonthDate.getFullYear(),
            nextMonthDate.getMonth(),
            Math.min(focused.getDate(), maxDayInNext),
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
          );
          break;
        }
        case "Home": {
          const dayOfWeek = focused.getDay();
          const mondayOffset = (dayOfWeek + 6) % 7;
          const candidate = new Date(
            focused.getFullYear(),
            focused.getMonth(),
            focused.getDate() - mondayOffset,
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
          );
          break;
        }
        case "End": {
          const dayOfWeek = focused.getDay();
          const sundayOffset = (7 - dayOfWeek) % 7;
          const candidate = new Date(
            focused.getFullYear(),
            focused.getMonth(),
            focused.getDate() + sundayOffset,
          );
          navigateToDate(
            candidate,
            (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1),
          );
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          selectDay(focused);
          break;
        }
        case "Escape": {
          ctx.onOpenChange(false);
          requestAnimationFrame(() => {
            ctx.triggerButtonRef.current?.focus();
          });
          break;
        }
        case "Tab": {
          e.preventDefault();
          ctx.onOpenChange(false);
          requestAnimationFrame(() => {
            ctx.triggerButtonRef.current?.focus();
          });
          break;
        }
        default:
          handled = false;
      }

      if (handled) {
        e.preventDefault();
      }
    },
    [ctx, navigateToDate, selectDay],
  );

  if (!ctx.open) return null;

  const floatingProps = ctx.getFloatingProps(props);
  const today = new Date();

  return (
    <Portal>
      <div
        ref={composedRef}
        style={ctx.floatingStyles}
        role="dialog"
        aria-label="Date picker"
        {...(floatingProps as React.HTMLAttributes<HTMLDivElement>)}
        className={cn(
          "z-(--nuka-z-dropdown) rounded-(--radius-md) border border-(--nuka-border-base)",
          "bg-(--nuka-bg-base) shadow-md p-(--space-3)",
          "focus-visible:outline-none",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-(--space-2)">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevMonth}
            disabled={!canGoPrev}
            aria-label="Previous month"
          >
            <Icon size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Icon>
          </Button>
          <Text as="span" size="sm" weight="medium">
            {headerLabel}
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
            disabled={!canGoNext}
            aria-label="Next month"
          >
            <Icon size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Icon>
          </Button>
        </div>

        <div
          role="grid"
          aria-label={headerLabel}
          id={`${ctx.baseId}-grid`}
          onKeyDown={handleKeyDown}
        >
          <div
            role="row"
            aria-hidden="true"
            className="grid grid-cols-7 mb-(--space-1)"
          >
            {weekdayLabels.map((day) => (
              <abbr
                key={day.short}
                title={day.long}
                className="flex items-center justify-center text-xs text-(--nuka-text-muted) no-underline py-(--space-1)"
              >
                {day.short}
              </abbr>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div role="row" key={weekIndex} className="grid grid-cols-7">
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return (
                    <div
                      role="gridcell"
                      key={`empty-${String(dayIndex)}`}
                      aria-hidden="true"
                    >
                      <span className="block size-9" />
                    </div>
                  );
                }

                const date = new Date(displayedYear, displayedMonth, day);
                const disabled = isDateDisabled(date, ctx.min, ctx.max);
                const isSelected =
                  ctx.selectedDate !== undefined &&
                  isSameDay(date, ctx.selectedDate);
                const isFocused = isSameDay(date, ctx.focusedDate);
                const isToday = isSameDay(date, today);
                const dayLabel = labelFormatter.format(date);

                return (
                  <div role="gridcell" key={day}>
                    <button
                      ref={isFocused ? focusedDayRef : undefined}
                      type="button"
                      tabIndex={isFocused ? 0 : -1}
                      aria-label={dayLabel}
                      aria-selected={isSelected}
                      aria-disabled={disabled || undefined}
                      disabled={disabled}
                      onClick={() => selectDay(date)}
                      className={cn(
                        "flex items-center justify-center size-9 rounded-(--radius-md) text-sm",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nuka-border-focus)",
                        "cursor-pointer",
                        isSelected &&
                          "bg-(--nuka-accent-bg) text-(--nuka-accent-fg)",
                        !isSelected &&
                          !disabled &&
                          "hover:bg-(--nuka-bg-muted)",
                        isToday &&
                          !isSelected &&
                          "ring-1 ring-(--nuka-border-strong)",
                        disabled && "opacity-50 cursor-default",
                      )}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
});

DatePickerCalendar.displayName = "DatePickerCalendar";

export { DatePicker, DatePickerInput, DatePickerCalendar };

function useDatePickerContext() {
  const context = React.useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error(
      "useDatePickerContext must be used within a <DatePicker> component",
    );
  }
  return context;
}
