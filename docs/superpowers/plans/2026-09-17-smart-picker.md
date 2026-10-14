# Smart Skill Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build local hybrid skill-picker that turns plain text into OOP-mix prompt from installed skills.

**Architecture:** SKILL.md trigger + JSON index + offline scorer + template + single HTML UI, all in `smart-skill-picker/`.

**Tech Stack:** Markdown, JSON, vanilla JS + CSS, no deps, file:// safe.

**Spec:** `docs/superpowers/specs/2026-09-17-smart-picker-design.md`

## Global Constraints
- Offline-first, no server, no network calls.
- Never invent skill names; every suggestion must exist in index.
- Critical/offensive skills require explicit tick + warning, never auto-run.
- Read-only index build from two skills dirs.
- One HTML file, no framework.

---

### Task 1: Index + search backend

**Files:**
- Create: `smart-skill-picker/skills-index.json`
- Create: `smart-skill-picker/search.js`
- Create: `smart-skill-picker/build-index.js`

**Interfaces:**
- Consumes: SKILL.md name/description/tags from two skills dirs.
- Produces: `searchSkills(query, index)` -> [{name, why, score, risk}], `buildPrompt(task, picks)` -> string.

- [ ] **Step 1: Write index with 60 seed entries covering audit, code, marketing, product, compliance, testing**
- [ ] **Step 2: Write scorer exact x3 keyword x2 tag x1 fuzzy fallback + risk demotion**
- [ ] **Step 3: Write builder script to regenerate full index later**
- [ ] **Step 4: Verify search returns top-3 sensible for 5 sample tasks**

### Task 2: Template + SKILL.md

**Files:**
- Create: `smart-skill-picker/prompt-template.md`
- Create: `smart-skill-picker/SKILL.md`

**Interfaces:**
- Consumes: picks from Task 1.
- Produces: filled OOP-mix prompt text.

- [ ] **Step 1: Write template Task/Skills/Tools/Execute/Verify/Output**
- [ ] **Step 2: Write SKILL.md trigger + confirm loop usable by user and assistant**
- [ ] **Step 3: Verify template renders with no TBD**

### Task 3: Frontend

**Files:**
- Create: `smart-skill-picker/index.html`

**Interfaces:**
- Consumes: skills-index.json, search.js, prompt-template.md logic inline.
- Produces: input -> top-5 cards -> tick -> prompt preview -> copy.

- [ ] **Step 1: Write dark premium UI, big input, live cards, preview, copy**
- [ ] **Step 2: Verify opens via file:// with no network**
