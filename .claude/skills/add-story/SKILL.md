# Skill: Add Story

Adds a complete Storybook story set for an existing nuka-ui component.

Use this skill when adding or completing stories for a component in `src/components/`.

## Inputs Required

- `component_name`: PascalCase component name (e.g. `Badge`)
- `component_path`: path to component file (e.g. `src/components/Badge/Badge.tsx`)

## Process

1. Read `reference/story-conventions.md`.

2. Read the target component file in full to understand its props, variants, intents, and sizes.

3. Read `src/components/Button/Button.stories.tsx` as the reference implementation.

4. Create or open `<ComponentName>.stories.tsx` in the component directory.

5. Set up the `meta` object:
   - `title`: `'Components/<ComponentName>'`
   - `component`: the component
   - `parameters.layout`: `'centered'`
   - `tags`: `['autodocs']`
   - `argTypes`: one entry per prop
     - `variant`: `control: 'select'` with all variant options
     - `intent`: `control: 'select'` with all intent options
     - `size`: `control: 'select'` with all size options
     - `disabled`: `control: 'boolean'`
     - `asChild`: `control: false` (always)
   - Use `satisfies Meta<typeof Component>` not a type annotation

6. Write individual stories — one per variant:
   - `Primary`, `Secondary`, `Outline`, `Ghost`, `Link`
   - Each uses `args` with explicit `variant`, `intent: 'default'`, `size: 'md'`

7. Write individual stories — one per intent:
   - `IntentDanger`, `IntentSuccess`, `IntentWarning`
   - Each renders all variants with that intent using a `render` function

8. Write render stories:
   - `AllVariants` — all variants side by side, default intent
   - `AllSizes` — all sizes, `alignItems: 'flex-end'` in wrapper style

9. Write at least one real-world pattern story:
   - Name it descriptively: `'Pattern: <description>'`
   - Shows the component in a realistic UI context
   - Uses multiple variants/intents together where appropriate

10. Write a `Disabled` story.

11. Run `npm run dev` and verify all stories render correctly in Storybook.

12. Check the Accessibility panel for each story — no violations.

## Output

A complete `<ComponentName>.stories.tsx` file with all required story types, rendering correctly in Storybook with no accessibility violations.
