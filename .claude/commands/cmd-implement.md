# cmd-implement

Execute the implementation plan produced by `cmd-plan`.

Run after `cmd-plan` is confirmed. Follow the plan exactly: do not improvise.

## Steps

1. Confirm the plan from `cmd-plan` is in context. If not, run `cmd-plan` first.

2. Execute each step in the plan in order.

3. After each file is created or modified:
   - State what was done
   - State what is next

4. Read `~/.claude/CLAUDE.md` in full.

5. Follow all conventions from `CLAUDE.md`:
   - `@nuka/*` alias - no relative imports
   - `--nuka-*` semantic tokens only - no raw Tailwind colors
   - `React.forwardRef` on all DOM-rendering components
   - Type imports: `import type { ... }`
   - CVA definitions go in `<Component>.variants.ts`, not in the component file
   - Hooks go in `src/hooks/`, not `src/utils/`
   - Shared infrastructure contexts go in `src/context/`; component-local contexts go in `<Component>.context.tsx`
   - No implementation code in `index.ts`: re-exports only

6. If a step reveals a problem not anticipated in the plan:
   - Stop immediately
   - Describe the problem clearly
   - Propose a solution
   - Wait for confirmation before continuing

7. Do not run tests or lint during implementation: that is `cmd-test`.

8. When all steps are complete, produce a summary:
   - Files created
   - Files modified
   - Anything that deviated from the plan and why
   - Write summary in implement-summary.md

## Stop

Present the summary and wait for explicit confirmation before doing anything else.
Do not run `cmd-test`. Do not run any commands. Do not take any action.
The next step is the user's decision, not yours.
