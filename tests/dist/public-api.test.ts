import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = resolve(__filename, "../../..");
const distDir = join(repoRoot, "dist");
const srcIndex = join(repoRoot, "src", "index.ts");
const pkgPath = join(repoRoot, "package.json");

interface PackageJson {
  exports: Record<
    string,
    string | { types?: string; import?: string; require?: string }
  >;
}

function parseValueExports(source: string): Set<string> {
  const cleaned = source.replace(/\/\*[\s\S]*?\*\//g, "");
  const names = new Set<string>();
  const re = /^export\s+(type\s+)?\{([^}]+)\}/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(cleaned)) !== null) {
    if (match[1]) continue;
    const inner = match[2];
    if (!inner) continue;
    for (const raw of inner.split(",")) {
      const part = raw.trim();
      if (!part) continue;
      const asMatch = /^[\w$]+\s+as\s+([\w$]+)$/.exec(part);
      if (asMatch?.[1]) {
        names.add(asMatch[1]);
        continue;
      }
      const bare = /^([\w$]+)$/.exec(part);
      if (bare?.[1]) names.add(bare[1]);
    }
  }
  return names;
}

function ownKeys(obj: object): Set<string> {
  const out = new Set<string>();
  for (const key of Object.keys(obj)) {
    if (key === "default" || key === "__esModule") continue;
    out.add(key);
  }
  return out;
}

function setDiff(a: Set<string>, b: Set<string>): string[] {
  const out: string[] = [];
  for (const x of a) if (!b.has(x)) out.push(x);
  return out.sort();
}

describe("dist public API", () => {
  let expectedNames: Set<string>;
  let esmNamespace: Record<string, unknown>;
  let cjsModule: Record<string, unknown>;
  let pkg: PackageJson;

  beforeAll(async () => {
    if (!statSync(distDir, { throwIfNoEntry: false })?.isDirectory()) {
      throw new Error(
        `dist/ does not exist. Run \`npm run build\` before \`npm run test:dist\`.`,
      );
    }
    expectedNames = parseValueExports(readFileSync(srcIndex, "utf8"));
    esmNamespace = (await import(
      pathToFileURL(join(distDir, "index.js")).href
    )) as Record<string, unknown>;
    const requireFromHere = createRequire(__filename);
    cjsModule = requireFromHere(join(distDir, "index.cjs")) as Record<
      string,
      unknown
    >;
    pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as PackageJson;
  });

  it("ESM entry exposes the value-export names from src/index.ts", () => {
    const actual = ownKeys(esmNamespace);
    const missing = setDiff(expectedNames, actual);
    const extra = setDiff(actual, expectedNames);
    const message = [
      missing.length
        ? `Missing from ESM dist:\n  ${missing.join("\n  ")}`
        : "",
      extra.length ? `Extra in ESM dist:\n  ${extra.join("\n  ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    expect(missing, message).toEqual([]);
    expect(extra, message).toEqual([]);
  });

  it("CJS entry exposes the same names as ESM", () => {
    const cjsKeys = ownKeys(cjsModule);
    const missing = setDiff(expectedNames, cjsKeys);
    const extra = setDiff(cjsKeys, expectedNames);
    const message = [
      missing.length
        ? `Missing from CJS dist:\n  ${missing.join("\n  ")}`
        : "",
      extra.length ? `Extra in CJS dist:\n  ${extra.join("\n  ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    expect(missing, message).toEqual([]);
    expect(extra, message).toEqual([]);
  });

  it("dist/index.d.ts exists and is non-empty", () => {
    const path = join(distDir, "index.d.ts");
    const stats = statSync(path, { throwIfNoEntry: false });
    expect(stats?.isFile()).toBe(true);
    expect(stats?.size ?? 0).toBeGreaterThan(0);
  });

  it.each([
    ["dist/styles.css"],
    ["dist/styles-root.css"],
    ["dist/tailwind.css"],
  ])("%s exists and is non-empty", (rel) => {
    const path = join(repoRoot, rel);
    const stats = statSync(path, { throwIfNoEntry: false });
    expect(stats?.isFile()).toBe(true);
    expect(stats?.size ?? 0).toBeGreaterThan(0);
  });

  it("every path in package.json exports map resolves to an existing file", () => {
    const broken: string[] = [];
    function check(label: string, value: unknown) {
      if (typeof value !== "string") return;
      const stripped = value.replace(/^\.\//, "");
      const path = join(repoRoot, stripped);
      const stats = statSync(path, { throwIfNoEntry: false });
      if (!stats?.isFile()) {
        broken.push(`${label} -> ${value}`);
      }
    }
    for (const [key, target] of Object.entries(pkg.exports)) {
      if (typeof target === "string") {
        check(key, target);
        continue;
      }
      for (const [cond, path] of Object.entries(target)) {
        check(`${key} (${cond})`, path);
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });
});
