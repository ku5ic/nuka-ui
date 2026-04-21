---
"@nuka-ui/core": patch
---

Base: origin/main
Range: main..release/1_1_4 (40 commits)

- **Data-slot attribute system**: All components now emit `data-slot` attributes for targeted styling. Enables consumers to style component subparts without classname dependencies. Comprehensive coverage across form inputs, navigation, tables, modals, popovers, tooltips, menus, combobox, select, and all compound sub-components.
- **Callout component**: New editorial component for emphasis and quotations.
- **Expanded typography weight scale**: Text, Heading, Eyebrow, and Label now expose all nine weight values from the token system, enabling fine-grained typographic control.
- **Color scale expansion**: Text and Eyebrow support the full semantic color palette (previously restricted subsets).
- **Polymorphic layout elements**: Container, Grid, and Stack now accept `as` prop for HTML element substitution.
- **Button fullWidth prop**: Explicit full-width layout control.
- **CardBody padding prop**: Direct padding configuration.
- **AspectRatio 4:5 ratio**: Portrait aspect ratio variant.
- **TimelineItem titleAs prop**: Override default heading element.
- **Data-surface cascade**: New theming primitive for nested surface styling and focus ring context.
- **Tabbable focus management**: Added tabbable library dependency for robust keyboard navigation support.
- **Touch-target validation ESLint rule**: Automated enforcement of WCAG 2.5.8 24x24px minimum touch targets via `no-sub-touch-target-sizes` rule.
- **Responsive safelist generation**: Tailwind safelist auto-generation for complete responsive class coverage.

- EmptyState and Card now forward weight prop to their typography sub-components, enabling cascading weight changes.
- Font-weight Tailwind literals throughout the codebase replaced with tokenized CSS variables for consistency and maintainability.

- Heading font-weight rendering now correctly applies under default serif family.
- Switch size scale rebalanced to meet WCAG 2.5.8 touch target requirements and improve visual differentiation.
- RadioGroup story names now scoped per instance to prevent collisions in documentation.

- Contract tests added for data-slot attribute behavior (ADR-054).
- Touch-target regression tests for WCAG 2.5.8 compliance.
- Responsive safelist selector escaping improved for special characters.
- Removed legacy Claude command markdowns from repository.
- Typography documentation updated for Eyebrow color scale and Heading family rendering.
