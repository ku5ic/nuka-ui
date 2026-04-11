import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Icon } from "@nuka/components/Icon";
import { useFormField } from "@nuka/components/FormField";
import { useFormFieldProps } from "@nuka/utils/use-form-field-props";
import { comboboxTriggerVariants } from "@nuka/components/Combobox/Combobox.variants";
import type { ComboboxTriggerProps } from "@nuka/components/Combobox/Combobox.types";
import { useComboboxContext } from "@nuka/components/Combobox/Combobox.context";

const ComboboxTrigger = React.forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(
  (
    {
      className,
      placeholder,
      intent,
      size: sizeProp,
      disabled: disabledProp,
      onKeyDown: propsOnKeyDown,
      onClick: propsOnClick,
      ...props
    },
    ref,
  ) => {
    const ctx = useComboboxContext();
    const formCtx = useFormField();
    const field = useFormFieldProps({
      id: props.id,
      "aria-invalid": props["aria-invalid"],
      "aria-describedby": props["aria-describedby"],
      "aria-required": props["aria-required"],
    });

    const resolvedDisabled = disabledProp ?? ctx.disabled;

    const ariaLabelledBy =
      props["aria-labelledby"] ?? (formCtx.labelId || undefined);

    const displayLabel =
      ctx.value !== undefined ? ctx.getOptionLabel(ctx.value) : undefined;

    const ariaLabel =
      props["aria-label"] ??
      (ariaLabelledBy === undefined
        ? (displayLabel ?? placeholder ?? "Select")
        : undefined);

    const composedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (typeof ref === "function") ref(node);
        else if (ref != null) ref.current = node;
        ctx.triggerRef.current = node;
        ctx.refs.setReference(node);
      },
      [ref, ctx.triggerRef, ctx.refs],
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      propsOnKeyDown?.(e);
      if (e.defaultPrevented) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (!ctx.open) {
            ctx.highlightOnOpenRef.current = "first";
            ctx.onOpenChange(true);
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (!ctx.open) {
            ctx.highlightOnOpenRef.current = "last";
            ctx.onOpenChange(true);
          }
          break;
        }
        default: {
          if (
            e.key.length === 1 &&
            e.key !== " " &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.altKey &&
            !ctx.open
          ) {
            e.preventDefault();
            ctx.setFilterText(e.key);
            ctx.onOpenChange(true);
          }
          break;
        }
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      propsOnClick?.(e);
    };

    const referenceProps = ctx.getReferenceProps({
      onKeyDown: handleKeyDown,
      onClick: handleClick,
    });

    return (
      <button
        {...props}
        {...referenceProps}
        ref={composedRef}
        type="button"
        id={field.resolvedId}
        aria-haspopup="listbox"
        aria-expanded={ctx.open}
        aria-controls={ctx.open ? ctx.listboxId : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={field.ariaInvalid}
        aria-describedby={field.ariaDescribedBy}
        aria-required={field.ariaRequired}
        disabled={resolvedDisabled}
        className={cn(
          comboboxTriggerVariants({ intent, size: sizeProp }),
          className,
        )}
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
  },
);

ComboboxTrigger.displayName = "ComboboxTrigger";

export { ComboboxTrigger };
