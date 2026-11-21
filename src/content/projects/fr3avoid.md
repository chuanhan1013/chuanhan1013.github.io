---
title: FR3Avoid — Learning Whole-Arm Obstacle Avoidance and Return
shortTitle: FR3Avoid
blurb: A Franka arm learns to dodge a moving ball with any part of its body, then return to where it started.
headlineLabel: held-out test scenarios avoided without collision (simulation)
kind: project
categories: [robot-learning, motion-planning]
order: 30
status: completed
period: Fall 2026
context: ME5418 Machine Learning in Robotics · NUS
team: Team of 2 · environment, evaluation & demo video
summary: >-
  A simulated Franka Research 3 arm must dodge a moving obstacle with any part of its body, then
  return to its starting posture. A policy trained from scratch with reinforcement learning
  avoided the obstacle in 596 of 600 held-out test scenarios and returned home in 584; a
  potential-field baseline managed 588 and 579. The learned policy keeps less clearance, though, and
  breaks down under small sensing noise.
results:
  - { value: 596 / 600, label: 'held-out test scenarios avoided (primary seed; APF baseline 588)' }
  - { value: 584 / 600, label: 'avoided and returned to the starting posture (APF baseline 579)' }
  - {
      value: 593 → 289,
      label: 'scenarios avoided with 1 cm of position noise added (APF: 591 → 578, development set)',
    }
stack:
  - { label: Python, icon: python }
  - { label: Gymnasium, glyph: GYM }
  - { label: PyTorch, icon: pytorch }
  - { label: MuJoCo, glyph: MJ }
tags: [Reinforcement Learning, Collision Avoidance, Evaluation, Franka Research 3]
note: >-
  Kinematic simulation with exact obstacle state for every policy; no hardware, no perception.
media:
  badge: Reinforcement Learning
  card:
    src: /assets/media/fr3avoid/card.mp4
    poster: /assets/media/fr3avoid/card-poster.webp
    alt: Rendered Franka arm bending out of the path of an orange ball
    fit: cover
  items:
    - src: /assets/media/fr3avoid/demo-full.mp4
      poster: /assets/media/fr3avoid/demo-full-poster.webp
      full: true
      alt: >-
        Project demo video, 80 seconds: the learned policy bends the arm out of a moving ball's path
        and returns home; side-by-side comparisons with the potential-field baseline; demonstration
        paths in which the ball circles or passes the arm several times; multi-ball scenes, including
        one in which the learned policy fails; a held-out test collision shown as recorded; and the test results
      caption: Full project video (1:20) — rendered from recorded simulator trajectories
      background: '#e9ebee'
    - src: /assets/media/fr3avoid/apf-episode.mp4
      poster: /assets/media/fr3avoid/apf-avoidance.webp
      alt: Kinematic Franka arm moving out of the way of a red obstacle crossing its workspace, then returning home, with per-link clearance heatmaps
      caption: Milestone environment with the potential-field baseline and per-link clearance
      background: '#ffffff'
    - src: /assets/media/fr3avoid/random-collision.webp
      alt: Random policy colliding with the obstacle within a second
      caption: Random actions collide within a second — every test path is a real threat
      background: '#ffffff'
---

## Task

Most avoidance benchmarks protect only the end effector. Here the obstacle may target **any link**,
so the arm has to move whichever part is at risk and then go back to its task posture once the
threat has passed. Every test path is kept only if it would hit an arm that stayed still.

## How it was built

- **Environment (milestone stage).** A kinematic Franka Research 3 model with capsule collision
  geometry checked at 50 Hz, limit-respecting actions, and three stages of obstacle paths: straight,
  curved and mixed.
- **Learning setup (final stage).** The policy outputs a Cartesian avoidance velocity, executed
  through the arm's known kinematics, while a fixed feedback term pulls the arm back home. It was
  trained from scratch with reinforcement learning.
- **Evaluation.** The models were frozen before the test. The 600 held-out scenarios (200 per stage)
  were then run once; no tuning followed.

## Results

| Policy (600 held-out scenarios)    | Avoided | Returned home | Returned and stable |
| ---------------------------------- | ------: | ------------: | ------------------: |
| Learned policy, seed 8 (primary)   |     596 |           584 |                 572 |
| Learned policy, seed 7 (replicate) |     589 |           577 |                 565 |
| Potential field (APF)              |     588 |           579 |                 554 |
| Potential field, matched home gain |     580 |           573 |                 568 |
| Random actions                     |      99 |             0 |                   0 |

The second training seed returned home in 577 scenarios, below the APF's 579, so the learned policy
does not beat the baseline on every seed.

## What did not work

- **Clearance.** The learned policy passes closer to the obstacle: 8.2 cm mean minimum clearance,
  against 16.9 cm for the APF.
- **Sensing noise.** On the development set, 1 cm of noise on the obstacle position cut avoidance
  from 593 to 289 scenarios, while the APF held at 578. A follow-up check linked this to an input
  computed by differencing positions.
- **Several obstacles.** Trained with one obstacle, the policy fails in some multi-ball
  demonstration scenes; the video shows one such failure.

## Relation to my research

The topic overlaps my research at the Advanced Robotics Centre, but this is a separate course
project, with its own simulator, environment, training code and results.

## Credits

- **My partner** designed the final learning setup, trained and froze the policies and ran the
  held-out test.
- **I** built and verified the milestone environment, reproduced the results on a second machine,
  ran the trade-off and noise-robustness analyses, coordinated the report evidence and produced the
  demo video. The video renders recorded trajectories with the Franka FR3 model from MuJoCo
  Menagerie (Apache-2.0), in MuJoCo and Blender.
