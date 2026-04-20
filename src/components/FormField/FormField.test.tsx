import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";

describe("FormField", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(
        <FormField>
          <span>Child content</span>
        </FormField>,
      );
      expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(FormField.displayName).toBe("FormField");
    });
  });

  describe("hint", () => {
    it("renders hint text when hint prop is provided", () => {
      render(<FormField hint="Enter your full name">children</FormField>);
      expect(screen.getByText("Enter your full name")).toBeInTheDocument();
    });

    it("does not render hint element when hint is absent", () => {
      const { container } = render(<FormField>children</FormField>);
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs).toHaveLength(0);
    });

    it("applies the correct id to the hint element", () => {
      render(
        <FormField id="email" hint="We'll never share your email">
          children
        </FormField>,
      );
      const hint = screen.getByText("We'll never share your email");
      expect(hint).toHaveAttribute("id", "email-hint");
    });
  });

  describe("error", () => {
    it("renders error message when error prop is non-empty", () => {
      render(<FormField error="This field is required">children</FormField>);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("does not render error element when error is absent", () => {
      const { container } = render(<FormField>children</FormField>);
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs).toHaveLength(0);
    });

    it("does not render error element when error is empty string", () => {
      const { container } = render(<FormField error="">children</FormField>);
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs).toHaveLength(0);
    });

    it("applies the correct id to the error element", () => {
      render(
        <FormField id="email" error="Invalid email">
          children
        </FormField>,
      );
      const error = screen.getByText("Invalid email");
      expect(error).toHaveAttribute("id", "email-error");
    });

    it("does not apply role=alert to the error element", () => {
      render(<FormField error="Error message">children</FormField>);
      const error = screen.getByText("Error message");
      expect(error).not.toHaveAttribute("role");
    });
  });

  describe("DOM order", () => {
    it("renders error after hint in DOM order", () => {
      const { container } = render(
        <FormField hint="Helpful hint" error="Error message">
          <input />
        </FormField>,
      );
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs).toHaveLength(2);
      expect(paragraphs[0]?.textContent).toBe("Helpful hint");
      expect(paragraphs[1]?.textContent).toBe("Error message");
    });
  });

  describe("className override", () => {
    it("merges consumer className", () => {
      const { container } = render(
        <FormField className="mt-4">children</FormField>,
      );
      const root = container.firstElementChild as HTMLElement;
      expect(root.className).toContain("mt-4");
      expect(root.className).toContain("flex");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the root div", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<FormField ref={ref}>children</FormField>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot on root, hint, and error", () => {
      const { container } = render(
        <FormField hint="Hint" error="Error">
          children
        </FormField>,
      );
      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="hint"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="error"]')).not.toBeNull();
    });
  });
});
