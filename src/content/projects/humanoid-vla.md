---
title: Language-Guided Humanoid Manipulation in MuJoCo
kind: project
categories: [humanoids, perception]
order: 15
status: completed
period: Fall 2026
context: EE5112 Human–Robot Interaction · NUS
team: Team of 3 · execution, integration & evaluation
summary: >-
  A simulated Unitree G1 takes an English or Chinese request, grounds the target with a
  vision–language model and depth, follows a validated skill plan, then walks, crouches, picks and
  places under MuJoCo physics, checking each grasp and placement with fresh camera frames. In the
  team's final frozen 24-trial batch, every task succeeded end to end.
results:
  - {
      value: 24 / 24,
      label: 'end-to-end tasks, frozen batch with live API calls (4 objects × 2 regions × 3 EN/ZH phrasings)',
    }
  - { value: 138 / 144, label: offline replays of the same execution code under 6 perception-noise seeds }
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
  Simulation only. Only the cube is grasped and released by the fingers; the other objects attach at
  first contact, and every object is held at the wrist while walking.
media:
  badge: VLM · MuJoCo
  items:
    - src: /assets/media/vla/demo-cube.mp4
      poster: /assets/media/vla/demo-cube-poster.webp
      alt: >-
        Live demo: the simulated G1 is asked to move the blue cube to the green area, walks to the table,
        grasps the cube with its fingers, carries it and releases it in the green region, with the plan and
        head-camera view overlaid
      caption: '"Move the blue cube into the green area" — finger grasp, live API calls (4× speed)'
    - src: /assets/media/vla/demo-stone-zh.mp4
      poster: /assets/media/vla/demo-stone-zh-poster.webp
      alt: Live demo of a Chinese instruction asking the robot to take the stone to the red area
      caption: Chinese instruction "把石头送到红区域。" — object attached at contact (4× speed)
    - src: /assets/media/vla/demo-refusal.mp4
      poster: /assets/media/vla/demo-refusal-poster.webp
      alt: Live demo where the requested purple cup is not in the scene and the system asks for clarification instead of acting
      caption: '"Put the purple cup into the red area" — not in the scene, so it asks instead of acting'
---

## The loop

1. **Grounding.** A cloud vision–language model finds the named object in the head-camera image,
   and depth turns its box into a metric target.
2. **Planning.** The request becomes a structured skill plan. Requests that are ambiguous,
   infeasible or about absent objects stop and ask for clarification instead of acting.
3. **Execution.** The plan drives the robot: learned walking and crouching policies, IK arm
   control, and motor-level PD.
4. **Verification.** Fresh camera frames check every grasp and placement before the next step
   runs.

## My part

The team built the pipeline together:

- **Team split.** One teammate built grounding and active search, and another built planning. I
  owned robot execution, then led integration, evaluation, the demo and the final submission.
- **Finger grasp.** I added a perception-driven grasp for the cube using the Dex3 hand's fingers.
- **Carry failure.** I diagnosed why a friction grip could not survive walking. The two fingertips
  sit 5.7 cm apart, against an 8.4 cm cube face. I measured and rejected twelve alternative fixes,
  including an arm-masked walking policy I retrained. The system therefore holds objects at the
  wrist while walking, and the write-up says so.
- **Evaluation.**
  - I built an offline API-replay harness.
  - I ran the frozen 24-trial batches without patching failures inside a run. Earlier code versions
    scored 22, 16, 15 and 21 of 24 before the final 24/24, and results from different versions are
    never pooled.
  - I recorded the live demo shown above.

## Results

| Measure                         | Result                        | Conditions                                                                                                            |
| ------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| End to end (final frozen batch) | 24 / 24                       | 204 live API calls, fresh seeds, no retries; cube by fingers (6/6), other objects attached (18/18)                    |
| Placement error                 | 8.5 cm mean (max 14.5 cm)     | same 24 trials                                                                                                        |
| Offline replay                  | 138 / 144                     | Same execution code under 6 perception-noise seeds, replaying recorded model outputs (tests execution, not the model) |
| Grounding (team)                | 24 / 24 visible, 4 / 4 absent | One frozen 28-image set                                                                                               |
| Planning (team)                 | 24 / 24 expected responses    | 17 generated plans, 5 clarifications, 2 stops; offline, no execution                                                  |

## Limits

- Simulation only.
- One room, four objects, two target regions and small perturbations.
- Only the cube is grasped by friction, and nothing is carried by friction while walking.
- Cloud model calls.
- Collision checks are discrete, not swept.
- 24 trials cannot rule out failures rarer than about 1 in 8.

## Credits

- **Teammates.** Grounding, active search and planning are teammates' work. The core codebase
  started from a teammate's import.
- **Third-party policies.** The walking policy comes from Unitree and the crouch policy from Lucky
  Robots.
- **Demo video.** The monitor texture in the scene is blurred.
- **AI assistance.** I wrote my code with Claude Code and reviewed it with Codex.
