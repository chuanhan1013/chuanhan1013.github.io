---
title: Wearable Basketball Shot Sensing System
kind: project
categories: [perception, mechatronics]
order: 50
status: completed
period: Fall 2025
context: Mechatronics II · NTU
team: Solo
summary: >-
  Built an end-to-end dual-IMU wearable sensing system spanning 100 Hz wireless acquisition,
  preprocessing, automated shot segmentation, feature extraction, replay, labeling, and a Python
  web dashboard.
stack:
  - { label: Arduino, icon: arduino }
  - { label: Python, icon: python }
  - { label: FastAPI, icon: fastapi }
tags: [Dual IMU, WebSocket, Signal Processing]
links:
  - { label: Code ↗, href: 'https://github.com/chuanhan1013/mechatronic_2_ntu_bime_2025', external: true }
media:
  badge: Solo Project
  items:
    - src: /assets/media/basketball-setup.webp
      alt: Basketball sensing prototype, receiver electronics, and dashboard setup
      caption: Prototype + receiver + dashboard
    - src: /assets/media/basketball-wearable.webp
      alt: Wearable basketball sensing electronics mounted on the arm
      caption: Wearable electronics prototype
    - src: /assets/media/basketball-dashboard.webp
      alt: Close view of the wearable sensor and live dashboard traces
      caption: Live dashboard traces
    - src: /assets/media/basketball-demo-still.webp
      alt: Dual-IMU wearable basketball sensing demo with the wearable hardware and live traces visible
      caption: Wearable sensing demo · original recording frame
      background: '#0d1720'
    - src: /assets/diagrams/imu-basketball.svg
      alt: Dual-IMU basketball shot sensing system architecture
      caption: System architecture
      fit: diagram
---

## Pipeline

1. **Acquisition.** Two IMUs on the shooting arm stream wirelessly at 100 Hz to an Arduino receiver.
2. **Processing.** Signals are preprocessed, shots are segmented automatically, and features are
   extracted per shot.
3. **Tooling.** A Python web dashboard (FastAPI + WebSocket) shows live traces and supports replay
   and labeling.

The project received top-tier recognition and a cash award in the course.
