// Exceeds 200 lines: three tightly related calendar hooks in one file by design.
// useCalendarKeyboard accounts for ~165 lines due to the full ARIA grid keyboard
// contract (12 key cases). Splitting into separate files would scatter one concern.
import * as React from "react";
import type { DatePickerContextValue } from "@nuka/components/DatePicker/DatePicker.context";
import {
  clampDate,
  monthHasSelectableDays,
} from "@nuka/components/DatePicker/DatePicker.utils";

export function useCalendarNavigation(ctx: DatePickerContextValue) {
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

  return {
    displayedYear,
    setDisplayedYear,
    displayedMonth,
    setDisplayedMonth,
    canGoPrev,
    canGoNext,
    goToPrevMonth,
    goToNextMonth,
  };
}

export function useCalendarFocus(
  ctx: DatePickerContextValue,
  displayedYear: number,
  displayedMonth: number,
) {
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

  return { focusedDayRef };
}

export function useCalendarKeyboard(
  ctx: DatePickerContextValue,
  navigateToDate: (candidate: Date, stepFn: (d: Date) => Date) => void,
  selectDay: (date: Date) => void,
) {
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

  return { handleKeyDown };
}
