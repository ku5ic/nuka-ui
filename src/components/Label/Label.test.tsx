import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";
import { FormField } from "@vault/components/FormField";

describe("Label", () => {
  describe("rendering", () => {
    it("renders a label element", () => {
      render(<Label>Email</Label>);
      const el = screen.getByText("Email");
      expect(el.tagName).toBe("LABEL");
    });

    it("renders children", () => {
      render(<Label>Username</Label>);
      expect(screen.getByText("Username")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Label.displayName).toBe("Label");
    });
  });

  describe("htmlFor", () => {
    it("forwards htmlFor via props", () => {
      render(<Label htmlFor="email-input">Email</Label>);
      expect(screen.getByText("Email")).toHaveAttribute("for", "email-input");
    });
  });

  describe("required indicator", () => {
    it("renders the indicator when required is true", () => {
      const { container } = render(<Label required>Email</Label>);
      const indicator = container.querySelector("span");
      expect(indicator).toBeInTheDocument();
      expect(indicator?.textContent).toBe("*");
    });

    it("does not render the indicator when required is false", () => {
      const { container } = render(<Label>Email</Label>);
      const indicator = container.querySelector("span");
      expect(indicator).not.toBeInTheDocument();
    });

    it("sets aria-hidden on the indicator", () => {
      const { container } = render(<Label required>Email</Label>);
      const indicator = container.querySelector("span");
      expect(indicator).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("className override", () => {
    it("merges consumer className", () => {
      render(<Label className="mt-4">Email</Label>);
      const el = screen.getByText("Email");
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("text-sm");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the label element", () => {
      const ref = React.createRef<HTMLLabelElement>();
      render(<Label ref={ref}>Email</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    });
  });

  describe("FormField integration", () => {
    it("applies id from context when inside FormField", () => {
      render(
        <FormField id="email">
          <Label>Email</Label>
        </FormField>,
      );
      expect(screen.getByText("Email")).toHaveAttribute("id", "email-label");
    });

    it("applies htmlFor from context when inside FormField", () => {
      render(
        <FormField id="email">
          <Label>Email</Label>
        </FormField>,
      );
      expect(screen.getByText("Email")).toHaveAttribute("for", "email");
    });

    it("renders required indicator when context required is true", () => {
      const { container } = render(
        <FormField id="email" required>
          <Label>Email</Label>
        </FormField>,
      );
      const indicator = container.querySelector("label span");
      expect(indicator).toBeInTheDocument();
      expect(indicator?.textContent).toBe("*");
    });

    it("does not apply id or htmlFor when outside FormField", () => {
      render(<Label>Email</Label>);
      const el = screen.getByText("Email");
      expect(el).not.toHaveAttribute("id");
      expect(el).not.toHaveAttribute("for");
    });

    it("consumer-supplied id overrides context", () => {
      render(
        <FormField id="email">
          <Label id="custom-id">Email</Label>
        </FormField>,
      );
      expect(screen.getByText("Email")).toHaveAttribute("id", "custom-id");
    });

    it("consumer-supplied htmlFor overrides context", () => {
      render(
        <FormField id="email">
          <Label htmlFor="custom-for">Email</Label>
        </FormField>,
      );
      expect(screen.getByText("Email")).toHaveAttribute("for", "custom-for");
    });
  });
});
