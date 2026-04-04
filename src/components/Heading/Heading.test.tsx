import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading";

describe("Heading", () => {
  describe("rendering", () => {
    it("renders an h2 element by default", () => {
      render(<Heading>Title</Heading>);
      expect(
        screen.getByRole("heading", { level: 2, name: "Title" }),
      ).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<Heading>Page Title</Heading>);
      expect(screen.getByText("Page Title")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Heading.displayName).toBe("Heading");
    });
  });

  describe("as prop", () => {
    it("renders as h1", () => {
      render(<Heading as="h1">Hero</Heading>);
      expect(
        screen.getByRole("heading", { level: 1, name: "Hero" }),
      ).toBeInTheDocument();
    });

    it("renders as h2", () => {
      render(<Heading as="h2">Section</Heading>);
      expect(
        screen.getByRole("heading", { level: 2, name: "Section" }),
      ).toBeInTheDocument();
    });

    it("renders as h3", () => {
      render(<Heading as="h3">Subsection</Heading>);
      expect(
        screen.getByRole("heading", { level: 3, name: "Subsection" }),
      ).toBeInTheDocument();
    });

    it("renders as h4", () => {
      render(<Heading as="h4">Group</Heading>);
      expect(
        screen.getByRole("heading", { level: 4, name: "Group" }),
      ).toBeInTheDocument();
    });

    it("renders as h5", () => {
      render(<Heading as="h5">Detail</Heading>);
      expect(
        screen.getByRole("heading", { level: 5, name: "Detail" }),
      ).toBeInTheDocument();
    });

    it("renders as h6", () => {
      render(<Heading as="h6">Fine</Heading>);
      expect(
        screen.getByRole("heading", { level: 6, name: "Fine" }),
      ).toBeInTheDocument();
    });
  });

  describe("sizes", () => {
    it("applies 3xl size classes by default", () => {
      render(<Heading>Default</Heading>);
      expect(
        screen.getByRole("heading", { name: "Default" }).className,
      ).toContain("text-[length:var(--font-size-3xl)]");
    });

    it("applies xl size classes", () => {
      render(<Heading size="xl">XL</Heading>);
      expect(
        screen.getByRole("heading", { name: "XL" }).className,
      ).toContain("text-[length:var(--font-size-xl)]");
    });

    it("applies 2xl size classes", () => {
      render(<Heading size="2xl">2XL</Heading>);
      expect(
        screen.getByRole("heading", { name: "2XL" }).className,
      ).toContain("text-[length:var(--font-size-2xl)]");
    });

    it("applies 4xl size classes", () => {
      render(<Heading size="4xl">4XL</Heading>);
      expect(
        screen.getByRole("heading", { name: "4XL" }).className,
      ).toContain("text-[length:var(--font-size-4xl)]");
    });

    it("pairs xl/2xl/3xl with snug line-height", () => {
      render(<Heading size="2xl">Snug</Heading>);
      expect(
        screen.getByRole("heading", { name: "Snug" }).className,
      ).toContain("leading-[var(--line-height-snug)]");
    });

    it("pairs 4xl with tight line-height", () => {
      render(<Heading size="4xl">Tight</Heading>);
      expect(
        screen.getByRole("heading", { name: "Tight" }).className,
      ).toContain("leading-[var(--line-height-tight)]");
    });

    it("size and as are decoupled", () => {
      render(
        <Heading as="h3" size="4xl">
          Big H3
        </Heading>,
      );
      const el = screen.getByRole("heading", { level: 3, name: "Big H3" });
      expect(el.className).toContain("text-[length:var(--font-size-4xl)]");
    });
  });

  describe("weights", () => {
    it("applies bold weight by default", () => {
      render(<Heading>Bold</Heading>);
      expect(
        screen.getByRole("heading", { name: "Bold" }).className,
      ).toContain("font-[number:var(--font-weight-bold)]");
    });

    it("applies regular weight", () => {
      render(<Heading weight="regular">Regular</Heading>);
      expect(
        screen.getByRole("heading", { name: "Regular" }).className,
      ).toContain("font-[number:var(--font-weight-regular)]");
    });

    it("applies medium weight", () => {
      render(<Heading weight="medium">Medium</Heading>);
      expect(
        screen.getByRole("heading", { name: "Medium" }).className,
      ).toContain("font-[number:var(--font-weight-medium)]");
    });

    it("applies semibold weight", () => {
      render(<Heading weight="semibold">Semibold</Heading>);
      expect(
        screen.getByRole("heading", { name: "Semibold" }).className,
      ).toContain("font-[number:var(--font-weight-semibold)]");
    });
  });

  describe("colors", () => {
    it("applies base color by default", () => {
      render(<Heading>Base</Heading>);
      expect(
        screen.getByRole("heading", { name: "Base" }).className,
      ).toContain("text-[var(--nuka-text-base)]");
    });

    it("applies muted color", () => {
      render(<Heading color="muted">Muted</Heading>);
      expect(
        screen.getByRole("heading", { name: "Muted" }).className,
      ).toContain("text-[var(--nuka-text-muted)]");
    });

    it("applies danger color", () => {
      render(<Heading color="danger">Danger</Heading>);
      expect(
        screen.getByRole("heading", { name: "Danger" }).className,
      ).toContain("text-[var(--nuka-danger-text)]");
    });

    it("applies inverse color", () => {
      render(<Heading color="inverse">Inverse</Heading>);
      expect(
        screen.getByRole("heading", { name: "Inverse" }).className,
      ).toContain("text-[var(--nuka-text-inverse)]");
    });
  });

  describe("truncate", () => {
    it("does not apply truncate by default", () => {
      render(<Heading>Not truncated</Heading>);
      expect(
        screen.getByRole("heading", { name: "Not truncated" }).className,
      ).not.toContain("truncate");
    });

    it("applies truncate when true", () => {
      render(<Heading truncate>Truncated heading</Heading>);
      expect(
        screen.getByRole("heading", { name: "Truncated heading" }).className,
      ).toContain("truncate");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Heading className="mt-8">Styled</Heading>);
      const el = screen.getByRole("heading", { name: "Styled" });
      expect(el.className).toContain("mt-8");
      expect(el.className).toContain("text-[var(--nuka-text-base)]");
    });
  });

  describe("native attributes", () => {
    it("forwards id attribute", () => {
      render(<Heading id="section-title">Section</Heading>);
      expect(
        screen.getByRole("heading", { name: "Section" }),
      ).toHaveAttribute("id", "section-title");
    });

    it("forwards aria-label attribute", () => {
      render(<Heading aria-label="main heading">Title</Heading>);
      expect(
        screen.getByRole("heading", { name: "main heading" }),
      ).toBeInTheDocument();
    });

    it("forwards data attributes", () => {
      render(<Heading data-testid="my-heading">Heading</Heading>);
      expect(screen.getByTestId("my-heading")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the rendered element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Heading ref={ref}>Heading</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it("forwards ref when using as prop", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Heading ref={ref} as="h4">
          H4
        </Heading>,
      );
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName).toBe("H4");
    });
  });
});
