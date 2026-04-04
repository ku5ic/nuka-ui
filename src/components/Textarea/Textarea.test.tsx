import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  describe("rendering", () => {
    it("renders a textarea element", () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector("textarea")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Textarea.displayName).toBe("Textarea");
    });
  });

  describe("size variants", () => {
    it("applies sm size classes", () => {
      const { container } = render(<Textarea size="sm" />);
      expect(container.querySelector("textarea")?.className).toContain("text-xs");
    });

    it("applies md size classes by default", () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector("textarea")?.className).toContain("text-sm");
    });

    it("applies lg size classes", () => {
      const { container } = render(<Textarea size="lg" />);
      expect(container.querySelector("textarea")?.className).toContain("text-base");
    });
  });

  describe("intent variants", () => {
    it("applies default intent border class", () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector("textarea")?.className).toContain(
        "border-[var(--vault-input-border)]",
      );
    });

    it("applies danger intent border class", () => {
      const { container } = render(<Textarea intent="danger" />);
      expect(container.querySelector("textarea")?.className).toContain(
        "border-[var(--vault-danger-border)]",
      );
    });

    it("applies success intent border class", () => {
      const { container } = render(<Textarea intent="success" />);
      expect(container.querySelector("textarea")?.className).toContain(
        "border-[var(--vault-success-border)]",
      );
    });

    it("applies warning intent border class", () => {
      const { container } = render(<Textarea intent="warning" />);
      expect(container.querySelector("textarea")?.className).toContain(
        "border-[var(--vault-warning-border)]",
      );
    });
  });

  describe("aria-invalid", () => {
    it("sets aria-invalid when intent is danger", () => {
      const { container } = render(<Textarea intent="danger" />);
      expect(container.querySelector("textarea")).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when intent is default", () => {
      const { container } = render(<Textarea />);
      expect(container.querySelector("textarea")).not.toHaveAttribute("aria-invalid");
    });

    it("allows consumer to override aria-invalid to false even with danger intent", () => {
      const { container } = render(<Textarea intent="danger" aria-invalid={false} />);
      expect(container.querySelector("textarea")).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("native attributes", () => {
    it("forwards disabled attribute", () => {
      render(<Textarea disabled aria-label="Message" />);
      expect(screen.getByRole("textbox", { name: "Message" })).toBeDisabled();
    });

    it("forwards readOnly attribute", () => {
      const { container } = render(<Textarea readOnly />);
      expect(container.querySelector("textarea")).toHaveAttribute("readonly");
    });

    it("forwards placeholder attribute", () => {
      const { container } = render(<Textarea placeholder="Enter message" />);
      expect(container.querySelector("textarea")).toHaveAttribute("placeholder", "Enter message");
    });

    it("forwards rows attribute", () => {
      const { container } = render(<Textarea rows={5} />);
      expect(container.querySelector("textarea")).toHaveAttribute("rows", "5");
    });

    it("forwards data attributes", () => {
      render(<Textarea data-testid="my-textarea" />);
      expect(screen.getByTestId("my-textarea")).toBeInTheDocument();
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      const { container } = render(<Textarea className="mt-4" />);
      const el = container.querySelector("textarea");
      expect(el?.className).toContain("mt-4");
      expect(el?.className).toContain("border-[var(--vault-input-border)]");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the textarea element", () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });
});
