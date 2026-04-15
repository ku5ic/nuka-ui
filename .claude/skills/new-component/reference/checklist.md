# New Component Checklist

## Implementation

- [ ] Component directory created at `src/components/<Name>/`
- [ ] `<Name>.variants.ts` created with `cva` instance and `VariantProps` type
- [ ] `cva` instance named `<name>Variants`
- [ ] `<Name>VariantProps` type exported from variants file
- [ ] `<Name>.tsx` imports variants from `@nuka/components/<Name>/<Name>.variants`
- [ ] `React.forwardRef` used
- [ ] Correct HTML attributes interface extended
- [ ] `<Name>Props` interface exported
- [ ] `displayName` set
- [ ] All imports use `@nuka/*` alias, no relative imports
- [ ] Only `--nuka-*` semantic tokens referenced, no raw Tailwind colors
- [ ] All variant x intent compound variants defined
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
