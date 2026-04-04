import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "./Textarea";
import { FormField } from "@nuka/components/FormField";

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
        "border-[var(--nuka-input-border)]",
      );
    });

    it("applies danger intent border class", () => {
      const { container } = render(<Textarea intent="danger" />);
      expect(container.querySelector("textarea")?.className).toContain(
        "border-[var(--nuka-danger-border)]",
      );
    });

    it("applies success intent border class", () => {
      const { container } = render(<Textarea intent="success" />);
      expect(container.querySelector("textarea")?.className).toContain(
        "border-[var(--nuka-success-border)]",
      );
    });

    it("applies warning intent border class", () => {
      const { container } = render(<Textarea intent="warning" />);
      expect(container.querySelector("textarea")?.className).toContain(
        "border-[var(--nuka-warning-border)]",
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
      expect(el?.className).toContain("border-[var(--nuka-input-border)]");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the textarea element", () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe("FormField integration", () => {
    it("applies aria-invalid when FormField has error", () => {
      render(
        <FormField id="message" error="Required">
          <Textarea aria-label="Message" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Message" })).toHaveAttribute("aria-invalid", "true");
    });

    it("includes error id in aria-describedby when FormField has error", () => {
      render(
        <FormField id="message" error="Required">
          <Textarea aria-label="Message" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Message" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("message-error"),
      );
    });

    it("includes hint id in aria-describedby when FormField has hint", () => {
      render(
        <FormField id="message" hint="Max 500 characters">
          <Textarea aria-label="Message" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Message" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("message-hint"),
      );
    });

    it("includes both error and hint ids in aria-describedby", () => {
      render(
        <FormField id="message" error="Required" hint="Max 500 characters">
          <Textarea aria-label="Message" />
        </FormField>,
      );
      const textarea = screen.getByRole("textbox", { name: "Message" });
      const describedBy = textarea.getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("message-error");
      expect(describedBy).toContain("message-hint");
    });

    it("applies aria-required when FormField has required", () => {
      render(
        <FormField id="message" required>
          <Textarea aria-label="Message" />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Message" })).toHaveAttribute("aria-required", "true");
    });

    it("preserves consumer-supplied aria-describedby alongside context ids", () => {
      render(
        <FormField id="message" hint="Hint text">
          <Textarea aria-label="Message" aria-describedby="custom-desc" />
        </FormField>,
      );
      const describedBy = screen.getByRole("textbox", { name: "Message" }).getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("custom-desc");
      expect(describedBy).toContain("message-hint");
    });

    it("behaves unchanged when outside FormField", () => {
      render(<Textarea aria-label="Message" />);
      const textarea = screen.getByRole("textbox", { name: "Message" });
      expect(textarea).not.toHaveAttribute("aria-invalid");
      expect(textarea).not.toHaveAttribute("aria-describedby");
      expect(textarea).not.toHaveAttribute("aria-required");
    });

    it("consumer aria-invalid=false overrides context hasError", () => {
      render(
        <FormField id="message" error="Required">
          <Textarea aria-label="Message" aria-invalid={false} />
        </FormField>,
      );
      expect(screen.getByRole("textbox", { name: "Message" })).toHaveAttribute("aria-invalid", "false");
    });
  });
});
