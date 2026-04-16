"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { useSelect } from "@nuka/components/Select/Select.context";
import { useFormField } from "@nuka/components/FormField";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import {
  selectTriggerVariants,
  type SelectTriggerVariantProps,
} from "@nuka/components/Select/SelectTrigger.variants";

export interface SelectTriggerProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    SelectTriggerVariantProps {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  placeholder?: string;
}

const TYPEAHEAD_TIMEOUT = 300;

function SelectTrigger({
  ref,
  className,
  placeholder,
  intent,
  size,
  disabled: disabledProp,
  ...props
}: SelectTriggerProps) {
  const ctx = useSelect();
  const formCtx = useFormField();

  const field = useFormFieldProps({
    id: props.id,
    "aria-invalid": props["aria-invalid"],
    "aria-describedby": props["aria-describedby"],
    "aria-required": props["aria-required"],
  });

  const typeaheadBufferRef = React.useRef("");
  const typeaheadTimerRef = React.useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const resolvedDisabled = disabledProp ?? ctx.disabled;

  const ariaLabelledBy =
    props["aria-labelledby"] ?? (formCtx.labelId || undefined);

  const displayLabel =
    ctx.value !== undefined ? ctx.getOptionLabel(ctx.value) : undefined;

  // Fallback aria-label when no aria-labelledby provides a name.
  // role="combobox" has nameFrom:author, so text content alone won't work.
  const ariaLabel =
    props["aria-label"] ??
    (ariaLabelledBy === undefined
      ? (displayLabel ?? placeholder ?? "Select")
      : undefined);

  const getEnabledOptions = React.useCallback((): string[] => {
    return ctx.getOptions().filter((v) => !ctx.isOptionDisabled(v));
  }, [ctx]);

  const highlightOption = React.useCallback(
    (optionValue: string | undefined) => {
      ctx.onHighlightChange(optionValue);
      if (optionValue !== undefined) {
        const optionEl = ctx.getOptionRef(optionValue);
        if (typeof optionEl?.scrollIntoView === "function") {
          optionEl.scrollIntoView({ block: "nearest" });
        }
      }
    },
    [ctx],
  );

  const selectHighlighted = React.useCallback(() => {
    if (ctx.highlightedValue !== undefined) {
      ctx.onValueChange(ctx.highlightedValue);
      ctx.onOpenChange(false);
    }
  }, [ctx]);

  const moveHighlight = React.useCallback(
    (direction: "next" | "prev" | "first" | "last") => {
      const options = getEnabledOptions();
      if (options.length === 0) return;

      const currentIndex =
        ctx.highlightedValue !== undefined
          ? options.indexOf(ctx.highlightedValue)
          : -1;

      let nextIndex: number;
      switch (direction) {
        case "next":
          nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          break;
        case "prev":
          nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          break;
        case "first":
          nextIndex = 0;
          break;
        case "last":
          nextIndex = options.length - 1;
          break;
      }

      const nextValue = options[nextIndex];
      if (nextValue !== undefined) {
        highlightOption(nextValue);
      }
    },
    [ctx.highlightedValue, getEnabledOptions, highlightOption],
  );

  const openAndHighlight = React.useCallback(
    (direction: "first" | "last" | "current") => {
      ctx.onOpenChange(true);
      const options = getEnabledOptions();
      if (options.length === 0) return;

      if (direction === "current" && ctx.value !== undefined) {
        const valueIndex = options.indexOf(ctx.value);
        if (valueIndex !== -1) {
          highlightOption(options[valueIndex]);
          return;
        }
      }

      if (direction === "last") {
        highlightOption(options[options.length - 1]);
      } else {
        highlightOption(options[0]);
      }
    },
    [ctx, getEnabledOptions, highlightOption],
  );

  const handleTypeahead = React.useCallback(
    (char: string) => {
      if (typeaheadTimerRef.current !== undefined) {
        clearTimeout(typeaheadTimerRef.current);
      }

      typeaheadBufferRef.current += char.toLowerCase();

      typeaheadTimerRef.current = setTimeout(() => {
        typeaheadBufferRef.current = "";
      }, TYPEAHEAD_TIMEOUT);

      const options = getEnabledOptions();
      const match = options.find((v) => {
        const label = ctx.getOptionLabel(v);
        return label?.toLowerCase().startsWith(typeaheadBufferRef.current);
      });

      if (match !== undefined) {
        if (!ctx.open) {
          ctx.onOpenChange(true);
        }
        highlightOption(match);
      }
    },
    [ctx, getEnabledOptions, highlightOption],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    props.onKeyDown?.(e);
    if (e.defaultPrevented) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!ctx.open) {
          openAndHighlight("first");
        } else {
          moveHighlight("next");
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (!ctx.open) {
          openAndHighlight("last");
        } else {
          moveHighlight("prev");
        }
        break;

      case "Home":
        if (ctx.open) {
          e.preventDefault();
          moveHighlight("first");
        }
        break;

      case "End":
        if (ctx.open) {
          e.preventDefault();
          moveHighlight("last");
        }
        break;

      case "Enter":
        e.preventDefault();
        if (!ctx.open) {
          openAndHighlight("current");
        } else {
          selectHighlighted();
        }
        break;

      case " ":
        e.preventDefault();
        if (!ctx.open) {
          openAndHighlight("current");
        } else {
          selectHighlighted();
        }
        break;

      case "Escape":
        if (ctx.open) {
          e.preventDefault();
          ctx.onOpenChange(false);
        }
        break;

      case "Tab":
        if (ctx.open) {
          ctx.onOpenChange(false);
          // Do not preventDefault: allow Tab to move focus naturally
        }
        break;

      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          handleTypeahead(e.key);
        }
        break;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    if (e.defaultPrevented) return;
    ctx.onOpenChange(!ctx.open);
    if (!ctx.open) {
      // Opening: highlight current value or first option
      const options = getEnabledOptions();
      if (ctx.value !== undefined && options.includes(ctx.value)) {
        highlightOption(ctx.value);
      }
    }
  };

  // aria-activedescendant must be undefined (not empty string) when no highlight
  const ariaActiveDescendant =
    ctx.open && ctx.highlightedValue !== undefined
      ? `${ctx.listboxId}-option-${ctx.highlightedValue}`
      : undefined;

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      id={field.resolvedId}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={ctx.open}
      aria-controls={ctx.listboxId}
      aria-activedescendant={ariaActiveDescendant}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-invalid={field.ariaInvalid}
      aria-describedby={field.ariaDescribedBy}
      aria-required={field.ariaRequired}
      disabled={resolvedDisabled}
      className={cn(selectTriggerVariants({ intent, size }), className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span
        className={cn(
          "truncate",
          displayLabel === undefined && "text-(--nuka-text-muted)",
        )}
      >
        {displayLabel ?? placeholder}
      </span>
      <Icon
        size="sm"
        color="muted"
        className={cn(
          "transition-transform duration-150",
          ctx.open && "rotate-180",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Icon>
    </button>
  );
}

SelectTrigger.displayName = "SelectTrigger";

export { SelectTrigger, selectTriggerVariants };
