# OOP-mix prompt template
Task{ goal: "{{TASK}}"; context: "{{CONTEXT}}"; constraints: "use only listed skills, no invented names, critical needs approval"; success: "{{SUCCESS}}" }
{{SKILLS}}
Tools[MCP]{ use: "{{MCP}}"; guardrail: "validate args, minimal scope, log calls" }
Execute{ 1 inspect -> 2 plan -> 3 change -> 4 verify -> 5 report }
Verify{ skills exist in index; checks run; residual risk stated }
Output{ files changed; checks; risk }

Skill line format:
Skill[i]{ name: "<name>"; why: "<why>"; method: "use <name> for <when>"; order: <i> }
