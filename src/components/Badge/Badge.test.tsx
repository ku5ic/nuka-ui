import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  describe("rendering", () => {
    it("renders a span element by default", () => {
      render(<Badge>Status</Badge>);
      const el = screen.getByText("Status");
      expect(el.tagName).toBe("SPAN");
    });

    it("renders children correctly", () => {
      render(<Badge>Label</Badge>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Badge.displayName).toBe("Badge");
    });
  });

  describe("variants", () => {
    it("applies solid variant classes by default", () => {
      render(<Badge>Solid</Badge>);
      expect(screen.getByText("Solid").className).toContain(
        "bg-[var(--nuka-accent-bg)]",
      );
    });

    it("applies subtle variant classes when specified", () => {
      render(<Badge variant="subtle">Subtle</Badge>);
      expect(screen.getByText("Subtle").className).toContain(
        "bg-[var(--nuka-bg-muted)]",
      );
    });

    it("applies outline variant classes when specified", () => {
      render(<Badge variant="outline">Outline</Badge>);
      expect(screen.getByText("Outline").className).toContain("border");
    });
  });

  describe("sizes", () => {
    it("applies sm size classes when specified", () => {
      render(<Badge size="sm">Small</Badge>);
      expect(screen.getByText("Small").className).toContain("text-xs");
    });

    it("applies md size classes by default", () => {
      render(<Badge>Medium</Badge>);
      expect(screen.getByText("Medium").className).toContain("text-xs");
    });

    it("applies lg size classes when specified", () => {
      render(<Badge size="lg">Large</Badge>);
      expect(screen.getByText("Large").className).toContain("text-sm");
    });
  });

  describe("intent", () => {
    it("applies danger intent classes when specified", () => {
      render(<Badge intent="danger">Danger</Badge>);
      expect(screen.getByText("Danger").className).toContain(
        "bg-[var(--nuka-danger-base)]",
      );
    });

    it("applies success intent classes when specified", () => {
      render(<Badge intent="success">Success</Badge>);
      expect(screen.getByText("Success").className).toContain(
        "bg-[var(--nuka-success-base)]",
      );
    });

    it("applies warning intent classes when specified", () => {
      render(<Badge intent="warning">Warning</Badge>);
      expect(screen.getByText("Warning").className).toContain(
        "bg-[var(--nuka-warning-base)]",
      );
    });

    it("applies compound variant and intent classes", () => {
      render(
        <Badge variant="subtle" intent="danger">
          Subtle Danger
        </Badge>,
      );
      const el = screen.getByText("Subtle Danger");
      expect(el.className).toContain("bg-[var(--nuka-danger-bg)]");
      expect(el.className).toContain("text-[var(--nuka-danger-text)]");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Badge className="mt-4">Badge</Badge>);
      const el = screen.getByText("Badge");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("bg-[var(--nuka-accent-bg)]");
    });
  });

  describe("native attributes", () => {
    it("forwards aria-label attribute", () => {
      render(<Badge aria-label="status indicator">New</Badge>);
      const el = screen.getByText("New");
      expect(el).toHaveAttribute("aria-label", "status indicator");
    });

    it("forwards data attributes", () => {
      render(<Badge data-testid="my-badge">Badge</Badge>);
      expect(screen.getByTestId("my-badge")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the span element", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Badge asChild>
          <abbr title="Work in Progress">WIP</abbr>
        </Badge>,
      );
      const el = screen.getByText("WIP");
      expect(el.tagName).toBe("ABBR");
    });

    it("merges badge classes onto child element", () => {
      render(
        <Badge asChild variant="solid">
          <abbr title="Work in Progress">WIP</abbr>
        </Badge>,
      );
      expect(screen.getByText("WIP").className).toContain(
        "bg-[var(--nuka-accent-bg)]",
      );
    });
  });
});
