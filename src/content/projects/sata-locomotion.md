---
title: Bio-Inspired Torque-Based Locomotion — SATA Reproduction & Isaac Lab Port
shortTitle: SATA Locomotion
kind: project
categories: [robot-learning]
order: 20
status: completed
period: Spring 2026
context: Adaptive Control Systems · NTU
team: Individual course project
summary: >-
  Reproduced SATA (RSS 2025) torque-based quadruped locomotion on Isaac Gym, ablated its bio-inspired
  actuator mechanisms across 48 policies, and tested robustness and actuator feasibility. Then ported
  the full stack to Isaac Lab, documenting the fidelity fixes and comparing it term by term against
  the Gym reference.
results:
  - { value: 48 policies, label: 'evaluated across actuator ablations, 8 seeds each' }
  - {
      value: 42.5 vs 22.5 N·m,
      label: 'peak torque without the activation model vs the reference (simulation, 8 seeds)',
    }
stack:
  - { label: Isaac Gym, glyph: IG }
  - { label: Isaac Lab, glyph: IL }
  - { label: Python, icon: python }
  - { label: PyTorch, icon: pytorch }
tags: [Reinforcement Learning, Torque Control, Quadruped, Unitree Go2]
links:
  - {
      label: Reproduction & ablations ↗,
      href: 'https://github.com/chuanhan1013/bio-inspired-adaptive-locomotion',
      external: true,
    }
  - {
      label: Isaac Lab port ↗,
      href: 'https://github.com/chuanhan1013/isaaclab-torque-locomotion',
      external: true,
    }
media:
  badge: Robot Learning
  card:
    src: /assets/media/sata/card.mp4
    poster: /assets/media/sata/card-poster.webp
    fit: cover
    alt: Quadruped walking on rough terrain
  items:
    - src: /assets/media/sata-rough-walk.gif
      alt: Quadruped locomotion policy trained in Isaac Lab, replayed on rough terrain in the Isaac Gym viewer
      caption: Isaac Lab-trained policy, replayed in Isaac Gym
      background: '#101820'
    - src: /assets/media/sata/actuator-feasibility.webp
      alt: Bar charts of peak torque, energy per step and jerk for the reference policy and each ablation
      caption: Actuator feasibility per ablation — peak torque, energy, jerk
      fit: diagram
    - src: /assets/media/sata-stairs.gif
      alt: Isaac Gym reference policy traversing stairs
      caption: Isaac Gym reference · stair traversal
      background: '#101820'
    - src: /assets/media/sata-early-crawl.gif
      alt: Early reward-bug locomotion behaviour during development
      caption: Early iteration · reward bug
      background: '#101820'
---

## Question

SATA trains torque-controlled quadruped policies whose actuators mimic muscle activation, fatigue
and growth. Which of those mechanisms actually matter, and do they keep the policy within what a
real actuator could deliver?

## Reproduction and ablations

- **Reproduction.** Reproduced the reference on Isaac Gym with a Unitree Go2 over 8 seeds,
  including one seed that collapsed late in training.
- **Ablations.** Removed each bio-inspired mechanism in turn (8 seeds each), then evaluated all 48
  policies out of distribution.
- **Finding.** Removing activation or fatigue **raised** training reward but pushed the policy
  outside a realisable actuator envelope:
  - without activation, peak torque reached 42.5 N·m, against 22.5 N·m for the reference;
  - without fatigue, energy per step rose 2.5× and jerk 35×.

  All of this is simulation only.

- **Negative result.** A stance-gated PD residual added for payload compensation did not reach
  significance.

## Isaac Lab port

I then ported the full stack to Isaac Lab, including effort control, the bio-actuator, growth
scheduling and rough terrain, and documented the fixes needed to keep it faithful.

The port walks, but it does **not** match the Gym reference: its reward was 76.8 ± 16.2 against
103.6 ± 16.0 (8 seeds each). The per-term comparison traces most of the gap to a definitional
difference in the joint-acceleration term.

## Limits

Simulation only, with no thermal model. The remaining gap in episode length between the two
engines is unexplained.
