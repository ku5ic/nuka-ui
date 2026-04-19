import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";

import { Button } from "@nuka/components/Button";
import { Input } from "@nuka/components/Input";
import { Textarea } from "@nuka/components/Textarea";
import { Checkbox } from "@nuka/components/Checkbox";
import { Radio, RadioGroup } from "@nuka/components/RadioGroup";
import { Switch } from "@nuka/components/Switch";
import { Slider } from "@nuka/components/Slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@nuka/components/Select";

// Regression test for WCAG 2.2 Level AA Success Criterion 2.5.8 (Target Size
// Minimum): every interactive primitive must present a pointer target of at
// least 24x24 CSS px at every size variant.
//
// jsdom does not compute CSS layout, so getBoundingClientRect returns zero
// for Tailwind-styled elements. This test inspects the rendered className and
// reverse-maps known Tailwind utility classes to pixel values using the
// default theme scale (0.25rem = 4px at 16px root font-size). See ADR-051.
//
// If the project ever customizes the Tailwind spacing or typography scale,
// update the maps below. If a future primitive composes sizing dynamically
// (template strings, conditional concatenation), this inspection will miss
// it and the lint rule is the second line of defense.

// Tailwind default scale (step = 4px) for integer and half steps used in nuka.
const HEIGHT_SCALE: Record<string, number> = {
  "0": 0,
  "0.5": 2,
  "1": 4,
  "1.5": 6,
  "2": 8,
  "2.5": 10,
  "3": 12,
  "3.5": 14,
  "4": 16,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
  "11": 44,
  "12": 48,
};

const SPACE_PX: Record<string, number> = {
  "--space-1": 4,
  "--space-2": 8,
  "--space-3": 12,
  "--space-4": 16,
  "--space-5": 20,
  "--space-6": 24,
  "--space-8": 32,
  "--space-10": 40,
  "--space-12": 48,
};

// Tailwind default text-* utilities: font-size and line-height in px.
const TEXT_FONT_SIZE_PX: Record<string, number> = {
  "text-xs": 12,
  "text-sm": 14,
  "text-base": 16,
  "text-lg": 18,
  "text-xl": 20,
  "text-2xl": 24,
};

const TEXT_LINE_HEIGHT_PX: Record<string, number> = {
  "text-xs": 16,
  "text-sm": 20,
  "text-base": 24,
  "text-lg": 28,
  "text-xl": 28,
  "text-2xl": 32,
};

const ARBITRARY_PX_RE = /^(?:h|min-h|size)-\[(\d+(?:\.\d+)?)(px|rem)?\]$/;

function parseSize(token: string): number | null {
  const basic = /^(?:h|min-h|size)-([0-9.]+)$/.exec(token);
  if (basic) {
    const v = HEIGHT_SCALE[basic[1] ?? ""];
    if (typeof v === "number") return v;
  }
  const arb = ARBITRARY_PX_RE.exec(token);
  if (arb) {
    const n = parseFloat(arb[1] ?? "0");
    return arb[2] === "rem" ? n * 16 : n;
  }
  return null;
}

function parsePaddingY(token: string): number | null {
  const custom = /^py-\(([^)]+)\)$/.exec(token);
  if (custom) {
    const v = SPACE_PX[custom[1] ?? ""];
    if (typeof v === "number") return v;
  }
  const scale = /^py-([0-9.]+)$/.exec(token);
  if (scale) {
    const v = HEIGHT_SCALE[scale[1] ?? ""];
    if (typeof v === "number") return v;
  }
  return null;
}

function computeTargetHeight(className: string): number {
  const tokens = className.split(/\s+/).filter(Boolean);
  const explicitHeights: number[] = [];
  let paddingY = 0;
  let textSize: string | null = null;
  let hasLeadingNone = false;
  let borderY = 0;

  for (const token of tokens) {
    const h = parseSize(token);
    if (h !== null) {
      explicitHeights.push(h);
      continue;
    }
    const py = parsePaddingY(token);
    if (py !== null) {
      paddingY = Math.max(paddingY, py);
      continue;
    }
    if (token in TEXT_LINE_HEIGHT_PX) {
      textSize = token;
      continue;
    }
    if (token === "leading-none") hasLeadingNone = true;
    if (token === "border") borderY = 2;
  }

  let paddingBased = 0;
  if (textSize !== null) {
    const lh = hasLeadingNone
      ? (TEXT_FONT_SIZE_PX[textSize] ?? 0)
      : (TEXT_LINE_HEIGHT_PX[textSize] ?? 0);
    paddingBased = lh + 2 * paddingY + borderY;
  }

  return Math.max(...explicitHeights, paddingBased, 0);
}

type Size = "sm" | "md" | "lg";
const SIZES: readonly Size[] = ["sm", "md", "lg"] as const;

type Case = {
  name: string;
  render: () => React.ReactElement;
  target: () => HTMLElement | null;
};

const BASIC_CASES: Case[] = [
  ...SIZES.map((size): Case => ({
    name: `Button ${size}`,
    render: () => <Button size={size}>Click</Button>,
    target: () => screen.getByRole("button", { name: "Click" }),
  })),
  ...SIZES.map((size): Case => ({
    name: `Input ${size}`,
    render: () => <Input size={size} aria-label="field" />,
    target: () => screen.getByRole("textbox", { name: "field" }),
  })),
  ...SIZES.map((size): Case => ({
    name: `Textarea ${size}`,
    render: () => <Textarea size={size} aria-label="notes" />,
    target: () => screen.getByRole("textbox", { name: "notes" }),
  })),
  ...SIZES.map((size): Case => ({
    name: `Checkbox ${size}`,
    render: () => <Checkbox size={size}>Accept</Checkbox>,
    target: () => screen.getByText("Accept").closest("label"),
  })),
  ...SIZES.map((size): Case => ({
    name: `Radio ${size}`,
    render: () => (
      <RadioGroup name="rg">
        <Radio value="a" size={size}>
          A
        </Radio>
      </RadioGroup>
    ),
    target: () => screen.getByText("A").closest("label"),
  })),
  ...SIZES.map((size): Case => ({
    name: `Switch ${size}`,
    render: () => <Switch size={size} aria-label="toggle" />,
    target: () => screen.getByRole("switch", { name: "toggle" }),
  })),
  ...SIZES.map((size): Case => ({
    name: `Slider ${size}`,
    render: () => (
      <Slider size={size} aria-label="vol" defaultValue={50} />
    ),
    target: () => {
      const input = screen.getByRole("slider", { name: "vol" });
      return input.parentElement;
    },
  })),
  ...SIZES.map((size): Case => ({
    name: `SelectTrigger ${size}`,
    render: () => (
      <Select defaultValue="a">
        <SelectTrigger size={size} aria-label="fruit" />
        <SelectContent>
          <SelectItem value="a">Apple</SelectItem>
        </SelectContent>
      </Select>
    ),
    target: () => screen.getByRole("combobox", { name: "fruit" }),
  })),
];

describe("touch-target sizes (WCAG 2.5.8 AA)", () => {
  for (const c of BASIC_CASES) {
    it(`${c.name} presents >=24px interactive target`, () => {
      const { unmount } = render(c.render());
      const el = c.target();
      expect(el, `${c.name}: target element should exist`).not.toBeNull();
      if (!el) return;
      const height = computeTargetHeight(el.className);
      expect(
        height,
        `${c.name} classes "${el.className}" compute to ${height}px`,
      ).toBeGreaterThanOrEqual(24);
      unmount();
    });
  }
});

describe("computeTargetHeight helper self-check", () => {
  it("recognizes h-6 as 24", () => {
    expect(computeTargetHeight("h-6")).toBe(24);
  });

  it("recognizes min-h-6 as 24", () => {
    expect(computeTargetHeight("min-h-6 w-full")).toBe(24);
  });

  it("recognizes h-[24px] as 24", () => {
    expect(computeTargetHeight("h-[24px]")).toBe(24);
  });

  it("computes padding + text-sm + border to 22", () => {
    // 20 line + 0 pad + 2 border; below 24 intentionally for self-check
    expect(computeTargetHeight("text-sm border")).toBe(22);
  });

  it("computes Button sm approximate height", () => {
    // px-(--space-3) py-(--space-2) text-xs + border = 16 + 16 + 2 = 34
    expect(
      computeTargetHeight(
        "px-(--space-3) py-(--space-2) text-xs border rounded-md",
      ),
    ).toBe(34);
  });

  it("applies leading-none by using font-size", () => {
    // text-xs font-size 12 + 2*8 pad + 2 border = 30
    expect(
      computeTargetHeight("py-(--space-2) text-xs leading-none border"),
    ).toBe(30);
  });

  it("flags h-5 as below threshold (20)", () => {
    expect(computeTargetHeight("h-5 w-9")).toBe(20);
  });
});
