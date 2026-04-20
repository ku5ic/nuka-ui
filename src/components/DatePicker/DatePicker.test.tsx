import { describe, it, expect, vi } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import type * as FloatingUI from "@floating-ui/react";
import { DatePicker } from "@nuka/components/DatePicker/DatePicker";
import { DatePickerInput } from "@nuka/components/DatePicker/DatePickerInput";
import { DatePickerCalendar } from "@nuka/components/DatePicker/DatePickerCalendar";
import { FormField } from "@nuka/components/FormField";

vi.mock("@floating-ui/react", async () => {
  const actual = await vi.importActual<typeof FloatingUI>("@floating-ui/react");
  return {
    ...actual,
    autoUpdate: vi.fn(() => () => undefined),
  };
});

const dayLabelFmt = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const headerFmt = new Intl.DateTimeFormat(undefined, {
  month: "long",
  year: "numeric",
});

function dayLabel(year: number, month: number, day: number): string {
  return dayLabelFmt.format(new Date(year, month, day));
}

function monthHeader(year: number, month: number): string {
  return headerFmt.format(new Date(year, month, 1));
}

function dayLabelRegex(year: number, month: number, day: number): RegExp {
  return new RegExp(
    dayLabel(year, month, day).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
}

function renderDatePicker(
  props: {
    value?: Date;
    defaultValue?: Date;
    onValueChange?: (date: Date | undefined) => void;
    disabled?: boolean;
    min?: Date;
    max?: Date;
  } = {},
) {
  return render(
    <DatePicker {...props}>
      <DatePickerInput />
      <DatePickerCalendar />
    </DatePicker>,
  );
}

async function openCalendar(user: ReturnType<typeof userEvent.setup>) {
  const trigger = screen.getByRole("button", { name: "Open calendar" });
  await user.click(trigger);
}

describe("DatePicker", () => {
  describe("displayName", () => {
    it("has correct displayName on DatePicker", () => {
      expect(DatePicker.displayName).toBe("DatePicker");
    });

    it("has correct displayName on DatePickerInput", () => {
      expect(DatePickerInput.displayName).toBe("DatePickerInput");
    });

    it("has correct displayName on DatePickerCalendar", () => {
      expect(DatePickerCalendar.displayName).toBe("DatePickerCalendar");
    });
  });

  describe("rendering", () => {
    it("renders an input and calendar icon button", () => {
      renderDatePicker();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Open calendar" }),
      ).toBeInTheDocument();
    });

    it("renders input with placeholder", () => {
      render(
        <DatePicker>
          <DatePickerInput placeholder="Pick a date" />
          <DatePickerCalendar />
        </DatePicker>,
      );
      expect(screen.getByPlaceholderText("Pick a date")).toBeInTheDocument();
    });

    it("does not render calendar on initial render", () => {
      renderDatePicker();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("shows formatted date in input when value is provided", () => {
      renderDatePicker({ value: new Date(2026, 3, 12) });
      expect(screen.getByRole("textbox")).toHaveValue("2026-04-12");
    });

    it("shows formatted date in input when defaultValue is provided", () => {
      renderDatePicker({ defaultValue: new Date(2026, 0, 15) });
      expect(screen.getByRole("textbox")).toHaveValue("2026-01-15");
    });
  });

  describe("opening and closing", () => {
    it("opens calendar on icon button click", async () => {
      const user = userEvent.setup();
      renderDatePicker();

      await openCalendar(user);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("opens calendar on input click", async () => {
      const user = userEvent.setup();
      renderDatePicker();

      await user.click(screen.getByRole("textbox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("does not open calendar when tabbing to input", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button type="button">Before</button>
          <DatePicker>
            <DatePickerInput />
            <DatePickerCalendar />
          </DatePicker>
        </div>,
      );

      await user.click(screen.getByRole("button", { name: "Before" }));
      await user.tab();
      expect(screen.getByRole("textbox")).toHaveFocus();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes calendar on Escape", async () => {
      const user = userEvent.setup();
      renderDatePicker();

      await openCalendar(user);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("returns focus to icon button on Escape from calendar", async () => {
      const user = userEvent.setup();
      renderDatePicker({ defaultValue: new Date(2026, 3, 12) });

      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const focusedDay = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 12),
      });

      await vi.waitFor(() => {
        expect(focusedDay).toHaveFocus();
      });

      await user.keyboard("{Escape}");
      await vi.waitFor(() => {
        expect(
          screen.getByRole("button", { name: "Open calendar" }),
        ).toHaveFocus();
      });
    });

    it("Escape from input while calendar open closes calendar, keeps focus in input", async () => {
      const user = userEvent.setup();
      renderDatePicker();

      await user.click(screen.getByRole("textbox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("Tab from calendar closes calendar and focuses icon button", async () => {
      const user = userEvent.setup();
      renderDatePicker({ defaultValue: new Date(2026, 3, 12) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 12),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{Tab}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      await vi.waitFor(() => {
        expect(
          screen.getByRole("button", { name: "Open calendar" }),
        ).toHaveFocus();
      });
    });

    it("Tab from input while calendar open closes calendar", async () => {
      const user = userEvent.setup();
      renderDatePicker();

      await user.click(screen.getByRole("textbox"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.tab();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("toggles calendar on icon button click", async () => {
      const user = userEvent.setup();
      renderDatePicker();

      await openCalendar(user);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Open calendar" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("icon button has aria-expanded", async () => {
      const user = userEvent.setup();
      renderDatePicker();

      const trigger = screen.getByRole("button", { name: "Open calendar" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("icon button has aria-haspopup=dialog", () => {
      renderDatePicker();
      expect(
        screen.getByRole("button", { name: "Open calendar" }),
      ).toHaveAttribute("aria-haspopup", "dialog");
    });
  });

  describe("day selection", () => {
    it("selects a day on click and closes calendar", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderDatePicker({ onValueChange });

      await openCalendar(user);

      const grid = screen.getByRole("grid");
      const dayButtons = within(grid).getAllByRole("button");
      const firstEnabledDay = dayButtons[0];
      if (firstEnabledDay) {
        await user.click(firstEnabledDay);
      }

      expect(onValueChange).toHaveBeenCalled();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("selected day has aria-selected=true", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const selectedDay = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 15),
      });
      expect(selectedDay).toHaveAttribute("aria-selected", "true");
    });

    it("non-selected days have aria-selected=false", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const otherDay = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 14),
      });
      expect(otherDay).toHaveAttribute("aria-selected", "false");
    });
  });

  describe("keyboard navigation", () => {
    it("focuses the selected day when calendar opens", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const day15 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 15),
      });

      await vi.waitFor(() => {
        expect(day15).toHaveFocus();
      });
    });

    it("ArrowRight moves focus to next day", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowRight}");
      const grid = screen.getByRole("grid");
      const day16 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 16),
      });
      expect(day16).toHaveAttribute("tabindex", "0");
    });

    it("ArrowLeft moves focus to previous day", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowLeft}");
      const grid = screen.getByRole("grid");
      const day14 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 14),
      });
      expect(day14).toHaveAttribute("tabindex", "0");
    });

    it("ArrowDown moves focus to next week", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowDown}");
      const grid = screen.getByRole("grid");
      const day22 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 22),
      });
      expect(day22).toHaveAttribute("tabindex", "0");
    });

    it("ArrowUp moves focus to previous week", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowUp}");
      const grid = screen.getByRole("grid");
      const day8 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 8),
      });
      expect(day8).toHaveAttribute("tabindex", "0");
    });

    it("ArrowRight crosses month boundary", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 30) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 30),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        monthHeader(2026, 4),
      );
    });

    it("ArrowLeft crosses month boundary", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 1) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 1),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        monthHeader(2026, 2),
      );
    });

    it("PageDown navigates to next month", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{PageDown}");
      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        monthHeader(2026, 4),
      );
    });

    it("PageUp navigates to previous month", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{PageUp}");
      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        monthHeader(2026, 2),
      );
    });

    it("PageDown clamps day to last day of target month", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 0, 31) });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 0, 31),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{PageDown}");
      const grid = screen.getByRole("grid");
      expect(grid).toHaveAttribute("aria-label", monthHeader(2026, 1));
      const day28 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 1, 28),
      });
      expect(day28).toHaveAttribute("tabindex", "0");
    });

    it("Enter selects focused day", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderDatePicker({
        value: new Date(2026, 3, 15),
        onValueChange,
      });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowRight}");
      await user.keyboard("{Enter}");

      expect(onValueChange).toHaveBeenCalledTimes(1);
      const calledDate = onValueChange.mock.calls[0]![0] as Date;
      expect(calledDate.getFullYear()).toBe(2026);
      expect(calledDate.getMonth()).toBe(3);
      expect(calledDate.getDate()).toBe(16);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Space selects focused day", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderDatePicker({
        value: new Date(2026, 3, 15),
        onValueChange,
      });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 15),
          }),
        ).toHaveFocus();
      });

      await user.keyboard(" ");

      expect(onValueChange).toHaveBeenCalled();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("roving tabindex: only focused day has tabIndex=0", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const allDayButtons = within(grid).getAllByRole("button");
      const tabZero = allDayButtons.filter(
        (btn) => btn.getAttribute("tabindex") === "0",
      );
      expect(tabZero).toHaveLength(1);
      expect(tabZero[0]).toHaveAttribute("aria-label", dayLabel(2026, 3, 15));
    });
  });

  describe("min/max constraints", () => {
    it("disables days before min", async () => {
      const user = userEvent.setup();
      renderDatePicker({
        value: new Date(2026, 3, 15),
        min: new Date(2026, 3, 10),
      });

      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const day5 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 5),
      });
      expect(day5).toBeDisabled();
      expect(day5).toHaveAttribute("aria-disabled", "true");
    });

    it("disables days after max", async () => {
      const user = userEvent.setup();
      renderDatePicker({
        value: new Date(2026, 3, 15),
        max: new Date(2026, 3, 20),
      });

      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const day25 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 25),
      });
      expect(day25).toBeDisabled();
      expect(day25).toHaveAttribute("aria-disabled", "true");
    });

    it("arrow key skips disabled days", async () => {
      const user = userEvent.setup();
      renderDatePicker({
        value: new Date(2026, 3, 10),
        min: new Date(2026, 3, 8),
      });

      await openCalendar(user);
      await vi.waitFor(() => {
        const grid = screen.getByRole("grid");
        expect(
          within(grid).getByRole("button", {
            name: dayLabelRegex(2026, 3, 10),
          }),
        ).toHaveFocus();
      });

      await user.keyboard("{ArrowLeft}");
      await user.keyboard("{ArrowLeft}");
      const grid = screen.getByRole("grid");
      const day8 = within(grid).getByRole("button", {
        name: dayLabelRegex(2026, 3, 8),
      });
      expect(day8).toHaveAttribute("tabindex", "0");

      await user.keyboard("{ArrowLeft}");
      expect(day8).toHaveAttribute("tabindex", "0");
    });

    it("prev month button disabled when no selectable days in previous month", async () => {
      const user = userEvent.setup();
      renderDatePicker({
        value: new Date(2026, 3, 15),
        min: new Date(2026, 3, 1),
      });

      await openCalendar(user);
      expect(
        screen.getByRole("button", { name: "Previous month" }),
      ).toBeDisabled();
    });

    it("next month button disabled when no selectable days in next month", async () => {
      const user = userEvent.setup();
      renderDatePicker({
        value: new Date(2026, 3, 15),
        max: new Date(2026, 3, 30),
      });

      await openCalendar(user);
      expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
    });
  });

  describe("text input", () => {
    it("typing a valid date and pressing Enter updates value", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderDatePicker({ onValueChange });

      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "2026-04-20");
      await user.keyboard("{Enter}");

      expect(onValueChange).toHaveBeenCalled();
      const calledDate = onValueChange.mock.calls[0]![0] as Date;
      expect(calledDate.getFullYear()).toBe(2026);
      expect(calledDate.getMonth()).toBe(3);
      expect(calledDate.getDate()).toBe(20);
    });

    it("typing an invalid date restores previous value on blur", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });

      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "not-a-date");
      await user.tab();

      await vi.waitFor(() => {
        expect(input).toHaveValue("2026-04-15");
      });
    });

    it("typing a valid date commits on Enter", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      renderDatePicker({ onValueChange });

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.clear(input);
      await user.type(input, "2026-06-01");
      await user.keyboard("{Enter}");

      expect(onValueChange).toHaveBeenCalledTimes(1);
      const calledDate = onValueChange.mock.calls[0]![0] as Date;
      expect(calledDate.getMonth()).toBe(5);
      expect(calledDate.getDate()).toBe(1);
    });

    it("typing a date outside min/max restores previous value on blur", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <DatePicker
            value={new Date(2026, 3, 15)}
            min={new Date(2026, 3, 1)}
            max={new Date(2026, 3, 30)}
          >
            <DatePickerInput />
            <DatePickerCalendar />
          </DatePicker>
          <button type="button">Other</button>
        </div>,
      );

      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "2026-05-15");
      await user.click(screen.getByRole("button", { name: "Other" }));

      await vi.waitFor(() => {
        expect(input).toHaveValue("2026-04-15");
      });
    });
  });

  describe("calendar dialog ARIA", () => {
    it("calendar panel has role=dialog", async () => {
      const user = userEvent.setup();
      renderDatePicker();
      await openCalendar(user);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("calendar panel has aria-label", async () => {
      const user = userEvent.setup();
      renderDatePicker();
      await openCalendar(user);
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "Date picker",
      );
    });

    it("calendar panel does not have aria-modal", async () => {
      const user = userEvent.setup();
      renderDatePicker();
      await openCalendar(user);
      expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-modal");
    });

    it("grid has aria-label with month and year", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });
      await openCalendar(user);
      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        monthHeader(2026, 3),
      );
    });

    it("day buttons have full date aria-label", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 12) });
      await openCalendar(user);
      const grid = screen.getByRole("grid");
      expect(
        within(grid).getByRole("button", {
          name: dayLabel(2026, 3, 12),
        }),
      ).toBeInTheDocument();
    });

    it("grid contains role=row elements", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });
      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const rows = within(grid).getAllByRole("row");
      expect(rows.length).toBeGreaterThanOrEqual(4);
    });

    it("rows contain role=gridcell elements", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });
      await openCalendar(user);
      const grid = screen.getByRole("grid");
      const cells = within(grid).getAllByRole("gridcell");
      expect(cells.length).toBeGreaterThanOrEqual(28);
    });
  });

  describe("month navigation buttons", () => {
    it("previous month button navigates to previous month", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });
      await openCalendar(user);

      await user.click(screen.getByRole("button", { name: "Previous month" }));
      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        monthHeader(2026, 2),
      );
    });

    it("next month button navigates to next month", async () => {
      const user = userEvent.setup();
      renderDatePicker({ value: new Date(2026, 3, 15) });
      await openCalendar(user);

      await user.click(screen.getByRole("button", { name: "Next month" }));
      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        monthHeader(2026, 4),
      );
    });
  });

  describe("disabled state", () => {
    it("disables input when disabled prop is true", () => {
      renderDatePicker({ disabled: true });
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("disables icon button when disabled prop is true", () => {
      renderDatePicker({ disabled: true });
      expect(
        screen.getByRole("button", { name: "Open calendar" }),
      ).toBeDisabled();
    });

    it("does not open calendar when disabled", async () => {
      const user = userEvent.setup();
      renderDatePicker({ disabled: true });
      await user.click(screen.getByRole("button", { name: "Open calendar" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("controlled mode", () => {
    it("reflects external value changes", () => {
      const { rerender } = render(
        <DatePicker value={new Date(2026, 3, 10)}>
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>,
      );

      expect(screen.getByRole("textbox")).toHaveValue("2026-04-10");

      rerender(
        <DatePicker value={new Date(2026, 5, 20)}>
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>,
      );

      expect(screen.getByRole("textbox")).toHaveValue("2026-06-20");
    });
  });

  describe("FormField integration", () => {
    it("applies aria-invalid from FormField", () => {
      render(
        <FormField id="dob" error="Required">
          <DatePicker>
            <DatePickerInput />
            <DatePickerCalendar />
          </DatePicker>
        </FormField>,
      );

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("applies aria-describedby from FormField", () => {
      render(
        <FormField id="dob" error="Required">
          <DatePicker>
            <DatePickerInput />
            <DatePickerCalendar />
          </DatePicker>
        </FormField>,
      );

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("dob-error"),
      );
    });

    it("applies aria-required from FormField", () => {
      render(
        <FormField id="dob" required>
          <DatePicker>
            <DatePickerInput />
            <DatePickerCalendar />
          </DatePicker>
        </FormField>,
      );

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-required",
        "true",
      );
    });

    it("applies id from FormField", () => {
      render(
        <FormField id="dob">
          <DatePicker>
            <DatePickerInput />
            <DatePickerCalendar />
          </DatePicker>
        </FormField>,
      );

      expect(screen.getByRole("textbox")).toHaveAttribute("id", "dob");
    });
  });

  describe("custom format", () => {
    it("uses custom formatDate for display value", () => {
      const customFormat = (d: Date) =>
        `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getFullYear())}`;
      const customParse = (s: string) => {
        const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
        if (!m) return null;
        return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
      };

      render(
        <DatePicker
          defaultValue={new Date(2026, 3, 12)}
          formatDate={customFormat}
          parseDate={customParse}
        >
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>,
      );

      expect(screen.getByRole("textbox")).toHaveValue("12/04/2026");
    });
  });

  describe("locale", () => {
    it("uses provided locale for month header", () => {
      render(
        <DatePicker locale="de-DE" defaultValue={new Date(2026, 3, 12)}>
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Open calendar" }));

      const deFmt = new Intl.DateTimeFormat("de-DE", {
        month: "long",
        year: "numeric",
      });
      const expectedHeader = deFmt.format(new Date(2026, 3, 1));
      expect(screen.getByText(expectedHeader)).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on DatePickerInput", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <DatePicker>
          <DatePickerInput ref={ref} />
          <DatePickerCalendar />
        </DatePicker>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref on DatePickerCalendar when open", async () => {
      const ref = React.createRef<HTMLDivElement>();
      const user = userEvent.setup();
      render(
        <DatePicker>
          <DatePickerInput />
          <DatePickerCalendar ref={ref} />
        </DatePicker>,
      );

      await openCalendar(user);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("data-slot attributes (ADR-054)", () => {
    it("emits data-slot on every DatePicker sub-component when open", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <DatePicker defaultValue={new Date(2026, 3, 15)}>
          <DatePickerInput />
          <DatePickerCalendar />
        </DatePicker>,
      );

      expect(
        container.querySelector('[data-slot="input-root"]'),
      ).not.toBeNull();
      expect(container.querySelector('[data-slot="input"]')).not.toBeNull();
      expect(container.querySelector('[data-slot="toggle"]')).not.toBeNull();

      await openCalendar(user);

      expect(
        document.body.querySelector('[data-slot="calendar"]'),
      ).not.toBeNull();
      expect(
        document.body.querySelector('[data-slot="calendar-header"]'),
      ).not.toBeNull();
      expect(
        document.body.querySelector('[data-slot="prev-button"]'),
      ).not.toBeNull();
      expect(
        document.body.querySelector('[data-slot="month-year-label"]'),
      ).not.toBeNull();
      expect(
        document.body.querySelector('[data-slot="next-button"]'),
      ).not.toBeNull();
      expect(document.body.querySelector('[data-slot="grid"]')).not.toBeNull();
      expect(
        document.body.querySelector('[data-slot="weekday-row"]'),
      ).not.toBeNull();
      expect(
        document.body.querySelectorAll('[data-slot="weekday"]').length,
      ).toBe(7);
      expect(
        document.body.querySelectorAll('[data-slot="week-row"]').length,
      ).toBeGreaterThan(0);
      expect(
        document.body.querySelectorAll('[data-slot="day-cell"]').length,
      ).toBeGreaterThan(0);
      expect(
        document.body.querySelectorAll('[data-slot="day-button"]').length,
      ).toBeGreaterThan(0);
    });
  });
});
