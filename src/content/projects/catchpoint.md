---
title: CatchPoint — Recoverability-Aware Balance Assistance
shortTitle: CatchPoint
kind: project
categories: [control]
order: 12
status: completed
period: Fall 2026
context: ME5412 Robotics for Healthcare · NUS
team: Team of 5 · concept originator, control lead & technical integrator
summary: >-
  A walker safety layer for reactive-step gait training: it lets the patient recover with their own
  step when they can, applies the smallest pelvic nudge when that step would fall short, and catches
  only when assistance cannot help. Evaluated with a Monte Carlo pendulum model, a statics study of an
  unbuilt walker design, and a MuJoCo humanoid demonstration.
results:
  - {
      value: 54.6% vs 9.6%,
      label: 'recovered without a harness catch vs threshold lock, at ~5% falls (simulation)',
    }
  - { value: −23 pp, label: harness catches vs a capture-point trigger, same fall rate (simulation) }
  - { value: 175 N, label: 'median catch force vs 382–481 N for threshold baselines (simulation)' }
stack:
  - { label: Python, icon: python }
  - { label: MuJoCo, glyph: MJ }
  - { label: Monte Carlo, glyph: MC }
tags: [Capture Point, Linear Inverted Pendulum, Rehabilitation Robotics, Control]
links:
  - { label: Live site ↗, href: 'https://chuanhan1013.github.io/catchpoint/', external: true }
  - { label: Code ↗, href: 'https://github.com/chuanhan1013/catchpoint', external: true }
note: Simulation and design study — not a built device and not clinically validated.
media:
  badge: Control · Simulation
  card:
    src: /assets/media/catchpoint/card.mp4
    poster: /assets/media/catchpoint/push-comparison-poster.webp
    alt: The same push under no assistance, a threshold lock and CatchPoint
    fit: contain
    background: '#ffffff'
  items:
    - src: /assets/media/catchpoint/three-states.webp
      alt: Three assistance states shown on a humanoid replay — hands-off, pelvic nudge and harness catch
      caption: Hands-off · nudge · catch — kinematic replay (Unitree G1 model)
      background: '#ffffff'
    - src: /assets/media/catchpoint/push-comparison.mp4
      poster: /assets/media/catchpoint/push-comparison-poster.webp
      alt: The same 180 N push on a simulated walking humanoid with no robot, a threshold lock, and CatchPoint
      caption: Same 180 N push — fall · lock · nudge (MuJoCo, Unitree G1 policy)
      background: '#ffffff'
    - src: /assets/media/catchpoint/how-it-decides.webp
      alt: Diagram comparing the capture point with the patient's own step-reach region to decide when to assist
      caption: How it decides — capture point vs the patient's own reach
      fit: diagram
    - src: /assets/media/catchpoint/pareto.webp
      alt: Plot of fall rate against self-recovery rate for each controller family
      caption: Falls vs self-recovery per controller (pendulum Monte Carlo)
      fit: diagram
    - src: /assets/media/catchpoint/walker-concept.webp
      alt: Concept render of the cable-supported walker with a mannequin user
      caption: Walker concept render — unbuilt design (mannequin © Mixamo/Adobe)
      fit: cover
---

## Problem

Stroke patients relearn balance by practising reactive steps, which only works if the patient is
allowed to step. Support systems that trigger on a fixed threshold either **lock too early**,
taking the step away, or **too late**, after a fall is already under way.

## Idea

CatchPoint asks a per-patient question at every instant: _can this patient's own next step still
capture their balance?_

1. **Hands-off.** If the delay-compensated capture point lies inside the patient's reachable step
   region, the controller does nothing.
2. **Nudge.** If the step would fall short, it applies the **minimum-norm pelvic force** (capped at
   150 N) that brings the capture point back within reach.
3. **Catch.** If no allowed force can make the step sufficient, it escalates to a harness catch.

## Evaluation

All results below are simulation-only, with frozen result files.

- **Model and trials.** A linear-inverted-pendulum Monte Carlo of 50 synthetic patients × 40 pushes
  gives 2,000 identical trials per controller, with sensing and actuation delays modelled.
- **Baselines.** No robot, a threshold lock, a capture-point threshold, and an always-on spring,
  each tuned to a matched ~5% fall rate.
- **Statistics.** Confidence intervals come from a patient-cluster bootstrap.

| Outcome                          | CatchPoint         | Comparison                                                                          |
| -------------------------------- | ------------------ | ----------------------------------------------------------------------------------- |
| Falls                            | 4.75% [3.45, 6.20] | threshold lock 4.95%                                                                |
| Recovered on own feet (no catch) | 54.6%              | threshold lock 9.6% (paired +45.0 pp [41.7, 48.5])                                  |
| Harness catches                  | 40.7%              | capture-point threshold 63.7% (paired −23.0 pp [−26.7, −19.9]); falls not different |
| Median catch force               | 175 N              | 382–481 N                                                                           |

A **MuJoCo demonstration** puts an impaired, walking Unitree G1 policy in a cable walker. On 48
held-out pushes it showed 0 falls (threshold lock: 5), but CatchPoint nudged on 33 of the 48.

## What did not work

- **Physics robot.** The pendulum step-reach model did not predict the physics robot's falls
  (AUC 0.51–0.61). The physics demo therefore uses an empirically recalibrated variant.
- **Model sensitivity.** CatchPoint is the most model-dependent controller: falls rise to 6.95% if
  patients step 15% short, and to 12.3% with 30% identification error.
- **Unnecessary help.** 178 of 408 nudges went to patients who would have recovered alone.
- **No fall reduction.** Against the always-on spring, catches are not lower. No fall-reduction
  claim is made.

## My role

I proposed the concept, which the five-person team then adopted. I also:

- led the control design;
- built the simulation studies, the walker sizing analysis and the MuJoCo demonstration;
- integrated the team's slides and ran the review process.

The presentation was split into five parts. Each teammate took over one part, checked its numbers
and presented it. One teammate also led the clinical framing and audited the competitor comparison.
The implementation went through 23 independent review rounds.

The Unitree G1 model is used under its BSD-3-Clause licence. The mannequin in the concept render is
© Mixamo/Adobe.
