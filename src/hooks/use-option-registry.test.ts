import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOptionRegistry } from "@nuka/hooks/use-option-registry";

describe("useOptionRegistry", () => {
  it("registers and retrieves an option", () => {
    const { result } = renderHook(() => useOptionRegistry());
    const el = document.createElement("div");

    act(() => {
      result.current.registerOption("apple", "Apple", el);
    });

    expect(result.current.getOptions()).toEqual(["apple"]);
    expect(result.current.getOptionLabel("apple")).toBe("Apple");
    expect(result.current.getOptionRef("apple")).toBe(el);
  });

  it("unregisters an option", () => {
    const { result } = renderHook(() => useOptionRegistry());
    const el = document.createElement("div");

    act(() => {
      result.current.registerOption("apple", "Apple", el);
    });
    act(() => {
      result.current.unregisterOption("apple");
    });

    expect(result.current.getOptions()).toEqual([]);
    expect(result.current.getOptionLabel("apple")).toBeUndefined();
  });

  it("preserves insertion order in getOptions", () => {
    const { result } = renderHook(() => useOptionRegistry());

    act(() => {
      result.current.registerOption("banana", "Banana", null);
      result.current.registerOption("apple", "Apple", null);
      result.current.registerOption("cherry", "Cherry", null);
    });

    expect(result.current.getOptions()).toEqual(["banana", "apple", "cherry"]);
  });

  it("tracks disabled state", () => {
    const { result } = renderHook(() => useOptionRegistry());

    act(() => {
      result.current.registerOption("apple", "Apple", null);
    });

    expect(result.current.isOptionDisabled("apple")).toBe(false);

    act(() => {
      result.current.registerDisabledOption("apple", true);
    });

    expect(result.current.isOptionDisabled("apple")).toBe(true);
  });

  it("increments registryVersion on register", () => {
    const { result } = renderHook(() => useOptionRegistry());
    const initial = result.current.registryVersion;

    act(() => {
      result.current.registerOption("apple", "Apple", null);
    });

    expect(result.current.registryVersion).toBe(initial + 1);
  });

  it("increments registryVersion on unregister", () => {
    const { result } = renderHook(() => useOptionRegistry());

    act(() => {
      result.current.registerOption("apple", "Apple", null);
    });
    const afterRegister = result.current.registryVersion;

    act(() => {
      result.current.unregisterOption("apple");
    });

    expect(result.current.registryVersion).toBe(afterRegister + 1);
  });

  it("returns false for unknown option disabled state", () => {
    const { result } = renderHook(() => useOptionRegistry());
    expect(result.current.isOptionDisabled("unknown")).toBe(false);
  });

  it("returns undefined for unknown option label", () => {
    const { result } = renderHook(() => useOptionRegistry());
    expect(result.current.getOptionLabel("unknown")).toBeUndefined();
  });
});
