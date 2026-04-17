# cmd-test

Verify the implementation is correct and complete.

Run after `cmd-implement` is confirmed. Fix bugs here before proceeding to `cmd-review`.

## Steps

1. Run `npx tsc -p tsconfig.json --noEmit`:
   - If errors: fix them, re-run until clean
   - Report final state

2. Run `npm test`:
   - If failures: diagnose each failure
   - Fix the implementation (not the tests) unless the test is genuinely wrong
   - Re-run until all tests pass
   - Report final state and test count

3. Run `npm run test:eslint-plugin`:
   - If failures: diagnose each failure
   - Fix the plugin rule or its tests depending on the cause
   - Re-run until all tests pass
   - Report final state

4. Run `npm run test:dist`:
   - Requires a built `dist/`. The `pretest:dist` hook handles this automatically.
   - If failures: diagnose each failure
   - Directive drift between source and dist, missing exports, missing type declarations, or broken stylesheet resolution are the common causes
   - Re-run until all tests pass
   - Report final state

5. Run `npm run lint`:
   - If errors: fix them, re-run until clean
   - Do not suppress rules with disable comments unless the rule is genuinely incorrect for the use case — if so, explain why
   - Report final state

6. Run `npm run format:check`
   - If errors: fix them with `npm run format`
   - Report final state

7. If a new component was added:
   - Run `npm run dev` and verify all stories render correctly in Storybook
   - Check the Accessibility panel for each story — zero violations required
   - Verify all variant × intent combinations render as expected

8. If tokens were changed:
   - Run `npm run dev` and verify tokens resolve correctly in browser devtools
   - Check computed styles for affected components

9. Report final status:
   - Typecheck: clean / N errors
   - Tests: N passing / N failing
   - ESLint plugin tests: N passing / N failing
   - Build-output tests: N passing / N failing
   - Lint: clean / N errors
   - Storybook: verified / not applicable

## CI simulation

Once all checks above are passing, run the full pipeline cold in sequence with no fixes:

```bash
npm run typecheck && npm test && npm run test:eslint-plugin && npm run lint && npm run format:check && npm run test:dist
```

This is a single uninterrupted run. Do not fix anything between steps. Do not re-run individual commands. The purpose is to verify the exact state CI will see: no incremental fixes, no partial passes.

Note: `test:dist` triggers a build via its `pretest:dist` hook. No separate `build` step is needed in the chain.

If this command exits with a non-zero code at any step:

- Report which step failed and the full error output
- Stop immediately
- Wait for instruction before making any further changes

If this command exits cleanly, report the full output as the final CI simulation result.

## Stop

Present the CI simulation result and wait for explicit confirmation before doing anything else.
Do not run `cmd-review`. Do not read or modify any file. Do not take any action.
The next step is the user's decision, not yours.

If the CI simulation failed, wait for instruction before looping back to `cmd-implement`.
