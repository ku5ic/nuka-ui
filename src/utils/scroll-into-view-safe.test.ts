import { describe, it, expect, vi } from "vitest";
import { scrollIntoViewSafe } from "@nuka/utils/scroll-into-view-safe";

describe("scrollIntoViewSafe", () => {
  it("calls scrollIntoView with block nearest when element has the method", () => {
    const el = document.createElement("div");
    const mock = vi.fn();
    el.scrollIntoView = mock;
    scrollIntoViewSafe(el);
    expect(mock).toHaveBeenCalledWith({ block: "nearest" });
  });

  it("does not throw for null", () => {
    expect(() => scrollIntoViewSafe(null)).not.toThrow();
  });

  it("does not throw for undefined", () => {
    expect(() => scrollIntoViewSafe(undefined)).not.toThrow();
  });
});
