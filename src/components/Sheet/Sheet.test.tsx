import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { __resetScrollLock } from "@nuka/utils/use-scroll-lock";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./Sheet";

beforeEach(() => {
  __resetScrollLock();
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});

function renderSheet(
  props: Partial<React.ComponentProps<typeof Sheet>> = {},
  contentProps: Partial<React.ComponentProps<typeof SheetContent>> = {},
) {
  return render(
    <Sheet {...props}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent {...contentProps}>
        <SheetTitle>Title</SheetTitle>
        <SheetDescription>Description</SheetDescription>
        <button type="button">Action</button>
        <SheetClose asChild>
          <button type="button">Cancel</button>
        </SheetClose>
      </SheetContent>
    </Sheet>,
  );
}

describe("Sheet", () => {
  describe("rendering", () => {
    it("does not render content when closed", () => {
      renderSheet();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders content when open", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("sets role=dialog and aria-modal=true", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    it("sets aria-labelledby pointing to title", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      const labelledBy = dialog.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy!)).toHaveTextContent("Title");
    });

    it("sets aria-describedby when SheetDescription is present", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      const describedBy = dialog.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent(
        "Description",
      );
    });
  });

  describe("side variants", () => {
    it("defaults to right side", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("right-0");
      expect(dialog.className).toContain("inset-y-0");
    });

    it("applies left side classes", async () => {
      const user = userEvent.setup();
      renderSheet({}, { side: "left" });

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("left-0");
      expect(dialog.className).toContain("inset-y-0");
    });

    it("applies top side classes", async () => {
      const user = userEvent.setup();
      renderSheet({}, { side: "top" });

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("top-0");
      expect(dialog.className).toContain("inset-x-0");
    });

    it("applies bottom side classes", async () => {
      const user = userEvent.setup();
      renderSheet({}, { side: "bottom" });

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog.className).toContain("bottom-0");
      expect(dialog.className).toContain("inset-x-0");
    });
  });

  describe("trigger", () => {
    it("has aria-haspopup=dialog", () => {
      renderSheet();
      expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
        "aria-haspopup",
        "dialog",
      );
    });

    it("has aria-expanded reflecting open state", async () => {
      const user = userEvent.setup();
      renderSheet();

      const trigger = screen.getByRole("button", { name: "Open" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("supports asChild", () => {
      render(
        <Sheet>
          <SheetTrigger asChild>
            <a href="#open">Open link</a>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>,
      );

      const trigger = screen.getByRole("link", { name: "Open link" });
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });
  });

  describe("close behavior", () => {
    it("closes on Escape", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes on backdrop click", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const backdrop = document.querySelector("[aria-hidden='true']");
      await user.click(backdrop!);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes on DismissButton click", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.click(screen.getByRole("button", { name: "Close sheet" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes on SheetClose asChild click", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("controlled", () => {
    it("respects controlled open prop", () => {
      render(
        <Sheet open onOpenChange={vi.fn()}>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("calls onOpenChange when closing", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <Sheet open onOpenChange={onOpenChange}>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>,
      );

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("focus management", () => {
    it("moves focus into sheet on open", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));

      await act(async () => {
        await new Promise((r) => requestAnimationFrame(r));
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.contains(document.activeElement)).toBe(true);
    });

    it("returns focus to trigger on close", async () => {
      const user = userEvent.setup();
      renderSheet();

      const trigger = screen.getByRole("button", { name: "Open" });
      await user.click(trigger);

      await act(async () => {
        await new Promise((r) => requestAnimationFrame(r));
      });

      await user.keyboard("{Escape}");
      expect(trigger).toHaveFocus();
    });
  });

  describe("scroll lock", () => {
    it("locks body scroll when open", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body scroll on close", async () => {
      const user = userEvent.setup();
      renderSheet();

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.keyboard("{Escape}");
      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("className override", () => {
    it("allows className on SheetContent", async () => {
      const user = userEvent.setup();
      renderSheet({}, { className: "custom-content" });

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByRole("dialog")).toHaveClass("custom-content");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to SheetTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Sheet>
          <SheetTrigger ref={ref}>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref to SheetContent", async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent ref={ref}>
            <SheetTitle>Title</SheetTitle>
          </SheetContent>
        </Sheet>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to SheetTitle", async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLElement>();
      render(
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetTitle ref={ref}>Title</SheetTitle>
          </SheetContent>
        </Sheet>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });
});
