# cmd-plan

Produce a concrete implementation plan before writing any code.

Run after `cmd-preflight` is confirmed. Do not write code during this step.

## Steps

1. State the task in one sentence.

2. List every file that will be created or modified with a reason for each.

3. Identify which skill applies (if any):
   - New component → `.claude/skills/new-component/SKILL.md`
   - New token → `.claude/skills/new-token/SKILL.md`
   - Adding stories → `.claude/skills/add-story/SKILL.md`
   - Adding tests → `.claude/skills/add-test/SKILL.md`
   - Accessibility work → `.claude/skills/wcag/SKILL.md`
   - Documentation → `.claude/skills/documentation/SKILL.md`

4. If a skill applies, read the relevant `SKILL.md` and its reference files now.

5. List the implementation steps in order. Each step must be:
   - A single, concrete action
   - Verifiable: you can confirm it succeeded
   - Sequenced correctly: dependencies first

6. Identify risks:
   - Breaking changes to public API
   - Token changes that affect multiple components
   - Accessibility implications

7. State the acceptance criteria: what does "done" look like?

8. Write plan in plan.md

## Stop

Present the plan and wait for explicit confirmation before doing anything else.
Do not run `cmd-implement`. Do not create or modify any file. Do not take any action.
The next step is the user's decision, not yours.
