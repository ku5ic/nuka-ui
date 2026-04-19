import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  describe("rendering", () => {
    it("renders a p element by default", () => {
      render(<Eyebrow>Category</Eyebrow>);
      expect(screen.getByText("Category").tagName).toBe("P");
    });

    it("sets displayName correctly", () => {
      expect(Eyebrow.displayName).toBe("Eyebrow");
    });

    it("applies uppercase class", () => {
      render(<Eyebrow>Label</Eyebrow>);
      expect(screen.getByText("Label").className).toContain("uppercase");
    });

    it("applies tracking-widest class", () => {
      render(<Eyebrow>Label</Eyebrow>);
      expect(screen.getByText("Label").className).toContain("tracking-widest");
    });
  });

  describe("as prop", () => {
    it("renders as span when as='span'", () => {
      render(<Eyebrow as="span">Inline</Eyebrow>);
      expect(screen.getByText("Inline").tagName).toBe("SPAN");
    });
  });

  describe("color", () => {
    it("applies muted color by default", () => {
      render(<Eyebrow>Default</Eyebrow>);
      expect(screen.getByText("Default").className).toContain(
        "text-(--nuka-text-muted)",
      );
    });

    it("applies base color", () => {
      render(<Eyebrow color="base">Base</Eyebrow>);
      expect(screen.getByText("Base").className).toContain(
        "text-(--nuka-text-base)",
      );
    });

    it("applies accent color", () => {
      render(<Eyebrow color="accent">Accent</Eyebrow>);
      expect(screen.getByText("Accent").className).toContain(
        "text-(--nuka-accent-text)",
      );
    });

    it("applies subtle color", () => {
      render(<Eyebrow color="subtle">Subtle</Eyebrow>);
      expect(screen.getByText("Subtle").className).toContain(
        "text-(--nuka-text-subtle)",
      );
    });

    it("applies inverse color", () => {
      render(<Eyebrow color="inverse">Inverse</Eyebrow>);
      expect(screen.getByText("Inverse").className).toContain(
        "text-(--nuka-text-inverse)",
      );
    });

    it("applies disabled color", () => {
      render(<Eyebrow color="disabled">Disabled</Eyebrow>);
      expect(screen.getByText("Disabled").className).toContain(
        "text-(--nuka-text-disabled)",
      );
    });

    it("applies danger color", () => {
      render(<Eyebrow color="danger">Danger</Eyebrow>);
      expect(screen.getByText("Danger").className).toContain(
        "text-(--nuka-danger-text)",
      );
    });

    it("applies success color", () => {
      render(<Eyebrow color="success">Success</Eyebrow>);
      expect(screen.getByText("Success").className).toContain(
        "text-(--nuka-success-text)",
      );
    });

    it("applies warning color", () => {
      render(<Eyebrow color="warning">Warning</Eyebrow>);
      expect(screen.getByText("Warning").className).toContain(
        "text-(--nuka-warning-text)",
      );
    });
  });

  describe("weight", () => {
    it("applies semibold weight by default", () => {
      render(<Eyebrow>Default</Eyebrow>);
      expect(screen.getByText("Default").className).toContain(
        "font-[number:var(--font-weight-semibold)]",
      );
    });

    const weightCases = [
      ["thin", "font-[number:var(--font-weight-thin)]"],
      ["extralight", "font-[number:var(--font-weight-extralight)]"],
      ["light", "font-[number:var(--font-weight-light)]"],
      ["regular", "font-[number:var(--font-weight-regular)]"],
      ["medium", "font-[number:var(--font-weight-medium)]"],
      ["semibold", "font-[number:var(--font-weight-semibold)]"],
      ["bold", "font-[number:var(--font-weight-bold)]"],
      ["extrabold", "font-[number:var(--font-weight-extrabold)]"],
      ["black", "font-[number:var(--font-weight-black)]"],
    ] as const;

    for (const [weight, expected] of weightCases) {
      it(`applies ${weight} weight`, () => {
        render(<Eyebrow weight={weight}>Label</Eyebrow>);
        expect(screen.getByText("Label").className).toContain(expected);
      });
    }
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Eyebrow className="mt-4">Styled</Eyebrow>);
      const el = screen.getByText("Styled");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("uppercase");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the rendered element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Eyebrow ref={ref}>Text</Eyebrow>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it("forwards ref with as prop", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Eyebrow ref={ref} as="span">
          Span
        </Eyebrow>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
