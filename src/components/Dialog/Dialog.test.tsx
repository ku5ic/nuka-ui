import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { __resetScrollLock } from "@nuka/utils/use-scroll-lock";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";

beforeEach(() => {
  __resetScrollLock();
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});

function renderDialog(
  props: Partial<React.ComponentProps<typeof Dialog>> = {},
  contentProps: Partial<React.ComponentProps<typeof DialogContent>> = {},
) {
  return render(
    <Dialog {...props}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent {...contentProps}>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
        <button type="button">Action</button>
        <DialogClose asChild>
          <button type="button">Cancel</button>
        </DialogClose>
      </DialogContent>
    </Dialog>,
  );
}

describe("Dialog", () => {
  describe("rendering", () => {
    it("does not render content when closed", () => {
      renderDialog();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders content when open", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("sets role=dialog and aria-modal=true", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    it("sets aria-labelledby pointing to title", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      const labelledBy = dialog.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy!)).toHaveTextContent("Title");
    });

    it("sets aria-describedby when DialogDescription is present", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      const dialog = screen.getByRole("dialog");
      const describedBy = dialog.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy!)).toHaveTextContent(
        "Description",
      );
    });

    it("does not set aria-describedby when no DialogDescription", async () => {
      const user = userEvent.setup();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByRole("dialog")).not.toHaveAttribute(
        "aria-describedby",
      );
    });
  });

  describe("trigger", () => {
    it("has aria-haspopup=dialog", () => {
      renderDialog();
      expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
        "aria-haspopup",
        "dialog",
      );
    });

    it("has aria-expanded reflecting open state", async () => {
      const user = userEvent.setup();
      renderDialog();

      const trigger = screen.getByRole("button", { name: "Open" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("supports asChild", () => {
      render(
        <Dialog>
          <DialogTrigger asChild>
            <a href="#open">Open link</a>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      const trigger = screen.getByRole("link", { name: "Open link" });
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });
  });

  describe("close behavior", () => {
    it("closes on Escape", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes on backdrop click", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      const backdrop = document.querySelector("[aria-hidden='true']");
      expect(backdrop).toBeInTheDocument();
      await user.click(backdrop!);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes on DismissButton click", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.click(screen.getByRole("button", { name: "Close dialog" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes on DialogClose asChild click", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("controlled", () => {
    it("respects controlled open prop", () => {
      render(
        <Dialog open onOpenChange={vi.fn()}>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("calls onOpenChange when closing", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <Dialog open onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("focus management", () => {
    it("moves focus into dialog on open", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));

      await act(async () => {
        await new Promise((r) => requestAnimationFrame(r));
      });

      const dialog = screen.getByRole("dialog");
      expect(dialog.contains(document.activeElement)).toBe(true);
    });

    it("returns focus to trigger on close", async () => {
      const user = userEvent.setup();
      renderDialog();

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
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body scroll on close", async () => {
      const user = userEvent.setup();
      renderDialog();

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.keyboard("{Escape}");
      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("dev warnings", () => {
    it("logs error when DialogTitle is missing", async () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(vi.fn());

      render(
        <Dialog defaultOpen>
          <DialogContent>
            <p>No title here</p>
          </DialogContent>
        </Dialog>,
      );

      await act(async () => {
        await new Promise((r) => requestAnimationFrame(r));
      });

      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining("DialogTitle"),
      );
      consoleError.mockRestore();
    });
  });

  describe("className override", () => {
    it("allows className on DialogContent", async () => {
      const user = userEvent.setup();
      renderDialog({}, { className: "custom-content" });

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(screen.getByRole("dialog")).toHaveClass("custom-content");
    });

    it("allows className on DialogTrigger", () => {
      render(
        <Dialog>
          <DialogTrigger className="custom-trigger">Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );
      expect(screen.getByRole("button", { name: "Open" })).toHaveClass(
        "custom-trigger",
      );
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to DialogTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(
        <Dialog>
          <DialogTrigger ref={ref}>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref to DialogContent", async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent ref={ref}>
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to DialogTitle", async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLElement>();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle ref={ref}>Title</DialogTitle>
          </DialogContent>
        </Dialog>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it("forwards ref to DialogDescription", async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLElement>();
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription ref={ref}>Desc</DialogDescription>
          </DialogContent>
        </Dialog>,
      );

      await user.click(screen.getByRole("button", { name: "Open" }));
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });
});
