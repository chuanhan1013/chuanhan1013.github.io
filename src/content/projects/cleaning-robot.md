---
title: Autonomous Cleaning Robot
shortTitle: Cleaning Robot
kind: project
categories: [mechatronics, perception]
order: 22
status: completed
period: Fall 2025
context: Mechatronics IV · NTU
team: Group 10
summary: >-
  Built an autonomous competition robot integrating Raspberry Pi vision, Arduino-based control,
  wall-following, obstacle sensing, red-zone recognition, and a custom vacuum module developed
  through CAD, airflow simulation, prototyping, and testing.
results:
  - { value: 113 pts, label: final score }
  - { value: 70 pts, label: time-based performance }
stack:
  - { label: Raspberry Pi, icon: raspberrypi }
  - { label: Arduino, icon: arduino }
  - { label: OpenCV, icon: opencv }
tags: [Computer Vision, Control, CAD / CFD]
links:
  - {
      label: Code ↗,
      href: 'https://github.com/chuanhan1013/mechatronic_4_ntu_bime_2025_group10',
      external: true,
    }
media:
  badge: Autonomous Systems
  card:
    src: /assets/media/cleaning-final.webp
    alt: Final autonomous cleaning robot prototype
    fit: cover
    position: 50% 45%
  items:
    - src: /assets/media/cleaning-final.webp
      alt: Final autonomous cleaning robot prototype
      caption: Final integrated prototype
      background: '#eef3f7'
    - src: /assets/media/cleaning-cad.webp
      alt: Final CAD layout of the autonomous cleaning robot
      caption: System CAD
      background: '#eef3f7'
    - src: /assets/media/cleaning-cfd.webp
      alt: CFD airflow simulation for the robot vacuum module
      caption: Suction CFD
      background: '#eef3f7'
---

## System

- **Perception.** Raspberry Pi vision recognises red zones on the arena floor.
- **Control.** Arduino-based control runs wall-following and obstacle sensing.
- **Task logic.** Task-execution logic coordinates both for autonomous competition runs.
- **Vacuum module.** Custom-designed and iterated through CAD, CFD airflow simulation, prototyping
  and testing.

The robot scored 113 points in the final competition, 70 of them from time-based performance.
