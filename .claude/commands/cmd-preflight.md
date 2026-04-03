# cmd-preflight

Establish a shared understanding of the codebase before any work begins.

Run this before every task. Most problems come from starting without understanding.

## Steps

1. Read `CLAUDE.md` in full.

2. Read `docs/DECISIONS.md` to understand architectural context.

3. Identify which files are directly relevant to the task:
   - For a new component: read `src/components/Button/Button.tsx`, `src/styles/tokens.css`, `src/index.ts`
   - For a token change: read `src/styles/tokens.css` in full
   - For a test change: read the relevant component and its existing tests
   - For a story change: read the relevant component and its existing stories

4. Read the relevant files identified above.

5. Run `npx tsc -p tsconfig.json --noEmit` and report current state — clean or errors.

6. Run `npm test` and report current state — passing or failing.

7. Run `npm run lint` and report current state — clean or errors.

8. Summarize findings:
   - What the task requires
   - Which files will be affected
   - Current health of the codebase (typecheck, tests, lint)
   - Any risks or constraints identified

Do not begin implementation until this summary is confirmed.
