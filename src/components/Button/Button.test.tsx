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
      expect(
        screen.getByRole("button", { name: "Primary" }).className,
      ).toContain("bg-(--nuka-accent-bg)");
    });

    it("applies secondary variant classes when specified", () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(
        screen.getByRole("button", { name: "Secondary" }).className,
      ).toContain("bg-(--nuka-bg-muted)");
    });

    it("applies ghost variant classes when specified", () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole("button", { name: "Ghost" }).className).toContain(
        "bg-transparent",
      );
    });

    it("applies outline variant classes when specified", () => {
      render(<Button variant="outline">Outline</Button>);
      expect(
        screen.getByRole("button", { name: "Outline" }).className,
      ).toContain("bg-transparent");
    });

    it("applies link variant classes when specified", () => {
      render(<Button variant="link">Link</Button>);
      expect(screen.getByRole("button", { name: "Link" }).className).toContain(
        "hover:underline",
      );
    });

    it("applies sm size classes when specified", () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByRole("button", { name: "Small" }).className).toContain(
        "text-xs",
      );
    });

    it("applies lg size classes when specified", () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole("button", { name: "Large" }).className).toContain(
        "text-base",
      );
    });
  });

  describe("intent", () => {
    it("applies danger intent classes when specified", () => {
      render(<Button intent="danger">Danger</Button>);
      expect(
        screen.getByRole("button", { name: "Danger" }).className,
      ).toContain("bg-(--nuka-danger-base)");
    });

    it("applies success intent classes when specified", () => {
      render(<Button intent="success">Success</Button>);
      expect(
        screen.getByRole("button", { name: "Success" }).className,
      ).toContain("bg-(--nuka-success-base)");
    });

    it("applies warning intent classes when specified", () => {
      render(<Button intent="warning">Warning</Button>);
      expect(
        screen.getByRole("button", { name: "Warning" }).className,
      ).toContain("bg-(--nuka-warning-base)");
    });

    it("applies compound variant and intent classes", () => {
      render(
        <Button variant="ghost" intent="danger">
          Ghost Danger
        </Button>,
      );
      const btn = screen.getByRole("button", { name: "Ghost Danger" });
      expect(btn.className).toContain("text-(--nuka-danger-text)");
      expect(btn.className).toContain("hover:bg-(--nuka-danger-bg)");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Button className="mt-4">Button</Button>);
      const btn = screen.getByRole("button", { name: "Button" });
      expect(btn.className).toContain("mt-4");
      expect(btn.className).toContain("bg-(--nuka-accent-bg)");
    });
  });

  describe("native attributes", () => {
    it("forwards type attribute", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
        "type",
        "submit",
      );
    });

    it("forwards disabled attribute", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
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
      expect(
        screen.getByRole("link", { name: "Link button" }).className,
      ).toContain("bg-(--nuka-accent-bg)");
    });
  });
});
