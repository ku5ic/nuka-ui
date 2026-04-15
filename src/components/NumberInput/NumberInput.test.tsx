import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NumberInput } from "./NumberInput";
import { FormField } from "@nuka/components/FormField";

describe("NumberInput", () => {
  describe("rendering", () => {
    it("renders a number input inside a group", () => {
      render(<NumberInput aria-label="Quantity" />);
      expect(
        screen.getByRole("group", { name: "Quantity" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
    });

    it("renders increment and decrement buttons", () => {
      render(<NumberInput aria-label="Quantity" />);
      expect(
        screen.getByRole("button", { name: "Increment" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Decrement" }),
      ).toBeInTheDocument();
    });

    it("sets displayName", () => {
      expect(NumberInput.displayName).toBe("NumberInput");
    });
  });

  describe("increment and decrement", () => {
    it("increment increases value by step", () => {
      render(<NumberInput defaultValue={5} aria-label="Qty" />);
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      expect(screen.getByRole("spinbutton")).toHaveValue(6);
    });

    it("decrement decreases value by step", () => {
      render(<NumberInput defaultValue={5} aria-label="Qty" />);
      fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
      expect(screen.getByRole("spinbutton")).toHaveValue(4);
    });

    it("respects custom step", () => {
      render(<NumberInput defaultValue={10} step={5} aria-label="Qty" />);
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      expect(screen.getByRole("spinbutton")).toHaveValue(15);
    });
  });

  describe("min and max bounds", () => {
    it("decrement button disabled at min", () => {
      render(<NumberInput defaultValue={0} min={0} aria-label="Qty" />);
      expect(screen.getByRole("button", { name: "Decrement" })).toBeDisabled();
    });

    it("increment button disabled at max", () => {
      render(<NumberInput defaultValue={10} max={10} aria-label="Qty" />);
      expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled();
    });

    it("clamps value to min on decrement past boundary", () => {
      render(
        <NumberInput defaultValue={1} min={0} step={5} aria-label="Qty" />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
      expect(screen.getByRole("spinbutton")).toHaveValue(0);
    });

    it("clamps value to max on increment past boundary", () => {
      render(
        <NumberInput defaultValue={8} max={10} step={5} aria-label="Qty" />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      expect(screen.getByRole("spinbutton")).toHaveValue(10);
    });
  });

  describe("onValueChange", () => {
    it("fires on increment", () => {
      const spy = vi.fn();
      render(
        <NumberInput defaultValue={5} onValueChange={spy} aria-label="Qty" />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      expect(spy).toHaveBeenCalledWith(6);
    });

    it("fires on manual input change", () => {
      const spy = vi.fn();
      render(
        <NumberInput defaultValue={5} onValueChange={spy} aria-label="Qty" />,
      );
      fireEvent.change(screen.getByRole("spinbutton"), {
        target: { value: "42" },
      });
      expect(spy).toHaveBeenCalledWith(42);
    });
  });

  describe("controlled mode", () => {
    it("value prop drives the input value", () => {
      render(<NumberInput value={25} aria-label="Qty" />);
      expect(screen.getByRole("spinbutton")).toHaveValue(25);
    });

    it("clicking increment calls onValueChange but does not change displayed value without prop update", () => {
      const spy = vi.fn();
      const { rerender } = render(
        <NumberInput value={25} onValueChange={spy} aria-label="Qty" />,
      );
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      expect(spy).toHaveBeenCalledWith(26);
      expect(screen.getByRole("spinbutton")).toHaveValue(25);
      rerender(<NumberInput value={26} onValueChange={spy} aria-label="Qty" />);
      expect(screen.getByRole("spinbutton")).toHaveValue(26);
    });
  });

  describe("uncontrolled mode", () => {
    it("defaultValue sets initial value", () => {
      render(<NumberInput defaultValue={10} aria-label="Qty" />);
      expect(screen.getByRole("spinbutton")).toHaveValue(10);
    });

    it("updates value on user interaction without value prop", () => {
      render(<NumberInput defaultValue={10} aria-label="Qty" />);
      fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      expect(screen.getByRole("spinbutton")).toHaveValue(11);
    });
  });

  describe("intent", () => {
    it("danger intent applies danger border class to input", () => {
      render(<NumberInput intent="danger" aria-label="Qty" />);
      expect(screen.getByRole("spinbutton").className).toContain(
        "border-(--nuka-danger-border)",
      );
    });

    it("danger intent sets aria-invalid on input", () => {
      render(<NumberInput intent="danger" aria-label="Qty" />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
  });

  describe("showControls", () => {
    it("hides buttons when showControls is false", () => {
      render(<NumberInput showControls={false} aria-label="Qty" />);
      expect(
        screen.queryByRole("button", { name: "Increment" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Decrement" }),
      ).not.toBeInTheDocument();
    });

    it("restores border radius when controls are hidden", () => {
      render(<NumberInput showControls={false} aria-label="Qty" />);
      expect(screen.getByRole("spinbutton").className).toContain(
        "rounded-(--radius-md)",
      );
    });
  });

  describe("disabled", () => {
    it("disables input and both buttons", () => {
      render(<NumberInput disabled aria-label="Qty" />);
      expect(screen.getByRole("spinbutton")).toBeDisabled();
      expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Decrement" })).toBeDisabled();
    });
  });

  describe("FormField integration", () => {
    it("id from FormField applied to input", () => {
      render(
        <FormField id="qty">
          <NumberInput aria-label="Quantity" />
        </FormField>,
      );
      expect(screen.getByRole("spinbutton")).toHaveAttribute("id", "qty");
    });

    it("aria-describedby includes error id", () => {
      render(
        <FormField id="qty" error="Invalid">
          <NumberInput aria-label="Quantity" />
        </FormField>,
      );
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("qty-error"),
      );
    });

    it("aria-invalid from hasError", () => {
      render(
        <FormField id="qty" error="Invalid">
          <NumberInput aria-label="Quantity" />
        </FormField>,
      );
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("disabled from FormField disables all controls", () => {
      render(
        <FormField id="qty" disabled>
          <NumberInput aria-label="Quantity" />
        </FormField>,
      );
      expect(screen.getByRole("spinbutton")).toBeDisabled();
      expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Decrement" })).toBeDisabled();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<NumberInput ref={ref} aria-label="Qty" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe("number");
    });
  });

  describe("className override", () => {
    it("merges consumer className onto the group wrapper", () => {
      render(<NumberInput className="mt-4" aria-label="Qty" />);
      expect(screen.getByRole("group", { name: "Qty" }).className).toContain(
        "mt-4",
      );
    });
  });

  describe("custom button labels", () => {
    it("uses consumer-provided incrementLabel and decrementLabel", () => {
      render(
        <NumberInput
          aria-label="Qty"
          incrementLabel="Add one"
          decrementLabel="Remove one"
        />,
      );
      expect(
        screen.getByRole("button", { name: "Add one" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Remove one" }),
      ).toBeInTheDocument();
    });
  });

  describe("native attributes", () => {
    it("forwards native attributes to input", () => {
      render(<NumberInput aria-label="Qty" placeholder="0" />);
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "placeholder",
        "0",
      );
    });
  });
});
