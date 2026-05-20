"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { getRovingIndex } from "@nuka/utils/roving-index";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { RadioGroupContext } from "@nuka/components/RadioGroup/RadioGroup.context";
import type { RadioGroupContextValue } from "@nuka/components/RadioGroup/RadioGroup.context";

export interface RadioGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  name: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  children: React.ReactNode;
}

function RadioGroup({
  ref,
  className,
  name,
  value: controlledValue,
  defaultValue,
  disabled,
  onChange,
  orientation = "vertical",
  children,
  ...props
}: RadioGroupProps) {
  const field = useFormFieldProps({
    disabled,
    "aria-invalid": props["aria-invalid"],
    "aria-describedby": props["aria-describedby"],
  });

  const resolvedDisabled = field.resolvedDisabled ?? false;

  const [currentValue, setCurrentValue] = useControllableState(
    controlledValue,
    defaultValue,
    onChange,
  );

  const inputRefsRef = React.useRef(new Map<string, HTMLInputElement>());

  const [focusedValue, setFocusedValue] = React.useState(currentValue);

  // Track registered radio values in state so focusedValue can be derived
  // during render (setState during render) rather than via a useEffect.
  const [registeredValues, setRegisteredValues] = React.useState<string[]>([]);

  const registerRef = React.useCallback(
    (radioValue: string, node: HTMLInputElement | null) => {
      if (node) {
        inputRefsRef.current.set(radioValue, node);
        setRegisteredValues((prev) =>
          prev.includes(radioValue) ? prev : [...prev, radioValue],
        );
      } else {
        inputRefsRef.current.delete(radioValue);
        setRegisteredValues((prev) => prev.filter((v) => v !== radioValue));
      }
    },
    [],
  );

  // When the group has no selection, ensure the first registered radio has
  // tabIndex=0 so the group is reachable by Tab. Uses setState during render
  // to avoid the extra paint cycle that a useEffect would introduce.
  const [prevFirstRegistered, setPrevFirstRegistered] = React.useState<
    string | undefined
  >(registeredValues[0]);
  const firstRegistered = registeredValues[0];
  if (prevFirstRegistered !== firstRegistered) {
    setPrevFirstRegistered(firstRegistered);
    if (focusedValue === undefined && firstRegistered !== undefined) {
      setFocusedValue(firstRegistered);
    }
  }

  const handleChange = React.useCallback(
    (radioValue: string) => {
      setCurrentValue(radioValue);
      setFocusedValue(radioValue);
    },
    [setCurrentValue],
  );

  const getOrderedValues = React.useCallback((): string[] => {
    const values: string[] = [];
    inputRefsRef.current.forEach((node, radioValue) => {
      if (!node.disabled) {
        values.push(radioValue);
      }
    });
    return values;
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      props.onKeyDown?.(e);
      if (e.defaultPrevented) return;

      const values = getOrderedValues();
      const currentIndex = values.indexOf(focusedValue ?? "");
      const nextIndex = getRovingIndex(
        e.key,
        currentIndex,
        values.length,
        "both",
      );
      if (nextIndex === undefined) return;

      e.preventDefault();
      const nextValue = values[nextIndex];
      if (nextValue === undefined) return;
      setFocusedValue(nextValue);
      handleChange(nextValue);
      inputRefsRef.current.get(nextValue)?.focus();
    },
    [focusedValue, getOrderedValues, handleChange, props],
  );

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
    [
      name,
      currentValue,
      resolvedDisabled,
      focusedValue,
      handleChange,
      registerRef,
    ],
  );

  return (
    <RadioGroupContext value={contextValue}>
      <div
        ref={ref}
        role="radiogroup"
        aria-orientation={orientation}
        aria-invalid={field.ariaInvalid}
        aria-describedby={field.ariaDescribedBy}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          "gap-(--space-2)",
          className,
        )}
        data-slot="root"
        {...props}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </RadioGroupContext>
  );
}

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
