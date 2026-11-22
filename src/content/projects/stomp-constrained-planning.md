---
title: Orientation-Constrained STOMP Planning for a UR5e
shortTitle: Constrained STOMP
blurb: Tuned a STOMP motion planner so a robot arm carries a cup over a wall without collisions or tilting it.
kind: project
categories: [motion-planning]
order: 45
status: completed
period: Fall 2026
context: EE5112 Human–Robot Interaction · NUS
team: Team of 3 · Tasks 4–5
summary: >-
  Designed a cluttered "carry a cup over a wall" scene in which the template STOMP planner fails on
  every seed, tuned it to 10/10 collision-free plans, and added an end-effector orientation cost
  that keeps the cup upright. Every result is a 10-seed study checked against full collision meshes.
results:
  - {
      value: 0 → 10 / 10,
      label: 'collision-free plans, template vs tuned settings (kitchen scene, 10 seeds)',
    }
  - { value: 42.5° → 1.7°, label: median maximum cup tilt without vs with the orientation cost }
stack:
  - { label: MATLAB, glyph: ML }
tags: [STOMP, Trajectory Optimisation, Inverse Kinematics, UR5e]
media:
  badge: Motion Planning
  card:
    src: /assets/media/stomp/card.mp4
    poster: /assets/media/stomp/card-poster.webp
    alt: UR5e carrying a cup through a narrow slot with the cup kept upright
    fit: cover
  items:
    - src: /assets/media/stomp/compare.mp4
      poster: /assets/media/stomp/compare-poster.webp
      alt: >-
        Side-by-side animation of the same kitchen scene: on the left, without the orientation cost,
        the UR5e passes the slot with the cup tilted up to 71 degrees; on the right, with the cost,
        the cup stays within about 1 degree of upright
      caption: Same scene and seed — without (left) vs with (right) the orientation cost
      background: '#ffffff'
    - src: /assets/media/stomp/constrained-path.webp
      alt: UR5e path through a narrow slot with the cup axis kept upright
      caption: With the orientation cost — cup stays upright through the slot
      background: '#ffffff'
    - src: /assets/media/stomp/unconstrained-path.webp
      alt: Unconstrained UR5e path through the slot with the cup tilting
      caption: Without the cost — the cup tilts
      background: '#ffffff'
    - src: /assets/media/stomp/tilt-comparison.webp
      alt: Plot of cup tilt along the trajectory with and without the orientation cost
      caption: Cup tilt along the path, w = 0 vs w = 5
      fit: diagram
---

## Task

On a teammate-built UR5e STOMP planner with product-of-exponentials kinematics, I designed a kitchen
scene in which a 22 cm slot and a kettle defeat the template settings on all 10 seeds.

## What I did

- **Collision-free IK start.** Multi-seed inverse kinematics replaced an elbow-down start that
  passed through the table.
- **Exploration tuning.** Raised the planner from 0/10 to 10/10 collision-free plans.
- **Orientation cost.** Added an L1 end-effector orientation cost, after fixing a template bug that
  zeroed the constraint vector.
- **Weight selection.** Chose the cost weight from a study of 4 weights × 10 seeds. Higher weights
  traded away clearance: at w = 50, 9/10 plans were collision-free.

## Limits

MATLAB simulation of kinematic paths only, with no dynamics.
