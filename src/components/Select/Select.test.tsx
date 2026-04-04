import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";
import { SelectTrigger } from "./SelectTrigger";
import { SelectContent } from "./SelectContent";
import { SelectItem } from "./SelectItem";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";

function renderSelect(props: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (o: boolean) => void;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  triggerProps?: Record<string, unknown>;
} = {}) {
  const {
    placeholder = "Choose an option",
    triggerProps,
    ...selectProps
  } = props;

  return render(
    <Select {...selectProps}>
      <SelectTrigger placeholder={placeholder} {...triggerProps} />
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
        <SelectItem value="c" disabled>
          Option C
        </SelectItem>
      </SelectContent>
    </Select>,
  );
}

describe("Select", () => {
  describe("rendering", () => {
    it("renders trigger button with role=combobox", () => {
      renderSelect();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("has aria-expanded=false when closed", () => {
      renderSelect();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    it("has aria-haspopup=listbox on trigger", () => {
      renderSelect();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-haspopup",
        "listbox",
      );
    });

    it("does not render listbox when closed", () => {
      renderSelect();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("shows placeholder text when no value selected", () => {
      renderSelect({ placeholder: "Pick one" });
      expect(screen.getByRole("combobox")).toHaveTextContent("Pick one");
    });

    it("shows selected option label when value is set", () => {
      renderSelect({ value: "a" });
      expect(screen.getByRole("combobox")).toHaveTextContent("Option A");
    });

    it("renders hidden input when name prop is provided", () => {
      const { container } = renderSelect({ name: "country" });
      const hidden = container.querySelector(
        'input[type="hidden"]',
      )!;
      expect(hidden).toBeInTheDocument();
      expect((hidden as HTMLInputElement).name).toBe("country");
    });

    it("hidden input value matches selected value", () => {
      const { container } = renderSelect({ name: "country", value: "b" });
      const hidden = container.querySelector(
        'input[type="hidden"]',
      )!;
      expect((hidden as HTMLInputElement).value).toBe("b");
    });

    it("does not render hidden input when name is not provided", () => {
      const { container } = renderSelect();
      expect(
        container.querySelector('input[type="hidden"]'),
      ).not.toBeInTheDocument();
    });
  });

  describe("open/close", () => {
    it("opens the listbox on click", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("closes the listbox on second click", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      await user.click(trigger);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.click(trigger);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes the listbox on outside click", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.click(document.body);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes the listbox on Escape and returns focus to trigger", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      await user.click(trigger);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });

    it("closes the listbox on Tab", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.keyboard("{Tab}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("value selection", () => {
    it("selects an option on click and closes listbox", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Option B" }));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveTextContent("Option B");
    });

    it("calls onValueChange with correct value", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderSelect({ onValueChange });
      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByRole("option", { name: "Option A" }));
      expect(onValueChange).toHaveBeenCalledWith("a");
    });

    it("controlled: value prop drives displayed selection", () => {
      renderSelect({ value: "b" });
      expect(screen.getByRole("combobox")).toHaveTextContent("Option B");
    });

    it("uncontrolled: defaultValue sets initial selection", () => {
      renderSelect({ defaultValue: "a" });
      expect(screen.getByRole("combobox")).toHaveTextContent("Option A");
    });

    it("disabled option cannot be selected via click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderSelect({ onValueChange });
      await user.click(screen.getByRole("combobox"));
      // Option C is disabled with pointer-events-none, click on it directly
      const disabledOption = screen.getByRole("option", { name: "Option C" });
      await user.click(disabledOption);
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe("keyboard navigation", () => {
    it("Arrow Down opens listbox and highlights first option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-a"),
      );
    });

    it("Arrow Down moves highlight to next option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-b"),
      );
    });

    it("Arrow Down wraps from last enabled to first option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // opens, highlights a
      await user.keyboard("{ArrowDown}"); // highlights b
      // c is disabled, so next enabled wraps to a
      await user.keyboard("{ArrowDown}");
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-a"),
      );
    });

    it("Arrow Up opens listbox and highlights last enabled option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-b"),
      );
    });

    it("Arrow Up moves highlight to previous option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // opens, highlights a
      await user.keyboard("{ArrowDown}"); // highlights b
      await user.keyboard("{ArrowUp}");   // back to a
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-a"),
      );
    });

    it("Arrow Up wraps from first to last enabled option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // opens, highlights a
      await user.keyboard("{ArrowUp}");   // wraps to b (c is disabled)
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-b"),
      );
    });

    it("Home highlights first non-disabled option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // open
      await user.keyboard("{ArrowDown}"); // highlight b
      await user.keyboard("{Home}");
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-a"),
      );
    });

    it("End highlights last non-disabled option", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // open, highlight a
      await user.keyboard("{End}");
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-b"),
      );
    });

    it("Enter selects highlighted option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderSelect({ onValueChange });
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // open, highlight a
      await user.keyboard("{ArrowDown}"); // highlight b
      await user.keyboard("{Enter}");
      expect(onValueChange).toHaveBeenCalledWith("b");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("Space selects highlighted option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderSelect({ onValueChange });
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // open, highlight a
      await user.keyboard("{ }");
      expect(onValueChange).toHaveBeenCalledWith("a");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("aria-activedescendant on trigger matches highlighted option id", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // open, highlight a
      const activeDescendant = trigger.getAttribute("aria-activedescendant");
      expect(activeDescendant).toBeDefined();
      const option = screen.getByRole("option", { name: "Option A" });
      expect(activeDescendant).toBe(option.id);
    });

    it("type-ahead highlights matching option", async () => {
      const user = userEvent.setup();
      render(
        <Select>
          <SelectTrigger placeholder="Pick a fruit" />
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>,
      );
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{ArrowDown}"); // open, highlights apple
      await user.keyboard("b");
      expect(trigger).toHaveAttribute(
        "aria-activedescendant",
        expect.stringContaining("option-banana"),
      );
    });
  });

  describe("ARIA attributes", () => {
    it("aria-controls on trigger matches listbox id", async () => {
      const user = userEvent.setup();
      renderSelect();
      const trigger = screen.getByRole("combobox");
      await user.click(trigger);
      const listbox = screen.getByRole("listbox");
      expect(trigger.getAttribute("aria-controls")).toBe(listbox.id);
    });

    it("aria-selected=true on selected option", async () => {
      const user = userEvent.setup();
      renderSelect({ value: "a" });
      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("option", { name: "Option A" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("aria-selected=false on non-selected options", async () => {
      const user = userEvent.setup();
      renderSelect({ value: "a" });
      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("option", { name: "Option B" })).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });

    it("aria-disabled=true on disabled option", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(screen.getByRole("combobox"));
      expect(screen.getByRole("option", { name: "Option C" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("aria-activedescendant is undefined when no option is highlighted", () => {
      renderSelect();
      expect(screen.getByRole("combobox")).not.toHaveAttribute(
        "aria-activedescendant",
      );
    });
  });

  describe("FormField integration", () => {
    it("applies aria-invalid from FormFieldContext hasError", () => {
      render(
        <FormField id="country" error="Required">
          <Label>Country</Label>
          <Select>
            <SelectTrigger placeholder="Select country" />
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
        </FormField>,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("applies aria-required from FormFieldContext required", () => {
      render(
        <FormField id="country" required>
          <Label>Country</Label>
          <Select>
            <SelectTrigger placeholder="Select country" />
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
        </FormField>,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-required",
        "true",
      );
    });

    it("includes error id in aria-describedby from FormFieldContext", () => {
      render(
        <FormField id="country" error="Required">
          <Label>Country</Label>
          <Select>
            <SelectTrigger placeholder="Select country" />
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
        </FormField>,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("country-error"),
      );
    });

    it("includes hint id in aria-describedby from FormFieldContext", () => {
      render(
        <FormField id="country" hint="Pick your country">
          <Label>Country</Label>
          <Select>
            <SelectTrigger placeholder="Select country" />
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
        </FormField>,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("country-hint"),
      );
    });

    it("applies aria-labelledby pointing to Label id from FormFieldContext", () => {
      render(
        <FormField id="country">
          <Label>Country</Label>
          <Select>
            <SelectTrigger placeholder="Select country" />
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
        </FormField>,
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-labelledby",
        "country-label",
      );
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the trigger button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Select>
          <SelectTrigger ref={ref} placeholder="Choose" />
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
          </SelectContent>
        </Select>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("disabled state", () => {
    it("disables trigger when Select disabled prop is true", () => {
      renderSelect({ disabled: true });
      expect(screen.getByRole("combobox")).toBeDisabled();
    });
  });

  describe("displayName", () => {
    it("sets displayName on all subcomponents", () => {
      expect(Select.displayName).toBe("Select");
      expect(SelectTrigger.displayName).toBe("SelectTrigger");
      expect(SelectContent.displayName).toBe("SelectContent");
      expect(SelectItem.displayName).toBe("SelectItem");
    });
  });
});
