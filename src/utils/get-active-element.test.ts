import { describe, it, expect } from "vitest";
import { getActiveElement } from "@nuka/utils/get-active-element";

describe("getActiveElement", () => {
  it("returns document.activeElement in a browser environment", () => {
    const result = getActiveElement();
    expect(result).toBe(document.activeElement);
  });

  it("returns an Element (body by default when nothing is focused)", () => {
    const result = getActiveElement();
    expect(result).toBeInstanceOf(Element);
  });
});
