---
title: Safe LLM-to-Simulation Pipeline for the Unitree G1
shortTitle: G1 Safe Pipeline
kind: project
categories: [humanoids]
order: 40
status: completed
period: Fall 2026
context: EE5112 Human–Robot Interaction · NUS
team: Team of 3 · execution & integration
summary: >-
  An LLM turns the Unitree G1 robot description into a structured robot model, a deterministic
  kinematics stage checks it, and only gated, limit-checked joint trajectories reach the simulated
  robot. I built the ROS 2 safety bridge and the six-stage orchestrator, and ran every evaluation.
results:
  - {
      value: 20 / 20,
      label: live end-to-end trials with the LLM in the loop,
      plus 4 / 4 tampered models refused,
    }
  - { value: 85 / 85, label: 'safety-bridge test outcomes (17 cases × 5 runs)' }
  - { value: 0.47 ms, label: mean safety-gate decision time }
stack:
  - { label: ROS 2, glyph: R2 }
  - { label: Gazebo, glyph: GZ }
  - { label: Python, icon: python }
  - { label: Linux, icon: linux }
tags: [Safety, LLM Integration, Humanoid, Simulation]
media:
  badge: ROS 2 · Gazebo
  card:
    src: /assets/media/g1/card.mp4
    poster: /assets/media/g1/card-poster.webp
    fit: cover
    alt: The G1 in Gazebo executing gated joint trajectories
  items:
    - src: /assets/media/g1/pipeline-demo.webp
      alt: Gazebo view of the Unitree G1 next to a terminal running all six pipeline stages
      caption: One uncut end-to-end run — all six stages, G1 in Gazebo
    - src: /assets/media/g1/bridge-motions.webp
      alt: Three joint-space poses of the G1 executed through the safety bridge
      caption: Gated joint trajectories executed through the safety bridge
      background: '#e9e9e9'
---

## Pipeline

The pipeline runs in six stages, each reading only the file written by the stage before it:

| Stage            | What happens                                      | Owner    |
| ---------------- | ------------------------------------------------- | -------- |
| 1. Parse         | Deterministic URDF parsing and hashing (no AI)    | team     |
| 2. AI generation | An LLM writes a structured robot model            | teammate |
| 3. Validation    | Schema and deterministic consistency checks       | team     |
| 4. Kinematics    | Forward kinematics and Jacobians with Pinocchio   | teammate |
| 5. Deployment    | Gazebo, controllers and the safety bridge come up | **me**   |
| 6. Commands      | Joint trajectories pass through the safety bridge | **me**   |

## Safety bridge

The bridge sits in front of the simulated G1 joint controller.

- **What it admits.** Only commands for a model that passed validation, whose URDF hash and joint
  set match the robot that is actually running.
- **What it rejects or clips.** Commands that are out of joint limits, too fast, or contain NaN
  values.
- **How it was evaluated.** A 17-case protocol run 5 times, using a fixture model with no AI in the
  loop. The bridge produced the expected outcome in 85/85 runs, with a mean decision time of 0.47 ms.

## End-to-end evaluation

- **Protocol.** 24 trials with the live LLM: 20 normal requests and 4 deliberately tampered or
  mismatched deployments.
- **Result.** All 20 normal requests completed every stage, and all 4 bad deployments were refused.
- **Debugging.** The first run scored 19/20. I traced the failure to a startup race: the bridge
  reported READY before a fresh joint state had arrived. After fixing it, the rerun scored 20/20.

## Limits

- Fixed-base simulation in Gazebo, with no collision checking.
- One robot description and one machine. The trials test pipeline reliability, not how well the
  LLM generalises.
- The robot executes joint trajectories only: no locomotion or manipulation.

## Credits

This was a three-person team project. Teammates built the LLM model generator and the kinematics
compiler; I built, ran and verified the deployment, safety bridge and orchestration stages.
