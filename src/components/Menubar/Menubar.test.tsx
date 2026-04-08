import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import type * as FloatingUI from "@floating-ui/react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
} from "@nuka/components/Menubar";

vi.mock("@floating-ui/react", async () => {
  const actual = await vi.importActual<typeof FloatingUI>("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

function TestMenubar() {
  return (
    <Menubar>
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom in</MenubarItem>
          <MenubarItem>Zoom out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

describe("Menubar", () => {
  describe("rendering", () => {
    it("renders with role=menubar", () => {
      render(<TestMenubar />);
      // menubar has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("menubar")).toBeInTheDocument();
    });

    it("renders triggers with role=menuitem", () => {
      render(<TestMenubar />);
      // getAllByRole: multiple menuitems with different names
      expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    });

    it("does not render any menu content initially", () => {
      render(<TestMenubar />);
      // menu has no accessible name; { name } omitted intentionally
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("ARIA attributes", () => {
    it("sets aria-haspopup=menu on triggers", () => {
      render(<TestMenubar />);
      const triggers = screen.getAllByRole("menuitem");
      for (const trigger of triggers) {
        expect(trigger).toHaveAttribute("aria-haspopup", "menu");
      }
    });

    it("sets aria-expanded on triggers", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      const fileTrigger = screen.getByRole("menuitem", { name: "File" });
      expect(fileTrigger).toHaveAttribute("aria-expanded", "false");

      await user.click(fileTrigger);
      expect(fileTrigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("click behavior", () => {
    it("opens menu on click", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      await user.click(screen.getByRole("menuitem", { name: "File" }));
      // menu has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "New" })).toBeInTheDocument();
    });

    it("closes menu on second click", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      const trigger = screen.getByRole("menuitem", { name: "File" });
      await user.click(trigger);
      // menu has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await user.click(trigger);
      // menu has no accessible name; { name } omitted intentionally
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("keyboard navigation on menubar", () => {
    it("opens menu on ArrowDown from trigger", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      const fileTrigger = screen.getByRole("menuitem", { name: "File" });
      fileTrigger.focus();
      await user.keyboard("{ArrowDown}");

      // menu has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("moves focus between triggers with ArrowRight", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      const fileTrigger = screen.getByRole("menuitem", { name: "File" });
      fileTrigger.focus();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    });

    it("moves focus between triggers with ArrowLeft", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      const editTrigger = screen.getByRole("menuitem", { name: "Edit" });
      editTrigger.focus();
      await user.keyboard("{ArrowLeft}");

      expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();
    });

    it("wraps ArrowRight from last to first trigger", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      const viewTrigger = screen.getByRole("menuitem", { name: "View" });
      viewTrigger.focus();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();
    });
  });

  describe("cross-menu navigation", () => {
    it("ArrowRight from inside menu closes current and opens next", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      await user.click(screen.getByRole("menuitem", { name: "File" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "New" })).toHaveFocus();
      });

      await user.keyboard("{ArrowRight}");

      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
      });
    });

    it("ArrowLeft from inside menu closes current and opens previous", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      await user.click(screen.getByRole("menuitem", { name: "Edit" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Undo" })).toHaveFocus();
      });

      await user.keyboard("{ArrowLeft}");

      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();
      });
    });
  });

  describe("Escape behavior", () => {
    it("closes menu on Escape and returns focus to trigger", async () => {
      const user = userEvent.setup();
      render(<TestMenubar />);

      await user.click(screen.getByRole("menuitem", { name: "File" }));
      // menu has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "New" })).toHaveFocus();
      });

      await user.keyboard("{Escape}");
      // menu has no accessible name; { name } omitted intentionally
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();
    });
  });

  describe("item selection", () => {
    it("calls onSelect on Enter and closes menu", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(
        <Menubar>
          <MenubarMenu value="file">
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onSelect={onSelect}>New</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>,
      );

      await user.click(screen.getByRole("menuitem", { name: "File" }));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "New" })).toHaveFocus();
      });

      await user.keyboard("{Enter}");
      expect(onSelect).toHaveBeenCalledTimes(1);
      // menu has no accessible name; { name } omitted intentionally
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("sub-components", () => {
    it("renders separator", async () => {
      const user = userEvent.setup();
      render(
        <Menubar>
          <MenubarMenu value="file">
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Save</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>,
      );

      await user.click(screen.getByRole("menuitem", { name: "File" }));
      // separator has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("renders checkbox items", async () => {
      const user = userEvent.setup();
      render(
        <Menubar>
          <MenubarMenu value="view">
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={true} onCheckedChange={vi.fn()}>
                Show toolbar
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>,
      );

      await user.click(screen.getByRole("menuitem", { name: "View" }));
      expect(
        screen.getByRole("menuitemcheckbox", { name: "Show toolbar" }),
      ).toHaveAttribute("aria-checked", "true");
    });

    it("renders radio items", async () => {
      const user = userEvent.setup();
      render(
        <Menubar>
          <MenubarMenu value="view">
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup
                value="100"
                onValueChange={vi.fn()}
                aria-label="Zoom level"
              >
                <MenubarRadioItem value="75">75%</MenubarRadioItem>
                <MenubarRadioItem value="100">100%</MenubarRadioItem>
                <MenubarRadioItem value="150">150%</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>,
      );

      await user.click(screen.getByRole("menuitem", { name: "View" }));
      expect(
        screen.getByRole("menuitemradio", { name: "100%" }),
      ).toHaveAttribute("aria-checked", "true");
      expect(
        screen.getByRole("menuitemradio", { name: "75%" }),
      ).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on menubar root", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Menubar ref={ref}>
          <MenubarMenu value="file">
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref on trigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Menubar>
          <MenubarMenu value="file">
            <MenubarTrigger ref={ref}>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>,
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
