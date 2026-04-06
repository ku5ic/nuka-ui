import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

describe("Text", () => {
  describe("rendering", () => {
    it("renders a p element by default", () => {
      render(<Text>Hello world</Text>);
      const el = screen.getByText("Hello world");
      expect(el.tagName).toBe("P");
    });

    it("renders children correctly", () => {
      render(<Text>Body copy</Text>);
      expect(screen.getByText("Body copy")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Text.displayName).toBe("Text");
    });
  });

  describe("as prop", () => {
    it("renders as span when as='span'", () => {
      render(<Text as="span">Inline</Text>);
      expect(screen.getByText("Inline").tagName).toBe("SPAN");
    });

    it("renders as label when as='label'", () => {
      render(<Text as="label">Field label</Text>);
      expect(screen.getByText("Field label").tagName).toBe("LABEL");
    });

    it("renders as li when as='li'", () => {
      render(
        <ul>
          <Text as="li">List item</Text>
        </ul>,
      );
      expect(screen.getByText("List item").tagName).toBe("LI");
    });

    it("renders as div when as='div'", () => {
      render(<Text as="div">Block</Text>);
      expect(screen.getByText("Block").tagName).toBe("DIV");
    });

    it("renders as time when as='time'", () => {
      render(<Text as="time">2026-04-04</Text>);
      expect(screen.getByText("2026-04-04").tagName).toBe("TIME");
    });
  });

  describe("sizes", () => {
    it("applies xs size classes", () => {
      render(<Text size="xs">Extra small</Text>);
      expect(screen.getByText("Extra small").className).toContain(
        "text-[length:var(--font-size-xs)]",
      );
    });

    it("applies sm size classes", () => {
      render(<Text size="sm">Small</Text>);
      expect(screen.getByText("Small").className).toContain(
        "text-[length:var(--font-size-sm)]",
      );
    });

    it("applies md size classes by default", () => {
      render(<Text>Medium</Text>);
      expect(screen.getByText("Medium").className).toContain(
        "text-[length:var(--font-size-md)]",
      );
    });

    it("applies lg size classes", () => {
      render(<Text size="lg">Large</Text>);
      expect(screen.getByText("Large").className).toContain(
        "text-[length:var(--font-size-lg)]",
      );
    });

    it("applies xl size classes", () => {
      render(<Text size="xl">Extra large</Text>);
      expect(screen.getByText("Extra large").className).toContain(
        "text-[length:var(--font-size-xl)]",
      );
    });

    it("pairs xs/sm/md with normal line-height", () => {
      render(<Text size="sm">Normal leading</Text>);
      expect(screen.getByText("Normal leading").className).toContain(
        "leading-(--line-height-normal)",
      );
    });

    it("pairs lg/xl with snug line-height", () => {
      render(<Text size="lg">Snug leading</Text>);
      expect(screen.getByText("Snug leading").className).toContain(
        "leading-(--line-height-snug)",
      );
    });
  });

  describe("weights", () => {
    it("applies regular weight by default", () => {
      render(<Text>Regular</Text>);
      expect(screen.getByText("Regular").className).toContain(
        "font-[number:var(--font-weight-regular)]",
      );
    });

    it("applies medium weight", () => {
      render(<Text weight="medium">Medium</Text>);
      expect(screen.getByText("Medium").className).toContain(
        "font-[number:var(--font-weight-medium)]",
      );
    });

    it("applies semibold weight", () => {
      render(<Text weight="semibold">Semibold</Text>);
      expect(screen.getByText("Semibold").className).toContain(
        "font-[number:var(--font-weight-semibold)]",
      );
    });

    it("applies bold weight", () => {
      render(<Text weight="bold">Bold</Text>);
      expect(screen.getByText("Bold").className).toContain(
        "font-[number:var(--font-weight-bold)]",
      );
    });
  });

  describe("colors", () => {
    it("applies base color by default", () => {
      render(<Text>Base</Text>);
      expect(screen.getByText("Base").className).toContain(
        "text-(--nuka-text-base)",
      );
    });

    it("applies muted color", () => {
      render(<Text color="muted">Muted</Text>);
      expect(screen.getByText("Muted").className).toContain(
        "text-(--nuka-text-muted)",
      );
    });

    it("applies danger color", () => {
      render(<Text color="danger">Danger</Text>);
      expect(screen.getByText("Danger").className).toContain(
        "text-(--nuka-danger-text)",
      );
    });

    it("applies success color", () => {
      render(<Text color="success">Success</Text>);
      expect(screen.getByText("Success").className).toContain(
        "text-(--nuka-success-text)",
      );
    });

    it("applies inverse color", () => {
      render(<Text color="inverse">Inverse</Text>);
      expect(screen.getByText("Inverse").className).toContain(
        "text-(--nuka-text-inverse)",
      );
    });
  });

  describe("alignment", () => {
    it("applies left alignment by default", () => {
      render(<Text>Left</Text>);
      expect(screen.getByText("Left").className).toContain("text-left");
    });

    it("applies center alignment", () => {
      render(<Text align="center">Center</Text>);
      expect(screen.getByText("Center").className).toContain("text-center");
    });

    it("applies right alignment", () => {
      render(<Text align="right">Right</Text>);
      expect(screen.getByText("Right").className).toContain("text-right");
    });
  });

  describe("truncate", () => {
    it("does not apply truncate by default", () => {
      render(<Text>Not truncated</Text>);
      expect(screen.getByText("Not truncated").className).not.toContain(
        "truncate",
      );
    });

    it("applies truncate when true", () => {
      render(<Text truncate>Truncated text</Text>);
      expect(screen.getByText("Truncated text").className).toContain(
        "truncate",
      );
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Text className="mt-4">Styled</Text>);
      const el = screen.getByText("Styled");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("text-(--nuka-text-base)");
    });
  });

  describe("native attributes", () => {
    it("forwards aria-label attribute", () => {
      render(<Text aria-label="description">Body</Text>);
      expect(screen.getByText("Body")).toHaveAttribute(
        "aria-label",
        "description",
      );
    });

    it("forwards data attributes", () => {
      render(<Text data-testid="my-text">Text</Text>);
      expect(screen.getByTestId("my-text")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the rendered element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Text ref={ref}>Text</Text>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("forwards ref when using as prop", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Text ref={ref} as="span">
          Span
        </Text>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
