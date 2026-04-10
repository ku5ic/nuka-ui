import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  describe("rendering", () => {
    it("renders a <kbd> element", () => {
      const { container } = render(<Kbd>Enter</Kbd>);
      const kbd = container.querySelector("kbd");
      expect(kbd).not.toBeNull();
      expect(kbd?.tagName).toBe("KBD");
    });

    it("renders children correctly", () => {
      render(<Kbd data-testid="kbd">Shift</Kbd>);
      expect(screen.getByTestId("kbd")).toHaveTextContent("Shift");
    });

    it("sets displayName correctly", () => {
      expect(Kbd.displayName).toBe("Kbd");
    });
  });

  describe("size", () => {
    it("applies sm size classes", () => {
      render(
        <Kbd size="sm" data-testid="kbd">
          K
        </Kbd>,
      );
      const el = screen.getByTestId("kbd");
      expect(el.className).toContain("min-h-5");
      expect(el.className).toContain("text-[length:var(--font-size-xs)]");
    });

    it("applies md size classes (default)", () => {
      render(<Kbd data-testid="kbd">K</Kbd>);
      const el = screen.getByTestId("kbd");
      expect(el.className).toContain("min-h-6");
      expect(el.className).toContain("text-[length:var(--font-size-sm)]");
    });

    it("applies lg size classes", () => {
      render(
        <Kbd size="lg" data-testid="kbd">
          K
        </Kbd>,
      );
      const el = screen.getByTestId("kbd");
      expect(el.className).toContain("min-h-8");
      expect(el.className).toContain("text-[length:var(--font-size-md)]");
    });

    // Variant system test: verifies default md size output via class names.
    it("defaults to md when no size is specified", () => {
      render(<Kbd data-testid="kbd">K</Kbd>);
      const el = screen.getByTestId("kbd");
      expect(el.className).toContain("min-h-6");
      expect(el.className).toContain("px-(--space-2)");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(
        <Kbd className="ml-2" data-testid="kbd">
          K
        </Kbd>,
      );
      const el = screen.getByTestId("kbd");
      expect(el.className).toContain("ml-2");
    });
  });

  describe("native attributes", () => {
    it("forwards data-* attributes", () => {
      render(
        <Kbd data-testid="kbd" data-shortcut="true">
          K
        </Kbd>,
      );
      expect(screen.getByTestId("kbd")).toHaveAttribute(
        "data-shortcut",
        "true",
      );
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the underlying <kbd> element", () => {
      const ref = React.createRef<HTMLElement>();
      const { container } = render(<Kbd ref={ref}>K</Kbd>);
      expect(ref.current).toBe(container.querySelector("kbd"));
      expect(ref.current?.tagName).toBe("KBD");
    });
  });
});
