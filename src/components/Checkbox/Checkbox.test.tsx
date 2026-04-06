import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";
import { FormField } from "@nuka/components/FormField";

function noop() { /* empty */ }

describe("Checkbox", () => {
  describe("rendering", () => {
    it("renders a native input type=checkbox in the DOM", () => {
      const { container } = render(<Checkbox aria-label="Accept" />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeInTheDocument();
    });

    it("the input is visually hidden with sr-only", () => {
      const { container } = render(<Checkbox aria-label="Accept" />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input?.className).toContain("sr-only");
    });

    it("renders a visual indicator span with aria-hidden", () => {
      const { container } = render(<Checkbox aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator).toBeInTheDocument();
    });

    it("renders children as label text", () => {
      render(<Checkbox>Accept terms</Checkbox>);
      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Checkbox.displayName).toBe("Checkbox");
    });
  });

  describe("checked state", () => {
    it("controlled: checked prop controls checked state", () => {
      render(<Checkbox checked onChange={noop} aria-label="Accept" />);
      expect(screen.getByRole("checkbox", { name: "Accept" })).toBeChecked();
    });

    it("uncontrolled: defaultChecked sets initial state", () => {
      render(<Checkbox defaultChecked aria-label="Accept" />);
      expect(screen.getByRole("checkbox", { name: "Accept" })).toBeChecked();
    });

    it("calls onChange when toggled", async () => {
      const user = userEvent.setup();
      let called = false;
      render(
        <Checkbox aria-label="Accept" onChange={() => { called = true; }} />,
      );
      await user.click(screen.getByRole("checkbox", { name: "Accept" }));
      expect(called).toBe(true);
    });
  });

  describe("disabled", () => {
    it("prevents interaction and applies disabled cursor", () => {
      render(<Checkbox disabled aria-label="Accept" />);
      const checkbox = screen.getByRole("checkbox", { name: "Accept" });
      expect(checkbox).toBeDisabled();
    });

    it("applies cursor-not-allowed to wrapper when disabled", () => {
      const { container } = render(<Checkbox disabled aria-label="Accept" />);
      const label = container.querySelector("label");
      expect(label?.className).toContain("cursor-not-allowed");
    });
  });

  describe("intent variants", () => {
    it("applies default intent border class", () => {
      const { container } = render(<Checkbox aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("border-(--nuka-input-border)");
    });

    it("applies danger intent border class", () => {
      const { container } = render(<Checkbox intent="danger" aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("border-(--nuka-danger-border)");
    });

    it("applies success intent border class", () => {
      const { container } = render(<Checkbox intent="success" aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("border-(--nuka-success-border)");
    });

    it("applies warning intent border class", () => {
      const { container } = render(<Checkbox intent="warning" aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("border-(--nuka-warning-border)");
    });

    it("applies danger checked background class", () => {
      const { container } = render(<Checkbox intent="danger" aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("peer-checked:bg-(--nuka-danger-base)");
    });
  });

  describe("size variants", () => {
    it("applies sm size to indicator", () => {
      const { container } = render(<Checkbox size="sm" aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("size-4");
    });

    it("applies md size to indicator by default", () => {
      const { container } = render(<Checkbox aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("size-5");
    });

    it("applies lg size to indicator", () => {
      const { container } = render(<Checkbox size="lg" aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("size-6");
    });
  });

  describe("focus ring", () => {
    it("indicator has peer-focus-visible outline classes", () => {
      const { container } = render(<Checkbox aria-label="Accept" />);
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator?.className).toContain("peer-focus-visible:outline-2");
      expect(indicator?.className).toContain("peer-focus-visible:outline-(--nuka-border-focus)");
    });
  });

  describe("className override", () => {
    it("merges consumer className onto the outer label", () => {
      const { container } = render(<Checkbox className="mt-4" aria-label="Accept" />);
      const label = container.querySelector("label");
      expect(label?.className).toContain("mt-4");
      expect(label?.className).toContain("inline-flex");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} aria-label="Accept" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("FormField integration", () => {
    it("applies aria-invalid when FormField has error", () => {
      render(
        <FormField id="terms" error="Required">
          <Checkbox aria-label="Accept" />
        </FormField>,
      );
      expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute("aria-invalid", "true");
    });

    it("applies aria-required when FormField has required", () => {
      render(
        <FormField id="terms" required>
          <Checkbox aria-label="Accept" />
        </FormField>,
      );
      expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute("aria-required", "true");
    });

    it("applies id from fieldId when inside FormField", () => {
      render(
        <FormField id="terms">
          <Checkbox aria-label="Accept" />
        </FormField>,
      );
      expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute("id", "terms");
    });

    it("includes error id in aria-describedby when FormField has error", () => {
      render(
        <FormField id="terms" error="Required">
          <Checkbox aria-label="Accept" />
        </FormField>,
      );
      expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("terms-error"),
      );
    });

    it("includes hint id in aria-describedby when FormField has hint", () => {
      render(
        <FormField id="terms" hint="You must agree">
          <Checkbox aria-label="Accept" />
        </FormField>,
      );
      expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("terms-hint"),
      );
    });

    it("behaves unchanged when outside FormField", () => {
      render(<Checkbox aria-label="Accept" />);
      const checkbox = screen.getByRole("checkbox", { name: "Accept" });
      expect(checkbox).not.toHaveAttribute("aria-invalid");
      expect(checkbox).not.toHaveAttribute("aria-describedby");
      expect(checkbox).not.toHaveAttribute("aria-required");
    });

    it("consumer aria-invalid=false overrides context hasError", () => {
      render(
        <FormField id="terms" error="Required">
          <Checkbox aria-label="Accept" aria-invalid={false} />
        </FormField>,
      );
      expect(screen.getByRole("checkbox", { name: "Accept" })).toHaveAttribute("aria-invalid", "false");
    });
  });
});
