# Skill: New Token

Adds a new CSS custom property token to the nuka-ui token system correctly.

Use this skill when adding any new design token to `src/styles/tokens.css`.

## Inputs Required

- `token_name`: the semantic token name without prefix (e.g. `accent-bg-disabled`)
- `token_type`: primitive | semantic
- `purpose`: what this token is for
- `light_value`: value or primitive reference for light theme
- `dark_value`: value or primitive reference for dark theme

## Process

1. Read `reference/token-architecture.md` before making any changes.

2. Read `src/styles/tokens.css` in full to understand existing scale.

3. Determine token type:
   - **Primitive** — a raw scale value (color, space, radius, etc.). No `--nuka-` prefix. Lives in `:root`.
   - **Semantic** — references a primitive, has `--nuka-` prefix. Lives in `:root, [data-theme="light"]` and `[data-theme="dark"]`.

4. If adding a **primitive** token:
   - Find the correct scale section in `:root`
   - Insert in scale order (e.g. `--color-accent-550` between 500 and 600)
   - Use `oklch()` color values — never hex, never `rgb()`
   - If it is a color, verify WCAG 2.2 AA contrast before adding (see wcag skill)

5. If adding a **semantic** token:
   - Verify a suitable primitive exists — create one first if not
   - Add to `[data-theme="light"]` block, referencing the primitive via `var()`
   - Add matching entry to `[data-theme="dark"]` block
   - If the dark value cannot map cleanly to an existing primitive, hardcode an `oklch()` value and add a comment explaining why
   - Name must follow pattern: `--nuka-<category>-<role>` (e.g. `--nuka-accent-bg-disabled`)

6. If the token is a color used for text on a background:
   - Run contrast verification per `reference/contrast-verification.md`
   - Both light and dark mode must pass 4.5:1 for normal text, 3:1 for large text/UI

7. Add a comment if the token has a non-obvious constraint or tradeoff.

8. Run `npm run dev` and visually verify the token resolves correctly in Storybook devtools.

9. Update `docs/DECISIONS.md` if the new token represents a meaningful architectural decision.

## Output

Token added to `src/styles/tokens.css` in both themes, contrast verified, no raw color values in semantic layer.
