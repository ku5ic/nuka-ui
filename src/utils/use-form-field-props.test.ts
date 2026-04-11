import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import * as React from "react";
import { useFormFieldProps } from "@nuka/utils/use-form-field-props";
import { FormFieldContext } from "@nuka/components/FormField/FormField.context";
import type { FormFieldContextValue } from "@nuka/components/FormField/FormField.context";

const defaultCtx: FormFieldContextValue = {
  fieldId: "",
  labelId: "",
  errorId: "",
  hintId: "",
  hasError: false,
  required: false,
  disabled: false,
};

function withFormField(ctx: Partial<FormFieldContextValue>) {
  const value = { ...defaultCtx, ...ctx };
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(FormFieldContext, { value }, children);
  };
}

describe("useFormFieldProps", () => {
  describe("outside FormField context", () => {
    it("returns undefined for all resolved values when no consumer input", () => {
      const { result } = renderHook(() => useFormFieldProps({}));
      expect(result.current.resolvedId).toBeUndefined();
      expect(result.current.resolvedDisabled).toBeUndefined();
      expect(result.current.ariaInvalid).toBeUndefined();
      expect(result.current.ariaDescribedBy).toBeUndefined();
      expect(result.current.ariaRequired).toBeUndefined();
    });

    it("passes through consumer-supplied values", () => {
      const { result } = renderHook(() =>
        useFormFieldProps({
          id: "my-id",
          disabled: true,
          "aria-invalid": true,
          "aria-describedby": "hint-1",
          "aria-required": true,
        }),
      );
      expect(result.current.resolvedId).toBe("my-id");
      expect(result.current.resolvedDisabled).toBe(true);
      expect(result.current.ariaInvalid).toBe(true);
      expect(result.current.ariaDescribedBy).toBe("hint-1");
      expect(result.current.ariaRequired).toBe(true);
    });
  });

  describe("id resolution", () => {
    it("consumer id overrides context fieldId", () => {
      const { result } = renderHook(() => useFormFieldProps({ id: "my-id" }), {
        wrapper: withFormField({ fieldId: "ctx-id" }),
      });
      expect(result.current.resolvedId).toBe("my-id");
    });

    it("falls back to context fieldId", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ fieldId: "ctx-id" }),
      });
      expect(result.current.resolvedId).toBe("ctx-id");
    });

    it("returns undefined when context fieldId is empty string", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ fieldId: "" }),
      });
      expect(result.current.resolvedId).toBeUndefined();
    });
  });

  describe("disabled resolution", () => {
    it("consumer disabled overrides context disabled", () => {
      const { result } = renderHook(
        () => useFormFieldProps({ disabled: false }),
        { wrapper: withFormField({ disabled: true }) },
      );
      expect(result.current.resolvedDisabled).toBe(false);
    });

    it("falls back to context disabled when true", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ disabled: true }),
      });
      expect(result.current.resolvedDisabled).toBe(true);
    });

    it("returns undefined when context disabled is false", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ disabled: false }),
      });
      expect(result.current.resolvedDisabled).toBeUndefined();
    });
  });

  describe("aria-describedby resolution", () => {
    it("includes errorId when hasError is true", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ hasError: true, errorId: "err-1" }),
      });
      expect(result.current.ariaDescribedBy).toBe("err-1");
    });

    it("includes hintId when hint exists", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ hintId: "hint-1" }),
      });
      expect(result.current.ariaDescribedBy).toBe("hint-1");
    });

    it("merges errorId and hintId when both present", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({
          hasError: true,
          errorId: "err-1",
          hintId: "hint-1",
        }),
      });
      expect(result.current.ariaDescribedBy).toBe("err-1 hint-1");
    });

    it("merges consumer value with context ids", () => {
      const { result } = renderHook(
        () => useFormFieldProps({ "aria-describedby": "extra" }),
        {
          wrapper: withFormField({
            hasError: true,
            errorId: "err-1",
            hintId: "hint-1",
          }),
        },
      );
      expect(result.current.ariaDescribedBy).toBe("extra err-1 hint-1");
    });

    it("returns undefined when no context and no consumer value", () => {
      const { result } = renderHook(() => useFormFieldProps({}));
      expect(result.current.ariaDescribedBy).toBeUndefined();
    });

    it("excludes errorId when hasError is false", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({
          hasError: false,
          errorId: "err-1",
          hintId: "hint-1",
        }),
      });
      expect(result.current.ariaDescribedBy).toBe("hint-1");
    });
  });

  describe("aria-invalid resolution", () => {
    it("returns true when hasError is true and no consumer override", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ hasError: true }),
      });
      expect(result.current.ariaInvalid).toBe(true);
    });

    it("respects consumer override of false", () => {
      const { result } = renderHook(
        () => useFormFieldProps({ "aria-invalid": false }),
        { wrapper: withFormField({ hasError: true }) },
      );
      expect(result.current.ariaInvalid).toBe(false);
    });

    it('respects consumer override of "false"', () => {
      const { result } = renderHook(
        () => useFormFieldProps({ "aria-invalid": "false" }),
        { wrapper: withFormField({ hasError: true }) },
      );
      expect(result.current.ariaInvalid).toBe("false");
    });

    it("returns undefined when hasError is false", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ hasError: false }),
      });
      expect(result.current.ariaInvalid).toBeUndefined();
    });

    it("returns undefined when skipInvalid is true regardless of hasError", () => {
      const { result } = renderHook(
        () => useFormFieldProps({}, { skipInvalid: true }),
        { wrapper: withFormField({ hasError: true }) },
      );
      expect(result.current.ariaInvalid).toBeUndefined();
    });

    it("returns undefined when skipInvalid is true even with consumer override", () => {
      const { result } = renderHook(
        () =>
          useFormFieldProps({ "aria-invalid": true }, { skipInvalid: true }),
        { wrapper: withFormField({ hasError: true }) },
      );
      expect(result.current.ariaInvalid).toBeUndefined();
    });
  });

  describe("aria-required resolution", () => {
    it("returns true when context required is true", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ required: true }),
      });
      expect(result.current.ariaRequired).toBe(true);
    });

    it("returns undefined when context required is false", () => {
      const { result } = renderHook(() => useFormFieldProps({}), {
        wrapper: withFormField({ required: false }),
      });
      expect(result.current.ariaRequired).toBeUndefined();
    });

    it("consumer override takes precedence", () => {
      const { result } = renderHook(
        () => useFormFieldProps({ "aria-required": false }),
        { wrapper: withFormField({ required: true }) },
      );
      expect(result.current.ariaRequired).toBe(false);
    });
  });
});
