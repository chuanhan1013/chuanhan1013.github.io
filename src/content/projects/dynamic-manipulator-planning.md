---
title: Motion Planning for Robot Manipulators in Dynamic Environments
kind: research
categories: [motion-planning, robot-learning]
order: 10
status: ongoing
period: 2026–Present
context: Advanced Robotics Centre, NUS · Advisor Prof. Marcelo H. Ang Jr.
contextLogo: { src: /assets/icons/nus-vertical.jpg, shape: portrait }
summary: >-
  Researching learning-based reaching and collision avoidance for a 7-DoF manipulator among moving
  obstacles, in simulation — including how a policy should perceive obstacles along the whole arm,
  and how to evaluate such controllers rigorously against simple baselines.
tags: [Manipulation, Motion Planning, Reinforcement Learning, Dynamic Obstacles, Franka Research 3]
links:
  - { label: FR3 platform ↗, href: 'https://franka.de/franka-research-3', external: true }
note: >-
  Research in progress. Public portfolio intentionally shows the research direction rather than
  unpublished internal results.
media:
  badge: NUS ARC · Ongoing
  items:
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

## Research direction

A manipulator working near people and other machines has to keep reaching its goal while
obstacles move through its workspace. Avoidance must protect the **whole arm**, not just the
gripper, and it must react on the timescale of the obstacle's motion.

The project explores:

- **Learning-based control** for reaching and avoidance on a 7-DoF arm;
- **Obstacle representations** that describe proximity along the arm's links, so a policy can
  tell which part of the arm is at risk and from which direction;
- **Evaluation methodology**: comparing learned controllers against simple, well-tuned baselines
  under fixed protocols, and reporting negative results as readily as gains.

## Status

This is ongoing work at the Advanced Robotics Centre, NUS, and is currently in simulation. Results
and method details will be shared here once they are published.
