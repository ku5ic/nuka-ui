import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  describe("rendering", () => {
    it("renders a button element by default", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: "Click me" }),
      ).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<Button>Label</Button>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Button.displayName).toBe("Button");
    });
  });

  describe("variants", () => {
    it("applies primary variant classes by default", () => {
      render(<Button>Primary</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("bg-[var(--vault-accent-bg)]");
    });

    it("applies secondary variant classes when specified", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("bg-[var(--vault-bg-muted)]");
    });

    it("applies ghost variant classes when specified", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("bg-transparent");
    });

    it("applies danger variant classes when specified", () => {
      render(<Button variant="danger">Danger</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("bg-[var(--vault-danger-bg)]");
    });

    it("applies sm size classes when specified", () => {
      render(<Button size="sm">Small</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("text-[var(--font-size-sm)]");
    });

    it("applies lg size classes when specified", () => {
      render(<Button size="lg">Large</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("text-[var(--font-size-lg)]");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Button className="mt-4">Button</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("mt-4");
      expect(btn.className).toContain("bg-[var(--vault-accent-bg)]");
    });
  });

  describe("native attributes", () => {
    it("forwards type attribute", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("forwards disabled attribute", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("forwards aria-label attribute", () => {
      render(<Button aria-label="Close dialog">X</Button>);
      expect(
        screen.getByRole("button", { name: "Close dialog" }),
      ).toBeInTheDocument();
    });

    it("forwards data attributes", () => {
      render(<Button data-testid="my-button">Button</Button>);
      expect(screen.getByTestId("my-button")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link button</a>
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Link button" });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
    });

    it("merges button classes onto child element", () => {
      render(
        <Button asChild variant="primary">
          <a href="/test">Link button</a>
        </Button>,
      );
      const link = screen.getByRole("link");
      expect(link.className).toContain("bg-[var(--vault-accent-bg)]");
    });
  });
});
