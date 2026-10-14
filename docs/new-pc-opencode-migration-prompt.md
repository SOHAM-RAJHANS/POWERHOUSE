# New-PC OpenCode migration prompt (paste this into OpenCode on the NEW system)

> Copy everything below the line into OpenCode on the new PC. Fill the [BRACKETS] first.
> You must first copy the folders from the old PC via USB/drive/cloud — no prompt can fetch them over the network by itself.

---

You are my OpenCode setup agent on a NEW, empty Windows PC. Goal: give this machine the same power as my old one — all skills, the smart picker, runtimes, MCP servers — verified, nothing left behind. Work read-only until I approve writes. Never ask for or print secrets.

STEP 0 — CONTEXT I GIVE YOU:
- Old PC skills folders (I have copied them to this new PC at the SAME paths, or tell you where):
  1. `C:\Users\STUDENT\.config\opencode\skills` (expected ~373 skills)
  2. `C:\Users\STUDENT\.agents\skills` (expected ~2120 skills, combined total with above = 2493 in the supplied snapshot)
- My smart picker project folder (copied): `[PATH TO smart-skill-picker, e.g. Documents\New folder\smart-skill-picker]`
- My old `~/.config/opencode/opencode.json` MCP + provider section (I will paste ONLY non-secret parts below, tokens re-entered fresh by me when asked):
[PASTE sanitized mcp/provider/skills.paths block here, NO tokens]

STEP 1 — VERIFY ENVIRONMENT (read-only first):
1. `Get-Location`, list the two skills paths above. Report: do they exist? Count `*/SKILL.md` in each (the supplied snapshot has 373 and 2120).
2. Check runtimes: `python3 --version`, `node --version`. If missing, tell me the exact official install steps and STOP until I confirm — do not download silently.
3. Read `https://opencode.ai/config.json` schema before writing ANY config (opencode hard-fails on invalid config).

STEP 2 — RESTORE OPENCODE CONFIG (only after my approval):
1. Show me the current `~/.config/opencode/opencode.json` (or that it is missing).
2. Propose merged config preserving `$schema: https://opencode.ai/config.json`, keeping my pasted `skills.paths`, `mcp` (with `command` as ARRAY, `type` required, tokens as `{env:VAR}` never inline), providers, permissions. Ask approval, then write. Remind me to quit + restart opencode.

STEP 3 — RESTORE SMART PICKER + FULL INDEX (leave nothing behind):
1. Confirm `smart-skill-picker/` contains: SKILL.md, prompt-template.md, search.js, skills-index.js, skills-index.json, and index.html.
2. Validate the supplied index against the two skills folders (walk for `**/SKILL.md`, compare names and counts; never invent names). The supplied snapshot has 2,493 source skills total (373 OpenCode + 2,120 agent skills), but the current picker index contains 2,445 entries and is not a complete match. No index-builder script is included in this folder; report the discrepancy and do not claim the index is rebuilt or complete unless a verified builder is available.
3. Smoke test with node: queries `audit my skills for prompt injection` (expect audit-skills top-3), `make a landing page` (expect landing-page-generator top-3), `fix flaky playwright test` (expect playwright-pro top-3). Report counts + top hits.
4. Open `index.html` checklist: status dot green + `index ready: N skills`, cards render on typing, tick ≤5, Build prompt, Copy works on file:// (no fetch — script-tag load only).

STEP 4 — MCP + TOOLS + SKILLS FINDER (execution):
1. Re-add MCP servers ONE by one from my pasted block. For each: validate shape against schema, enable, ask me for its token fresh (never reuse old tokens from chat). Do not print secrets.
2. Confirm skill loader sees `**/SKILL.md` (count again), commands in `.opencode/command/`, agents in `.opencode/agent/`.
3. Final report: table of [skills opencode count, skills agents count, index count, node/python versions, MCP servers enabled, smoke tests PASS/FAIL, restart reminder]. List anything missing as follow-ups — leave nothing unreported.

RULES: read-only until approval; no secret output; no whole-PC scans beyond the listed folders; validate every config edit against the schema URL; if counts differ by >5 from expected, STOP and show diff before continuing.
