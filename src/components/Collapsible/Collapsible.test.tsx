import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";

function renderCollapsible(props: React.ComponentProps<typeof Collapsible> = {}) {
  return render(
    <Collapsible {...props}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>,
  );
}

describe("Collapsible", () => {
  describe("rendering", () => {
    it("renders a div element", () => {
      renderCollapsible({ "data-testid": "root" } as Record<string, unknown>);
      expect(screen.getByTestId("root").tagName).toBe("DIV");
    });

    it("sets displayName correctly", () => {
      expect(Collapsible.displayName).toBe("Collapsible");
      expect(CollapsibleTrigger.displayName).toBe("CollapsibleTrigger");
      expect(CollapsibleContent.displayName).toBe("CollapsibleContent");
    });
  });

  describe("uncontrolled behavior", () => {
    it("starts closed by default", () => {
      renderCollapsible();
      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByText("Content").closest("[role='region']"))
        .toHaveAttribute("aria-hidden", "true");
    });

    it("starts open when defaultOpen is true", () => {
      renderCollapsible({ defaultOpen: true });
      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("toggles open and closed on click", async () => {
      const user = userEvent.setup();
      renderCollapsible();
      const trigger = screen.getByRole("button", { name: "Toggle" });

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("controlled behavior", () => {
    it("respects controlled open prop", () => {
      const { rerender } = render(
        <Collapsible open={false}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );
      expect(screen.getByRole("button", { name: "Toggle" }))
        .toHaveAttribute("aria-expanded", "false");

      rerender(
        <Collapsible open={true}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );
      expect(screen.getByRole("button", { name: "Toggle" }))
        .toHaveAttribute("aria-expanded", "true");
    });

    it("calls onOpenChange when trigger is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <Collapsible open={false} onOpenChange={onOpenChange}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );

      await user.click(screen.getByRole("button", { name: "Toggle" }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("disabled state", () => {
    it("disables the trigger when disabled is true", () => {
      renderCollapsible({ disabled: true });
      expect(screen.getByRole("button", { name: "Toggle" })).toBeDisabled();
    });

    it("does not toggle when disabled", async () => {
      const user = userEvent.setup();
      renderCollapsible({ disabled: true });
      const trigger = screen.getByRole("button", { name: "Toggle" });

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("accessibility", () => {
    it("trigger has aria-controls pointing to content id", () => {
      renderCollapsible();
      const trigger = screen.getByRole("button", { name: "Toggle" });
      const controlsId = trigger.getAttribute("aria-controls");
      expect(controlsId).toBeTruthy();
      const content = document.getElementById(controlsId!);
      expect(content).toBeTruthy();
      expect(content).toHaveAttribute("role", "region");
    });

    it("content has aria-hidden=true when closed", () => {
      renderCollapsible();
      const region = screen.getByRole("region", { hidden: true });
      expect(region).toHaveAttribute("aria-hidden", "true");
    });

    it("content has aria-hidden=false when open", () => {
      renderCollapsible({ defaultOpen: true });
      const region = screen.getByRole("region");
      expect(region).toHaveAttribute("aria-hidden", "false");
    });

    it("trigger is a button with type=button", () => {
      renderCollapsible();
      const trigger = screen.getByRole("button", { name: "Toggle" });
      expect(trigger).toHaveAttribute("type", "button");
    });
  });

  describe("data-state attribute", () => {
    it("sets data-state=closed on trigger and content when closed", () => {
      renderCollapsible();
      const trigger = screen.getByRole("button", { name: "Toggle" });
      const region = screen.getByRole("region", { hidden: true });
      expect(trigger).toHaveAttribute("data-state", "closed");
      expect(region).toHaveAttribute("data-state", "closed");
    });

    it("sets data-state=open on trigger and content when open", () => {
      renderCollapsible({ defaultOpen: true });
      const trigger = screen.getByRole("button", { name: "Toggle" });
      const region = screen.getByRole("region");
      expect(trigger).toHaveAttribute("data-state", "open");
      expect(region).toHaveAttribute("data-state", "open");
    });
  });

  describe("asChild", () => {
    it("renders trigger as child element when asChild is true", () => {
      render(
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div data-testid="custom-trigger" role="button" tabIndex={0}>
              Toggle
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );
      const trigger = screen.getByTestId("custom-trigger");
      expect(trigger.tagName).toBe("DIV");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to Collapsible root", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Collapsible ref={ref}>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to CollapsibleTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Collapsible>
          <CollapsibleTrigger ref={ref}>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref to CollapsibleContent", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Collapsible>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent ref={ref}>Content</CollapsibleContent>
        </Collapsible>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("className merging", () => {
    it("merges className on Collapsible root", () => {
      render(
        <Collapsible data-testid="root" className="mt-4">
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );
      expect(screen.getByTestId("root").className).toContain("mt-4");
    });

    it("merges className on CollapsibleContent", () => {
      render(
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent className="p-4">Content</CollapsibleContent>
        </Collapsible>,
      );
      const region = screen.getByRole("region");
      expect(region.className).toContain("p-4");
      expect(region.className).toContain("grid");
    });
  });
});
