import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type * as FloatingUI from "@floating-ui/react";
import {
  Combobox,
  ComboboxTrigger,
  comboboxTriggerVariants,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxOption,
  ComboboxGroup,
  ComboboxEmpty,
} from "@nuka/components/Combobox";
import { FormField } from "@nuka/components/FormField";
import { Label } from "@nuka/components/Label";

vi.mock("@floating-ui/react", async () => {
  const actual = await vi.importActual<typeof FloatingUI>("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

function renderCombobox(
  props: {
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (o: boolean) => void;
    disabled?: boolean;
    freeText?: boolean;
    name?: string;
    placeholder?: string;
    triggerIntent?: "default" | "danger" | "success" | "warning";
    triggerSize?: "sm" | "md" | "lg";
  } = {},
) {
  const {
    placeholder = "Select framework...",
    triggerIntent,
    triggerSize,
    ...comboboxProps
  } = props;

  return render(
    <Combobox {...comboboxProps}>
      <ComboboxTrigger
        placeholder={placeholder}
        intent={triggerIntent}
        size={triggerSize}
      />
      <ComboboxContent>
        <ComboboxInput placeholder="Search..." />
        <ComboboxListbox>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <ComboboxOption value="react">React</ComboboxOption>
          <ComboboxOption value="vue">Vue</ComboboxOption>
          <ComboboxOption value="svelte" disabled>
            Svelte
          </ComboboxOption>
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>,
  );
}

function renderComboboxWithGroups() {
  return render(
    <Combobox>
      <ComboboxTrigger placeholder="Select..." />
      <ComboboxContent>
        <ComboboxInput placeholder="Search..." />
        <ComboboxListbox>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <ComboboxGroup label="Frontend">
            <ComboboxOption value="react">React</ComboboxOption>
            <ComboboxOption value="vue">Vue</ComboboxOption>
          </ComboboxGroup>
          <ComboboxGroup label="Backend">
            <ComboboxOption value="node">Node</ComboboxOption>
            <ComboboxOption value="python">Python</ComboboxOption>
          </ComboboxGroup>
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>,
  );
}

describe("Combobox", () => {
  describe("displayName", () => {
    it("sets displayName on all parts", () => {
      expect(Combobox.displayName).toBe("Combobox");
      expect(ComboboxTrigger.displayName).toBe("ComboboxTrigger");
      expect(ComboboxContent.displayName).toBe("ComboboxContent");
      expect(ComboboxInput.displayName).toBe("ComboboxInput");
      expect(ComboboxListbox.displayName).toBe("ComboboxListbox");
      expect(ComboboxOption.displayName).toBe("ComboboxOption");
      expect(ComboboxGroup.displayName).toBe("ComboboxGroup");
      expect(ComboboxEmpty.displayName).toBe("ComboboxEmpty");
    });
  });

  describe("rendering", () => {
    it("renders trigger with placeholder", () => {
      renderCombobox();
      expect(
        screen.getByRole("button", { name: "Select framework..." }),
      ).toBeInTheDocument();
    });

    it("shows selected option label when value is set", () => {
      renderCombobox({ value: "react" });
      const trigger = screen.getByRole("button", { name: "React" });
      expect(trigger).toHaveTextContent("React");
    });

    it("has aria-expanded=false when closed", () => {
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("has aria-haspopup=listbox on trigger", () => {
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    });

    it("does not render listbox when closed", () => {
      renderCombobox();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("renders hidden input when name is provided", () => {
      const { container } = renderCombobox({ name: "framework" });
      const hidden = container.querySelector('input[type="hidden"]');
      expect(hidden).toBeInTheDocument();
      expect((hidden as HTMLInputElement).name).toBe("framework");
    });

    it("hidden input value matches selected value", () => {
      const { container } = renderCombobox({
        name: "framework",
        value: "react",
      });
      const hidden = container.querySelector('input[type="hidden"]');
      expect((hidden as HTMLInputElement).value).toBe("react");
    });

    it("does not render hidden input when name not provided", () => {
      const { container } = renderCombobox();
      expect(
        container.querySelector('input[type="hidden"]'),
      ).not.toBeInTheDocument();
    });
  });

  describe("open/close", () => {
    it("opens on trigger click and shows listbox", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("sets aria-expanded=true when open", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("focuses search input when opened", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      await waitFor(() => {
        expect(screen.getByRole("combobox")).toHaveFocus();
      });
    });

    it("closes on second trigger click", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      await user.click(trigger);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.click(trigger);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes on Escape from search input", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      await user.click(trigger);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes on Tab from search input", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.keyboard("{Tab}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("opens on ArrowDown from trigger and highlights first option", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      trigger.focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      const input = screen.getByRole("combobox");
      await waitFor(() => {
        const activeId = input.getAttribute("aria-activedescendant");
        expect(activeId).toBeTruthy();
        const activeEl = document.getElementById(activeId!);
        expect(activeEl).toHaveTextContent("React");
      });
    });

    it("opens on ArrowUp from trigger and highlights last enabled option", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      trigger.focus();
      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      const input = screen.getByRole("combobox");
      await waitFor(() => {
        const activeId = input.getAttribute("aria-activedescendant");
        expect(activeId).toBeTruthy();
        const activeEl = document.getElementById(activeId!);
        expect(activeEl).toHaveTextContent("Vue");
      });
    });

    it("opens on character key from trigger and pre-fills filter", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      trigger.focus();
      await user.keyboard("r");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveValue("r");
    });

    it("calls onOpenChange when opening and closing", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderCombobox({ onOpenChange });
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      expect(onOpenChange).toHaveBeenCalledWith(true);
      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("selection", () => {
    it("selects option on click and closes", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      await user.click(trigger);
      await user.click(screen.getByRole("option", { name: "Vue" }));
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(trigger).toHaveTextContent("Vue");
    });

    it("calls onValueChange with correct value", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderCombobox({ onValueChange });
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      await user.click(screen.getByRole("option", { name: "React" }));
      expect(onValueChange).toHaveBeenCalledWith("react");
    });

    it("controlled: value prop drives displayed selection", () => {
      renderCombobox({ value: "vue" });
      expect(screen.getByRole("button", { name: "Vue" })).toHaveTextContent(
        "Vue",
      );
    });

    it("uncontrolled: defaultValue sets initial selection", () => {
      renderCombobox({ defaultValue: "react" });
      expect(screen.getByRole("button", { name: "React" })).toHaveTextContent(
        "React",
      );
    });

    it("disabled option cannot be selected via click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderCombobox({ onValueChange });
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const disabledOption = screen.getByRole("option", { name: "Svelte" });
      await user.click(disabledOption);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("shows aria-selected on the selected option", async () => {
      const user = userEvent.setup();
      renderCombobox({ value: "react" });
      await user.click(screen.getByRole("button", { name: "React" }));
      expect(screen.getByRole("option", { name: "React" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("option", { name: "Vue" })).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });
  });

  describe("keyboard navigation", () => {
    it("ArrowDown moves to next option", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}");
      const activeId = input.getAttribute("aria-activedescendant");
      expect(document.getElementById(activeId!)).toHaveTextContent("React");
      await user.keyboard("{ArrowDown}");
      const nextId = input.getAttribute("aria-activedescendant");
      expect(document.getElementById(nextId!)).toHaveTextContent("Vue");
    });

    it("ArrowUp moves to previous option", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowUp}");
      const activeId = input.getAttribute("aria-activedescendant");
      expect(document.getElementById(activeId!)).toHaveTextContent("React");
    });

    it("wraps at list boundaries", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      // React -> Vue -> wrap -> React (Svelte is disabled, skipped)
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      const activeId = input.getAttribute("aria-activedescendant");
      expect(document.getElementById(activeId!)).toHaveTextContent("React");
    });

    it("skips disabled options", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      // ArrowDown: React -> Vue -> wraps (skips disabled Svelte) -> React
      await user.keyboard("{ArrowDown}"); // React
      await user.keyboard("{ArrowDown}"); // Vue
      await user.keyboard("{ArrowDown}"); // wraps to React (skips Svelte)
      const activeId = input.getAttribute("aria-activedescendant");
      expect(document.getElementById(activeId!)).toHaveTextContent("React");
    });

    it("Enter selects the active option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderCombobox({ onValueChange });
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      await user.click(trigger);
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");
      expect(onValueChange).toHaveBeenCalledWith("react");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("Home moves to first option", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Home}");
      const activeId = input.getAttribute("aria-activedescendant");
      expect(document.getElementById(activeId!)).toHaveTextContent("React");
    });

    it("End moves to last enabled option", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      await user.keyboard("{End}");
      const activeId = input.getAttribute("aria-activedescendant");
      expect(document.getElementById(activeId!)).toHaveTextContent("Vue");
    });

    it("has no activedescendant when no option is highlighted", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      expect(input).not.toHaveAttribute("aria-activedescendant");
    });
  });

  describe("filtering", () => {
    it("typing filters options", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      await user.type(screen.getByRole("combobox"), "re");
      expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
      expect(
        screen.queryByRole("option", { name: "Vue" }),
      ).not.toBeInTheDocument();
    });

    it("shows ComboboxEmpty when no matches", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      await user.type(screen.getByRole("combobox"), "xyz");
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });

    it("clears filter and resets on close and reopen", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      await user.click(trigger);
      await user.type(screen.getByRole("combobox"), "re");
      expect(
        screen.queryByRole("option", { name: "Vue" }),
      ).not.toBeInTheDocument();
      await user.keyboard("{Escape}");
      await user.click(trigger);
      expect(screen.getByRole("option", { name: "Vue" })).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toHaveValue("");
    });

    it("resets activedescendant when filter changes", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}");
      expect(input.getAttribute("aria-activedescendant")).toBeTruthy();
      await user.type(input, "v");
      expect(input).not.toHaveAttribute("aria-activedescendant");
    });
  });

  describe("groups", () => {
    it("renders groups with labels", async () => {
      const user = userEvent.setup();
      renderComboboxWithGroups();
      await user.click(screen.getByRole("button", { name: "Select..." }));
      expect(
        screen.getByRole("group", { name: "Frontend" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "Backend" }),
      ).toBeInTheDocument();
    });

    it("hides group when all children are filtered out", async () => {
      const user = userEvent.setup();
      renderComboboxWithGroups();
      await user.click(screen.getByRole("button", { name: "Select..." }));
      await user.type(screen.getByRole("combobox"), "react");
      expect(
        screen.getByRole("group", { name: "Frontend" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("group", { name: "Backend" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("free-text mode", () => {
    it("Enter commits typed text as value when no active option", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderCombobox({ freeText: true, onValueChange });
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      await user.type(screen.getByRole("combobox"), "angular");
      await user.keyboard("{Enter}");
      expect(onValueChange).toHaveBeenCalledWith("angular");
    });

    it("constrained mode does not commit typed text on Enter", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderCombobox({ onValueChange });
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      await user.type(screen.getByRole("combobox"), "angular");
      await user.keyboard("{Enter}");
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe("FormField integration", () => {
    it("propagates aria-invalid from FormField", () => {
      render(
        <FormField error="Required">
          <Label>Framework</Label>
          <Combobox>
            <ComboboxTrigger placeholder="Select..." intent="danger" />
            <ComboboxContent>
              <ComboboxInput placeholder="Search..." />
              <ComboboxListbox>
                <ComboboxOption value="react">React</ComboboxOption>
              </ComboboxListbox>
            </ComboboxContent>
          </Combobox>
        </FormField>,
      );
      const trigger = screen.getByRole("button", { name: "Framework" });
      expect(trigger).toHaveAttribute("aria-invalid", "true");
    });

    it("propagates aria-describedby from FormField", () => {
      render(
        <FormField error="This field is required">
          <Label>Framework</Label>
          <Combobox>
            <ComboboxTrigger placeholder="Select..." />
            <ComboboxContent>
              <ComboboxInput placeholder="Search..." />
              <ComboboxListbox>
                <ComboboxOption value="react">React</ComboboxOption>
              </ComboboxListbox>
            </ComboboxContent>
          </Combobox>
        </FormField>,
      );
      const trigger = screen.getByRole("button", { name: "Framework" });
      expect(trigger).toHaveAttribute("aria-describedby");
    });

    it("uses FormField label for aria-labelledby", () => {
      render(
        <FormField>
          <Label>Framework</Label>
          <Combobox>
            <ComboboxTrigger placeholder="Select..." />
            <ComboboxContent>
              <ComboboxInput placeholder="Search..." />
              <ComboboxListbox>
                <ComboboxOption value="react">React</ComboboxOption>
              </ComboboxListbox>
            </ComboboxContent>
          </Combobox>
        </FormField>,
      );
      const trigger = screen.getByRole("button", { name: "Framework" });
      expect(trigger).toHaveAttribute("aria-labelledby");
    });
  });

  describe("variants", () => {
    it("applies intent classes to trigger", () => {
      renderCombobox({ triggerIntent: "danger" });
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      const dangerClasses = comboboxTriggerVariants({
        intent: "danger",
      }).split(" ");
      for (const cls of dangerClasses) {
        if (cls) expect(trigger.className).toContain(cls);
      }
    });

    it("applies size classes to trigger", () => {
      renderCombobox({ triggerSize: "lg" });
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      const lgClasses = comboboxTriggerVariants({ size: "lg" }).split(" ");
      for (const cls of lgClasses) {
        if (cls) expect(trigger.className).toContain(cls);
      }
    });

    it("disabled trigger is not clickable", () => {
      renderCombobox({ disabled: true });
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      expect(trigger).toBeDisabled();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on ComboboxTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Combobox>
          <ComboboxTrigger ref={ref} placeholder="Select..." />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxListbox>
              <ComboboxOption value="a">A</ComboboxOption>
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref on ComboboxContent", async () => {
      const ref = React.createRef<HTMLDivElement>();
      const user = userEvent.setup();
      render(
        <Combobox>
          <ComboboxTrigger placeholder="Select..." />
          <ComboboxContent ref={ref}>
            <ComboboxInput />
            <ComboboxListbox>
              <ComboboxOption value="a">A</ComboboxOption>
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>,
      );
      await user.click(screen.getByRole("button", { name: "Select..." }));
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref on ComboboxOption", async () => {
      const ref = React.createRef<HTMLDivElement>();
      const user = userEvent.setup();
      render(
        <Combobox>
          <ComboboxTrigger placeholder="Select..." />
          <ComboboxContent>
            <ComboboxInput />
            <ComboboxListbox>
              <ComboboxOption ref={ref} value="a">
                A
              </ComboboxOption>
            </ComboboxListbox>
          </ComboboxContent>
        </Combobox>,
      );
      await user.click(screen.getByRole("button", { name: "Select..." }));
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("ARIA", () => {
    it("search input has combobox role with correct attributes", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      expect(input).toHaveAttribute("aria-expanded", "true");
      expect(input).toHaveAttribute("aria-controls");
    });

    it("aria-controls on trigger only set when open", async () => {
      const user = userEvent.setup();
      renderCombobox();
      const trigger = screen.getByRole("button", {
        name: "Select framework...",
      });
      expect(trigger).not.toHaveAttribute("aria-controls");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-controls");
    });

    it("disabled option has aria-disabled", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      expect(screen.getByRole("option", { name: "Svelte" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("listbox has aria-label", async () => {
      const user = userEvent.setup();
      renderCombobox();
      await user.click(
        screen.getByRole("button", { name: "Select framework..." }),
      );
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-label",
        "Options",
      );
    });
  });
});
