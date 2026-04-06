# cmd-test

Verify the implementation is correct and complete.

Run after `cmd-implement`. Fix bugs here before proceeding to `cmd-review`.

## Steps

1. Run `npx tsc -p tsconfig.json --noEmit`:
   - If errors: fix them, re-run until clean
   - Report final state

2. Run `npm test`:
   - If failures: diagnose each failure
   - Fix the implementation (not the tests) unless the test is genuinely wrong
   - Re-run until all tests pass
   - Report final state and test count

3. Run `npm run lint`:
   - If errors: fix them, re-run until clean
   - Do not suppress rules with disable comments unless the rule is genuinely incorrect for the use case: if so, explain why
   - Report final state

4. If a new component was added:
   - Run `npm run dev` and verify all stories render correctly in Storybook
   - Check the Accessibility panel for each story: zero violations required
   - Verify all variant x intent combinations render as expected

5. If tokens were changed:
   - Run `npm run dev` and verify tokens resolve correctly in browser devtools
   - Check computed styles for affected components

6. Report final status:
   - Typecheck: clean / N errors
   - Tests: N passing / N failing
   - Lint: clean / N errors
   - Storybook: verified / not applicable

If all checks pass, proceed to `cmd-review`.
If bugs remain, loop back to `cmd-implement`.
