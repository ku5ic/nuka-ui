"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import {
  inputVariants,
  type InputVariantProps,
} from "@nuka/components/Input/Input.variants";

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {
  ref?: React.Ref<HTMLInputElement> | undefined;
}

function Input({ ref, className, intent, size, id, ...props }: InputProps) {
  const field = useFormFieldProps({
    id,
    "aria-invalid": props["aria-invalid"],
    "aria-describedby": props["aria-describedby"],
    "aria-required": props["aria-required"],
  });

  const ariaInvalid =
    field.ariaInvalid ?? (intent === "danger" ? true : undefined);

  return (
    <input
      ref={ref}
      id={field.resolvedId}
      className={cn(inputVariants({ intent, size }), className)}
      {...props}
      aria-invalid={ariaInvalid}
      aria-describedby={field.ariaDescribedBy}
      aria-required={field.ariaRequired}
    />
  );
}

Input.displayName = "Input";

export { Input, inputVariants };
