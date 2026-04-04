import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Tooltip } from "@nuka/components/Tooltip/Tooltip";
import { TooltipTrigger } from "@nuka/components/Tooltip/TooltipTrigger";
import { TooltipContent } from "@nuka/components/Tooltip/TooltipContent";

vi.mock("@floating-ui/react", async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await vi.importActual<typeof import("@floating-ui/react")>("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

describe("Tooltip", () => {
  it("does not render content on initial render", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("renders trigger with aria-describedby pointing to tooltip id", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);

    const tooltip = screen.getByRole("tooltip");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("shows tooltip on hover and hides on unhover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on focus and hides on blur", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Focus me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Focus me" });
    await user.tab();
    expect(trigger).toHaveFocus();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.tab();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("closes tooltip on Escape key", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("calls onOpenChange with correct values", async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Tooltip delay={0} onOpenChange={handleOpenChange}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    await user.unhover(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("respects controlled open prop", () => {
    const { rerender } = render(
      <Tooltip open={true}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    rerender(
      <Tooltip open={false}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("renders content with role=tooltip", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Hover me" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text");
  });

  it("merges className on TooltipContent", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent className="custom-class">Tooltip text</TooltipContent>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Hover me" }));
    expect(screen.getByRole("tooltip")).toHaveClass("custom-class");
  });

  it("forwards ref on TooltipTrigger", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Tooltip>
        <TooltipTrigger ref={ref}>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports asChild on TooltipTrigger", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger asChild>
          <a href="#test">Link trigger</a>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("link", { name: "Link trigger" });

    await user.hover(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-describedby");
  });

  it("renders content with pointer-events-none", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Hover me" }));
    expect(screen.getByRole("tooltip")).toHaveClass("pointer-events-none");
  });
});
