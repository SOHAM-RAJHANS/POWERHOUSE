# Smart Skill Picker — Design Spec (Hybrid B)
Date: 2026-09-17
Status: draft for review, no implementation yet

## 1. Understanding summary
- What: Hybrid skill + dictionary that turns plain-text task into best OOP-style prompt from installed skills + MCP.
- Why: User doesn't know which skill to use among 373 + ~2000 installed skills.
- Who: User directly, and assistant on user's instruction ("use the engine").
- Constraints: Offline-first, local files only, no server, no auto-run of critical/risk skills, read-only index build.
- Non-goals: No full app framework, no embeddings server, no auto-execution, no whole-PC scan, no system-prompt copying.

## 2. Assumptions
- Skills live in `C:\Users\STUDENT\.config\opencode\skills` and `C:\Users\STUDENT\.agents\skills`.
- Workspace is `C:\Users\STUDENT\Documents\New folder\smart-skill-picker\` (new folder, empty today).
- Skill format is SKILL.md with name/description/tags.
- User confirms top skills before prompt is built (auto + confirm).

## 3. Decision log
- Hybrid over skill-only: chosen for fast browse + stable prompts. Skill-only rescans every time.
- No full app: YAGNI, one HTML file is enough for beautiful picker.
- Offline scoring over embeddings: instant, no deps, works for 2000+ entries.
- OOP-mix template over strict objects: Classic template + `use X for Y` chain, matches user's wording.

## 4. Architecture
```
User / Assistant
  -> smart-skill-picker/SKILL.md (trigger + confirm loop)
  -> skills-index.json (built once, diffable)
  -> search.js (exact x3, keyword x2, tag x1, fuzzy fallback, risk-filter)
  -> prompt-template.md -> final prompt + index.html preview
```
Components have one job each, communicate via JSON + markdown. No component reads outside the two skills dirs + workspace.

## 5. Data flow
1. Input plain text task.
2. Normalize (lowercase, split, remove stopwords).
3. Score all index entries, return top 5 with `why` + `risk`.
4. User ticks/confirms, edits order.
5. Fill template: Task{goal,context,constraints,success} + Skills[]{name,why,method,order} + Tools[MCP] + Execute[steps] + Verify[checks] + Output[format].
6. Copy button / copy-paste block. Assistant can run same flow when told "use the engine".

## 6. Search backend (god-level within offline limits)
- Layers: exact description, keyword, tag, fuzzy (subsequence), risk demotion for `risk: critical/offensive`.
- Output per hit: score, why-picked sentence, when-to-use, risk badge.
- Rebuild: one pass Glob SKILL.md -> parse name/description/tags -> write JSON. Manual re-run when skills change.
- Limits: no semantic understanding beyond tokens. Will miss paraphrases embeddings would catch. Documented, not hidden.

## 7. Frontend (beautiful, minimal)
- One file `index.html`: big input, live top-5 cards (name, why, risk, checkbox), prompt preview, copy button.
- Reads same `skills-index.json` + `prompt-template.md` as SKILL.md. No build step, no framework.
- States: empty, searching, results, confirmed, error (index missing -> show rebuild instruction).

## 8. Error handling
- Index missing/corrupt: show rebuild command, block search.
- No matches: show top 3 closest + ask to rephrase, never invent skill names.
- Critical skill picked: require explicit tick + show AUTHORIZED USE warning, never auto-include.
- Empty task: ask for goal + context.

## 9. Testing
- 5 sample tasks (e.g. "audit skills", "make landing page", "fix flaky test") must return sensible top skill in top 3.
- Template must render with all sections filled, no TBD placeholders.
- HTML opens via file:// and search works without network.
- No skill names hallucinated: every suggested name must exist in index.

## 10. Open questions (none blocking)
- None. Scope is single spec, single plan, single folder.
