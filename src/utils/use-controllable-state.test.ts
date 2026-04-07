import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useControllableState } from "@nuka/utils/use-controllable-state";

describe("useControllableState", () => {
  describe("uncontrolled", () => {
    it("returns the default value initially", () => {
      const { result } = renderHook(() =>
        useControllableState(undefined, false),
      );
      expect(result.current[0]).toBe(false);
    });

    it("updates the value when the setter is called", () => {
      const { result } = renderHook(() =>
        useControllableState(undefined, false),
      );
      act(() => {
        result.current[1](true);
      });
      expect(result.current[0]).toBe(true);
    });

    it("calls onChange when provided", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableState(undefined, "a", onChange),
      );
      act(() => {
        result.current[1]("b");
      });
      expect(onChange).toHaveBeenCalledWith("b");
      expect(result.current[0]).toBe("b");
    });
  });

  describe("controlled", () => {
    it("returns the controlled value", () => {
      const { result } = renderHook(() =>
        useControllableState(true, false),
      );
      expect(result.current[0]).toBe(true);
    });

    it("calls onChange when the setter is called", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableState(true, false, onChange),
      );
      act(() => {
        result.current[1](false);
      });
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it("does not update internal state when controlled", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableState(true, false, onChange),
      );
      act(() => {
        result.current[1](false);
      });
      // Value stays as the controlled value, not the setter arg
      expect(result.current[0]).toBe(true);
    });
  });
});
