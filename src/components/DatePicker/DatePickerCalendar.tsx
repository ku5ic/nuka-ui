"use client";
// Exceeds 200 lines: calendar grid JSX is inseparable from the hooks that feed it.
// Hook calls, Intl formatters, memos, and selectDay/navigateToDate callbacks all
// close over the same display state and cannot be moved to a sibling file.
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Portal } from "@nuka/utils/portal";
import { Button } from "@nuka/components/Button";
import { Icon } from "@nuka/components/Icon";
import { Text } from "@nuka/components/Text";
import { useDatePickerContext } from "@nuka/components/DatePicker/DatePicker.context";
import {
  isSameDay,
  isDateDisabled,
  buildMonthGrid,
} from "@nuka/components/DatePicker/DatePicker.utils";
import {
  useCalendarNavigation,
  useCalendarFocus,
  useCalendarKeyboard,
} from "@nuka/components/DatePicker/DatePicker.hooks";

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

  const {
    displayedYear,
    setDisplayedYear,
    displayedMonth,
    setDisplayedMonth,
    canGoPrev,
    canGoNext,
    goToPrevMonth,
    goToNextMonth,
  } = useCalendarNavigation(ctx);

  const { focusedDayRef } = useCalendarFocus(
    ctx,
    displayedYear,
    displayedMonth,
  );

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
    [ctx, displayedMonth, displayedYear, setDisplayedYear, setDisplayedMonth],
  );

  const { handleKeyDown } = useCalendarKeyboard(ctx, navigateToDate, selectDay);

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

export { DatePickerCalendar };
