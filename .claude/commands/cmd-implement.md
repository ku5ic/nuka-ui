# cmd-implement

Execute the implementation plan produced by `cmd-plan`.

Run after `cmd-plan` is confirmed. Follow the plan exactly: do not improvise.

## Steps

1. Confirm the plan from `cmd-plan` is in context. If not, run `cmd-plan` first.

2. Execute each step in the plan in order.

3. After each file is created or modified:
   - State what was done
   - State what is next

4. Follow all conventions from `CLAUDE.md`:
   - `@nuka/*` alias — no relative imports
   - `--nuka-*` semantic tokens only — no raw Tailwind colors
   - `React.forwardRef` on all DOM-rendering components
   - Type imports: `import type { ... }`

5. If a step reveals a problem not anticipated in the plan:
   - Stop immediately
   - Describe the problem clearly
   - Propose a solution
   - Wait for confirmation before continuing

6. Do not run tests or lint during implementation: that is `cmd-test`.

7. When all steps are complete, produce a summary:
   - Files created
   - Files modified
   - Anything that deviated from the plan and why

## Stop

Present the summary and wait for explicit confirmation before doing anything else.
Do not run `cmd-test`. Do not run any commands. Do not take any action.
The next step is the user's decision, not yours.
