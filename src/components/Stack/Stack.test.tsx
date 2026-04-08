import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("Stack", () => {
  describe("rendering", () => {
    it("renders a div element by default", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      const el = screen.getByTestId("stack");
      expect(el.tagName).toBe("DIV");
    });

    it("renders children correctly", () => {
      render(<Stack>Hello</Stack>);
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Stack.displayName).toBe("Stack");
    });
  });

  describe("base class", () => {
    it("applies flex base class", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack").className).toContain("flex");
    });
  });

  describe("direction", () => {
    it("applies default direction class (flex-col)", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack").className).toContain("flex-col");
    });

    it("applies flex-row when direction is row", () => {
      render(
        <Stack data-testid="stack" direction="row">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack").className).toContain("flex-row");
    });

    it("applies responsive direction classes", () => {
      render(
        <Stack data-testid="stack" direction={{ base: "column", md: "row" }}>
          Content
        </Stack>,
      );
      const cls = screen.getByTestId("stack").className;
      expect(cls).toContain("flex-col");
      expect(cls).toContain("md:flex-row");
    });
  });

  describe("gap", () => {
    it("applies default gap class (gap-0)", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack").className).toContain("gap-0");
    });

    it("applies correct gap class for md scale", () => {
      render(
        <Stack data-testid="stack" gap="md">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack").className).toContain("gap-4");
    });

    it("applies responsive gap classes", () => {
      render(
        <Stack data-testid="stack" gap={{ base: "sm", lg: "xl" }}>
          Content
        </Stack>,
      );
      const cls = screen.getByTestId("stack").className;
      expect(cls).toContain("gap-2");
      expect(cls).toContain("lg:gap-8");
    });
  });

  describe("align", () => {
    it("applies correct items-center class", () => {
      render(
        <Stack data-testid="stack" align="center">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack").className).toContain("items-center");
    });

    it("emits no align class when omitted", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack").className).not.toMatch(/items-/);
    });
  });

  describe("justify", () => {
    it("applies correct justify-between class", () => {
      render(
        <Stack data-testid="stack" justify="between">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack").className).toContain(
        "justify-between",
      );
    });

    it("emits no justify class when omitted", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack").className).not.toMatch(/justify-/);
    });
  });

  describe("wrap", () => {
    it("applies correct flex-wrap class", () => {
      render(
        <Stack data-testid="stack" wrap="wrap">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack").className).toContain("flex-wrap");
    });

    it("applies correct flex-nowrap class", () => {
      render(
        <Stack data-testid="stack" wrap="nowrap">
          Content
        </Stack>,
      );
      expect(screen.getByTestId("stack").className).toContain("flex-nowrap");
    });

    it("emits no wrap class when omitted", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      const cls = screen.getByTestId("stack").className;
      expect(cls).not.toContain("flex-wrap");
      expect(cls).not.toContain("flex-nowrap");
    });
  });

  describe("className override", () => {
    it("merges consumer className with layout classes", () => {
      render(
        <Stack data-testid="stack" className="mt-4">
          Content
        </Stack>,
      );
      const cls = screen.getByTestId("stack").className;
      expect(cls).toContain("mt-4");
      expect(cls).toContain("flex");
    });
  });

  describe("native attributes", () => {
    it("forwards aria-label attribute", () => {
      render(<Stack aria-label="Navigation stack">Content</Stack>);
      expect(screen.getByLabelText("Navigation stack")).toBeInTheDocument();
    });

    it("forwards data attributes", () => {
      render(<Stack data-testid="my-stack">Content</Stack>);
      expect(screen.getByTestId("my-stack")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the div element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Stack ref={ref}>Content</Stack>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Stack asChild>
          <nav data-testid="nav">Links</nav>
        </Stack>,
      );
      const el = screen.getByTestId("nav");
      expect(el.tagName).toBe("NAV");
    });

    it("merges layout classes onto child element", () => {
      render(
        <Stack asChild direction="row" gap="md">
          <nav data-testid="nav">Links</nav>
        </Stack>,
      );
      const cls = screen.getByTestId("nav").className;
      expect(cls).toContain("flex");
      expect(cls).toContain("flex-row");
      expect(cls).toContain("gap-4");
    });
  });
});
