---
title: Language-Guided Humanoid Manipulation in MuJoCo
shortTitle: Humanoid Manipulation
blurb: A simulated G1 humanoid follows English or Chinese instructions to find, pick up and place objects.
headlineLabel: end-to-end tasks completed in the final test batch (simulation)
kind: project
categories: [humanoids, perception]
order: 10
status: completed
period: Fall 2026
context: EE5112 Human–Robot Interaction · NUS
team: Team of 3 · execution, integration & evaluation
summary: >-
  An English or Chinese instruction drives a simulated Unitree G1 through visual grounding,
  skill planning, robot execution and camera-based verification. I owned execution and led
  integration and evaluation of the complete loop. The team's final frozen batch completed
  24/24 tasks with live model calls and simplified object handling in MuJoCo.
results:
  - { value: 24 / 24, label: 'end-to-end simulation tasks, final frozen batch with live model calls' }
  - { value: 'EN / ZH', label: '4 objects × 2 target regions × 3 instruction phrasings' }
  - {
      value: 24 / 24 + 4 / 4,
      label: 'visible targets grounded, absent targets refused (team result, GPT-5.6 Sol)',
    }
stack:
  - { label: MuJoCo, glyph: MJ }
  - { label: Python, icon: python }
  - { label: Vision–language models, glyph: VLM }
tags: [Unitree G1, Loco-Manipulation, Task Planning, Evaluation]
note: >-
  Task-level evaluation of the complete instruction-to-placement pipeline in MuJoCo.
  Evaluation setup and implementation details are documented below.
media:
  badge: VLM · MuJoCo
  card:
    src: /assets/media/vla/card.mp4
    poster: /assets/media/vla/card-poster.webp
    fit: cover
    alt: The simulated G1 walks to the table and grasps the blue cube
  items:
    - src: /assets/media/vla/demo-cube.mp4
      poster: /assets/media/vla/demo-cube-poster.webp
      alt: >-
        Live demo: the simulated G1 is asked to move the blue cube to the green area, walks to the table,
        grasps the cube with its fingers, carries it and releases it in the green region, with the plan and
        head-camera view overlaid
      caption: '"Move the blue cube into the green area" — instruction to verified placement, live model calls (4× speed)'
    - src: /assets/media/vla/demo-stone-zh.mp4
      poster: /assets/media/vla/demo-stone-zh-poster.webp
      alt: Live demo of a Chinese instruction asking the robot to take the stone to the red area
      caption: Chinese instruction "把石头送到红区域。" — the same execution loop with a different object (4× speed)
    - src: /assets/media/vla/demo-refusal.mp4
      poster: /assets/media/vla/demo-refusal-poster.webp
      alt: Live demo where the requested purple cup is not in the scene and the system asks for clarification instead of acting
      caption: '"Put the purple cup into the red area" — not in the scene, so it asks instead of acting'
---

## The loop

The project connects natural-language requests to verified robot actions. Its main engineering
challenge is making perception, planning and execution work together across a complete task.

1. **Grounding.** A cloud vision–language model finds the named object in the head-camera image,
   and depth turns its box into a metric target.
2. **Planning.** The request becomes a structured skill plan. Requests that are ambiguous,
   infeasible or about absent objects stop and ask for clarification instead of acting.
3. **Execution.** The plan drives the robot: learned walking and crouching policies, IK arm
   control, and motor-level PD.
4. **Verification.** Fresh camera frames check every grasp and placement before the next step
   runs.

## My part

- **Execution and integration.** I owned robot execution and integrated the teammates' grounding
  and planning modules into the complete instruction-to-action loop, including visual checks of
  grasp and placement before proceeding.
- **Evaluation and demonstration.** I ran frozen 24-trial batches, diagnosed failures across the
  integrated system and recorded the live demonstrations. Earlier code versions scored 22, 16,
  15 and 21 of 24 before the final 24/24, with no patches inside a run or pooling across versions.

## Results

| Measure                         | Result                        | Conditions                                                                                                            |
| ------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| End to end (final frozen batch) | 24 / 24                       | 4 objects × 2 regions × 3 EN/ZH phrasings; 204 live API calls, fresh seeds, no retries; see evaluation setup below    |
| Placement error                 | 8.5 cm mean (max 14.5 cm)     | same 24 trials                                                                                                        |
| Offline replay                  | 138 / 144                     | Same execution code under 6 perception-noise seeds, replaying recorded model outputs (tests execution, not the model) |
| Grounding (team)                | 24 / 24 visible, 4 / 4 absent | One frozen 28-image set                                                                                               |
| Planning (team)                 | 24 / 24 expected responses    | 17 generated plans, 5 clarifications, 2 stops; offline, no execution                                                  |

The end-to-end score measures completion of the integrated task loop under these simulation
conditions. I also built the offline replay harness to test execution with recorded model outputs.

## Evaluation setup

The benchmark evaluates the integrated instruction-to-placement loop in one MuJoCo room with
four objects and two target regions. Object handling is simplified as described below.

<details>
<summary>Object-handling implementation and transport diagnosis</summary>

I added perception-driven Dex3 finger grasping as an extension to the task pipeline. The cube is
grasped and released by the fingers; other objects attach at first contact. All objects use wrist
attachment during walking.

I also investigated why a friction grip could not survive walking. The two fingertips sit 5.7 cm
apart, against an 8.4 cm cube face. I measured and rejected twelve alternative fixes, including an
arm-masked walking policy I retrained. The final pipeline uses wrist attachment during transport.

</details>

## Limits

- Simulation only.
- One room, four objects, two target regions and small perturbations.
- Cloud model calls.
- Collision checks are discrete, not swept.
- 24 trials cannot rule out failures rarer than about 1 in 8.

## Credits

- **Teammates.** Grounding, active search and planning are teammates' work. The core codebase
  started from a teammate's import.
- **Third-party policies.** The walking policy comes from Unitree and the crouch policy from Lucky
  Robots.
- **Demo video.** The monitor texture in the scene is blurred.
