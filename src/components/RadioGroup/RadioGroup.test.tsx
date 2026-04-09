import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";
import { FormField } from "@nuka/components/FormField";

function noop() {
  /* empty */
}

function renderGroup(
  props: Partial<React.ComponentProps<typeof RadioGroup>> = {},
) {
  return render(
    <RadioGroup name="color" aria-label="Color" {...props}>
      <Radio value="red">Red</Radio>
      <Radio value="green">Green</Radio>
      <Radio value="blue">Blue</Radio>
    </RadioGroup>,
  );
}

describe("RadioGroup", () => {
  describe("rendering", () => {
    it("renders a div with role=radiogroup", () => {
      renderGroup();
      expect(
        screen.getByRole("radiogroup", { name: "Color" }),
      ).toBeInTheDocument();
    });

    it("aria-orientation defaults to vertical", () => {
      renderGroup();
      expect(screen.getByRole("radiogroup", { name: "Color" })).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
    });

    it("aria-orientation=horizontal when prop set", () => {
      renderGroup({ orientation: "horizontal" });
      expect(screen.getByRole("radiogroup", { name: "Color" })).toHaveAttribute(
        "aria-orientation",
        "horizontal",
      );
    });

    it("renders child Radio elements", () => {
      renderGroup();
      expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("sets displayName correctly", () => {
      expect(RadioGroup.displayName).toBe("RadioGroup");
    });
  });

  describe("disabled", () => {
    it("disables all child radios when group is disabled", () => {
      renderGroup({ disabled: true });
      const radios = screen.getAllByRole("radio");
      for (const radio of radios) {
        expect(radio).toBeDisabled();
      }
    });

    it("inherits disabled from FormField when group disabled is not set", () => {
      render(
        <FormField disabled>
          <RadioGroup name="color" aria-label="Color">
            <Radio value="red">Red</Radio>
          </RadioGroup>
        </FormField>,
      );
      expect(screen.getByRole("radio", { name: "Red" })).toBeDisabled();
    });

    it("disabled={false} overrides FormField disabled", () => {
      render(
        <FormField disabled>
          <RadioGroup name="color" aria-label="Color" disabled={false}>
            <Radio value="red">Red</Radio>
          </RadioGroup>
        </FormField>,
      );
      expect(screen.getByRole("radio", { name: "Red" })).not.toBeDisabled();
    });
  });

  describe("controlled", () => {
    it("value prop determines which radio appears selected", () => {
      renderGroup({ value: "green", onChange: noop });
      expect(screen.getByRole("radio", { name: "Green" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Red" })).not.toBeChecked();
    });

    it("selecting a radio calls onChange with the correct value", async () => {
      const user = userEvent.setup();
      let lastValue = "";
      renderGroup({
        value: "red",
        onChange: (v) => {
          lastValue = v;
        },
      });
      await user.click(screen.getByRole("radio", { name: "Green" }));
      expect(lastValue).toBe("green");
    });
  });

  describe("uncontrolled", () => {
    it("defaultValue sets initial selection", () => {
      renderGroup({ defaultValue: "blue" });
      expect(screen.getByRole("radio", { name: "Blue" })).toBeChecked();
    });

    it("subsequent changes update internal state", async () => {
      const user = userEvent.setup();
      renderGroup({ defaultValue: "blue" });
      await user.click(screen.getByRole("radio", { name: "Red" }));
      expect(screen.getByRole("radio", { name: "Red" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Blue" })).not.toBeChecked();
    });
  });

  describe("keyboard navigation", () => {
    it("group with no selection is reachable by Tab", async () => {
      const user = userEvent.setup();
      renderGroup();
      await user.tab();
      expect(screen.getByRole("radio", { name: "Red" })).toHaveFocus();
    });

    it("only the first radio has tabIndex=0 when group has no selection", async () => {
      // Verifies roving tabindex state, not just Tab reachability.
      // Uses waitFor because registrationCount triggers a post-mount effect.
      const { findByRole } = renderGroup();
      const red = await findByRole("radio", { name: "Red" });
      expect(red).toHaveAttribute("tabindex", "0");
      expect(screen.getByRole("radio", { name: "Green" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
      expect(screen.getByRole("radio", { name: "Blue" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });

    it("ArrowDown moves selection to next radio", async () => {
      const user = userEvent.setup();
      renderGroup({ defaultValue: "red" });
      screen.getByRole("radio", { name: "Red" }).focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Green" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Green" })).toHaveFocus();
    });

    it("ArrowRight moves selection to next radio", async () => {
      const user = userEvent.setup();
      renderGroup({ defaultValue: "red" });
      screen.getByRole("radio", { name: "Red" }).focus();
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("radio", { name: "Green" })).toBeChecked();
    });

    it("ArrowUp moves selection to previous radio", async () => {
      const user = userEvent.setup();
      renderGroup({ defaultValue: "green" });
      screen.getByRole("radio", { name: "Green" }).focus();
      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("radio", { name: "Red" })).toBeChecked();
    });

    it("ArrowLeft moves selection to previous radio", async () => {
      const user = userEvent.setup();
      renderGroup({ defaultValue: "green" });
      screen.getByRole("radio", { name: "Green" }).focus();
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("radio", { name: "Red" })).toBeChecked();
    });

    it("Home selects first radio", async () => {
      const user = userEvent.setup();
      renderGroup({ defaultValue: "blue" });
      screen.getByRole("radio", { name: "Blue" }).focus();
      await user.keyboard("{Home}");
      expect(screen.getByRole("radio", { name: "Red" })).toBeChecked();
    });

    it("End selects last radio", async () => {
      const user = userEvent.setup();
      renderGroup({ defaultValue: "red" });
      screen.getByRole("radio", { name: "Red" }).focus();
      await user.keyboard("{End}");
      expect(screen.getByRole("radio", { name: "Blue" })).toBeChecked();
    });

    it("Tab does not cycle within the group", () => {
      renderGroup({ defaultValue: "green" });
      const radios = screen.getAllByRole("radio");
      const focused = radios.find((r) => r.getAttribute("tabindex") === "0");
      const unfocused = radios.filter(
        (r) => r.getAttribute("tabindex") === "-1",
      );
      expect(focused).toBeDefined();
      expect(unfocused).toHaveLength(2);
    });
  });

  describe("FormField integration", () => {
    it("applies aria-describedby from FormFieldContext to the group element", () => {
      render(
        <FormField id="color" error="Required" hint="Pick one">
          <RadioGroup name="color" aria-label="Color">
            <Radio value="red">Red</Radio>
          </RadioGroup>
        </FormField>,
      );
      const group = screen.getByRole("radiogroup", { name: "Color" });
      const describedBy = group.getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain("color-error");
      expect(describedBy).toContain("color-hint");
    });

    it("applies aria-invalid from FormFieldContext to the group element", () => {
      render(
        <FormField id="color" error="Required">
          <RadioGroup name="color" aria-label="Color">
            <Radio value="red">Red</Radio>
          </RadioGroup>
        </FormField>,
      );
      expect(screen.getByRole("radiogroup", { name: "Color" })).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
  });
});

describe("Radio", () => {
  describe("rendering", () => {
    it("renders a visually hidden input type=radio", () => {
      const { container } = render(
        <RadioGroup name="color" aria-label="Color">
          <Radio value="red">Red</Radio>
        </RadioGroup>,
      );
      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeInTheDocument();
      expect(input?.className).toContain("sr-only");
    });

    it("visual indicator is present and aria-hidden", () => {
      const { container } = render(
        <RadioGroup name="color" aria-label="Color">
          <Radio value="red">Red</Radio>
        </RadioGroup>,
      );
      const indicator = container.querySelector('span[aria-hidden="true"]');
      expect(indicator).toBeInTheDocument();
    });

    it("name from RadioGroupContext applied to input", () => {
      render(
        <RadioGroup name="fruit" aria-label="Fruit">
          <Radio value="apple">Apple</Radio>
        </RadioGroup>,
      );
      expect(screen.getByRole("radio", { name: "Apple" })).toHaveAttribute(
        "name",
        "fruit",
      );
    });

    it("checked state derived from matching group value", () => {
      render(
        <RadioGroup
          name="color"
          value="green"
          onChange={noop}
          aria-label="Color"
        >
          <Radio value="red">Red</Radio>
          <Radio value="green">Green</Radio>
        </RadioGroup>,
      );
      expect(screen.getByRole("radio", { name: "Green" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Red" })).not.toBeChecked();
    });

    it("value prop forwarded to input", () => {
      render(
        <RadioGroup name="color" aria-label="Color">
          <Radio value="red">Red</Radio>
        </RadioGroup>,
      );
      expect(screen.getByRole("radio", { name: "Red" })).toHaveAttribute(
        "value",
        "red",
      );
    });

    it("disabled prop on individual Radio works independently of group disabled", () => {
      render(
        <RadioGroup name="color" aria-label="Color">
          <Radio value="red">Red</Radio>
          <Radio value="green" disabled>
            Green
          </Radio>
        </RadioGroup>,
      );
      expect(screen.getByRole("radio", { name: "Red" })).not.toBeDisabled();
      expect(screen.getByRole("radio", { name: "Green" })).toBeDisabled();
    });

    it("sets displayName correctly", () => {
      expect(Radio.displayName).toBe("Radio");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to HTMLInputElement", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(
        <RadioGroup name="color" aria-label="Color">
          <Radio ref={ref} value="red">
            Red
          </Radio>
        </RadioGroup>,
      );
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});
