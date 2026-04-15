"use client";
// Exceeds 200 lines: single forwardRef component with input handling, blur/keydown/click
// callbacks, form field integration, and calendar toggle. Cannot split without violating
// single-component-per-file.
import * as React from "react";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { cn } from "@nuka/utils/cn";
import { composeRefs } from "@nuka/utils/slot";
import { Input } from "@nuka/components/Input";
import { Icon } from "@nuka/components/Icon";
import { useDatePickerContext } from "@nuka/components/DatePicker/DatePicker.context";
import { isDateDisabled } from "@nuka/components/DatePicker/DatePicker.utils";

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

export { DatePickerInput };
