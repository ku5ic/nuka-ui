import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import type * as FloatingUI from "@floating-ui/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "@nuka/components/ContextMenu";

vi.mock("@floating-ui/react", async () => {
  const actual = await vi.importActual<typeof FloatingUI>("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

describe("ContextMenu", () => {
  function rightClick(
    element: HTMLElement,
    coords = { clientX: 200, clientY: 300 },
  ) {
    fireEvent.contextMenu(element, coords);
  }

  describe("rendering", () => {
    it("does not render content initially", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("opens on right-click", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("renders items with role=menuitem", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    });
  });

  describe("ARIA attributes", () => {
    it("does not add aria-haspopup to trigger", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      expect(screen.getByText("Right-click here")).not.toHaveAttribute(
        "aria-haspopup",
      );
    });

    it("does not add aria-expanded to trigger", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      expect(screen.getByText("Right-click here")).not.toHaveAttribute(
        "aria-expanded",
      );
    });
  });

  describe("cursor position", () => {
    it("sets virtual element reference from cursor coordinates", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"), {
        clientX: 150,
        clientY: 250,
      });
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  describe("keyboard navigation", () => {
    it("trigger is focusable via Tab", async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      await user.tab();
      expect(screen.getByText("Right-click here")).toHaveFocus();
    });

    it("opens on Shift+F10", async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      await user.tab();
      await user.keyboard("{Shift>}{F10}{/Shift}");
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("focuses first item on open", async () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
      });
    });

    it("navigates with ArrowDown and ArrowUp", async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
      });

      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("menuitem", { name: "Paste" })).toHaveFocus();

      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
    });

    it("closes on Escape", async () => {
      const user = userEvent.setup();
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
      });

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("selects item on Enter", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={onSelect}>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
      });

      await user.keyboard("{Enter}");
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("sub-components", () => {
    it("renders separator", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("renders label", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(screen.getByText("Actions")).toBeInTheDocument();
    });

    it("renders checkbox items", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuCheckboxItem checked={true} onCheckedChange={vi.fn()}>
              Wrap lines
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(
        screen.getByRole("menuitemcheckbox", { name: "Wrap lines" }),
      ).toHaveAttribute("aria-checked", "true");
    });

    it("renders radio items", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuRadioGroup
              value="light"
              onValueChange={vi.fn()}
              aria-label="Theme"
            >
              <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
              <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(
        screen.getByRole("menuitemradio", { name: "Light" }),
      ).toHaveAttribute("aria-checked", "true");
      expect(
        screen.getByRole("menuitemradio", { name: "Dark" }),
      ).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("asChild", () => {
    it("supports asChild on trigger", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <section>Custom area</section>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      const trigger = screen.getByText("Custom area");
      expect(trigger.tagName).toBe("SECTION");
      rightClick(trigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  describe("disabled items", () => {
    it("renders aria-disabled on disabled items", () => {
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem disabled>Paste</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      expect(screen.getByRole("menuitem", { name: "Paste" })).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });

    it("does not call onSelect for disabled items", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();
      render(
        <ContextMenu>
          <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={onSelect} disabled>
              Paste
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      rightClick(screen.getByText("Right-click here"));
      await vi.waitFor(() => {
        expect(screen.getByRole("menuitem", { name: "Paste" })).toHaveFocus();
      });

      await user.keyboard("{Enter}");
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on trigger", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <ContextMenu>
          <ContextMenuTrigger ref={ref}>Right-click here</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
