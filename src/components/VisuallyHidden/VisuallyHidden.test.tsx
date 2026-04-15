import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  describe("rendering", () => {
    it("renders a span with sr-only by default", () => {
      render(<VisuallyHidden>Hidden text</VisuallyHidden>);
      const el = screen.getByText("Hidden text");
      expect(el.tagName).toBe("SPAN");
      expect(el.className).toContain("sr-only");
    });

    it("sets displayName correctly", () => {
      expect(VisuallyHidden.displayName).toBe("VisuallyHidden");
    });
  });

  describe("as prop", () => {
    it("renders as p when as='p'", () => {
      render(<VisuallyHidden as="p">Paragraph</VisuallyHidden>);
      expect(screen.getByText("Paragraph").tagName).toBe("P");
    });

    it("renders as h2 when as='h2'", () => {
      render(<VisuallyHidden as="h2">Heading</VisuallyHidden>);
      expect(
        screen.getByRole("heading", { level: 2, name: "Heading" }),
      ).toBeInTheDocument();
    });

    it("renders as div when as='div'", () => {
      render(<VisuallyHidden as="div">Block</VisuallyHidden>);
      expect(screen.getByText("Block").tagName).toBe("DIV");
    });
  });

  describe("native attributes", () => {
    it("forwards id attribute", () => {
      render(<VisuallyHidden id="sr-label">Label</VisuallyHidden>);
      expect(screen.getByText("Label")).toHaveAttribute("id", "sr-label");
    });

    it("forwards aria-label attribute", () => {
      render(
        <VisuallyHidden aria-label="accessible name">Content</VisuallyHidden>,
      );
      expect(screen.getByText("Content")).toHaveAttribute(
        "aria-label",
        "accessible name",
      );
    });
  });

  describe("className override", () => {
    it("merges consumer className with sr-only", () => {
      render(<VisuallyHidden className="custom-class">Text</VisuallyHidden>);
      const el = screen.getByText("Text");
      expect(el.className).toContain("sr-only");
      expect(el.className).toContain("custom-class");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the rendered element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<VisuallyHidden ref={ref}>Text</VisuallyHidden>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("forwards ref with as prop", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <VisuallyHidden ref={ref} as="div">
          Text
        </VisuallyHidden>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
