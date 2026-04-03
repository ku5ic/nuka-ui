# New Component Checklist

## Implementation

- [ ] Component directory created at `src/components/<Name>/`
- [ ] `React.forwardRef` used
- [ ] Correct HTML attributes interface extended
- [ ] `cva` instance named `<name>Variants`
- [ ] `<Name>VariantProps` type exported
- [ ] `<Name>Props` interface exported
- [ ] `displayName` set
- [ ] All imports use `@vault/*` alias, no relative imports
- [ ] Only `--vault-*` semantic tokens referenced, no raw Tailwind colors
- [ ] All variant × intent compound variants defined
- [ ] `index.ts` exports component, variants, Props, VariantProps
- [ ] `src/index.ts` updated with new exports

## Tests

- [ ] Rendering tests
- [ ] Variant class tests
- [ ] Intent class tests
- [ ] Compound variant test (at least one)
- [ ] className override test
- [ ] Native attribute forwarding tests
- [ ] Ref forwarding test
- [ ] asChild test (if applicable)
- [ ] All tests pass: `npm test`

## Stories

- [ ] One story per variant
- [ ] One story per intent
- [ ] AllVariants render story
- [ ] AllSizes render story
- [ ] At least one real-world pattern story
- [ ] `asChild` set to `control: false` if present

## Quality

- [ ] `npx tsc -p tsconfig.json --noEmit` clean
- [ ] `npm run lint` clean
- [ ] `npm test` all passing
