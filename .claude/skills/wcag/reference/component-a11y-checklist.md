# Component Accessibility Checklist

## Every component

- [ ] Correct semantic HTML element used
- [ ] Accessible name present (visible label, aria-label, or aria-labelledby)
- [ ] Focus ring visible — `focus-visible:outline` present in base classes
- [ ] Focus ring contrast: 3:1 against adjacent colors
- [ ] Keyboard operable — Tab to reach, Enter/Space to activate
- [ ] All color combinations pass contrast requirements (see contrast-pairs.md)
- [ ] Disabled state: `disabled` attribute or `aria-disabled` used correctly
- [ ] Storybook Accessibility panel: zero violations on all stories

## Interactive components (Button, Link, Input, etc.)

- [ ] Role is correct — `button` for actions, `link` for navigation
- [ ] `asChild` preserves accessible name from child element
- [ ] Loading state (if present) announces to screen readers
- [ ] Error state uses more than color alone

## Form components (Input, Select, Checkbox, etc.)

- [ ] Associated `<label>` or `aria-label`
- [ ] Required fields marked with `aria-required`
- [ ] Error messages associated via `aria-describedby`
- [ ] Valid/invalid state communicated via `aria-invalid`

## WCAG 2.2 specific

- [ ] Focus indicator meets 2.4.11 (minimum area)
- [ ] Target size meets 2.5.8 (24×24px minimum)
- [ ] Dragging alternatives provided if drag interaction exists (2.5.7)
- [ ] Consistent help available if help is provided (3.2.6)
