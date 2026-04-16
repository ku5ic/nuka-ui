# cmd-review

Review the implementation for correctness, quality, and consistency.

Run after `cmd-test` is confirmed. Act as a senior peer reviewer.

## Steps

1. Read every file that was created or modified.

2. Check API design:
   - Are prop names clear and consistent with existing components?
   - Are types as strict as they should be?
   - Is the public API surface minimal - nothing exposed that shouldn't be?
   - Will this API age well, or will it need breaking changes soon?

3. Check implementation quality:
   - Is `ref` accepted as a typed prop in the Props interface, without `React.forwardRef` wrapping?
   - Are all imports using `@nuka/*` alias?
   - Are only `--nuka-*` semantic tokens referenced?
   - Is CVA structured correctly: base, variants, compoundVariants, defaults?
   - Are CVA definitions in `<Component>.variants.ts`, not inlined in the component file?
   - Are hooks in `src/hooks/`, not `src/utils/`?
   - Are context definitions in `<Component>.context.tsx` (component-local) or `src/context/` (shared infrastructure), not in `src/utils/` or `src/hooks/`?
   - Is `index.ts` a pure re-export barrel with no implementation code?
   - Are compound sub-components each in their own file?
   - Does any file exceed 200 lines without a justifying comment, or 300 lines unconditionally?
   - Is `cn()` used for className composition everywhere?
   - Are there any unnecessary abstractions?

4. Check tests:
   - Does coverage match the component surface area?
   - Are tests testing behavior, not implementation?
   - Are all `getByRole` calls using `{ name: '...' }`?
   - Are intent x variant compound combinations tested?

5. Check accessibility:
   - Correct semantic element?
   - Focus ring present in base classes?
   - Disabled state handled correctly?
   - Storybook Accessibility panel: zero violations?

6. Check for anything that should be documented in `docs/DECISIONS.md`.

7. Produce a review summary:
   - **Approved** - list every file reviewed, confirm each passes all checks above
   - **Changes requested** - list each specific issue with the file name and line reference
   - Write summary in review-summary.md

## Stop

Present the review summary and wait for explicit confirmation before doing anything else.
Do not commit. Do not modify any file. Do not take any action.

If the verdict is **Approved**, the task is complete. Committing is the user's responsibility.
If the verdict is **Changes requested**, wait for the user to confirm before looping back to `cmd-implement`.
