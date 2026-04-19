import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ALL_BASE_MAPS,
  BREAKPOINT_PREFIXES,
} from "@nuka/utils/responsive-maps";
import { _safelist } from "@nuka/utils/_tailwind-safelist";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(__filename, "../../..");
const stylesPath = resolve(repoRoot, "dist/styles.css");

// Tailwind v4 escapes CSS class selectors so:
//   "sm:gap-4"        -> ".sm\:gap-4"
//   "2xl:aspect-[4/3]" -> ".\32 xl\:aspect-\[4\/3\]"
// A leading digit becomes \3<digit> followed by a space delimiter.
// Note: this helper only handles a single leading digit, which covers every
// current Tailwind breakpoint token ("2xl"). Revisit if base maps ever emit
// classes starting with multiple digits.
function toEscapedSelector(cls: string): string {
  let head = "";
  let rest = cls;
  const first = cls.charCodeAt(0);
  if (first >= 0x30 && first <= 0x39) {
    head = "\\3" + cls[0] + " ";
    rest = cls.slice(1);
  }
  return (
    "." +
    head +
    rest
      .replace(/\\/g, "\\\\")
      .replace(/:/g, "\\:")
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\//g, "\\/")
  );
}

function buildExpectedSet(): Set<string> {
  const set = new Set<string>();
  const prefixValues = Object.values(BREAKPOINT_PREFIXES);
  for (const entry of ALL_BASE_MAPS) {
    for (const prefix of prefixValues) {
      for (const value of Object.values(entry.map)) {
        for (const token of value.split(/\s+/).filter(Boolean)) {
          set.add(prefix ? `${prefix}${token}` : token);
        }
      }
    }
  }
  return set;
}

describe("responsive safelist vs dist/styles.css", () => {
  let cssText = "";
  let expected: Set<string>;

  beforeAll(() => {
    cssText = readFileSync(stylesPath, "utf-8");
    expected = buildExpectedSet();
  });

  it("emits a non-trivial number of classes", () => {
    expect(expected.size).toBeGreaterThan(0);
    expect(_safelist.length).toBeGreaterThan(0);
  });

  it("generated _safelist matches the expected set computed from base maps", () => {
    const generated = new Set<string>(_safelist);
    const missingFromGenerated: string[] = [];
    for (const cls of expected) {
      if (!generated.has(cls)) missingFromGenerated.push(cls);
    }
    const extraInGenerated: string[] = [];
    for (const cls of generated) {
      if (!expected.has(cls)) extraInGenerated.push(cls);
    }
    expect(missingFromGenerated, "missing from _safelist").toEqual([]);
    expect(extraInGenerated, "unexpected in _safelist").toEqual([]);
  });

  it("covers every breakpoint prefix for every base class", () => {
    const prefixValues = Object.values(BREAKPOINT_PREFIXES);
    expect(prefixValues).toEqual(["", "sm:", "md:", "lg:", "xl:", "2xl:"]);
    for (const entry of ALL_BASE_MAPS) {
      for (const prefix of prefixValues) {
        for (const value of Object.values(entry.map)) {
          for (const token of value.split(/\s+/).filter(Boolean)) {
            const cls = prefix ? `${prefix}${token}` : token;
            expect(
              expected.has(cls),
              `expected ${cls} (from ${entry.name}) in the computed set`,
            ).toBe(true);
          }
        }
      }
    }
  });

  it("every class in _safelist appears as an escaped rule in dist/styles.css", () => {
    const missing: string[] = [];
    for (const cls of _safelist) {
      const selector = toEscapedSelector(cls);
      if (!cssText.includes(selector)) missing.push(cls);
    }
    expect(missing, `${missing.length} classes missing from dist/styles.css`).toEqual(
      [],
    );
  });

  it("every class in the expected set is also in _safelist (drift guard)", () => {
    const generated = new Set<string>(_safelist);
    const missing: string[] = [];
    for (const cls of expected) {
      if (!generated.has(cls)) missing.push(cls);
    }
    expect(
      missing,
      "if this fails, run: npm run build:safelist",
    ).toEqual([]);
  });
});
