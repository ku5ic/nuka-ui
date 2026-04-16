# cmd-audit

Audit the entire codebase for violations across code quality, accessibility,
architecture, documentation, and output style rules.

Run standalone: not part of the standard cmd-preflight to cmd-review pipeline.
Does not modify any file. Produces a prioritized findings report only.

---

## Steps

### 1. Load context

Read these files in full before auditing anything:

- `~/.claude/CLAUDE.md` - output rules that apply to all file content
- `CLAUDE.md` - project conventions, token rules, import rules, component reuse rules
- `docs/DECISIONS.md` - all ADRs, architectural constraints
- `docs/COMPONENTS.md` - component inventory, status, and internal utilities table

### 2. Baseline health

Run each command and report the result before proceeding:

```bash
npx tsc -p tsconfig.json --noEmit
npm test
npm run lint
npm run format:check
```

If any command exits non-zero, record the failure count. The audit proceeds regardless,
but all findings must be interpreted against this baseline. Do not conflate pre-existing
failures with new violations.

### 3. Discover scope

Run:

```bash
find src -type f \( -name "*.tsx" -o -name "*.ts" \) | grep -v node_modules | sort
```

Report the full file list. This is the total audit scope.

Partition it into two sub-scopes referenced by the categories below:

- **Component source**: `src/components/**/*.tsx` excluding `*.stories.tsx` and `*.test.tsx`
- **All files**: the full list above

Do not apply component-source categories to story or test files.

### 4. Audit each category

Work through every file in the appropriate scope. For each category, record every
violation found with: file path, line number (if applicable), category tag, and a
one-sentence description.

---

#### [DRY] - component source

- Inlined logic that already exists in a shared utility (`useControllableState`,
  `useFormFieldProps`, `DismissButton`, `Portal`, `useMenuNavigation`,
  `useFocusTrap`, `useScrollLock`, `createModalPrimitive`, `useMediaQuery`, etc.)
- Duplicated CVA variant definitions across components that should share a base
- Copy-pasted type definitions that could be derived or shared
- Repeated inline style patterns (`flex items-center gap-[var(--space-2)]` etc.)
  appearing in three or more places without a shared component or utility

---

#### [KISS] - component source

- Abstractions that add indirection without reducing complexity
- Components or hooks that do more than one thing
- Overly generic types that obscure intent
- Prop names that require reading the implementation to understand
- Context values that expose internal state consumers should not need

---

#### [SOLID] - component source

**Single Responsibility:**

- Components that handle both data fetching and presentation
- Hooks that combine unrelated concerns
- Context providers that own unrelated state

**Open/Closed:**

- Components hardcoded to specific children instead of accepting slots
- Variant systems that require modifying existing compound variants to add new behavior

**Liskov Substitution:**

- `asChild` implementations that do not faithfully forward all props and refs
- Components that break when used as children of their intended parent

**Interface Segregation:**

- Props interfaces that force consumers to pass irrelevant props
- Context values that expose methods consumers cannot meaningfully call

**Dependency Inversion:**

- Components that import from sibling component directories directly
  (exception: `src/components/Menu/` shared internals are intentional per ADR-030)
- Hardcoded dependencies on specific child component types by class or displayName

---

#### [STRUCTURE] - component source

This category audits file organization within component directories and across the
`src/` tree. Each rule below describes a structural expectation. Violations indicate
that a file is doing too much, that concerns are mixed in ways that make code harder
to navigate, or that shared definitions are not placed where consumers can import
them without pulling in implementation code.

**Variants in dedicated files:**

Every component that uses CVA must have its `cva(...)` call in a separate
`<Component>.variants.ts` file, not inlined in the component file.

- Flag any component file that contains a `cva(...)` call.
- The variants file must export the CVA result and its inferred `VariantProps` type.
- The component file must import from `./<n>.variants` using the `@nuka/*` alias.

To find violations:

```bash
grep -rn "cva(" src/components --include="*.tsx" | grep -v ".variants.ts" | grep -v ".stories.tsx" | grep -v ".test.tsx"
```

**Compound components in dedicated files:**

Each independently usable sub-component must live in its own file named after the
sub-component. A single file that defines multiple independently usable sub-components
is a violation.

- Flag any component file that contains more than one exported component definition,
  unless they form a tightly coupled parent/child pair where the child has no
  independent use.
- Sub-component files must be named after the sub-component: `CardHeader.tsx`, etc.
- The directory `index.ts` re-exports all sub-components.

**Types in dedicated files:**

Required when the combined line count of all exported interfaces, type aliases, and
union types in a component file exceeds 40 lines.

- Flag any component file that contains more than 40 lines of type-only definitions
  without a corresponding `<Component>.types.ts` in the same directory.
- When a `<Component>.types.ts` exists, the component file must not re-define any
  type already exported from the types file.
- Types shared between a parent and its sub-components must live in the types file
  regardless of line count.

**Helper functions in dedicated files:**

Non-trivial helper functions must be extracted to `<Component>.utils.ts` when any of
the following is true:

- The function exceeds 15 lines
- The function is used by more than one file in the component directory
- The function contains logic unrelated to rendering (ID generation, string
  manipulation, DOM measurement, event delegation)

Flag any component file that contains helper functions meeting the above criteria
without a corresponding `<Component>.utils.ts`.

Note: single-expression inline helpers are not violations.

**Context in dedicated files:**

Any React context defined inside a component file is a violation. Context definitions,
providers, and consumer hooks must live in `<Component>.context.tsx`, co-located with
the component that owns them.

- Flag any component file that contains a `React.createContext(` or `createContext(`
  call outside of a `.context.tsx` file.

To find violations:

```bash
grep -rn "createContext(" src/components --include="*.tsx" | grep -v ".context.tsx" | grep -v ".test.tsx" | grep -v ".stories.tsx"
```

**Hooks outside src/hooks/:**

Custom hooks (functions prefixed with `use`) must not live in `src/utils/`. Hooks have
React lifecycle semantics that are categorically different from pure utility functions.

To find violations:

```bash
grep -rn "^export.*function use\|^export const use" src/utils --include="*.ts" --include="*.tsx"
```

**Context outside src/context/ or component directories:**

Shared infrastructure contexts (consumed across unrelated components) must live in
`src/context/`. Context definitions must never live in `src/utils/` or `src/hooks/`.

To find violations:

```bash
grep -rn "createContext(" src/utils src/hooks --include="*.ts" --include="*.tsx" 2>/dev/null
```

**index.ts discipline:**

Each component directory must have an `index.ts` that re-exports the public API only.
`index.ts` must contain no component definitions, CVA calls, helper logic, context
definitions, or type definitions other than re-export syntax.

- Flag any `index.ts` that contains implementation code.
- Flag any component directory that lacks an `index.ts`.

**File size thresholds:**

Every file in component source must stay within these line count limits:

- Soft limit: 200 lines. Files exceeding this must have a comment at the top
  explaining why they cannot be split. Absence of the comment is a violation.
- Hard limit: 300 lines. Unconditional violation regardless of any comment.

To check:

```bash
find src/components -name "*.tsx" -o -name "*.ts" | grep -v node_modules \
  | xargs wc -l | sort -rn | head -30
```

Report the top 30 longest files. Flag every file over 200 lines. Treat every file
over 300 lines as a hard violation.

---

#### [COMPOSITION] - component source

Components using raw HTML elements where a library component should be used,
per the component reuse rules in `CLAUDE.md`:

- Raw `<h1>`-`<h6>` instead of `Heading`
- Raw `<p>` or `<span>` for user-visible text instead of `Text`
- Raw `<button>` for dismiss/close actions instead of `DismissButton`
- Raw `<svg>` for structural chrome instead of `Icon` (see CLAUDE.md for exceptions)
- Manual portal + SSR guard instead of `Portal`
- Inlined controlled/uncontrolled pattern instead of `useControllableState`
- Inlined FormField ARIA assembly instead of `useFormFieldProps`
- Layout with raw flex classes where `Stack` would be appropriate
- Custom button styles where `Button` with `asChild` would be correct

---

#### [WCAG] - component source

- Missing `role` on interactive or landmark elements
- Missing `aria-label` or `aria-labelledby` on elements needing an accessible name
- `aria-*` attributes pointing to IDs that do not exist in the DOM
- Interactive elements without visible focus indicators
  (`focus-visible:outline-*` missing from base classes)
- Disabled state with only visual opacity, no native `disabled` attribute
- Keyboard navigation gaps: interactive components not reachable by keyboard
- Missing `aria-hidden="true"` on decorative SVGs not wrapped in `Icon`
- `role="button"` on a non-button element where `<button>` should be used
- Interactive target size below 24x24px (WCAG 2.5.8)
- Missing `aria-current` on active navigation items
  (Breadcrumb `BreadcrumbPage`, Pagination active link, NavigationMenu active link)
- Missing `aria-expanded` on triggers that control disclosure regions
- Missing `aria-controls` on triggers that control panels
- Focus not moved into Dialog/Sheet on open
- Focus not restored to trigger on Dialog/Sheet close
- `SidebarMenuButton` missing `tooltip` prop (required for accessible name in
  collapsed icon-only state per ADR-032)
- `NavigationMenuContent` panels missing `role="dialog"` (per ADR-031)
- `role="combobox"` elements without an accessible name source (per ADR-013)

---

#### [TYPESCRIPT] - all files

- Use of `any` (explicit or implicit)
- Non-null assertions (`!`) without a comment explaining why they are safe
- Optional chaining used to silence errors that should be handled explicitly
- Missing `type` keyword on import statements that import only types
- `React.forwardRef` used in component source (deprecated; ref is a prop in React 19)
- Exported component props types not following the `<Component>Props` naming convention
- `VariantProps` exported types not following the `<Component>VariantProps` naming convention

---

#### [DOCS] - all files

Cross-check `docs/COMPONENTS.md` against `src/index.ts` and the file system:

- Components marked Done in `docs/COMPONENTS.md` missing from `src/index.ts`
- Components in `src/index.ts` not listed in `docs/COMPONENTS.md`
- Internal utilities in the utilities table that do not exist at the stated path
- ADRs referenced in code comments that do not exist in `docs/DECISIONS.md`
- Components that made architectural decisions not recorded in any ADR
- Internal utility table entries in `docs/COMPONENTS.md` where the `Used by` column
  is missing a component that actually uses it

---

#### [OUTPUT-STYLE] - all files

Run the following greps and report every match with file and line number.

Em dashes:

```bash
grep -rPn "\xe2\x80\x94" src/ docs/ .storybook/ --include="*.tsx" --include="*.ts" --include="*.md"
```

Smart or curly quotes:

```bash
grep -rPn "[\x{201C}\x{201D}\x{2018}\x{2019}]" src/ docs/ .storybook/ --include="*.tsx" --include="*.ts" --include="*.md"
```

Double-dash separators (excludes CSS custom property syntax):

```bash
grep -rn " -- " src/ docs/ .storybook/ --include="*.tsx" --include="*.ts" --include="*.md" | grep -v "\-\-nuka-\|var(\-\-"
```

Decorative comment dividers:

```bash
grep -rn "^[/\*]\+\s*[=\-\*]\{6,\}" src/ --include="*.tsx" --include="*.ts"
```

---

#### [TAILWIND] - component source

Longhand CSS variable syntax that should use Tailwind v4 shorthand:

```bash
grep -rn "\[var(--" src/components --include="*.tsx"
```

Every match is a violation. The correct form is `bg-(--nuka-accent-bg)` not
`bg-[var(--nuka-accent-bg)]`.

Raw Tailwind color utilities (not in story layout wrappers):

```bash
grep -rn "bg-\(blue\|red\|green\|yellow\|orange\|purple\|pink\|gray\|slate\|zinc\|neutral\|stone\)-[0-9]" src/components --include="*.tsx"
grep -rn "text-\(blue\|red\|green\|yellow\|orange\|purple\|pink\|gray\|slate\|zinc\|neutral\|stone\)-[0-9]" src/components --include="*.tsx"
```

Note: bare Tailwind spacing utilities (`p-4`, `gap-2`) are acceptable in Storybook
story layout wrappers only.

Custom CSS classes added to `src/styles/index.css` that could be replaced by Tailwind
v4 utilities:

Read `src/styles/index.css` in full and flag any class definitions that are expressible
as Tailwind utilities.

---

#### [TEST] - test files only

- Tests asserting class names for reasons unrelated to variant/intent verification
- `getByRole` calls without a `{ name: '...' }` option
- Tests importing from relative paths instead of `@nuka/*` alias
- Missing coverage for: controlled/uncontrolled modes, keyboard navigation,
  ARIA attributes, ref forwarding, disabled state
- `describe`/`it`/`expect` not explicitly imported from `vitest` (globals are false
  per CLAUDE.md; relying on implicit globals is a configuration assumption, not a contract)
- Tests that assert implementation details (internal state shape, private handler names)
  rather than observable behavior

---

#### [STORIES] - story files only

**Mocked or stub components:**

- Any component defined inside a story file that duplicates or approximates the
  behavior of an existing library component (e.g. a `MockCard`, `StubButton`,
  or inline `<div>` standing in for a real nuka-ui component)
- Story decorator or wrapper components that recreate layout already available
  via `Stack`, `Grid`, or `Container`
- Imports from `react` or other sources to build UI that should come from `@nuka/*`

The correct approach is to import and use the real component from the library.
If a story needs a realistic context (e.g. a Dialog story that needs a trigger button),
it must use `<Button>` from `@nuka/components/Button`, not a hand-rolled `<button>`.

**Code example quality:**

- Stories where the code example (the source visible in the Storybook Docs tab)
  is not a complete, copy-paste-ready usage example. Every story's rendered source
  must show exactly what a consumer would write to produce that output: real imports,
  real component names, real prop values.
- Stories using Storybook's `args` object in a way that hides configuration from
  the rendered source (e.g. a story that renders `<Button />` with no visible props
  because everything is in `args`, when the point of the story is to demonstrate
  those props)
- Stories whose `name` or `storyName` does not describe the pattern being demonstrated
  (e.g. `Story1`, `Default2`, `Test`)
- Pattern stories (real-world compositions) that use placeholder text like
  "Lorem ipsum" where a realistic label or content would demonstrate the component
  more honestly
- Missing `autodocs` tag on the default export: every component story file must
  include `tags: ['autodocs']` so the Docs page is generated

---

### 5. Produce the findings report

Structure the report as:

```
## Audit findings

### Critical (must fix before next release)

### High (fix in next refactor pass)

### Medium (address when touching the file)

### Low (nice to have)
```

For each finding, use this format:

```
[CATEGORY] src/path/to/file.tsx:42: one sentence description
```

Group by severity, then by category within each severity level.
End the report with a count per category.

Write everything to `audit-report.md` in the project root.

**STOP. Present the full findings report and wait for explicit user approval. Do not modify any file. Do not create a fix plan. Do not take any action. The next step is the user's decision.**
