import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(__filename, "../../..");
const stylesPath = resolve(repoRoot, "dist/styles.css");

// End-to-end proof that the surface-override rules survive the build pipeline
// into dist/styles.css with the primitive references the plan specified. This
// replaces a jsdom computed-style integration test because the production CSS
// bundle is the source of truth for how the cascade resolves at runtime.
// See ADR-050.

describe("surface-aware focus-ring tokens in dist/styles.css", () => {
  let css = "";

  beforeAll(() => {
    css = readFileSync(stylesPath, "utf-8");
  });

  it("defines the light-inverse surface override with accent-400", () => {
    // Matches either "[data-theme="light"] [data-surface="inverse"]" or
    // ":root [data-surface="inverse"]" selector forms, both of which the
    // bundle emits. CSS minification preserves whitespace variation.
    expect(css).toMatch(
      /\[data-surface="?inverse"?\][^{]*\{[^}]*--nuka-border-focus:\s*var\(--color-accent-400\)/,
    );
  });

  it("defines the dark-inverse surface override with accent-500", () => {
    expect(css).toMatch(
      /\[data-theme="?dark"?\]\s+\[data-surface="?inverse"?\][^{]*\{[^}]*--nuka-border-focus:\s*var\(--color-accent-500\)/,
    );
  });
});
