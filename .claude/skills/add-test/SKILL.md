# Skill: Add Test

Adds a complete test suite for an existing nuka-ui component.

Use this skill when adding or completing tests for a component in `src/components/`.

## Inputs Required

- `component_name`: PascalCase component name (e.g. `Badge`)
- `component_path`: path to component file (e.g. `src/components/Badge/Badge.tsx`)

## Process

1. Read `reference/test-conventions.md`.

2. Read the target component file in full — note all variants, intents, sizes, props, and the HTML element it renders.

3. Read `src/components/Button/Button.test.tsx` as the reference implementation.

4. Create or open `<ComponentName>.test.tsx` in the component directory.

5. Write the `rendering` describe block:
   - Renders the correct element by default
   - Renders children correctly
   - `displayName` is set correctly

6. Write the `variants` describe block:
   - One test per variant asserting the correct class is present
   - One test per size asserting the correct class is present

7. Write the `intent` describe block:
   - One test per non-default intent on the default variant
   - At least one compound variant test (e.g. `ghost` + `danger`)

8. Write the `className override` describe block:
   - Consumer `className` is merged with variant classes
   - Both consumer class and variant class are present

9. Write the `native attributes` describe block:
   - Forwards relevant attributes for the element type
   - Forwards `disabled` if applicable
   - Forwards `aria-label`
   - Forwards `data-*` attributes

10. Write the `ref forwarding` describe block:
    - Ref is an instance of the correct HTML element class

11. Write the `asChild` describe block (if component supports it):
    - Renders as child element when `asChild` is true
    - Child has correct tag name
    - Component classes are merged onto child element

12. Run `npm test` — all tests must pass.

13. Run `npm run lint` — must be clean.

## Output

A complete `<ComponentName>.test.tsx` with all describe blocks passing. Coverage should include rendering, all variants, all intents, at least one compound variant, attribute forwarding, ref forwarding, and asChild if applicable.
