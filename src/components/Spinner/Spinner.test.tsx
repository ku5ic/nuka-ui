import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<Spinner data-testid="spinner" />);
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("renders an SVG element inside the span", () => {
      render(<Spinner data-testid="spinner" />);
      const el = screen.getByTestId("spinner");
      expect(el.tagName).toBe("SPAN");
      expect(el.querySelector("svg")).not.toBeNull();
    });

    it("sets displayName correctly", () => {
      expect(Spinner.displayName).toBe("Spinner");
    });
  });

  describe("size", () => {
    it("applies size-4 for sm", () => {
      render(<Spinner size="sm" data-testid="spinner" />);
      expect(screen.getByTestId("spinner").className).toContain("size-4");
    });

    it("applies size-6 for md (default)", () => {
      render(<Spinner data-testid="spinner" />);
      expect(screen.getByTestId("spinner").className).toContain("size-6");
    });

    it("applies size-8 for lg", () => {
      render(<Spinner size="lg" data-testid="spinner" />);
      expect(screen.getByTestId("spinner").className).toContain("size-8");
    });

    it("sets correct stroke-width for sm", () => {
      render(<Spinner size="sm" data-testid="spinner" />);
      const circles = screen.getByTestId("spinner").querySelectorAll("circle");
      for (const circle of circles) {
        expect(circle.getAttribute("stroke-width")).toBe("2");
      }
    });

    it("sets correct stroke-width for md", () => {
      render(<Spinner data-testid="spinner" />);
      const circles = screen.getByTestId("spinner").querySelectorAll("circle");
      for (const circle of circles) {
        expect(circle.getAttribute("stroke-width")).toBe("2.5");
      }
    });

    it("sets correct stroke-width for lg", () => {
      render(<Spinner size="lg" data-testid="spinner" />);
      const circles = screen.getByTestId("spinner").querySelectorAll("circle");
      for (const circle of circles) {
        expect(circle.getAttribute("stroke-width")).toBe("3");
      }
    });
  });

  describe("color", () => {
    it("applies default stroke color to arc circle", () => {
      render(<Spinner data-testid="spinner" />);
      const arc = screen.getByTestId("spinner").querySelectorAll("circle")[1];
      expect(arc?.getAttribute("class")).toContain(
        "stroke-(--nuka-accent-bg)",
      );
    });

    it("applies muted stroke color to arc circle", () => {
      render(<Spinner color="muted" data-testid="spinner" />);
      const arc = screen.getByTestId("spinner").querySelectorAll("circle")[1];
      expect(arc?.getAttribute("class")).toContain(
        "stroke-(--nuka-text-muted)",
      );
    });

    it("applies inverse stroke color to arc circle", () => {
      render(<Spinner color="inverse" data-testid="spinner" />);
      const arc = screen.getByTestId("spinner").querySelectorAll("circle")[1];
      expect(arc?.getAttribute("class")).toContain(
        "stroke-(--nuka-text-inverse)",
      );
    });

    it("track circle always uses --nuka-border-base", () => {
      render(<Spinner color="inverse" data-testid="spinner" />);
      const track = screen.getByTestId("spinner").querySelectorAll("circle")[0];
      expect(track?.getAttribute("stroke")).toBe("var(--nuka-border-base)");
    });
  });

  describe("accessibility", () => {
    it("when label is provided: renders visually hidden text and role='status'", () => {
      render(<Spinner label="Saving changes" data-testid="spinner" />);
      const el = screen.getByTestId("spinner");
      expect(el).toHaveAttribute("role", "status");
      expect(screen.getByText("Saving changes")).toBeInTheDocument();
      expect(screen.getByText("Saving changes").className).toContain(
        "sr-only",
      );
    });

    it("when label is absent and aria-hidden is not set: has role='status' and aria-label='Loading'", () => {
      render(<Spinner data-testid="spinner" />);
      const el = screen.getByTestId("spinner");
      expect(el).toHaveAttribute("role", "status");
      expect(el).toHaveAttribute("aria-label", "Loading");
    });

    it("when aria-hidden={true}: has aria-hidden, no role", () => {
      render(<Spinner aria-hidden={true} data-testid="spinner" />);
      const el = screen.getByTestId("spinner");
      expect(el).toHaveAttribute("aria-hidden", "true");
      expect(el).not.toHaveAttribute("role");
    });

    it("aria-hidden='false' does not trigger embedded mode", () => {
      render(<Spinner aria-hidden="false" data-testid="spinner" />);
      const el = screen.getByTestId("spinner");
      expect(el).toHaveAttribute("role", "status");
    });

    it("SVG always has aria-hidden='true'", () => {
      render(<Spinner data-testid="spinner" />);
      const svg = screen.getByTestId("spinner").querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("SVG has aria-hidden='true' even in embedded mode", () => {
      render(<Spinner aria-hidden={true} data-testid="spinner" />);
      const svg = screen.getByTestId("spinner").querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Spinner className="ml-2" data-testid="spinner" />);
      const el = screen.getByTestId("spinner");
      expect(el.className).toContain("ml-2");
      expect(el.className).toContain("inline-flex");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the root span element", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
