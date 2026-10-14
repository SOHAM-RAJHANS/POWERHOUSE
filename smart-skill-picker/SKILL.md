---
name: smart-skill-picker
description: "Turn plain-text task into best OOP-mix prompt from installed skills. Auto-suggests top 8, user confirms, builds copy-paste prompt. Usable by user and assistant."
---

# Smart Skill Picker

## Use when user doesn't know which skill to use, says "use the engine", or wants best prompt for a task.

1. Ask for task in one line if missing.
2. Run `searchSkills(task, index)` from `search.js` on `skills-index.js` (2445 entries). Show top 8 as: name — why — risk.
3. Ask to confirm/edit ticks and order (max 5). Critical risk entries show AUTHORIZED USE warning, never auto-included.
4. Fill `prompt-template.md` with Task/Skills/Tools/Execute/Verify/Output. Every skill name must come from index.
5. Return full prompt in a code block + one-line why each skill was picked.
