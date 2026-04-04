# Skill: New Component

Creates a new nuka-ui component following established architecture patterns.

Use this skill when adding any new component to `src/components/`.

## Inputs Required

- `component_name`: PascalCase component name (e.g. `Badge`, `Input`, `Alert`)
- `variants`: list of variants needed (default: primary, secondary, outline, ghost, link)
- `intents`: list of intents needed (default: default, danger, success, warning)
- `sizes`: list of sizes needed (default: sm, md, lg)

## Process

1. Read `reference/checklist.md` and keep it open as a checklist throughout.

2. Read `reference/component-template.md` for the structural template.

3. Read `src/components/Button/Button.tsx` as the reference implementation.

4. Create the component directory:
   `src/components/<ComponentName>/`

5. Create `<ComponentName>.tsx`:
   - Use `React.forwardRef` — mandatory
   - Extend the correct HTML attributes interface
   - Define `cva` instance named `<componentName>Variants`
   - Export type `<ComponentName>VariantProps`
   - Export interface `<ComponentName>Props`
   - Set `displayName`
   - Import `cva` and `VariantProps` from `@nuka/utils/variants`
   - Import `cn` from `@nuka/utils/cn`
   - Reference only `--nuka-*` semantic tokens, never raw Tailwind colors

6. Create `index.ts`:
   - Export component, variants instance, Props type, VariantProps type

7. Add exports to `src/index.ts`

8. Create `<ComponentName>.test.tsx`:
   - Read `src/components/Button/Button.test.tsx` as reference
   - Cover: rendering, variants, intent, compoundVariants, className override, native attributes, ref forwarding, asChild (if applicable)
   - Use `globals: false` — import `describe`, `it`, `expect` from `vitest`
   - Always use `getByRole` with `{ name: '...' }`

9. Create `<ComponentName>.stories.tsx`:
   - Read `src/components/Button/Button.stories.tsx` as reference
   - Include: one story per variant, one per intent, AllVariants, AllSizes, at least one real-world pattern story
   - Set `asChild` to `control: false` if present

10. Run `npx tsc -p tsconfig.json --noEmit` — must be clean before proceeding.

11. Run `npm test` — all tests must pass before proceeding.

12. Run `npm run lint` — must be clean before proceeding.

13. Verify against `reference/checklist.md` — check off every item.

## Output

A complete, tested, linted component ready to commit. Do not consider the task done until all three commands in steps 10–12 pass clean.
