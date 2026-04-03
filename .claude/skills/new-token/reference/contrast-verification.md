# Contrast Verification

WCAG 2.2 AA is a hard requirement for all color tokens used in text or UI components.

## Requirements

| Use case                            | Minimum ratio |
| ----------------------------------- | ------------- |
| Normal text (< 18pt / < 14pt bold)  | 4.5:1         |
| Large text (≥ 18pt / ≥ 14pt bold)   | 3:1           |
| UI components and graphical objects | 3:1           |

AAA (7:1 for normal text) is the target where achievable without compromising aesthetics.

## Verification process

1. Get the hex equivalent of your `oklch()` value from https://oklch.com
2. Use the hex values in a contrast checker (e.g. https://webaim.org/resources/contrastchecker/)
3. Check the foreground token against the background token it will appear on
4. Verify both light and dark theme combinations

## Key pairs to verify

When adding a text token, verify against:

- `--vault-bg-base` (primary surface)
- `--vault-bg-subtle` (secondary surface)
- `--vault-bg-muted` (tertiary surface)

When adding a background token for a filled component, verify:

- White text (`--vault-text-inverse`) against the new background
- The background against `--vault-bg-base`

## Verified anchor values

| Token                     | Hex        | Luminance       |
| ------------------------- | ---------- | --------------- |
| `--vault-accent-500`      | `#43546a`  | 7.74:1 on white |
| `--vault-bg-base` (light) | `#ffffff`  | —               |
| `--vault-bg-base` (dark)  | ~`#0d0d0d` | —               |

## If a color fails contrast

1. Adjust lightness in `oklch()` — decrease for darker (more contrast on light bg), increase for lighter (more contrast on dark bg)
2. Do not adjust chroma or hue to fix contrast — this changes the color identity
3. Re-verify after each adjustment
4. Document the final lightness value and its contrast ratio in a comment in `tokens.css`
