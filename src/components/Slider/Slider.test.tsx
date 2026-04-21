import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./Slider";
import { FormField } from "@nuka/components/FormField";

describe("Slider", () => {
  describe("rendering", () => {
    it("renders a native input type=range in the DOM", () => {
      render(<Slider aria-label="Volume" />);
      const input = screen.getByRole("slider", { name: "Volume" });
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "range");
    });

    it("track, fill, and thumb elements are present and aria-hidden", () => {
      const { container } = render(<Slider aria-label="Volume" />);
      const track = container.querySelector('[aria-hidden="true"]');
      expect(track).toBeInTheDocument();
      expect(screen.getByTestId("slider-fill")).toBeInTheDocument();
      expect(screen.getByTestId("slider-thumb")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Slider.displayName).toBe("Slider");
    });

    it("forwards ref to HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Slider ref={ref} aria-label="Volume" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe("range");
    });
  });

  describe("value", () => {
    it("uncontrolled: defaultValue sets initial value", () => {
      render(<Slider defaultValue={30} aria-label="Volume" />);
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-valuenow",
        "30",
      );
    });

    it("uncontrolled: changing value updates fill width", () => {
      render(<Slider defaultValue={50} aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill")).toHaveStyle({ width: "50%" });
      fireEvent.change(screen.getByRole("slider", { name: "Volume" }), {
        target: { value: "75" },
      });
      expect(screen.getByTestId("slider-fill")).toHaveStyle({ width: "75%" });
    });

    it("controlled: value prop drives aria-valuenow", () => {
      render(<Slider value={60} aria-label="Volume" />);
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-valuenow",
        "60",
      );
    });

    it("onValueChange called with numeric value", () => {
      const values: number[] = [];
      render(
        <Slider
          defaultValue={50}
          aria-label="Volume"
          onValueChange={(v) => values.push(v)}
        />,
      );
      fireEvent.change(screen.getByRole("slider", { name: "Volume" }), {
        target: { value: "75" },
      });
      expect(values).toEqual([75]);
      expect(typeof values[0]).toBe("number");
    });

    it("min, max, step forwarded to native input", () => {
      render(<Slider min={10} max={200} step={5} aria-label="Volume" />);
      const input = screen.getByRole("slider", { name: "Volume" });
      expect(input).toHaveAttribute("min", "10");
      expect(input).toHaveAttribute("max", "200");
      expect(input).toHaveAttribute("step", "5");
    });

    it("defaults min=0, max=100, step=1", () => {
      render(<Slider aria-label="Volume" />);
      const input = screen.getByRole("slider", { name: "Volume" });
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "100");
      expect(input).toHaveAttribute("step", "1");
    });
  });

  describe("percentage calculation", () => {
    it("at defaultValue=0, fill width is 0%", () => {
      render(<Slider defaultValue={0} aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill")).toHaveStyle({ width: "0%" });
    });

    it("at defaultValue=50, fill width is 50%", () => {
      render(<Slider defaultValue={50} aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill")).toHaveStyle({ width: "50%" });
    });

    it("at defaultValue=100, fill width is 100%", () => {
      render(<Slider defaultValue={100} aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill")).toHaveStyle({ width: "100%" });
    });

    it("at defaultValue=25 with min=0 max=50, fill width is 50%", () => {
      render(<Slider defaultValue={25} min={0} max={50} aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill")).toHaveStyle({ width: "50%" });
    });
  });

  describe("intent", () => {
    it("default intent uses accent token on fill", () => {
      render(<Slider aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill").className).toContain(
        "bg-(--nuka-accent-bg)",
      );
    });

    it("danger intent applies danger fill class", () => {
      render(<Slider intent="danger" aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill").className).toContain(
        "bg-(--nuka-danger-base)",
      );
    });

    it("success intent applies success fill class", () => {
      render(<Slider intent="success" aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill").className).toContain(
        "bg-(--nuka-success-base)",
      );
    });

    it("warning intent applies warning fill class", () => {
      render(<Slider intent="warning" aria-label="Volume" />);
      expect(screen.getByTestId("slider-fill").className).toContain(
        "bg-(--nuka-warning-base)",
      );
    });

    it("default intent applies accent token on thumb", () => {
      render(<Slider aria-label="Volume" />);
      expect(screen.getByTestId("slider-thumb").className).toContain(
        "bg-(--nuka-accent-bg)",
      );
    });

    it("danger intent applies danger thumb class", () => {
      render(<Slider intent="danger" aria-label="Volume" />);
      expect(screen.getByTestId("slider-thumb").className).toContain(
        "bg-(--nuka-danger-base)",
      );
    });
  });

  describe("focus", () => {
    it("focus state class applied to thumb when input is focused", () => {
      render(<Slider aria-label="Volume" />);
      fireEvent.focus(screen.getByRole("slider", { name: "Volume" }));
      expect(screen.getByTestId("slider-thumb").className).toContain(
        "outline-2",
      );
      expect(screen.getByTestId("slider-thumb").className).toContain(
        "outline-(--nuka-border-focus)",
      );
    });

    it("focus state class removed when input is blurred", () => {
      render(<Slider aria-label="Volume" />);
      const input = screen.getByRole("slider", { name: "Volume" });
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(screen.getByTestId("slider-thumb").className).not.toContain(
        "outline-2",
      );
    });
  });

  describe("disabled", () => {
    it("disabled attribute on native input", () => {
      render(<Slider disabled aria-label="Volume" />);
      expect(screen.getByRole("slider", { name: "Volume" })).toBeDisabled();
    });

    it("disabled from FormFieldContext disables the input", () => {
      render(
        <FormField id="vol" disabled>
          <Slider aria-label="Volume" />
        </FormField>,
      );
      expect(screen.getByRole("slider", { name: "Volume" })).toBeDisabled();
    });
  });

  describe("FormFieldContext integration", () => {
    it("id from fieldId applied to input", () => {
      render(
        <FormField id="vol">
          <Slider aria-label="Volume" />
        </FormField>,
      );
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "id",
        "vol",
      );
    });

    it("aria-describedby includes error id", () => {
      render(
        <FormField id="vol" error="Too loud">
          <Slider aria-label="Volume" />
        </FormField>,
      );
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("vol-error"),
      );
    });

    it("aria-describedby includes hint id", () => {
      render(
        <FormField id="vol" hint="Adjust volume">
          <Slider aria-label="Volume" />
        </FormField>,
      );
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("vol-hint"),
      );
    });

    it("aria-invalid from hasError", () => {
      render(
        <FormField id="vol" error="Too loud">
          <Slider aria-label="Volume" />
        </FormField>,
      );
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("aria-required from required", () => {
      render(
        <FormField id="vol" required>
          <Slider aria-label="Volume" />
        </FormField>,
      );
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-required",
        "true",
      );
    });

    it("consumer aria-invalid=false overrides context hasError", () => {
      render(
        <FormField id="vol" error="Too loud">
          <Slider aria-label="Volume" aria-invalid={false} />
        </FormField>,
      );
      expect(screen.getByRole("slider", { name: "Volume" })).toHaveAttribute(
        "aria-invalid",
        "false",
      );
    });

    it("behaves unchanged when outside FormField", () => {
      render(<Slider aria-label="Volume" />);
      const input = screen.getByRole("slider", { name: "Volume" });
      expect(input).not.toHaveAttribute("aria-invalid");
      expect(input).not.toHaveAttribute("aria-describedby");
      expect(input).not.toHaveAttribute("aria-required");
    });
  });

  describe("showValue", () => {
    it("renders current value text when showValue is true", () => {
      render(<Slider defaultValue={42} showValue aria-label="Volume" />);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("value element has aria-hidden=true", () => {
      render(<Slider defaultValue={42} showValue aria-label="Volume" />);
      expect(screen.getByText("42")).toHaveAttribute("aria-hidden", "true");
    });

    it("does not render value text when showValue is false", () => {
      render(<Slider defaultValue={42} aria-label="Volume" />);
      expect(screen.queryByText("42")).not.toBeInTheDocument();
    });
  });

  describe("className override", () => {
    it("merges consumer className onto the wrapper", () => {
      const { container } = render(
        <Slider className="mt-4" aria-label="Volume" />,
      );
      const wrapper = container.firstElementChild;
      expect(wrapper?.className).toContain("mt-4");
      expect(wrapper?.className).toContain("relative");
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot on every Slider internal part (coexists with data-testid)", () => {
      const { container } = render(<Slider aria-label="Volume" showValue />);

      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="input"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="track"]')).not.toBeNull();
      const fill = container.querySelector('[data-slot="fill"]');
      expect(fill).not.toBeNull();
      expect(fill?.getAttribute("data-testid")).toBe("slider-fill");
      const thumb = container.querySelector('[data-slot="thumb"]');
      expect(thumb).not.toBeNull();
      expect(thumb?.getAttribute("data-testid")).toBe("slider-thumb");
      expect(container.querySelector('[data-slot="value"]')).not.toBeNull();
    });
  });
});
