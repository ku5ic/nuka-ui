import { describe, it, expect } from "vitest";
import { getRovingIndex } from "@nuka/utils/roving-index";

describe("getRovingIndex", () => {
  describe("vertical orientation (default for 'both')", () => {
    it("ArrowDown moves to next index", () => {
      expect(getRovingIndex("ArrowDown", 0, 5)).toBe(1);
    });

    it("ArrowDown wraps from last to first", () => {
      expect(getRovingIndex("ArrowDown", 4, 5)).toBe(0);
    });

    it("ArrowUp moves to previous index", () => {
      expect(getRovingIndex("ArrowUp", 2, 5)).toBe(1);
    });

    it("ArrowUp wraps from first to last", () => {
      expect(getRovingIndex("ArrowUp", 0, 5)).toBe(4);
    });
  });

  describe("horizontal orientation", () => {
    it("ArrowRight moves to next index", () => {
      expect(getRovingIndex("ArrowRight", 0, 3, "horizontal")).toBe(1);
    });

    it("ArrowRight wraps from last to first", () => {
      expect(getRovingIndex("ArrowRight", 2, 3, "horizontal")).toBe(0);
    });

    it("ArrowLeft moves to previous index", () => {
      expect(getRovingIndex("ArrowLeft", 1, 3, "horizontal")).toBe(0);
    });

    it("ArrowLeft wraps from first to last", () => {
      expect(getRovingIndex("ArrowLeft", 0, 3, "horizontal")).toBe(2);
    });

    it("ArrowDown returns undefined in horizontal mode", () => {
      expect(getRovingIndex("ArrowDown", 0, 3, "horizontal")).toBeUndefined();
    });

    it("ArrowUp returns undefined in horizontal mode", () => {
      expect(getRovingIndex("ArrowUp", 0, 3, "horizontal")).toBeUndefined();
    });
  });

  describe("vertical-only orientation", () => {
    it("ArrowRight returns undefined in vertical mode", () => {
      expect(getRovingIndex("ArrowRight", 0, 3, "vertical")).toBeUndefined();
    });

    it("ArrowLeft returns undefined in vertical mode", () => {
      expect(getRovingIndex("ArrowLeft", 0, 3, "vertical")).toBeUndefined();
    });
  });

  describe("both orientation", () => {
    it("ArrowDown and ArrowRight both work", () => {
      expect(getRovingIndex("ArrowDown", 0, 3, "both")).toBe(1);
      expect(getRovingIndex("ArrowRight", 0, 3, "both")).toBe(1);
    });

    it("ArrowUp and ArrowLeft both work", () => {
      expect(getRovingIndex("ArrowUp", 1, 3, "both")).toBe(0);
      expect(getRovingIndex("ArrowLeft", 1, 3, "both")).toBe(0);
    });
  });

  describe("Home and End", () => {
    it("Home returns 0 regardless of orientation", () => {
      expect(getRovingIndex("Home", 3, 5)).toBe(0);
      expect(getRovingIndex("Home", 3, 5, "horizontal")).toBe(0);
      expect(getRovingIndex("Home", 3, 5, "vertical")).toBe(0);
    });

    it("End returns last index regardless of orientation", () => {
      expect(getRovingIndex("End", 0, 5)).toBe(4);
      expect(getRovingIndex("End", 0, 5, "horizontal")).toBe(4);
      expect(getRovingIndex("End", 0, 5, "vertical")).toBe(4);
    });
  });

  describe("edge cases", () => {
    it("returns undefined for zero items", () => {
      expect(getRovingIndex("ArrowDown", 0, 0)).toBeUndefined();
    });

    it("wraps correctly with single item", () => {
      expect(getRovingIndex("ArrowDown", 0, 1)).toBe(0);
      expect(getRovingIndex("ArrowUp", 0, 1)).toBe(0);
    });

    it("returns undefined for non-navigation keys", () => {
      expect(getRovingIndex("Enter", 0, 5)).toBeUndefined();
      expect(getRovingIndex("Escape", 0, 5)).toBeUndefined();
      expect(getRovingIndex("Tab", 0, 5)).toBeUndefined();
      expect(getRovingIndex("a", 0, 5)).toBeUndefined();
    });

    it("handles currentIndex of -1 (no current selection)", () => {
      expect(getRovingIndex("ArrowDown", -1, 5)).toBe(0);
      expect(getRovingIndex("ArrowUp", -1, 5)).toBe(4);
    });
  });
});
