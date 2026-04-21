"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormField } from "@nuka/components/FormField";
import type { TextVariantProps } from "@nuka/components/Text/Text.variants";

export type LabelWeight = NonNullable<TextVariantProps["weight"]>;

const labelWeightClasses: Record<LabelWeight, string> = {
  thin: "font-[number:var(--font-weight-thin)]",
  extralight: "font-[number:var(--font-weight-extralight)]",
  light: "font-[number:var(--font-weight-light)]",
  regular: "font-[number:var(--font-weight-regular)]",
  medium: "font-[number:var(--font-weight-medium)]",
  semibold: "font-[number:var(--font-weight-semibold)]",
  bold: "font-[number:var(--font-weight-bold)]",
  extrabold: "font-[number:var(--font-weight-extrabold)]",
  black: "font-[number:var(--font-weight-black)]",
};

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  ref?: React.Ref<HTMLLabelElement> | undefined;
  required?: boolean;
  weight?: LabelWeight;
}

function Label({
  ref,
  className,
  children,
  required,
  id,
  htmlFor,
  weight,
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
        "text-sm leading-none text-(--nuka-text-base)",
        labelWeightClasses[weight ?? "medium"],
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
