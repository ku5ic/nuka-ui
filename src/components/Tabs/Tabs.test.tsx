import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@nuka/components/Tabs";

function renderTabs(
  props: Partial<React.ComponentProps<typeof Tabs>> = {},
  listProps: Partial<React.ComponentProps<typeof TabsList>> = {},
) {
  return render(
    <Tabs defaultValue="tab-1" {...props}>
      <TabsList {...listProps}>
        <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Panel 1</TabsContent>
      <TabsContent value="tab-2">Panel 2</TabsContent>
      <TabsContent value="tab-3">Panel 3</TabsContent>
    </Tabs>,
  );
}

describe("Tabs", () => {
  describe("rendering", () => {
    it("renders tablist with correct role", () => {
      renderTabs();
      // tablist has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("renders tabs with correct role", () => {
      renderTabs();
      // getAllByRole: multiple tabs with different names
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });

    it("renders tabpanels with correct role", () => {
      renderTabs();
      // getAllByRole: only one visible panel at a time
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    });

    it("sets aria-orientation on tablist", () => {
      renderTabs();
      // tablist has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("tablist")).toHaveAttribute(
        "aria-orientation",
        "horizontal",
      );
    });

    it("sets aria-orientation to vertical when specified", () => {
      renderTabs({ orientation: "vertical" });
      // tablist has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("tablist")).toHaveAttribute(
        "aria-orientation",
        "vertical",
      );
    });

    it("sets aria-selected on active tab", () => {
      renderTabs();
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });

    it("sets aria-controls on triggers and aria-labelledby on panels", () => {
      renderTabs();
      const trigger = screen.getByRole("tab", { name: "Tab 1" });
      const panel = screen.getByRole("tabpanel", { name: "Tab 1" });

      const panelId = trigger.getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      expect(panel).toHaveAttribute("id", panelId);

      const triggerId = trigger.getAttribute("id");
      expect(panel).toHaveAttribute("aria-labelledby", triggerId);
    });
  });

  describe("hidden panels", () => {
    it("active panel does not have hidden attribute", () => {
      renderTabs();
      const panel = screen.getByRole("tabpanel", { name: "Tab 1" });
      expect(panel).not.toHaveAttribute("hidden");
      expect(panel).toHaveTextContent("Panel 1");
    });

    it("inactive panels have hidden attribute and remain in DOM", () => {
      renderTabs();
      const hiddenPanels = document.querySelectorAll(
        '[role="tabpanel"][hidden]',
      );
      expect(hiddenPanels).toHaveLength(2);
    });

    it("panels have tabIndex 0", () => {
      renderTabs();
      const panel = screen.getByRole("tabpanel", { name: "Tab 1" });
      expect(panel).toHaveAttribute("tabindex", "0");
    });
  });

  describe("uncontrolled", () => {
    it("selects defaultValue tab initially", () => {
      renderTabs({ defaultValue: "tab-2" });
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tabpanel", { name: "Tab 2" })).toHaveTextContent(
        "Panel 2",
      );
    });

    it("changes tab on click", async () => {
      const user = userEvent.setup();
      renderTabs();

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tabpanel", { name: "Tab 2" })).toHaveTextContent(
        "Panel 2",
      );
    });
  });

  describe("controlled", () => {
    it("respects controlled value", () => {
      renderTabs({ value: "tab-2", onValueChange: vi.fn() });
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("calls onValueChange on click", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      renderTabs({ value: "tab-1", onValueChange });

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));
      expect(onValueChange).toHaveBeenCalledWith("tab-2");
    });
  });

  describe("automatic activation", () => {
    it("selects tab on arrow key focus", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tabpanel", { name: "Tab 2" })).toHaveTextContent(
        "Panel 2",
      );
    });
  });

  describe("manual activation", () => {
    it("moves focus without changing selection on arrow key", async () => {
      const user = userEvent.setup();
      renderTabs({ activationMode: "manual" });

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("selects focused tab on Enter", async () => {
      const user = userEvent.setup();
      renderTabs({ activationMode: "manual" });

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");
      await user.keyboard("{Enter}");

      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("selects focused tab on Space", async () => {
      const user = userEvent.setup();
      renderTabs({ activationMode: "manual" });

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");
      await user.keyboard(" ");

      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });
  });

  describe("keyboard navigation - horizontal", () => {
    it("ArrowRight moves to next tab", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
    });

    it("ArrowLeft moves to previous tab", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 2" }).focus();
      await user.keyboard("{ArrowLeft}");

      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    });

    it("ArrowRight wraps from last to first", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 3" }).focus();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    });

    it("ArrowLeft wraps from first to last", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowLeft}");

      expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
    });

    it("Home moves to first tab", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 3" }).focus();
      await user.keyboard("{Home}");

      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    });

    it("End moves to last tab", async () => {
      const user = userEvent.setup();
      renderTabs();

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{End}");

      expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
    });
  });

  describe("keyboard navigation - vertical", () => {
    it("ArrowDown moves to next tab", async () => {
      const user = userEvent.setup();
      renderTabs({ orientation: "vertical" });

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowDown}");

      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
    });

    it("ArrowUp moves to previous tab", async () => {
      const user = userEvent.setup();
      renderTabs({ orientation: "vertical" });

      screen.getByRole("tab", { name: "Tab 2" }).focus();
      await user.keyboard("{ArrowUp}");

      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();
    });
  });

  describe("disabled tabs", () => {
    it("disabled tab has aria-disabled and tabIndex -1", () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>
              Tab 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">Panel 1</TabsContent>
          <TabsContent value="tab-2">Panel 2</TabsContent>
        </Tabs>,
      );

      const disabledTab = screen.getByRole("tab", { name: "Tab 2" });
      expect(disabledTab).toHaveAttribute("aria-disabled", "true");
      expect(disabledTab).toHaveAttribute("tabindex", "-1");
    });

    it("arrow keys skip disabled tabs", async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab-2" disabled>
              Tab 2
            </TabsTrigger>
            <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">Panel 1</TabsContent>
          <TabsContent value="tab-2">Panel 2</TabsContent>
          <TabsContent value="tab-3">Panel 3</TabsContent>
        </Tabs>,
      );

      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");

      expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
    });
  });

  describe("roving tabindex", () => {
    it("only active trigger has tabIndex 0", () => {
      renderTabs();
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
        "tabindex",
        "0",
      );
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
      expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveAttribute(
        "tabindex",
        "-1",
      );
    });
  });

  describe("variants", () => {
    it("applies underline variant classes", () => {
      renderTabs({}, { variant: "underline" });
      // tablist has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("tablist").className).toContain("border-b");
    });

    it("applies pill variant classes", () => {
      renderTabs({}, { variant: "pill" });
      // tablist has no accessible name; { name } omitted intentionally
      const tablist = screen.getByRole("tablist");
      expect(tablist.className).toContain("bg-(--nuka-bg-muted)");
      expect(tablist.className).toContain("rounded-(--radius-lg)");
    });

    it("applies boxed variant classes", () => {
      renderTabs({}, { variant: "boxed" });
      // tablist has no accessible name; { name } omitted intentionally
      const tablist = screen.getByRole("tablist");
      expect(tablist.className).toContain("border");
      expect(tablist.className).toContain("rounded-(--radius-lg)");
    });
  });

  describe("className override", () => {
    it("allows className on Tabs root", () => {
      const { container } = renderTabs({ className: "custom-root" });
      expect(container.firstElementChild).toHaveClass("custom-root");
    });

    it("allows className on TabsList", () => {
      renderTabs({}, { className: "custom-list" });
      // tablist has no accessible name; { name } omitted intentionally
      expect(screen.getByRole("tablist")).toHaveClass("custom-list");
    });

    it("allows className on TabsTrigger", () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1" className="custom-trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">Panel 1</TabsContent>
        </Tabs>,
      );
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveClass(
        "custom-trigger",
      );
    });

    it("allows className on TabsContent", () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1" className="custom-panel">
            Panel 1
          </TabsContent>
        </Tabs>,
      );
      expect(screen.getByRole("tabpanel", { name: "Tab 1" })).toHaveClass(
        "custom-panel",
      );
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to Tabs root", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Tabs ref={ref} defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">Panel 1</TabsContent>
        </Tabs>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to TabsList", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Tabs defaultValue="tab-1">
          <TabsList ref={ref}>
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">Panel 1</TabsContent>
        </Tabs>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to TabsTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger ref={ref} value="tab-1">
              Tab 1
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">Panel 1</TabsContent>
        </Tabs>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref to TabsContent", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent ref={ref} value="tab-1">
            Panel 1
          </TabsContent>
        </Tabs>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot on every Tabs sub-component", () => {
      const { container } = renderTabs();

      expect(container.querySelector('[data-slot="root"]')).not.toBeNull();
      expect(screen.getByRole("tablist").getAttribute("data-slot")).toBe(
        "list",
      );
      const triggers = screen.getAllByRole("tab");
      for (const trigger of triggers) {
        expect(trigger.getAttribute("data-slot")).toBe("trigger");
      }
      expect(container.querySelectorAll('[data-slot="content"]').length).toBe(
        3,
      );
    });
  });
});
