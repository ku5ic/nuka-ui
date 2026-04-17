import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(__filename, "../../..");
const srcDir = join(repoRoot, "src");
const distDir = join(repoRoot, "dist");

const DIRECTIVE_DOUBLE = '"use client";';
const DIRECTIVE_SINGLE = "'use client';";

function walk(dir: string, predicate: (p: string) => boolean): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full, predicate));
    } else if (entry.isFile() && predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function firstLine(file: string): string {
  const content = readFileSync(file, "utf8");
  const idx = content.indexOf("\n");
  return idx === -1 ? content : content.slice(0, idx);
}

function startsWithDirective(file: string): boolean {
  const line = firstLine(file).trimEnd();
  return line === DIRECTIVE_DOUBLE || line === DIRECTIVE_SINGLE;
}

interface Expected {
  esm: Set<string>;
  cjs: Set<string>;
}

function expectedFromSource(): Expected {
  const tsxFiles = walk(srcDir, (p) => p.endsWith(".tsx"));
  const esm = new Set<string>();
  const cjs = new Set<string>();
  for (const file of tsxFiles) {
    if (firstLine(file).trimEnd() !== DIRECTIVE_DOUBLE) continue;
    const rel = relative(srcDir, file).replace(/\.tsx$/, "");
    esm.add(join(distDir, rel + ".js"));
    cjs.add(join(distDir, rel + ".cjs"));
  }
  return { esm, cjs };
}

function actualFromDist(): Set<string> {
  const found = new Set<string>();
  const files = walk(
    distDir,
    (p) => p.endsWith(".js") || p.endsWith(".cjs"),
  );
  for (const file of files) {
    if (startsWithDirective(file)) found.add(file);
  }
  return found;
}

function diff(a: Set<string>, b: Set<string>): string[] {
  const out: string[] = [];
  for (const x of a) if (!b.has(x)) out.push(x);
  return out.sort();
}

describe("dist 'use client' directives", () => {
  let expected: Expected;
  let actual: Set<string>;

  beforeAll(() => {
    if (!statSync(distDir, { throwIfNoEntry: false })?.isDirectory()) {
      throw new Error(
        `dist/ does not exist. Run \`npm run build\` before \`npm run test:dist\`.`,
      );
    }
    expected = expectedFromSource();
    actual = actualFromDist();
  });

  it("every expected ESM file exists and starts with the directive", () => {
    const missing: string[] = [];
    for (const file of expected.esm) {
      const exists = statSync(file, { throwIfNoEntry: false })?.isFile();
      if (!exists) {
        missing.push(`${file} (file does not exist)`);
        continue;
      }
      if (firstLine(file).trimEnd() !== DIRECTIVE_DOUBLE) {
        missing.push(`${file} (line 1 is not the directive)`);
      }
    }
    expect(missing, missing.join("\n")).toEqual([]);
  });

  it("every expected CJS file exists and starts with the directive (either quote style)", () => {
    const missing: string[] = [];
    for (const file of expected.cjs) {
      const exists = statSync(file, { throwIfNoEntry: false })?.isFile();
      if (!exists) {
        missing.push(`${file} (file does not exist)`);
        continue;
      }
      const line = firstLine(file).trimEnd();
      if (line !== DIRECTIVE_DOUBLE && line !== DIRECTIVE_SINGLE) {
        missing.push(`${file} (first line: ${JSON.stringify(line)})`);
      }
    }
    expect(missing, missing.join("\n")).toEqual([]);
  });

  it("dist directive set equals expected set with no extras and no missing", () => {
    const expectedAll = new Set<string>([...expected.esm, ...expected.cjs]);
    const extras = diff(actual, expectedAll);
    const missing = diff(expectedAll, actual);
    const message = [
      extras.length
        ? `Files with directive in dist/ but not expected from source:\n  ${extras.join("\n  ")}`
        : "",
      missing.length
        ? `Files expected from source but missing directive in dist/:\n  ${missing.join("\n  ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
    expect(extras, message).toEqual([]);
    expect(missing, message).toEqual([]);
  });

  it("directive count equals 2 * source count (ESM plus CJS)", () => {
    const sourceCount = expected.esm.size;
    expect(actual.size).toBe(sourceCount * 2);
  });

  it("directive appears exactly once at the top of each ESM file", () => {
    const offenders: string[] = [];
    for (const file of expected.esm) {
      if (!statSync(file, { throwIfNoEntry: false })?.isFile()) continue;
      const content = readFileSync(file, "utf8");
      const occurrences =
        content.split(DIRECTIVE_DOUBLE).length - 1 +
        (content.split(DIRECTIVE_SINGLE).length - 1);
      if (occurrences !== 1) {
        offenders.push(`${file} (${String(occurrences)} occurrences)`);
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
