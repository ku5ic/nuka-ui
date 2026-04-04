import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  describe("rendering", () => {
    it("renders an input element", () => {
      const { container } = render(<Input />);
      expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Input.displayName).toBe("Input");
    });
  });

  describe("size variants", () => {
    it("applies sm size classes", () => {
      const { container } = render(<Input size="sm" />);
      expect(container.querySelector("input")?.className).toContain("text-xs");
    });

    it("applies md size classes by default", () => {
      const { container } = render(<Input />);
      expect(container.querySelector("input")?.className).toContain("text-sm");
    });

    it("applies lg size classes", () => {
      const { container } = render(<Input size="lg" />);
      expect(container.querySelector("input")?.className).toContain("text-base");
    });
  });

  describe("intent variants", () => {
    it("applies default intent border class", () => {
      const { container } = render(<Input />);
      expect(container.querySelector("input")?.className).toContain(
        "border-[var(--vault-input-border)]",
      );
    });

    it("applies danger intent border class", () => {
      const { container } = render(<Input intent="danger" />);
      expect(container.querySelector("input")?.className).toContain(
        "border-[var(--vault-danger-border)]",
      );
    });

    it("applies success intent border class", () => {
      const { container } = render(<Input intent="success" />);
      expect(container.querySelector("input")?.className).toContain(
        "border-[var(--vault-success-border)]",
      );
    });

    it("applies warning intent border class", () => {
      const { container } = render(<Input intent="warning" />);
      expect(container.querySelector("input")?.className).toContain(
        "border-[var(--vault-warning-border)]",
      );
    });
  });

  describe("aria-invalid", () => {
    it("sets aria-invalid when intent is danger", () => {
      const { container } = render(<Input intent="danger" />);
      expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
    });

    it("does not set aria-invalid when intent is default", () => {
      const { container } = render(<Input />);
      expect(container.querySelector("input")).not.toHaveAttribute("aria-invalid");
    });

    it("allows consumer to override aria-invalid to false even with danger intent", () => {
      const { container } = render(<Input intent="danger" aria-invalid={false} />);
      expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "false");
    });
  });

  describe("native attributes", () => {
    it("forwards disabled attribute", () => {
      render(<Input disabled aria-label="Email" />);
      expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
    });

    it("forwards readOnly attribute", () => {
      const { container } = render(<Input readOnly />);
      expect(container.querySelector("input")).toHaveAttribute("readonly");
    });

    it("forwards type attribute", () => {
      const { container } = render(<Input type="email" />);
      expect(container.querySelector("input")).toHaveAttribute("type", "email");
    });

    it("forwards placeholder attribute", () => {
      const { container } = render(<Input placeholder="Enter email" />);
      expect(container.querySelector("input")).toHaveAttribute("placeholder", "Enter email");
    });

    it("forwards data attributes", () => {
      render(<Input data-testid="my-input" />);
      expect(screen.getByTestId("my-input")).toBeInTheDocument();
    });
  });

  describe("className override", () => {
    it("merges consumer className with variant classes", () => {
      const { container } = render(<Input className="mt-4" />);
      const el = container.querySelector("input");
      expect(el?.className).toContain("mt-4");
      expect(el?.className).toContain("border-[var(--vault-input-border)]");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});
