# Prompt v2 Blueprint (Research-to-Execution)

This document turns research findings into concrete, maintainable prompt behavior.

## Why this exists
The original prompt produced strong aesthetics but mixed hard constraints, soft heuristics, and occasional contradictions.

Prompt v2 standardizes execution around:
1. **Controllability** (machine-checkable plan before code)
2. **Incremental editability** (edit-local default)
3. **Verification** (quality gate + preflight checklist)
4. **Operational resilience** (optional tool fallbacks)

## Execution model

`Intent -> Plan -> Build -> Verify -> Refine`

### 1) Intent
- Ask discovery questions only when requirements are genuinely missing.
- If context is sufficient, proceed directly.

### 2) Plan (Design Contract)
Output a compact contract before implementation:
- artifact type
- audience + outcome
- stack
- layout/component map
- required states (loading/empty/error)
- accessibility + performance constraints

### 3) Build
- Semantic, mobile-first, dark-mode-first implementation.
- Use design dials and section structure from contract.

### 4) Verify
- Responsive behavior
- contrast/a11y
- interaction state coverage
- dependency/tailwind compatibility

### 5) Refine
- For micro-requests, patch only targeted areas.
- Full regeneration only when user asks for broad redesign.

## Edit-local policy (default)
When user asks for a small change:
- modify only requested section/component
- preserve existing visual system unless explicitly changed
- return concise change summary (what + where)

## Fallback policy
If `image-generator` is unavailable:
- keep deterministic placeholders (`picsum.photos`, `placehold.co`)
- preserve meaningful alt text
- do not block delivery

## Quality KPIs
Use these as acceptance checks:
- **A11y:** WCAG AA contrast target
- **State coverage:** interactive blocks include loading/empty/error
- **Responsiveness:** no horizontal scroll, mobile collapse for asymmetric layouts
- **Performance:** animations restricted to transform/opacity
- **Iteration cost:** small requests handled via local edits, not full rewrites

## Suggested rollout plan

### 48h
- Apply Prompt v2 pipeline language in `prompt.md`
- remove contradictory color examples (`bg-black`)
- add optional image-generator fallback

### 2 weeks
- Expand section templates with compact Design Contract snippets
- add regression examples for edit-local behavior

### 1-2 months
- Introduce automated lint-like checks for prompt outputs
- gather failure patterns and feed back into anti-pattern + checklist sections

## Notes
- This blueprint is implementation-oriented and intentionally concise.
- Keep `prompt.md` as the operational source-of-truth.
