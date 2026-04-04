import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "./Tag";

describe("Tag", () => {
  describe("rendering", () => {
    it("renders a span element by default", () => {
      render(<Tag>React</Tag>);
      const el = screen.getByText("React");
      expect(el.tagName).toBe("SPAN");
    });

    it("renders children correctly", () => {
      render(<Tag>Label</Tag>);
      expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Tag.displayName).toBe("Tag");
    });

    it("does not render a close button when onDismiss is undefined", () => {
      render(<Tag>Static</Tag>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders a close button when onDismiss is provided", () => {
      render(<Tag onDismiss={vi.fn()}>Dismissible</Tag>);
      expect(
        screen.getByRole("button", { name: "Remove" }),
      ).toBeInTheDocument();
    });
  });

  describe("close button behavior", () => {
    it("calls onDismiss when the close button is clicked", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<Tag onDismiss={handleDismiss}>Tag</Tag>);
      await user.click(screen.getByRole("button", { name: "Remove" }));
      expect(handleDismiss).toHaveBeenCalledOnce();
    });

    it("has aria-label of Remove by default", () => {
      render(<Tag onDismiss={vi.fn()}>Tag</Tag>);
      expect(
        screen.getByRole("button", { name: "Remove" }),
      ).toBeInTheDocument();
    });

    it("allows overriding aria-label via dismissLabel", () => {
      render(
        <Tag onDismiss={vi.fn()} dismissLabel="Remove React">
          React
        </Tag>,
      );
      expect(
        screen.getByRole("button", { name: "Remove React" }),
      ).toBeInTheDocument();
    });

    it("close button is a button element with type button", () => {
      render(<Tag onDismiss={vi.fn()}>Tag</Tag>);
      const btn = screen.getByRole("button", { name: "Remove" });
      expect(btn.tagName).toBe("BUTTON");
      expect(btn).toHaveAttribute("type", "button");
    });
  });

  describe("variants", () => {
    it("applies secondary variant classes by default", () => {
      render(<Tag>Secondary</Tag>);
      expect(screen.getByText("Secondary").className).toContain(
        "bg-[var(--nuka-bg-muted)]",
      );
    });

    it("applies primary variant classes when specified", () => {
      render(<Tag variant="primary">Primary</Tag>);
      expect(screen.getByText("Primary").className).toContain(
        "bg-[var(--nuka-accent-bg)]",
      );
    });

    it("applies outline variant classes when specified", () => {
      render(<Tag variant="outline">Outline</Tag>);
      expect(screen.getByText("Outline").className).toContain("bg-transparent");
    });

    it("applies ghost variant classes when specified", () => {
      render(<Tag variant="ghost">Ghost</Tag>);
      expect(screen.getByText("Ghost").className).toContain("bg-transparent");
      expect(screen.getByText("Ghost").className).toContain(
        "border-transparent",
      );
    });
  });

  describe("sizes", () => {
    it("applies sm size classes when specified", () => {
      render(<Tag size="sm">Small</Tag>);
      expect(screen.getByText("Small").className).toContain("text-xs");
    });

    it("applies md size classes by default", () => {
      render(<Tag>Medium</Tag>);
      expect(screen.getByText("Medium").className).toContain("text-xs");
    });

    it("applies lg size classes when specified", () => {
      render(<Tag size="lg">Large</Tag>);
      expect(screen.getByText("Large").className).toContain("text-sm");
    });
  });

  describe("intent", () => {
    it("applies danger intent classes when specified", () => {
      render(<Tag intent="danger">Danger</Tag>);
      expect(screen.getByText("Danger").className).toContain(
        "bg-[var(--nuka-danger-bg)]",
      );
    });

    it("applies success intent classes when specified", () => {
      render(<Tag intent="success">Success</Tag>);
      expect(screen.getByText("Success").className).toContain(
        "bg-[var(--nuka-success-bg)]",
      );
    });

    it("applies warning intent classes when specified", () => {
      render(<Tag intent="warning">Warning</Tag>);
      expect(screen.getByText("Warning").className).toContain(
        "bg-[var(--nuka-warning-bg)]",
      );
    });

    it("applies compound variant and intent classes", () => {
      render(
        <Tag variant="outline" intent="danger">
          Outline Danger
        </Tag>,
      );
      const el = screen.getByText("Outline Danger");
      expect(el.className).toContain("border-[var(--nuka-danger-border)]");
      expect(el.className).toContain("text-[var(--nuka-danger-text)]");
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      render(<Tag className="mt-4">Tag</Tag>);
      const el = screen.getByText("Tag");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("bg-[var(--nuka-bg-muted)]");
    });
  });

  describe("native attributes", () => {
    it("forwards aria-label attribute", () => {
      render(<Tag aria-label="technology tag">React</Tag>);
      const el = screen.getByText("React");
      expect(el).toHaveAttribute("aria-label", "technology tag");
    });

    it("forwards data attributes", () => {
      render(<Tag data-testid="my-tag">Tag</Tag>);
      expect(screen.getByTestId("my-tag")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the span element", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Tag ref={ref}>Tag</Tag>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
