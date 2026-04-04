import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";
import { FormField } from "@vault/components/FormField";

function noop() { /* empty */ }

describe("Switch", () => {
  describe("rendering", () => {
    it("renders a button with type=button and role=switch", () => {
      render(<Switch aria-label="Toggle" />);
      const el = screen.getByRole("switch", { name: "Toggle" });
      expect(el).toBeInTheDocument();
      expect(el.tagName).toBe("BUTTON");
      expect(el).toHaveAttribute("type", "button");
    });

    it("aria-checked=false when unchecked", () => {
      render(<Switch aria-label="Toggle" />);
      expect(screen.getByRole("switch", { name: "Toggle" })).toHaveAttribute("aria-checked", "false");
    });

    it("aria-checked=true when checked", () => {
      render(<Switch checked onChange={noop} aria-label="Toggle" />);
      expect(screen.getByRole("switch", { name: "Toggle" })).toHaveAttribute("aria-checked", "true");
    });

    it("renders children as label text", () => {
      render(<Switch>Dark mode</Switch>);
      expect(screen.getByText("Dark mode")).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Switch.displayName).toBe("Switch");
    });
  });

  describe("controlled", () => {
    it("checked prop drives aria-checked", () => {
      const { rerender } = render(<Switch checked onChange={noop} aria-label="Toggle" />);
      expect(screen.getByRole("switch", { name: "Toggle" })).toHaveAttribute("aria-checked", "true");
      rerender(<Switch checked={false} onChange={noop} aria-label="Toggle" />);
      expect(screen.getByRole("switch", { name: "Toggle" })).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("uncontrolled", () => {
    it("defaultChecked sets initial state", () => {
      render(<Switch defaultChecked aria-label="Toggle" />);
      expect(screen.getByRole("switch", { name: "Toggle" })).toHaveAttribute("aria-checked", "true");
    });

    it("clicking toggles the switch", async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Toggle" />);
      const el = screen.getByRole("switch", { name: "Toggle" });
      expect(el).toHaveAttribute("aria-checked", "false");
      await user.click(el);
      expect(el).toHaveAttribute("aria-checked", "true");
      await user.click(el);
      expect(el).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("onChange", () => {
    it("called with true when toggled on", async () => {
      const user = userEvent.setup();
      let lastValue: boolean | undefined;
      render(<Switch aria-label="Toggle" onChange={(v) => { lastValue = v; }} />);
      await user.click(screen.getByRole("switch", { name: "Toggle" }));
      expect(lastValue).toBe(true);
    });

    it("called with false when toggled off", async () => {
      const user = userEvent.setup();
      let lastValue: boolean | undefined;
      render(<Switch defaultChecked aria-label="Toggle" onChange={(v) => { lastValue = v; }} />);
      await user.click(screen.getByRole("switch", { name: "Toggle" }));
      expect(lastValue).toBe(false);
    });
  });

  describe("keyboard", () => {
    it("Space key toggles the switch", async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Toggle" />);
      const el = screen.getByRole("switch", { name: "Toggle" });
      el.focus();
      await user.keyboard(" ");
      expect(el).toHaveAttribute("aria-checked", "true");
    });

    it("Enter key toggles the switch", async () => {
      const user = userEvent.setup();
      render(<Switch aria-label="Toggle" />);
      const el = screen.getByRole("switch", { name: "Toggle" });
      el.focus();
      await user.keyboard("{Enter}");
      expect(el).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("disabled", () => {
    it("prevents toggle and applies disabled attribute", async () => {
      const user = userEvent.setup();
      let called = false;
      render(<Switch disabled aria-label="Toggle" onChange={() => { called = true; }} />);
      const el = screen.getByRole("switch", { name: "Toggle" });
      expect(el).toBeDisabled();
      await user.click(el);
      expect(called).toBe(false);
    });
  });

  describe("focus ring", () => {
    it("has focus-visible outline classes on the button", () => {
      render(<Switch aria-label="Toggle" />);
      const el = screen.getByRole("switch", { name: "Toggle" });
      expect(el.className).toContain("focus-visible:outline-2");
      expect(el.className).toContain("focus-visible:outline-[var(--vault-border-focus)]");
    });
  });

  describe("className override", () => {
    it("merges consumer className correctly", () => {
      render(<Switch className="mt-4" aria-label="Toggle" />);
      const el = screen.getByRole("switch", { name: "Toggle" });
      expect(el.className).toContain("mt-4");
      expect(el.className).toContain("rounded-full");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to HTMLButtonElement", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Switch ref={ref} aria-label="Toggle" />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("FormField integration", () => {
    it("applies aria-describedby from FormFieldContext", () => {
      render(
        <FormField id="dark-mode" hint="Enables dark theme">
          <Switch aria-label="Dark mode" />
        </FormField>,
      );
      expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("dark-mode-hint"),
      );
    });

    it("applies id from FormFieldContext", () => {
      render(
        <FormField id="dark-mode">
          <Switch aria-label="Dark mode" />
        </FormField>,
      );
      expect(screen.getByRole("switch", { name: "Dark mode" })).toHaveAttribute("id", "dark-mode");
    });

    it("does not apply aria-invalid", () => {
      render(
        <FormField id="dark-mode" error="Something went wrong">
          <Switch aria-label="Dark mode" />
        </FormField>,
      );
      expect(screen.getByRole("switch", { name: "Dark mode" })).not.toHaveAttribute("aria-invalid");
    });
  });
});
