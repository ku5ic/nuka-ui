import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  describe("rendering", () => {
    it("renders with aria-hidden='true'", () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId("skeleton")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("sets displayName correctly", () => {
      expect(Skeleton.displayName).toBe("Skeleton");
    });
  });

  describe("shape", () => {
    it("applies rect shape classes by default", () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId("skeleton").className).toContain(
        "rounded-[var(--radius-md)]",
      );
    });

    it("applies circle shape classes", () => {
      render(<Skeleton data-testid="skeleton" shape="circle" />);
      const el = screen.getByTestId("skeleton");
      expect(el.className).toContain("rounded-full");
      expect(el.className).toContain("aspect-square");
    });

    it("applies text shape classes", () => {
      render(<Skeleton data-testid="skeleton" shape="text" />);
      const el = screen.getByTestId("skeleton");
      expect(el.className).toContain("rounded-[var(--radius-sm)]");
      expect(el.className).toContain("h-[1em]");
    });
  });

  describe("className override", () => {
    it("merges consumer className with shape classes", () => {
      render(<Skeleton data-testid="skeleton" className="w-32 h-32" />);
      const el = screen.getByTestId("skeleton");
      expect(el.className).toContain("w-32");
      expect(el.className).toContain("animate-pulse");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
