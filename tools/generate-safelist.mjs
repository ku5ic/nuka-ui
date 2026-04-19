#!/usr/bin/env node
// Generate src/utils/_tailwind-safelist.ts from src/utils/responsive-maps.ts.
//
// Tailwind v4's scanner only sees string literals. The runtime `buildLookup`
// in src/utils/responsive.ts constructs breakpoint-prefixed class names at
// module init time, so none of the prefixed forms ("sm:gap-4", etc.) are
// visible to the scanner unless we emit them as literals into a scanned file.
// This script produces exactly that file. See ADR-049.
//
// Usage:
//   node tools/generate-safelist.mjs           # write the file
//   node tools/generate-safelist.mjs --check   # exit 1 if file is stale

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";
import prettier from "prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");
const mapsPath = resolve(repoRoot, "src/utils/responsive-maps.ts");
const outPath = resolve(repoRoot, "src/utils/_tailwind-safelist.ts");
const srcDir = resolve(repoRoot, "src");

const KNOWN_PREFIXES = ["sm:", "md:", "lg:", "xl:", "2xl:"];

async function loadMaps() {
  const source = readFileSync(mapsPath, "utf-8");
  const { code } = transformSync(source, {
    loader: "ts",
    format: "esm",
    target: "es2022",
  });
  const dataUrl =
    "data:text/javascript;base64," + Buffer.from(code).toString("base64");
  return await import(dataUrl);
}

function validateBaseMap(name, map) {
  if (map == null || typeof map !== "object") {
    throw new Error(`[generate-safelist] base map "${name}" is not an object`);
  }
  const entries = Object.entries(map);
  if (entries.length === 0) {
    throw new Error(`[generate-safelist] base map "${name}" is empty`);
  }
  for (const [key, value] of entries) {
    if (typeof key !== "string" || key.trim() === "") {
      throw new Error(
        `[generate-safelist] base map "${name}" has an empty or whitespace-only key`,
      );
    }
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        `[generate-safelist] base map "${name}" key "${key}" has an empty or non-string value`,
      );
    }
    const tokens = value.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      throw new Error(
        `[generate-safelist] base map "${name}" key "${key}" produced no tokens`,
      );
    }
    for (const token of tokens) {
      for (const p of KNOWN_PREFIXES) {
        if (token.startsWith(p)) {
          throw new Error(
            `[generate-safelist] base map "${name}" key "${key}" token "${token}" ` +
              `is already breakpoint-prefixed. Base maps hold unprefixed class ` +
              `names; the generator adds prefixes.`,
          );
        }
      }
    }
  }
}

function buildSafelist(allBaseMaps, breakpointPrefixes) {
  const set = new Set();
  const prefixValues = Object.values(breakpointPrefixes);
  for (const entry of allBaseMaps) {
    validateBaseMap(entry.name, entry.map);
    for (const prefix of prefixValues) {
      for (const value of Object.values(entry.map)) {
        const tokens = value.split(/\s+/).filter(Boolean);
        for (const token of tokens) {
          set.add(prefix ? `${prefix}${token}` : token);
        }
      }
    }
  }
  return [...set].sort();
}

function renderFile(classes) {
  const lines = [
    "// Generated file. Do not edit by hand.",
    "// Regenerate with: npm run build:safelist",
    "// Source of truth: src/utils/responsive-maps.ts",
    "// See ADR-049 in docs/DECISIONS.md.",
    "",
    "export const _safelist = [",
    ...classes.map((c) => `  ${JSON.stringify(c)},`),
    "] as const;",
    "",
  ];
  return lines.join("\n");
}

// Catches static imports, re-exports, dynamic imports, and CommonJS requires
// that pull in _tailwind-safelist.ts. Mentions in header comments are ignored.
const IMPORT_PATTERN =
  /(?:^|\s)(?:import\s[^;]*?from\s*|export\s[^;]*?from\s*|import\s*\(\s*|require\s*\(\s*)["'][^"']*_tailwind-safelist[^"']*["']/m;

function checkNoRuntimeImport() {
  const offenders = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      const s = statSync(p);
      if (s.isDirectory()) {
        walk(p);
        continue;
      }
      if (!entry.endsWith(".ts") && !entry.endsWith(".tsx")) continue;
      if (p === outPath) continue;
      const content = readFileSync(p, "utf-8");
      if (IMPORT_PATTERN.test(content)) {
        offenders.push(relative(repoRoot, p));
      }
    }
  };
  walk(srcDir);
  if (offenders.length > 0) {
    throw new Error(
      `[generate-safelist] _tailwind-safelist.ts must not be imported at runtime. ` +
        `Found import in: ${offenders.join(", ")}`,
    );
  }
}

async function main() {
  const checkMode = process.argv.slice(2).includes("--check");

  const maps = await loadMaps();
  if (!Array.isArray(maps.ALL_BASE_MAPS)) {
    throw new Error(
      "[generate-safelist] responsive-maps.ts does not export ALL_BASE_MAPS array",
    );
  }
  if (
    maps.BREAKPOINT_PREFIXES == null ||
    typeof maps.BREAKPOINT_PREFIXES !== "object"
  ) {
    throw new Error(
      "[generate-safelist] responsive-maps.ts does not export BREAKPOINT_PREFIXES",
    );
  }

  const classes = buildSafelist(maps.ALL_BASE_MAPS, maps.BREAKPOINT_PREFIXES);
  const raw = renderFile(classes);
  const prettierConfig = await prettier.resolveConfig(outPath);
  const formatted = await prettier.format(raw, {
    ...prettierConfig,
    filepath: outPath,
  });

  checkNoRuntimeImport();

  if (checkMode) {
    let current = "";
    try {
      current = readFileSync(outPath, "utf-8");
    } catch {
      current = "";
    }
    if (current !== formatted) {
      console.error(
        "[generate-safelist] src/utils/_tailwind-safelist.ts is out of date.\n" +
          "Run: npm run build:safelist",
      );
      process.exit(1);
    }
    console.log(`[generate-safelist] up to date (${classes.length} classes).`);
  } else {
    writeFileSync(outPath, formatted, "utf-8");
    console.log(
      `[generate-safelist] wrote ${classes.length} classes to ${relative(
        repoRoot,
        outPath,
      )}`,
    );
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
