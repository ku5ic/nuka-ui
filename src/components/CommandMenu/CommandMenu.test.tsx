import * as React from "react";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const scrollIntoViewMock = vi.fn();

beforeAll(() => {
  Element.prototype.scrollIntoView = scrollIntoViewMock;
});

afterAll(() => {
  delete (Element.prototype as unknown as Record<string, unknown>)
    .scrollIntoView;
});
import {
  CommandMenu,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuShortcut,
} from "@nuka/components/CommandMenu";

function renderCommandMenu({
  onOpenChange = vi.fn(),
  onSelect = vi.fn(),
  open = true,
}: {
  onOpenChange?: (open: boolean) => void;
  onSelect?: () => void;
  open?: boolean;
} = {}) {
  return render(
    <CommandMenu open={open} onOpenChange={onOpenChange}>
      <CommandMenuInput placeholder="Search..." />
      <CommandMenuList>
        <CommandMenuEmpty>No results found.</CommandMenuEmpty>
        <CommandMenuGroup heading="Actions">
          <CommandMenuItem value="new-file" onSelect={onSelect}>
            New file
          </CommandMenuItem>
          <CommandMenuItem value="open-file">Open file</CommandMenuItem>
          <CommandMenuItem value="save" disabled>
            Save
          </CommandMenuItem>
        </CommandMenuGroup>
        <CommandMenuGroup heading="Navigation">
          <CommandMenuItem value="go-home">Go home</CommandMenuItem>
          <CommandMenuItem value="go-settings">
            Settings
            <CommandMenuShortcut>Cmd+,</CommandMenuShortcut>
          </CommandMenuItem>
        </CommandMenuGroup>
      </CommandMenuList>
    </CommandMenu>,
  );
}

async function focusInput() {
  // The component focuses the input via requestAnimationFrame.
  // Flush it so tests start with focus on the input.
  await act(async () => {
    await new Promise((r) => {
      requestAnimationFrame(r);
    });
  });
}

describe("CommandMenu", () => {
  describe("displayName", () => {
    it("sets displayName on all parts", () => {
      expect(CommandMenu.displayName).toBe("CommandMenu");
      expect(CommandMenuInput.displayName).toBe("CommandMenuInput");
      expect(CommandMenuList.displayName).toBe("CommandMenuList");
      expect(CommandMenuEmpty.displayName).toBe("CommandMenuEmpty");
      expect(CommandMenuGroup.displayName).toBe("CommandMenuGroup");
      expect(CommandMenuItem.displayName).toBe("CommandMenuItem");
      expect(CommandMenuShortcut.displayName).toBe("CommandMenuShortcut");
    });
  });

  describe("rendering", () => {
    it("renders panel when open", async () => {
      renderCommandMenu({ open: true });
      await focusInput();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(
        screen.getByRole("listbox", { name: "Suggestions" }),
      ).toBeInTheDocument();
    });

    it("does not render panel when closed", () => {
      renderCommandMenu({ open: false });
      expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("input ARIA attributes", () => {
    it("has role=combobox", async () => {
      renderCommandMenu();
      await focusInput();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("has aria-autocomplete=list", async () => {
      renderCommandMenu();
      await focusInput();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-autocomplete",
        "list",
      );
    });

    it("has aria-expanded=true", async () => {
      renderCommandMenu();
      await focusInput();
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("has aria-controls pointing to listbox", async () => {
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      const listbox = screen.getByRole("listbox", { name: "Suggestions" });
      expect(input).toHaveAttribute("aria-controls", listbox.id);
    });

    it("has aria-activedescendant absent when no active item", async () => {
      renderCommandMenu();
      await focusInput();
      expect(screen.getByRole("combobox")).not.toHaveAttribute(
        "aria-activedescendant",
      );
    });
  });

  describe("keyboard navigation", () => {
    it("ArrowDown activates first item", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}");
      expect(input).toHaveAttribute("aria-activedescendant");
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("New file");
    });

    it("ArrowDown moves to next item", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}{ArrowDown}");
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("Open file");
    });

    it("ArrowDown wraps from last to first", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      // 5 items: New file, Open file, Save, Go home, Settings
      await user.keyboard(
        "{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}",
      );
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("New file");
    });

    it("ArrowUp activates last item from no selection", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowUp}");
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("Settings");
    });

    it("ArrowUp wraps from first to last", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}{ArrowUp}");
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("Settings");
    });

    it("focus stays on input during arrow navigation", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}{ArrowDown}");
      expect(document.activeElement).toBe(input);
    });

    it("Home moves to first item", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{Home}");
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("New file");
    });

    it("End moves to last item", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{End}");
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("Settings");
    });
  });

  describe("selection", () => {
    it("Enter selects active item and closes menu", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const onOpenChange = vi.fn();
      renderCommandMenu({ onSelect, onOpenChange });
      await focusInput();
      await user.keyboard("{ArrowDown}{Enter}");
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("Enter does nothing on disabled item", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderCommandMenu({ onOpenChange });
      await focusInput();
      // ArrowDown x3 to reach "Save" (disabled)
      await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{Enter}");
      expect(onOpenChange).not.toHaveBeenCalledWith(false);
    });

    it("click selects item and closes menu", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const onOpenChange = vi.fn();
      renderCommandMenu({ onSelect, onOpenChange });
      await focusInput();
      const item = screen.getByRole("option", { name: "New file" });
      await user.click(item);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("closing", () => {
    it("Escape closes menu", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderCommandMenu({ onOpenChange });
      await focusInput();
      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("Tab closes menu", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderCommandMenu({ onOpenChange });
      await focusInput();
      await user.keyboard("{Tab}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("backdrop click closes menu", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderCommandMenu({ onOpenChange });
      await focusInput();
      const backdrop = document.querySelector("[aria-hidden='true']");
      expect(backdrop).not.toBeNull();
      await user.click(backdrop!);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("filtering", () => {
    it("hides non-matching items", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.type(input, "new");
      const options = screen.getAllByRole("option", { hidden: false });
      const visibleOptions = options.filter((el) => !el.hidden);
      expect(visibleOptions).toHaveLength(1);
      expect(visibleOptions[0]).toHaveTextContent("New file");
    });

    it("filter is case-insensitive", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.type(input, "NEW");
      const options = screen.getAllByRole("option", { hidden: false });
      const visibleOptions = options.filter((el) => !el.hidden);
      expect(visibleOptions).toHaveLength(1);
      expect(visibleOptions[0]).toHaveTextContent("New file");
    });

    it("items without value are always visible", async () => {
      const { unmount } = render(
        <CommandMenu open onOpenChange={vi.fn()}>
          <CommandMenuInput />
          <CommandMenuList>
            <CommandMenuItem value="alpha">Alpha</CommandMenuItem>
            <CommandMenuItem>Always visible</CommandMenuItem>
          </CommandMenuList>
        </CommandMenu>,
      );
      await focusInput();
      const input = screen.getByRole("combobox");
      const user = userEvent.setup();
      await user.type(input, "zzz");
      const alwaysVisible = screen.getByRole("option", {
        name: "Always visible",
      });
      expect(alwaysVisible).not.toHaveAttribute("hidden");
      unmount();
    });

    it("filter change resets active item", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.keyboard("{ArrowDown}");
      expect(input).toHaveAttribute("aria-activedescendant");
      await user.type(input, "x");
      expect(input).not.toHaveAttribute("aria-activedescendant");
    });
  });

  describe("empty state", () => {
    it("shows CommandMenuEmpty when no items match", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.type(input, "zzzzzzz");
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });

    it("hides CommandMenuEmpty when items match", async () => {
      renderCommandMenu();
      await focusInput();
      expect(screen.queryByText("No results found.")).not.toBeInTheDocument();
    });
  });

  describe("groups", () => {
    it("renders group with heading", async () => {
      renderCommandMenu();
      await focusInput();
      expect(screen.getByText("Actions")).toBeInTheDocument();
      expect(screen.getByText("Navigation")).toBeInTheDocument();
    });

    it("hides group when all children filtered out", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      await user.type(input, "go-");
      const actionsHeading = screen.getByText("Actions");
      expect(actionsHeading.closest("[role='group']")).toHaveAttribute(
        "hidden",
      );
    });
  });

  describe("disabled items", () => {
    it("has aria-disabled on disabled item", async () => {
      renderCommandMenu();
      await focusInput();
      const saveItem = screen.getByRole("option", { name: "Save" });
      expect(saveItem).toHaveAttribute("aria-disabled", "true");
    });

    it("disabled item is navigable via arrow keys", async () => {
      const user = userEvent.setup();
      renderCommandMenu();
      await focusInput();
      const input = screen.getByRole("combobox");
      // ArrowDown x3 reaches Save (disabled)
      await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
      const activeId = input.getAttribute("aria-activedescendant")!;
      const activeItem = document.getElementById(activeId);
      expect(activeItem).toHaveTextContent("Save");
    });
  });

  describe("shortcut", () => {
    it("is aria-hidden", async () => {
      renderCommandMenu();
      await focusInput();
      const shortcut = screen.getByText("Cmd+,");
      expect(shortcut).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("auto-scroll", () => {
    it("scrolls active item into view", async () => {
      const user = userEvent.setup();
      scrollIntoViewMock.mockClear();
      renderCommandMenu();
      await focusInput();
      await user.keyboard("{ArrowDown}");
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ block: "nearest" });
    });
  });
});
