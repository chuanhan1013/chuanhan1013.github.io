---
title: FR3Avoid — A Gymnasium Benchmark for Whole-Arm Obstacle Avoidance
kind: project
categories: [robot-learning, motion-planning]
order: 30
status: in-progress
period: Fall 2026
context: ME5418 Machine Learning in Robotics · NUS
team: Team of 2
summary: >-
  A reinforcement-learning environment in which a Franka Research 3 arm must dodge a moving obstacle
  with any part of its body and return home. It includes surface-proximity observations,
  limit-respecting velocity actions, curricula of obstacle paths and evaluation on held-out crossing
  directions. Baselines are in place; training a learned policy is the next stage.
results:
  - { value: 600 / 600, label: evaluation scenarios that hit a stationary arm — every test is a real threat }
  - {
      value: 96.0%,
      label: 'success of a hand-coded potential-field baseline with privileged obstacle state (n = 200)',
    }
stack:
  - { label: Python, icon: python }
  - { label: Gymnasium, glyph: GYM }
  - { label: PyTorch, icon: pytorch }
tags: [Reinforcement Learning, Benchmark Design, Collision Geometry, Franka Research 3]
note: >-
  No learned policy has been trained yet; every success figure comes from a hand-coded baseline, not
  from RL.
media:
  badge: Gymnasium · Benchmark
  items:
    - src: /assets/media/fr3avoid/apf-episode.mp4
      poster: /assets/media/fr3avoid/apf-avoidance.webp
      alt: Kinematic Franka arm moving out of the way of a red obstacle crossing its workspace, then returning home, with per-link clearance heatmaps
      caption: Hand-coded potential-field baseline (not RL) on a mixed obstacle path
      background: '#ffffff'
    - src: /assets/media/fr3avoid/apf-avoidance.webp
      alt: Arm avoiding the obstacle with surface points coloured by clearance
      caption: Arm surface coloured by clearance during avoidance (baseline)
      background: '#ffffff'
    - src: /assets/media/fr3avoid/random-collision.webp
      alt: Random policy colliding with the obstacle within a second
      caption: Random actions collide in 0.7 s — 84–90% collision rate across stages
      background: '#ffffff'
---

## Why this benchmark

Most avoidance benchmarks protect only the end effector. Here the obstacle may target **any link**,
so a policy has to reason about the whole arm, then return to its task pose once the threat has
passed.

## Environment

- **Kinematic model.** A Franka Research 3 model in NumPy (no Franka model files), with capsule
  collision geometry for the links and checks at 50 Hz.
- **Observations.** Joint state, obstacle velocity, and a proximity signal sampled over the arm's
  surface.
- **Actions.** Joint velocities, passed through a braking-curve limiter so that no command can
  violate the FR3's joint limits.
- **Obstacle curricula.** Three stages of obstacle paths: straight, curved and mixed. A path is
  kept only if it would hit an arm that stayed still. Evaluation uses held-out crossing directions.

## Baselines

All baselines were evaluated on held-out crossing directions, with 200 episodes per stage.

| Policy                             | Stage 1            | Stage 2 | Stage 3 |
| ---------------------------------- | ------------------ | ------- | ------- |
| Stationary arm                     | 0% (always hit)    | 0%      | 0%      |
| Random actions                     | 0% (88.5% collide) | 0%      | 0%      |
| Potential field (privileged state) | 98.5%              | 93.5%   | 96.0%   |

The potential-field controller never touched the obstacle; all of its failures were floor
contacts. Because it reads the exact obstacle state, it is an **upper reference** for what a policy
might achieve from observations alone.

## Status and next steps

The team implemented the actor–critic network stage, but it has only been checked with a single
update. **No learned policy has been trained or evaluated yet.**

## Credits

- **My partner** implemented the network stage.
- **I** specified, implemented and verified the environment (independent review passes found and
  fixed six bugs), and produced the baseline results.
