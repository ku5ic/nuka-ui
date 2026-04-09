# cmd-audit

Audit the entire codebase for violations across code quality, accessibility,
architecture, documentation, and output style rules.

Run standalone — not part of the standard cmd-preflight to cmd-review pipeline.
Does not modify any file. Produces a prioritized findings report only.

## Steps

### 1. Load context

Read these files in full before auditing anything:

- `~/.claude/CLAUDE.md` — output rules that apply to all file content
- `CLAUDE.md` — project conventions, token rules, import rules, component reuse rules
- `docs/DECISIONS.md` — all ADRs, architectural constraints
- `docs/COMPONENTS.md` — component inventory and status

### 2. Discover scope

Run:

```bash
find src -name "*.tsx" -o -name "*.ts" | grep -v node_modules | sort
```

Report the full file list. This is the audit scope.

### 3. Audit each category

Work through every file in scope. For each category below, record every violation
found with: file path, line number (if applicable), category tag, and a one-sentence
description of the issue.

---

#### DRY

- Inlined logic that already exists in a shared utility (`useControllableState`,
  `useFormFieldProps`, `DismissButton`, `Portal`, `useMenuNavigation`, etc.)
- Duplicated CVA variant definitions across components that should share a base
- Copy-pasted type definitions that could be derived or shared
- Repeated inline style patterns (`flex items-center gap-[var(--space-2)]` etc.)
  appearing in three or more places without a shared component or utility

---

#### KISS

- Abstractions that add indirection without reducing complexity
- Components or hooks that do more than one thing
- Overly generic types that obscure intent
- Prop names that require reading the implementation to understand
- Context values that expose internal state consumers should not need

---

#### SOLID

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
  (exception: `src/components/Menu/` shared internals are intentional)
- Hardcoded dependencies on specific child component types by class or displayName

---

#### Component composition

Components using raw HTML elements where a library component should be used:

- Raw `<h1>`-`<h6>` instead of `Heading`
- Raw `<p>` or `<span>` for user-visible text instead of `Text`
- Raw `<button>` for dismiss/close actions instead of `DismissButton`
- Raw `<svg>` for structural chrome instead of `Icon`
- Manual portal + SSR guard instead of `Portal`
- Inlined controlled/uncontrolled pattern instead of `useControllableState`
- Inlined FormField ARIA assembly instead of `useFormFieldProps`
- Layout with raw flex classes where `Stack` would be appropriate
- Custom button styles where `Button` with `asChild` would be correct

---

#### WCAG 2.2 AA

- Missing `role` on interactive or landmark elements
- Missing `aria-label` or `aria-labelledby` on elements needing an accessible name
- `aria-*` attributes pointing to IDs that do not exist in the DOM
- Interactive elements without visible focus indicators
  (`focus-visible:outline-*` missing from base classes)
- Disabled state with only visual opacity, not native `disabled` attribute
- Keyboard navigation gaps: interactive components not reachable by keyboard
- Missing `aria-hidden="true"` on decorative SVGs not wrapped in `Icon`
- `role="button"` on a non-button element where `<button>` should be used
- Interactive target size below 24x24px (WCAG 2.5.8)
- Missing `aria-current` on active navigation items (Breadcrumb, Pagination, NavigationMenu)
- Missing `aria-expanded` on triggers that control disclosure regions
- Missing `aria-controls` on triggers that control panels
- Focus not moved into Dialog/Sheet on open
- Focus not restored to trigger on Dialog/Sheet close

---

#### TypeScript strictness

- Use of `any` (explicit or implicit)
- Non-null assertions (`!`) without a comment explaining why they are safe
- Optional chaining used to silence errors that should be handled explicitly
- Missing `type` keyword on import statements
- `React.forwardRef` missing on any component that renders a DOM element
- Exported component props types not following the `<Component>Props` naming convention

---

#### Documentation drift

- Components marked Done in `docs/COMPONENTS.md` missing from `src/index.ts`
- Components in `src/index.ts` not listed in `docs/COMPONENTS.md`
- ADRs referenced in code comments that do not exist in `docs/DECISIONS.md`
- Internal utilities in the utilities table that do not exist at the stated path
- Components that made architectural decisions not recorded in any ADR

---

#### Output style violations

Search all `.tsx`, `.ts`, `.md` files in `src/`, `docs/`, `.storybook/` for:

- Em dashes (`—`)
- Double dashes used as separators (`--`)
- Smart or curly quotes (`"` `"` `'` `'`)
- Decorative comment dividers (`===`, `---`, `***` repeated as section headers)
- Comments that describe what the code does rather than why

Run:

```bash
grep -rn "—\| -- " src/ docs/ .storybook/ --include="*.tsx" --include="*.ts" --include="*.md"
```

Report every match with file and line number.

---

#### Tailwind v4 conventions

- CSS custom property longhand: `bg-[var(--nuka-accent-bg)]` instead of `bg-(--nuka-accent-bg)`

  Run:

  ```bash
  grep -rn "var(--nuka-" src/components --include="*.tsx"
  ```

- Custom CSS classes in `src/styles/index.css` expressible as Tailwind utilities
- Raw Tailwind color utilities (`bg-blue-500`, `text-red-400`) instead of semantic tokens
- Hardcoded spacing in component implementations (`p-4`, `gap-2`) where token-based
  values should be used (`p-[var(--space-4)]`, `gap-[var(--space-2)]`)

Note: bare Tailwind spacing utilities are acceptable in Storybook story layout wrappers
only. Not in component implementations.

---

#### Test quality

- Tests asserting class names for reasons unrelated to variant/intent verification
- `getByRole` calls without a `{ name: '...' }` option
- Tests importing from relative paths instead of `@nuka/*` alias
- Missing coverage for: controlled/uncontrolled modes, keyboard navigation,
  ARIA attributes, ref forwarding, disabled state

---

### 4. Produce the findings report

Structure the report as:

```
## Audit findings

### Critical (must fix before next release)

### High (fix in next refactor pass)

### Medium (address when touching the file)

### Low (nice to have)
```

For each finding use this format:

```
[CATEGORY] src/path/to/file.tsx:42 — one sentence description
```

Group by severity, then by category within each severity level.
End the report with a count per category.

Write everything to audit-report.md

**STOP. Present the full findings report and wait for explicit user approval. Do not modify any file. Do not create a fix plan. Do not take any action. The next step is the user's decision.**
