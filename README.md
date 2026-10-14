# POWERHOUSE

Windows setup prompts and documentation for making skills available to coding agents.

## Contents

- `docs/POWERHOUSE-GLOBAL-SKILLS-SETUP-PROMPT.md` — an agent prompt for safely installing supported coding apps and configuring documented, current-user global skill paths.
- `docs/new-pc-opencode-migration-prompt.md` — an OpenCode migration checklist.
- `docs/skill-provenance-inventory.csv` — source and license fields recorded in bundled agent-skill metadata, where available.
- `docs/superpowers/` — design and planning notes for the offline skill picker.
- `smart-skill-picker/` — offline browser-based skill search and prompt builder.

The bundled `agents-skills/` and `opencode-skills/` skill payloads are not included in this public repository because they contain mixed third-party material and many entries lack license or source metadata. They remain in the original local folder. The provenance inventory records metadata as supplied; it does not independently verify authorship, source, or permission to redistribute. To use the setup prompt, provide a separate local copy of skill folders you are authorized to use.

In the supplied local snapshot, 581 agent skills named a source repository (195 distinct repository values), 461 named an author, and 574 stated a license. These fields overlap and are incomplete; the 373 OpenCode skills supplied no author, source, or license in their frontmatter. Repository owners and license terms have not been independently verified.

## Use

1. Review `docs/POWERHOUSE-GLOBAL-SKILLS-SETUP-PROMPT.md`.
2. On the target PC, provide the agent with the path to your authorized local skill collection and follow the prompt's app-specific verification steps.
3. For OpenCode-only migration, use `docs/new-pc-opencode-migration-prompt.md`.

Do not put API keys, access tokens, private configuration, or other credentials in this repository.
