---
title: HAN-Agents — Persistent Multi-Agent Coding Harness
shortTitle: HAN-Agents
blurb: An orchestration layer that gives AI coding assistants memory, task planning and verified quality checks.
kind: project
categories: [ai-engineering]
order: 70
status: completed
period: 2025–2026
context: ChainSea Information Integration · AI Engineering Intern (R&D)
contextLogo: { src: /assets/icons/chainsea-official.png, shape: wide, small: true }
contextUrl: https://www.chainsea.com.tw/
summary: >-
  Built a task orchestration layer for AI coding assistants combining a skill layer, live code
  graph, semantic memory, resumable checkpoints, hierarchical tasks, automated Executor → Critic →
  Memory dispatch, and tool-verified quality gates.
results:
  - { value: Weeks → ~1 day, label: to first executable unit-test suite }
  - { value: 8 languages, label: AST-backed code graph support }
stack:
  - { label: GitHub, icon: github }
  - { label: Python, icon: python }
  - { label: TypeScript, icon: typescript }
tags: [Agent Orchestration, Code Graph, Automated Testing]
links:
  - { label: Code ↗, href: 'https://github.com/chuanhan1013/han-agents', external: true }
media:
  badge: AI Engineering
  items:
    - src: /assets/diagrams/han-agents.svg
      alt: HAN-Agents multi-agent coding harness architecture
      caption: System architecture
      fit: diagram
---

## What it does

HAN-Agents keeps AI coding assistants on track across long, multi-step engineering tasks:

- a **skill layer** and a **live code graph** (AST-backed, 8 languages) give agents structured project context;
- **semantic memory** and **resumable checkpoints** persist state between sessions;
- **hierarchical tasks** are dispatched automatically through an Executor → Critic → Memory loop;
- **tool-verified quality gates** check work with real tools before it is accepted.

## Impact

Used for test generation, execution, validation and iterative refinement, it reduced the time to
the first executable unit-test suite from weeks to about one day.
