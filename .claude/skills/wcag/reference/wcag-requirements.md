# WCAG 2.2 AA Requirements

WCAG 2.2 AA compliance is a hard requirement for vault-ui. Not a preference.

## Contrast ratios

| Content type                                   | Minimum        | Target    |
| ---------------------------------------------- | -------------- | --------- |
| Normal text (< 18pt regular, < 14pt bold)      | 4.5:1          | 7:1 (AAA) |
| Large text (≥ 18pt regular, ≥ 14pt bold)       | 3:1            | 4.5:1     |
| UI components (borders, icons, input outlines) | 3:1            | 4.5:1     |
| Decorative content                             | No requirement | —         |
| Disabled components                            | No requirement | —         |

## Focus indicators (2.4.11 — new in WCAG 2.2)

- Focus indicator must have minimum area of the component perimeter × 2px
- Contrast of focus indicator against adjacent colors: 3:1 minimum
- vault-ui uses `focus-visible:outline-2 focus-visible:outline-offset-2` — verify the outline color meets 3:1

## Target size (2.5.8 — new in WCAG 2.2)

- Minimum target size: 24×24 CSS pixels
- Button `sm` size must meet this — verify padding produces sufficient hit area

## Interactive states

- Hover, focus, and active states must all maintain contrast requirements
- Disabled state is exempt but should still be visually distinguishable

## Color alone

- Never use color as the only means of conveying information
- Error states need more than just red — use icons or text labels alongside color

## Screen reader support

- All interactive elements need accessible names
- Use `aria-label` when visible text is insufficient
- `asChild` pattern must preserve accessible name from child element
