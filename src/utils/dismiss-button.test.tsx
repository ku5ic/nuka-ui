import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DismissButton } from "@nuka/utils/dismiss-button";

describe("DismissButton", () => {
  it("renders a button with type='button'", () => {
    render(<DismissButton onClick={vi.fn()} />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(button).toHaveAttribute("type", "button");
  });

  it("has default aria-label of 'Dismiss'", () => {
    render(<DismissButton onClick={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("uses custom label as aria-label", () => {
    render(<DismissButton onClick={vi.fn()} label="Remove tag" />);
    expect(
      screen.getByRole("button", { name: "Remove tag" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<DismissButton onClick={handleClick} />);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders SVG with aria-hidden='true'", () => {
    render(<DismissButton onClick={vi.fn()} />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    const svg = button.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("applies className to the button element", () => {
    render(<DismissButton onClick={vi.fn()} className="ml-auto shrink-0" />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(button.className).toContain("ml-auto");
    expect(button.className).toContain("shrink-0");
  });

  it("includes focus ring classes", () => {
    render(<DismissButton onClick={vi.fn()} />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(button.className).toContain("focus-visible:outline-2");
    expect(button.className).toContain("focus-visible:outline-offset-2");
  });

  it("meets 24x24px minimum touch target", () => {
    render(<DismissButton onClick={vi.fn()} />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(button.className).toContain("min-w-6");
    expect(button.className).toContain("min-h-6");
  });

  it("meets 24x24px minimum touch target regardless of context", () => {
    render(<DismissButton onClick={vi.fn()} />);
    const button = screen.getByRole("button", { name: "Dismiss" });
    expect(button.className).toContain("min-w-6");
    expect(button.className).toContain("min-h-6");
  });
});
