import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMenuNavigation } from "@nuka/utils/use-menu-navigation";

function TestMenu({ onEscape, onTab }: { onEscape?: () => void; onTab?: () => void }) {
  const { getItemProps } = useMenuNavigation({ onEscape, onTab });

  return React.createElement("div", { role: "menu" },
    React.createElement("div", { ...getItemProps(0), role: "menuitem" }, "Alpha"),
    React.createElement("div", { ...getItemProps(1), role: "menuitem" }, "Beta"),
    React.createElement("div", { ...getItemProps(2), role: "menuitem" }, "Charlie"),
    React.createElement("div", { ...getItemProps(3), role: "menuitem", "aria-disabled": "true" }, "Delta"),
  );
}

describe("useMenuNavigation", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  describe("arrow key navigation", () => {
    it("moves focus down on ArrowDown", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(items[1]);
    });

    it("moves focus up on ArrowUp", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[1]!.focus();
      await user.keyboard("{ArrowUp}");
      expect(document.activeElement).toBe(items[0]);
    });

    it("wraps from last to first on ArrowDown", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[3]!.focus();
      await user.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(items[0]);
    });

    it("wraps from first to last on ArrowUp", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("{ArrowUp}");
      expect(document.activeElement).toBe(items[3]);
    });

    it("includes disabled items in arrow navigation", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[2]!.focus();
      await user.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(items[3]);
    });
  });

  describe("Home and End", () => {
    it("focuses first item on Home", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[2]!.focus();
      await user.keyboard("{Home}");
      expect(document.activeElement).toBe(items[0]);
    });

    it("focuses last item on End", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("{End}");
      expect(document.activeElement).toBe(items[3]);
    });
  });

  describe("Escape and Tab", () => {
    it("calls onEscape on Escape key", async () => {
      const onEscape = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu, { onEscape }));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("{Escape}");
      expect(onEscape).toHaveBeenCalledTimes(1);
    });

    it("calls onTab on Tab key", async () => {
      const onTab = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu, { onTab }));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("{Tab}");
      expect(onTab).toHaveBeenCalledTimes(1);
    });
  });

  describe("type-ahead", () => {
    it("focuses item matching typed character", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("c");
      expect(document.activeElement).toBe(items[2]);
    });

    it("focuses item matching multi-character buffer", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("de");
      expect(document.activeElement).toBe(items[3]);
    });

    it("resets buffer after 500ms", async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(React.createElement(TestMenu));
      const items = screen.getAllByRole("menuitem");
      items[0]!.focus();
      await user.keyboard("c");
      expect(document.activeElement).toBe(items[2]);
      vi.advanceTimersByTime(600);
      await user.keyboard("a");
      expect(document.activeElement).toBe(items[0]);
    });
  });
});
