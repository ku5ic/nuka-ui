"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormField } from "@nuka/components/FormField";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  ref?: React.Ref<HTMLLabelElement> | undefined;
  required?: boolean;
}

function Label({
  ref,
  className,
  children,
  required,
  id,
  htmlFor,
  ...props
}: LabelProps) {
  const ctx = useFormField();

  const resolvedId = id ?? (ctx.labelId || undefined);
  const resolvedHtmlFor = htmlFor ?? (ctx.fieldId || undefined);
  const resolvedRequired = required ?? ctx.required;

  return (
    <label
      ref={ref}
      id={resolvedId}
      htmlFor={resolvedHtmlFor}
      className={cn(
        "text-sm font-medium leading-none text-(--nuka-text-base)",
        className,
      )}
      {...props}
    >
      {children}
      {resolvedRequired && (
        <span
          aria-hidden="true"
          className="ml-(--space-1) text-(--nuka-danger-text)"
        >
          *
        </span>
      )}
    </label>
  );
}

Label.displayName = "Label";

export { Label };
