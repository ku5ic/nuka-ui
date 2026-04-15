"use client";
import * as React from "react";

export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  disabled: boolean;
  focusedValue: string | undefined;
  setFocusedValue: (value: string) => void;
  onChange: (value: string) => void;
  registerRef: (value: string, ref: HTMLInputElement | null) => void;
}

const defaultContext: RadioGroupContextValue = {
  name: "",
  value: undefined,
  disabled: false,
  focusedValue: undefined,
  setFocusedValue: () => {
    /* noop */
  },
  onChange: () => {
    /* noop */
  },
  registerRef: () => {
    /* noop */
  },
};

export const RadioGroupContext = React.createContext(defaultContext);

export function useRadioGroup(): RadioGroupContextValue {
  return React.useContext(RadioGroupContext);
}
