import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import { useControllableState } from "@nuka/hooks/use-controllable-state";
import { RadioGroupContext } from "@nuka/components/RadioGroup/RadioGroup.context";
import type { RadioGroupContextValue } from "@nuka/components/RadioGroup/RadioGroup.context";

export interface RadioGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
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
      disabled,
      onChange,
      orientation = "vertical",
      children,
      ...props
    },
    ref,
  ) => {
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

    const refsMap = React.useRef(new Map<string, HTMLInputElement>());

    const [focusedValue, setFocusedValue] = React.useState(currentValue);

    // Incremented each time a Radio mounts and registers its ref. Used as a
    // dependency for the first-focus effect below: refsMap is a ref (not state)
    // so mutating it does not trigger a re-render. Without this counter the
    // effect would run on mount before any radios have registered, read an
    // empty map, and never set focusedValue, leaving all radios at tabIndex=-1.
    const [registrationCount, setRegistrationCount] = React.useState(0);

    const registerRef = React.useCallback(
      (radioValue: string, node: HTMLInputElement | null) => {
        if (node) {
          refsMap.current.set(radioValue, node);
          setRegistrationCount((c) => c + 1);
        } else {
          refsMap.current.delete(radioValue);
        }
      },
      [],
    );

    // When the group has no selection, ensure the first non-disabled radio
    // has tabIndex=0 so the group is reachable by Tab. Depends on
    // registrationCount so it re-runs after radios mount and populate refsMap.
    React.useEffect(() => {
      if (focusedValue === undefined && currentValue === undefined) {
        const firstKey = Array.from(refsMap.current.keys())[0];
        if (firstKey !== undefined) {
          setFocusedValue(firstKey);
        }
      }
    }, [focusedValue, currentValue, registrationCount]);

    const handleChange = React.useCallback(
      (radioValue: string) => {
        setCurrentValue(radioValue);
        setFocusedValue(radioValue);
      },
      [setCurrentValue],
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
