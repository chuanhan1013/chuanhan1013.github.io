---
title: DRL-Based Collision-Free Motion Planning in Dynamic Environments
kind: research
categories: [motion-planning, robot-learning]
order: 10
status: ongoing
period: 2026–Present
context: Advanced Robotics Centre, NUS · Advisor Prof. Marcelo H. Ang Jr.
contextLogo: { src: /assets/icons/nus-vertical.jpg, shape: portrait }
summary: >-
  Researching learning-based reaching and collision avoidance for a 7-DoF manipulator among moving
  obstacles, in simulation. A learned risk-aware selector decides when a reinforcement-learning
  avoidance policy should take over from a nominal reaching policy, and when to hand back.
tags: [Manipulation, Motion Planning, Reinforcement Learning, Dynamic Obstacles, Franka Research 3]
links:
  - { label: FR3 platform ↗, href: 'https://franka.de/franka-research-3', external: true }
note: >-
  Research in progress. This page describes the research questions and the system design only;
  unpublished results are not shown.
media:
  badge: NUS ARC · Ongoing
  items:
    - src: /assets/diagrams/dynur-architecture.svg
      alt: >-
        System architecture: the simulated scene feeds an observation of arm state, goal and proximity
        along the arm to a learned risk-aware selector, which hands control either to a nominal reaching
        policy from the lab or to a learned avoidance policy; their output passes a joint-feasibility
        guard (joint limits only) and returns to the scene as a joint command. A geometry layer generates
        scenarios and audits runs for collisions, and an evaluation harness checks every run.
      caption: System architecture (conceptual)
      fit: diagram
    - src: /assets/diagrams/dynur.svg
      alt: Method diagram for dynamic manipulator motion planning and link-centric obstacle representation
      caption: Research-method overview
      fit: diagram
    - src: https://franka.de/hubfs/20220920_Franka_Research1771.jpg
      alt: Franka Research 3 robot platform
      caption: Franka Research 3 · Franka Robotics
      fit: cover
      remote: true
---

## Research questions

A manipulator working near people and other machines has to keep reaching its goal while
obstacles move through its workspace. Avoidance must protect the **whole arm**, not just the
gripper, and it must react on the timescale of the obstacle's motion. The project asks:

1. **When to yield.** When should the arm interrupt reaching to avoid a moving obstacle, and when
   should it hand control back?
2. **What to observe.** What should an avoidance policy know about obstacles along the whole arm,
   so it can tell which part is at risk and from which direction?
3. **How to tell it works.** How can a learned controller be shown to beat a simple, well-tuned
   baseline, rather than only looking good on favourable scenarios?

## System

The work splits reaching and avoidance instead of training one policy to do both:

- **Nominal reaching policy.** An existing reaching policy from the lab drives the arm towards its
  goal when nothing is in the way.
- **Learned avoidance policy.** A reinforcement-learning policy takes over to move the arm out of an
  obstacle's path.
- **Risk-aware selector.** A learned selector watches the scene and decides when to hand control to
  the avoidance policy and when to hand it back.
- **Geometry and safety layer.**
  - Exact arm–obstacle distance is used to generate test scenarios and to audit every run for
    collisions.
  - A joint-feasibility guard keeps commands within the joint limits. It is not an obstacle
    guarantee: avoiding obstacles is the learned components' job.
- **Evaluation.** Protocols are fixed before a run, controllers are compared on paired scenarios,
  and simple baselines and blind controls are always included. Negative results are reported as
  readily as gains.

## Current direction

The current work is on the observation: a **surface-proximity** representation that describes,
for each region of the arm's surface, how far the nearest obstacle is, in which direction, and how
fast it is approaching.

## Status

This is ongoing work at the Advanced Robotics Centre, NUS, and is currently in simulation. Results
will be shared here once they are published.

## Credits

The nominal reaching policy was developed by a senior labmate. The research is supervised by Prof.
Marcelo H. Ang Jr.
