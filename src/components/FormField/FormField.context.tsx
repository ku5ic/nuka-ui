"use client";
import * as React from "react";

export interface FormFieldContextValue {
  fieldId: string;
  labelId: string;
  errorId: string;
  hintId: string;
  hasError: boolean;
  required: boolean;
  disabled: boolean;
}

const defaultContext: FormFieldContextValue = {
  fieldId: "",
  labelId: "",
  errorId: "",
  hintId: "",
  hasError: false,
  required: false,
  disabled: false,
};

export const FormFieldContext = React.createContext(defaultContext);

export function useFormField(): FormFieldContextValue {
  return React.useContext(FormFieldContext);
}
