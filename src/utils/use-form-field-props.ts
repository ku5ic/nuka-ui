import type * as React from "react";
import { useFormField } from "@nuka/components/FormField/FormFieldContext";

export interface UseFormFieldPropsInput {
  id?: string | undefined;
  disabled?: boolean | undefined;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  "aria-describedby"?: string | undefined;
  "aria-required"?: React.AriaAttributes["aria-required"];
}

export interface UseFormFieldPropsOptions {
  skipInvalid?: boolean | undefined;
}

export interface UseFormFieldPropsResult {
  resolvedId: string | undefined;
  resolvedDisabled: boolean | undefined;
  ariaInvalid: React.AriaAttributes["aria-invalid"];
  ariaDescribedBy: string | undefined;
  ariaRequired: React.AriaAttributes["aria-required"];
}

export function useFormFieldProps(
  input: UseFormFieldPropsInput,
  options?: UseFormFieldPropsOptions,
): UseFormFieldPropsResult {
  const ctx = useFormField();

  const resolvedId = input.id ?? (ctx.fieldId || undefined);

  const resolvedDisabled = input.disabled ?? (ctx.disabled ? true : undefined);

  const ariaInvalid = options?.skipInvalid
    ? undefined
    : (input["aria-invalid"] ?? (ctx.hasError ? true : undefined));

  const contextDescribedBy = [
    ctx.hasError ? ctx.errorId : "",
    ctx.hintId || "",
  ]
    .filter(Boolean)
    .join(" ");

  const ariaDescribedBy =
    [input["aria-describedby"], contextDescribedBy]
      .filter(Boolean)
      .join(" ") || undefined;

  const ariaRequired =
    input["aria-required"] ?? (ctx.required ? true : undefined);

  return {
    resolvedId,
    resolvedDisabled,
    ariaInvalid,
    ariaDescribedBy,
    ariaRequired,
  };
}
