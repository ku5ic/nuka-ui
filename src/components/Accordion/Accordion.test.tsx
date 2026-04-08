import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

function renderSingleAccordion(
  props: Omit<
    Partial<
      Extract<React.ComponentProps<typeof Accordion>, { type: "single" }>
    >,
    "type"
  > = {},
) {
  return render(
    <Accordion type="single" {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content 3</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

function renderMultipleAccordion(
  props: Omit<
    Partial<
      Extract<React.ComponentProps<typeof Accordion>, { type: "multiple" }>
    >,
    "type"
  > = {},
) {
  return render(
    <Accordion type="multiple" {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content 3</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

describe("Accordion", () => {
  describe("rendering", () => {
    it("renders all items", () => {
      renderSingleAccordion();
      expect(
        screen.getByRole("button", { name: "Section 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Section 2" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Section 3" }),
      ).toBeInTheDocument();
    });

    it("sets displayName correctly", () => {
      expect(Accordion.displayName).toBe("Accordion");
      expect(AccordionItem.displayName).toBe("AccordionItem");
      expect(AccordionTrigger.displayName).toBe("AccordionTrigger");
      expect(AccordionContent.displayName).toBe("AccordionContent");
    });

    it("wraps trigger in h3 heading by default", () => {
      renderSingleAccordion();
      const heading = screen.getByRole("heading", {
        name: "Section 1",
        level: 3,
      });
      expect(heading).toBeInTheDocument();
    });

    it("respects custom headingLevel", () => {
      renderSingleAccordion({ headingLevel: "h2" });
      const heading = screen.getByRole("heading", {
        name: "Section 1",
        level: 2,
      });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("single mode", () => {
    it("starts with all items closed by default", () => {
      renderSingleAccordion();
      const triggers = screen.getAllByRole("button");
      for (const trigger of triggers) {
        expect(trigger).toHaveAttribute("aria-expanded", "false");
      }
    });

    it("opens an item on click", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "true");
    });

    it("closes previous item when opening another", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger2 = screen.getByRole("button", { name: "Section 2" });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger2);
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });

    it("does not close open item when clicked again (collapsible=false)", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });

      await user.click(trigger1);
      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "true");
    });

    it("closes open item when clicked again with collapsible=true", async () => {
      const user = userEvent.setup();
      renderSingleAccordion({ collapsible: true });
      const trigger1 = screen.getByRole("button", { name: "Section 1" });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
    });

    it("opens with defaultValue", () => {
      renderSingleAccordion({ defaultValue: "item-2" });
      expect(screen.getByRole("button", { name: "Section 2" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  describe("single mode controlled", () => {
    it("respects controlled value", () => {
      const { rerender } = render(
        <Accordion type="single" value="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );

      rerender(
        <Accordion type="single" value="item-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(screen.getByRole("button", { name: "Section 2" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("calls onValueChange when a trigger is clicked", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Accordion type="single" value="" onValueChange={onValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      await user.click(screen.getByRole("button", { name: "Section 1" }));
      expect(onValueChange).toHaveBeenCalledWith("item-1");
    });
  });

  describe("multiple mode", () => {
    it("allows multiple items open simultaneously", async () => {
      const user = userEvent.setup();
      renderMultipleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger2 = screen.getByRole("button", { name: "Section 2" });

      await user.click(trigger1);
      await user.click(trigger2);

      expect(trigger1).toHaveAttribute("aria-expanded", "true");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });

    it("closes individual items on click", async () => {
      const user = userEvent.setup();
      renderMultipleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("aria-expanded", "false");
    });

    it("opens with defaultValue array", () => {
      renderMultipleAccordion({
        defaultValue: ["item-1", "item-3"],
      });

      expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
      expect(screen.getByRole("button", { name: "Section 2" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      expect(screen.getByRole("button", { name: "Section 3" })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });
  });

  describe("multiple mode controlled", () => {
    it("calls onValueChange with updated array", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Accordion type="multiple" value={[]} onValueChange={onValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      await user.click(screen.getByRole("button", { name: "Section 1" }));
      expect(onValueChange).toHaveBeenCalledWith(["item-1"]);
    });
  });

  describe("disabled state", () => {
    it("disables individual items", () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      expect(screen.getByRole("button", { name: "Section 1" })).toBeDisabled();
      expect(
        screen.getByRole("button", { name: "Section 2" }),
      ).not.toBeDisabled();
    });

    it("does not toggle disabled items on click", async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      await user.click(screen.getByRole("button", { name: "Section 1" }));
      expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  describe("keyboard navigation", () => {
    it("moves focus down with ArrowDown", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger2 = screen.getByRole("button", { name: "Section 2" });

      trigger1.focus();
      await user.keyboard("{ArrowDown}");
      expect(trigger2).toHaveFocus();
    });

    it("moves focus up with ArrowUp", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger2 = screen.getByRole("button", { name: "Section 2" });

      trigger2.focus();
      await user.keyboard("{ArrowUp}");
      expect(trigger1).toHaveFocus();
    });

    it("wraps focus from last to first with ArrowDown", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger3 = screen.getByRole("button", { name: "Section 3" });

      trigger3.focus();
      await user.keyboard("{ArrowDown}");
      expect(trigger1).toHaveFocus();
    });

    it("wraps focus from first to last with ArrowUp", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger3 = screen.getByRole("button", { name: "Section 3" });

      trigger1.focus();
      await user.keyboard("{ArrowUp}");
      expect(trigger3).toHaveFocus();
    });

    it("moves focus to first with Home", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger3 = screen.getByRole("button", { name: "Section 3" });

      trigger3.focus();
      await user.keyboard("{Home}");
      expect(trigger1).toHaveFocus();
    });

    it("moves focus to last with End", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });
      const trigger3 = screen.getByRole("button", { name: "Section 3" });

      trigger1.focus();
      await user.keyboard("{End}");
      expect(trigger3).toHaveFocus();
    });
  });

  describe("data-state attribute", () => {
    it("sets data-state on trigger", async () => {
      const user = userEvent.setup();
      renderSingleAccordion();
      const trigger1 = screen.getByRole("button", { name: "Section 1" });

      expect(trigger1).toHaveAttribute("data-state", "closed");

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute("data-state", "open");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to Accordion root", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Accordion ref={ref} type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to AccordionItem", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Accordion type="single">
          <AccordionItem ref={ref} value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to AccordionTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger ref={ref}>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref to AccordionContent", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent ref={ref}>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("className merging", () => {
    it("merges className on AccordionItem", () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" data-testid="item" className="mt-4">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );
      expect(screen.getByTestId("item").className).toContain("mt-4");
    });
  });
});
