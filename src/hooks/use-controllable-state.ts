"use client";
import { useState, useCallback } from "react";

function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T) => void];
function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T | undefined,
  onChange?: (value: T) => void,
): [T | undefined, (next: T) => void];
function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T | undefined,
  onChange?: (value: T) => void,
): [T | undefined, (next: T) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    // controlledValue is not read in the callback but must invalidate the closure
    // when the component switches between controlled and uncontrolled modes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isControlled, onChange, controlledValue],
  );

  return [value, setValue];
}

export { useControllableState };
