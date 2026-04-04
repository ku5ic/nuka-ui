import * as React from "react";
import { cn } from "@vault/utils/cn";
import { useFormField } from "@vault/components/FormField/FormFieldContext";
import { RadioGroupContext } from "@vault/components/RadioGroup/RadioGroupContext";
import type { RadioGroupContextValue } from "@vault/components/RadioGroup/RadioGroupContext";

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  children: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      name,
      value: controlledValue,
      defaultValue,
      disabled = false,
      onChange,
      orientation = "vertical",
      children,
      ...props
    },
    ref,
  ) => {
    const ctx = useFormField();
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const refsMap = React.useRef(new Map<string, HTMLInputElement>());

    const [focusedValue, setFocusedValue] = React.useState(currentValue);

    const registerRef = React.useCallback(
      (radioValue: string, node: HTMLInputElement | null) => {
        if (node) {
          refsMap.current.set(radioValue, node);
        } else {
          refsMap.current.delete(radioValue);
        }
      },
      [],
    );

    const handleChange = React.useCallback(
      (radioValue: string) => {
        if (!isControlled) {
          setInternalValue(radioValue);
        }
        setFocusedValue(radioValue);
        onChange?.(radioValue);
      },
      [isControlled, onChange],
    );

    const getOrderedValues = React.useCallback((): string[] => {
      const values: string[] = [];
      refsMap.current.forEach((node, radioValue) => {
        if (!node.disabled) {
          values.push(radioValue);
        }
      });
      return values;
    }, []);

    const moveFocus = React.useCallback(
      (direction: "next" | "prev" | "first" | "last") => {
        const values = getOrderedValues();
        if (values.length === 0) return;

        const currentIndex = values.indexOf(focusedValue ?? "");
        let nextIndex: number;

        switch (direction) {
          case "next":
            nextIndex = currentIndex < values.length - 1 ? currentIndex + 1 : 0;
            break;
          case "prev":
            nextIndex = currentIndex > 0 ? currentIndex - 1 : values.length - 1;
            break;
          case "first":
            nextIndex = 0;
            break;
          case "last":
            nextIndex = values.length - 1;
            break;
        }

        const nextValue = values[nextIndex];
        if (nextValue === undefined) return;
        setFocusedValue(nextValue);
        handleChange(nextValue);
        refsMap.current.get(nextValue)?.focus();
      },
      [focusedValue, getOrderedValues, handleChange],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        props.onKeyDown?.(e);
        if (e.defaultPrevented) return;

        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            e.preventDefault();
            moveFocus("next");
            break;
          case "ArrowUp":
          case "ArrowLeft":
            e.preventDefault();
            moveFocus("prev");
            break;
          case "Home":
            e.preventDefault();
            moveFocus("first");
            break;
          case "End":
            e.preventDefault();
            moveFocus("last");
            break;
        }
      },
      [moveFocus, props],
    );

    const resolvedDisabled = disabled || ctx.disabled;

    const ariaInvalid =
      props["aria-invalid"] ??
      (ctx.hasError ? true : undefined);

    const contextDescribedBy = [
      ctx.hasError ? ctx.errorId : "",
      ctx.hintId || "",
    ]
      .filter(Boolean)
      .join(" ");

    const ariaDescribedBy =
      [props["aria-describedby"], contextDescribedBy]
        .filter(Boolean)
        .join(" ") || undefined;

    const contextValue: RadioGroupContextValue = React.useMemo(
      () => ({
        name,
        value: currentValue,
        disabled: resolvedDisabled,
        focusedValue: focusedValue ?? currentValue ?? undefined,
        setFocusedValue,
        onChange: handleChange,
        registerRef,
      }),
      [name, currentValue, resolvedDisabled, focusedValue, handleChange, registerRef],
    );

    return (
      <RadioGroupContext value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-col" : "flex-row",
            "gap-[var(--space-2)]",
            className,
          )}
          {...props}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </RadioGroupContext>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
