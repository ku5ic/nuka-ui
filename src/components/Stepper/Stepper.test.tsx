import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
} from "./Stepper";

function renderStepper({
  currentStep = 1,
  onStepClick,
  orientation,
}: {
  currentStep?: number;
  onStepClick?: (step: number) => void;
  orientation?: "horizontal" | "vertical";
} = {}) {
  const optionalProps: Record<string, unknown> = {};
  if (onStepClick !== undefined) optionalProps.onStepClick = onStepClick;
  if (orientation !== undefined) optionalProps.orientation = orientation;

  return render(
    <Stepper currentStep={currentStep} {...optionalProps}>
      <StepperItem step={0}>
        <StepperIndicator />
        <StepperContent>
          <StepperTitle>Account</StepperTitle>
          <StepperDescription>Create your account</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem step={1}>
        <StepperIndicator />
        <StepperContent>
          <StepperTitle>Profile</StepperTitle>
        </StepperContent>
      </StepperItem>
      <StepperItem step={2}>
        <StepperIndicator />
        <StepperContent>
          <StepperTitle>Review</StepperTitle>
        </StepperContent>
      </StepperItem>
    </Stepper>,
  );
}

describe("Stepper", () => {
  describe("rendering", () => {
    it("renders as a nav with aria-label", () => {
      renderStepper();
      const nav = screen.getByRole("navigation", { name: "Progress" });
      expect(nav).toBeInTheDocument();
    });

    it("renders an ordered list", () => {
      renderStepper();
      expect(screen.getByRole("list")).toBeInstanceOf(HTMLOListElement);
    });

    it("renders all step items", () => {
      renderStepper();
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("allows custom aria-label", () => {
      render(
        <Stepper currentStep={0} aria-label="Setup wizard">
          <StepperItem step={0}>
            <StepperIndicator />
          </StepperItem>
        </Stepper>,
      );
      expect(
        screen.getByRole("navigation", { name: "Setup wizard" }),
      ).toBeInTheDocument();
    });

    it("sets displayName on all sub-components", () => {
      expect(Stepper.displayName).toBe("Stepper");
      expect(StepperItem.displayName).toBe("StepperItem");
      expect(StepperIndicator.displayName).toBe("StepperIndicator");
      expect(StepperContent.displayName).toBe("StepperContent");
      expect(StepperTitle.displayName).toBe("StepperTitle");
      expect(StepperDescription.displayName).toBe("StepperDescription");
    });
  });

  describe("state inference", () => {
    it("marks steps before currentStep as completed", () => {
      const { container } = renderStepper({ currentStep: 2 });
      const indicators = container.querySelectorAll(
        ".bg-\\(--nuka-accent-bg\\)",
      );
      expect(indicators.length).toBeGreaterThanOrEqual(2);
    });

    it("sets aria-current=step on the current step only", () => {
      renderStepper({ currentStep: 1 });
      const items = screen.getAllByRole("listitem");
      expect(items[0]).not.toHaveAttribute("aria-current");
      expect(items[1]).toHaveAttribute("aria-current", "step");
      expect(items[2]).not.toHaveAttribute("aria-current");
    });

    it("shows step number for current step", () => {
      renderStepper({ currentStep: 1 });
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("shows step number for upcoming step", () => {
      renderStepper({ currentStep: 0 });
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("explicit state override", () => {
    it("allows marking a step as error regardless of currentStep", () => {
      const { container } = render(
        <Stepper currentStep={2}>
          <StepperItem step={0}>
            <StepperIndicator />
          </StepperItem>
          <StepperItem step={1} state="error">
            <StepperIndicator />
          </StepperItem>
          <StepperItem step={2}>
            <StepperIndicator />
          </StepperItem>
        </Stepper>,
      );
      const errorIndicator = container.querySelector(
        ".bg-\\(--nuka-danger-base\\)",
      );
      expect(errorIndicator).toBeInTheDocument();
    });
  });

  describe("interactive steps", () => {
    it("calls onStepClick when clicking a completed step", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderStepper({ currentStep: 2, onStepClick: handleClick });

      const completedButtons = screen.getAllByRole("button", {
        name: /Go to step/,
      });
      await user.click(completedButtons[0]!);
      expect(handleClick).toHaveBeenCalledWith(0);
    });

    it("does not call onStepClick when clicking the current step", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderStepper({ currentStep: 1, onStepClick: handleClick });

      const currentItem = screen.getByText("Profile").closest("li")!;
      await user.click(currentItem);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onStepClick when clicking an upcoming step", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderStepper({ currentStep: 1, onStepClick: handleClick });

      const upcomingItem = screen.getByText("Review").closest("li")!;
      await user.click(upcomingItem);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onStepClick when step is disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Stepper currentStep={2} onStepClick={handleClick}>
          <StepperItem step={0} disabled>
            <StepperIndicator />
          </StepperItem>
          <StepperItem step={1}>
            <StepperIndicator />
          </StepperItem>
          <StepperItem step={2}>
            <StepperIndicator />
          </StepperItem>
        </Stepper>,
      );

      const items = screen.getAllByRole("listitem");
      await user.click(items[0]!);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles Enter key on completed step", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      renderStepper({ currentStep: 2, onStepClick: handleClick });

      const buttons = screen.getAllByRole("button", { name: /Go to step/ });
      await user.tab();
      buttons[0]!.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledWith(0);
    });
  });

  describe("connector line", () => {
    it("applies accent color for completed segments", () => {
      const { container } = renderStepper({ currentStep: 2 });
      const connectorItems = container.querySelectorAll(
        "li[role='presentation']",
      );
      expect(connectorItems.length).toBe(2);

      const firstConnectorLine = connectorItems[0]!.querySelector("div");
      expect(firstConnectorLine!.className).toContain("bg-(--nuka-accent-bg)");
    });

    it("applies base border color for upcoming segments", () => {
      const { container } = renderStepper({ currentStep: 0 });
      const connectorItems = container.querySelectorAll(
        "li[role='presentation']",
      );
      const firstConnectorLine = connectorItems[0]!.querySelector("div");
      expect(firstConnectorLine!.className).toContain(
        "bg-(--nuka-border-base)",
      );
    });

    it("renders horizontal connectors between items, not inside them", () => {
      const { container } = renderStepper({ currentStep: 1 });
      const ol = container.querySelector("ol")!;
      const directChildren = Array.from(ol.children);
      expect(directChildren).toHaveLength(5);
      expect(directChildren[0]!.getAttribute("role")).not.toBe("presentation");
      expect(directChildren[1]!.getAttribute("role")).toBe("presentation");
      expect(directChildren[2]!.getAttribute("role")).not.toBe("presentation");
      expect(directChildren[3]!.getAttribute("role")).toBe("presentation");
      expect(directChildren[4]!.getAttribute("role")).not.toBe("presentation");
    });

    it("renders vertical connectors inside StepperItem after indicator", () => {
      const { container } = render(
        <Stepper currentStep={1} orientation="vertical">
          <StepperItem step={0}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>First</StepperTitle>
            </StepperContent>
          </StepperItem>
          <StepperItem step={1}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Second</StepperTitle>
            </StepperContent>
          </StepperItem>
          <StepperItem step={2}>
            <StepperIndicator />
            <StepperContent>
              <StepperTitle>Third</StepperTitle>
            </StepperContent>
          </StepperItem>
        </Stepper>,
      );

      const ol = container.querySelector("ol")!;
      const items = Array.from(ol.children);
      expect(items).toHaveLength(3);
      expect(
        items.filter((el) => el.getAttribute("role") === "presentation"),
      ).toHaveLength(0);

      const firstItem = items[0]!;
      const connectorLine = firstItem.querySelector(
        ".w-px.flex-1.group-last\\:hidden",
      );
      expect(connectorLine).toBeInTheDocument();

      const lastItem = items[2]!;
      const lastConnector = lastItem.querySelector(
        ".w-px.flex-1.group-last\\:hidden",
      );
      expect(lastConnector).toBeInTheDocument();
    });
  });

  describe("title and description", () => {
    it("renders title text", () => {
      renderStepper();
      expect(screen.getByText("Account")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Review")).toBeInTheDocument();
    });

    it("renders description text", () => {
      renderStepper();
      expect(screen.getByText("Create your account")).toBeInTheDocument();
    });
  });

  describe("orientation", () => {
    it("applies horizontal layout by default", () => {
      renderStepper();
      const ol = screen.getByRole("list");
      expect(ol.className).toContain("flex-row");
    });

    it("applies vertical layout when specified", () => {
      renderStepper({ orientation: "vertical" });
      const ol = screen.getByRole("list");
      expect(ol.className).toContain("flex-col");
    });
  });

  describe("className override", () => {
    it("merges consumer className on Stepper", () => {
      render(
        <Stepper currentStep={0} className="mt-8">
          <StepperItem step={0}>
            <StepperIndicator />
          </StepperItem>
        </Stepper>,
      );
      const nav = screen.getByRole("navigation", { name: "Progress" });
      expect(nav.className).toContain("mt-8");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on Stepper", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Stepper ref={ref} currentStep={0}>
          <StepperItem step={0}>
            <StepperIndicator />
          </StepperItem>
        </Stepper>,
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("forwards ref on StepperItem", () => {
      const ref = React.createRef<HTMLLIElement>();
      render(
        <Stepper currentStep={0}>
          <StepperItem ref={ref} step={0}>
            <StepperIndicator />
          </StepperItem>
        </Stepper>,
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });
  });
});
