# POWERHOUSE

Windows setup prompts and documentation for making skills available to coding agents.

## Public repository contents

- `docs/POWERHOUSE-GLOBAL-SKILLS-SETUP-PROMPT.md` — an agent prompt for safely installing supported coding apps and configuring documented, current-user global skill paths.
- `docs/new-pc-opencode-migration-prompt.md` — an OpenCode migration checklist.

The bundled `agents-skills/`, `opencode-skills/`, and `smart-skill-picker/` payloads are intentionally not included in this public repository because redistribution rights for the full collection have not been verified. They remain in the original local folder. To use the setup prompt, provide a separate local copy of the skill folders that you are authorized to use.

## Use

1. Review `docs/POWERHOUSE-GLOBAL-SKILLS-SETUP-PROMPT.md`.
2. On the target PC, provide the agent with the path to your authorized local skill collection and follow the prompt's app-specific verification steps.
3. For OpenCode-only migration, use `docs/new-pc-opencode-migration-prompt.md`.

Do not put API keys, access tokens, private configuration, or other credentials in this repository.
