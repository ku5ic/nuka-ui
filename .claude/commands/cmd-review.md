# cmd-review

Review the implementation for correctness, quality, and consistency before committing.

Run after `cmd-test` passes clean. Act as a senior peer reviewer.

## Steps

1. Read every file that was created or modified.

2. Check API design:
   - Are prop names clear and consistent with existing components?
   - Are types as strict as they should be?
   - Is the public API surface minimal — nothing exposed that shouldn't be?
   - Will this API age well, or will it need breaking changes soon?

3. Check implementation quality:
   - Is `React.forwardRef` used on all DOM-rendering components?
   - Are all imports using `@nuka/*` alias?
   - Are only `--nuka-*` semantic tokens referenced?
   - Is CVA structured correctly — base, variants, compoundVariants, defaults?
   - Is `cn()` used for className composition everywhere?
   - Are there any unnecessary abstractions?

4. Check tests:
   - Does coverage match the component surface area?
   - Are tests testing behavior, not implementation?
   - Are all `getByRole` calls using `{ name: '...' }`?
   - Are intent × variant compound combinations tested?

5. Check accessibility:
   - Correct semantic element?
   - Focus ring present in base classes?
   - Disabled state handled correctly?
   - Storybook Accessibility panel: zero violations?

6. Check for anything that should be documented in `docs/DECISIONS.md`.

7. Produce a review summary:
   - **Approved** — ready to commit, no changes needed
   - **Changes requested** — list specific issues, loop back to `cmd-implement`
