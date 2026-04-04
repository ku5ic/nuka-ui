import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { FormField } from "@nuka/components/FormField";

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
        "border-[var(--nuka-input-border)]",
      );
    });

    it("applies danger intent border class", () => {
      const { container } = render(<Input intent="danger" />);
      expect(container.querySelector("input")?.className).toContain(
        "border-[var(--nuka-danger-border)]",
      );
    });

    it("applies success intent border class", () => {
      const { container } = render(<Input intent="success" />);
      expect(container.querySelector("input")?.className).toContain(
        "border-[var(--nuka-success-border)]",
      );
    });

    it("applies warning intent border class", () => {
      const { container } = render(<Input intent="warning" />);
      expect(container.querySelector("input")?.className).toContain(
        "border-[var(--nuka-warning-border)]",
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
      expect(el?.className).toContain("border-[var(--nuka-input-border)]");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("FormField integration", () => {
    it("applies aria-invalid when FormField has error", () => {
      render(
        <FormField id="email" error="Required">
          <Input aria-label="Email" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
    });

    it("includes error id in aria-describedby when FormField has error", () => {
      render(
        <FormField id="email" error="Required">
          <Input aria-label="Email" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("email-error"),
      );
    });

    it("includes hint id in aria-describedby when FormField has hint", () => {
      render(
        <FormField id="email" hint="We won't share it">
          <Input aria-label="Email" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("email-hint"),
      );
    });

    it("includes both error and hint ids in aria-describedby", () => {
      render(
        <FormField id="email" error="Required" hint="We won't share it">
          <Input aria-label="Email" />
        </FormField>,
      );
      const input = screen.getByRole("textbox", { name: "Email" });
      const describedBy = input.getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("email-error");
      expect(describedBy).toContain("email-hint");
    });

    it("applies aria-required when FormField has required", () => {
      render(
        <FormField id="email" required>
          <Input aria-label="Email" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-required", "true");
    });

    it("preserves consumer-supplied aria-describedby alongside context ids", () => {
      render(
        <FormField id="email" hint="Hint text">
          <Input aria-label="Email" aria-describedby="custom-desc" />
        </FormField>,
      );
      const describedBy = screen.getByRole("textbox", { name: "Email" }).getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("custom-desc");
      expect(describedBy).toContain("email-hint");
    });

    it("behaves unchanged when outside FormField", () => {
      render(<Input aria-label="Email" />);
      const input = screen.getByRole("textbox", { name: "Email" });
      expect(input).not.toHaveAttribute("aria-invalid");
      expect(input).not.toHaveAttribute("aria-describedby");
      expect(input).not.toHaveAttribute("aria-required");
    });

    it("consumer aria-invalid=false overrides context hasError", () => {
      render(
        <FormField id="email" error="Required">
          <Input aria-label="Email" aria-invalid={false} />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "false");
    });
  });
});
