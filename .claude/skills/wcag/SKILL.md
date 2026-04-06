# Skill: WCAG

Verifies WCAG 2.2 AA compliance for color tokens and component implementations.

Use this skill when adding new color tokens, reviewing components for accessibility, or auditing the token system.

## Inputs Required

- `scope`: `token` | `component` | `full-audit`
- `target`: token name, component name, or 'all' for full audit

## Process

### For token verification

1. Read `reference/wcag-requirements.md`.

2. Read `reference/contrast-pairs.md` to understand which token combinations must be verified.

3. Get the `oklch()` value of the token from `src/styles/tokens.css`.

4. Convert to hex using https://oklch.com

5. Check contrast ratio using https://webaim.org/resources/contrastchecker/

6. Verify against required pairs in `reference/contrast-pairs.md`.

7. Check both light and dark theme values.

8. Document results: pass/fail with actual ratio.

9. If failing: adjust lightness in `oklch()` only. Do not adjust chroma or hue.

10. Re-verify after adjustment.

### For component verification

1. Read `reference/wcag-requirements.md`.

2. Read `reference/component-a11y-checklist.md`.

3. Open the component in Storybook.

4. For each story, check the Accessibility panel: zero violations required.

5. Manually verify keyboard navigation:
   - Tab reaches the component
   - Enter/Space activates interactive components
   - Focus ring is visible

6. Verify ARIA attributes are correct for the component role.

7. Verify disabled state is communicated correctly.

8. Document any violations found.

### For full audit

Run both token verification and component verification for all components and tokens.

## Output

A report listing: each pair checked, the contrast ratio, pass/fail, and any remediation applied.
