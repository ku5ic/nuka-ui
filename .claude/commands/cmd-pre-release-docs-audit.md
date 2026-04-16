# cmd-pre-release-docs-audit

## cmd-preflight

## cmd-plan

You are performing a pre-release documentation audit for nuka-ui. The goal is to
verify that every instruction, code example, import path, token name, prop name,
component name, and file reference in the documentation is accurate against the
actual source code. Documentation that contradicts the source is a bug. Treat it
as one.

This is a read-and-verify task. Do not rewrite documentation proactively. Flag
discrepancies with precision: file, section, what it says, what the source says,
and what the correct version should be.

---

## Scope

Audit all of the following files in their entirety:

- `README.md`
- `docs/CUSTOMIZATION.md`
- `docs/THEMING.md`
- `docs/DECISIONS.md`
- `docs/COMPONENTS.md`

Cross-reference against:

- `src/styles/tokens.css` (canonical token definitions)
- `src/styles/root.css` (canonical root stylesheet)
- `src/styles/animations.css` (canonical animation definitions)
- `src/index.ts` (canonical public API: component names, export names, type names)
- `package.json` (canonical exports map, version, dependencies, scripts)
- `vite.config.ts` (canonical build output and CSS file names)

---

## Step 1: Read all source files

Read every file listed in the Scope section above before doing any analysis.
Do not begin the audit until all files are loaded.

Read in this order:

1. `package.json`
2. `vite.config.ts`
3. `src/styles/tokens.css`
4. `src/styles/root.css`
5. `src/styles/animations.css`
6. `src/index.ts`
7. `README.md`
8. `docs/CUSTOMIZATION.md`
9. `docs/THEMING.md`
10. `docs/DECISIONS.md`
11. `docs/COMPONENTS.md`

---

## Step 2: Verify README.md

Check every claim in `README.md` against the source files. At minimum verify:

**Installation and import instructions:**

- The install command is correct (`npm install @nuka-ui/core`)
- The main stylesheet import path matches the `exports` map in `package.json`
  (`"./styles"` resolves to `"./dist/styles.css"`)
- The root stylesheet import path matches the `exports` map in `package.json`
  (`"./styles/root"` resolves to `"./dist/styles-root.css"`)
- The description of what each stylesheet contains matches what the files
  actually contain:
  - `@nuka-ui/core/styles`: tokens (light + dark themes) + animations, no Tailwind base layer
  - `@nuka-ui/core/styles/root`: light theme only, all tokens scoped to `:root`, no dark
    mode, no animations
- No claim is made that either stylesheet contains "component styles" (there are
  none; all component styling is Tailwind utility classes applied at render time)

**Theming instructions:**

- The `data-theme` attribute approach is described correctly
- Any example CSS overrides use token names that exist verbatim in `tokens.css`
- No token name in any example is misspelled or out of date

**Component table:**

- Every component listed exists as a named export in `src/index.ts`
- No component listed has been renamed since the README was written
- No user-facing component that exists in `src/index.ts` is missing from the table

**Code examples:**

- Every import in every code example uses a component name that exists in
  `src/index.ts`
- Every prop name used in examples (`variant`, `intent`, `size`, `asChild`, etc.)
  is a prop that actually exists on that component
- No example uses a Radix UI import (the library has no Radix dependency)

**Stack table:**

- All versions listed match the actual versions in `package.json` devDependencies
  or dependencies
- No tool listed has been removed from the project

**Scripts section:**

- Every script listed in the development section exists in `package.json` scripts
- Script names match exactly (case-sensitive)

---

## Step 3: Verify docs/CUSTOMIZATION.md

**Token override examples:**

- Every token name used in CSS examples (e.g. `--nuka-accent-bg`,
  `--color-neutral-dark-base`) exists verbatim in `src/styles/tokens.css`
- No token name is misspelled or has been renamed
- The selector used to set each token matches how it is defined in `tokens.css`:
  - Semantic tokens for light theme: `:root, [data-theme="light"]`
  - Semantic tokens for dark theme: `[data-theme="dark"]`
  - Dark surface primitives: `:root`
  - Spacing and radius primitives: `:root`

**Dark surface primitives table:**

- Every primitive in the table (`--color-neutral-dark-base`, etc.) exists in
  `tokens.css`
- The default oklch values in the table match the values in `tokens.css` exactly

**Component examples:**

- Every component imported in a code example exists in `src/index.ts`
- Every prop used in examples exists on the actual component
- The `cn()` utility import shown in any example is exported from `src/index.ts`

**Limitations section:**

- The statement that `variant` and `intent` are closed enums is still accurate
- No third-party primitives (Radix) are referenced as current dependencies

---

## Step 4: Verify docs/THEMING.md

**Contrast ratio tables:**

- Every token listed exists in `tokens.css`
- The background token listed for each pair exists in `tokens.css`
- The contrast ratios listed match the inline comments in `tokens.css` where
  documented
- Tokens marked "not verified" are genuinely absent from inline comments in
  `tokens.css` (do not mark something as verified if the comment is absent)

**Primitive-level contrast notes table:**

- Each primitive listed exists in `tokens.css`
- The ratios match the inline comments in `tokens.css`

**File references:**

- `src/styles/tokens.css` is the correct path
- `docs/CUSTOMIZATION.md` is the correct relative path from `docs/THEMING.md`

---

## Step 5: Verify docs/DECISIONS.md

Read the full file. Flag any decision that references:

- A dependency that has since been removed (e.g. Radix UI, removed per ADR-009)
- A tool or pattern that contradicts the current codebase
- A file path that does not exist
- A component or API that has been renamed

Do not flag deliberate historical context (e.g. "we considered X and rejected it").
Flag only claims that assert current state incorrectly.

---

## Step 6: Verify docs/COMPONENTS.md

- Every component listed exists as a named export in `src/index.ts`
- Status indicators (if any) are consistent with what is actually implemented
- No component is listed under the wrong category compared to how it is grouped
  in `src/index.ts` or the README

---

## Step 7: Cross-check CSS stylesheet descriptions across all docs

The two stylesheet exports are described in multiple places. Verify that the
description is consistent and accurate everywhere it appears across all five
documentation files.

The ground truth is:

- `@nuka-ui/core/styles` -> `dist/styles.css` -> `tokens.css` (both themes) +
  `animations.css`, no Tailwind base layer, no component styles
- `@nuka-ui/core/styles/root` -> `dist/styles-root.css` -> `root.css` (light theme
  only, single `:root` scope, no dark mode, no animations)

Any description that contradicts this is a bug.

---

## Output format

Produce a structured report with one section per file audited.

For each file use this structure:

```
## [filename]

### Verified
- [brief list of major areas confirmed correct]

### Discrepancies
- Location: [section name]
  Found: [exact quote or description of what the doc says]
  Source says: [what the actual source file says]
  Fix: [the corrected text or instruction]
```

If a file has no discrepancies, write "No discrepancies found." under that heading.

At the end of the report produce a summary:

```
## Summary
Total discrepancies: N
Files with issues: [list]
Files clean: [list]
Recommended action: [none required / fix before release / blocking]
```

---

**STOP. Present the audit report and wait for explicit user approval. Do not
make any edits to any file. Do not proceed to any fixes. The next step is the
user's decision.**
