import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import type * as FloatingUI from "@floating-ui/react";
import { Popover } from "@nuka/components/Popover/Popover";
import { PopoverTrigger } from "@nuka/components/Popover/PopoverTrigger";
import { PopoverContent } from "@nuka/components/Popover/PopoverContent";

vi.mock("@floating-ui/react", async () => {
  const actual = await vi.importActual<typeof FloatingUI>("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

describe("Popover", () => {
  it("does not render content on initial render", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens content on click and closes on second click", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders trigger with aria-expanded=false initially and true when open", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has aria-controls on trigger matching content id", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog");
    expect(trigger.getAttribute("aria-controls")).toBe(dialog.id);
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent aria-label="Details">Panel content</PopoverContent>
        </Popover>
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange on open and close", async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    await user.keyboard("{Escape}");
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("respects controlled open prop", () => {
    const { rerender } = render(
      <Popover open={true}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    rerender(
      <Popover open={false}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders content with role=dialog", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Panel content");
  });

  it("moves focus into content on open", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">
          <button type="button">Inside</button>
        </PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    // Wait for rAF focus management
    await vi.waitFor(() => {
      expect(screen.getByRole("button", { name: "Inside" })).toHaveFocus();
    });
  });

  it("focuses the panel itself when no focusable child exists", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">No focusable children here</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    await vi.waitFor(() => {
      expect(screen.getByRole("dialog")).toHaveFocus();
    });
  });

  it("merges className on PopoverContent", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Details" className="custom-class">Panel content</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveClass("custom-class");
  });

  it("forwards ref on PopoverTrigger", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Popover>
        <PopoverTrigger ref={ref}>Open</PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("forwards ref on PopoverContent", async () => {
    const user = userEvent.setup();
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent ref={ref} aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports asChild on PopoverTrigger", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Custom trigger</button>
        </PopoverTrigger>
        <PopoverContent aria-label="Details">Panel content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Custom trigger" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
