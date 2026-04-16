"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { Text } from "@nuka/components/Text";
import { FormFieldContext } from "@nuka/components/FormField/FormField.context";
import type { FormFieldContextValue } from "@nuka/components/FormField/FormField.context";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement> | undefined;
  id?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
}

function FormField({
  ref,
  className,
  children,
  id,
  error,
  hint,
  required = false,
  disabled = false,
  ...props
}: FormFieldProps) {
  const generatedId = React.useId();
  const baseId = id ?? generatedId;

  const contextValue: FormFieldContextValue = React.useMemo(
    () => ({
      fieldId: baseId,
      labelId: `${baseId}-label`,
      errorId: `${baseId}-error`,
      hintId: `${baseId}-hint`,
      hasError: !!error,
      required,
      disabled,
    }),
    [baseId, error, required, disabled],
  );

  return (
    <FormFieldContext value={contextValue}>
      <div
        ref={ref}
        className={cn("flex flex-col gap-(--space-1)", className)}
        {...props}
      >
        {children}
        {hint && (
          <Text as="p" size="sm" color="muted" id={contextValue.hintId}>
            {hint}
          </Text>
        )}
        {error && (
          <Text as="p" size="sm" color="danger" id={contextValue.errorId}>
            {error}
          </Text>
        )}
      </div>
    </FormFieldContext>
  );
}

FormField.displayName = "FormField";

export { FormField };
