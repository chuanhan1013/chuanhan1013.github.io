---
title: Multimodal Visual–Thermal Fertility Detection
blurb: Classifies duck-egg fertility by fusing visible and thermal images.
kind: research
categories: [perception]
order: 20
status: completed
period: 2024–2025
context: Lab of Machine Learning and Machine Vision, NTU · Advisor Prof. Yan-Fu Kuo
contextLogo: { src: /assets/icons/mlmv-lab.png, shape: square, small: true }
summary: >-
  Built a two-stage object-detection and lightweight-classification pipeline together with a
  controlled visible + thermal imaging setup for duck eggs. Cross-modal fusion reached ~93%
  classification accuracy, compared with 92% visible-only and 90% thermal-only baselines.
results:
  - { value: '~93%', label: cross-modal fusion }
  - { value: 92% / 90%, label: visible / thermal baselines }
  - { value: ACPA 2025, label: extended abstract · oral }
stack:
  - { label: Python, icon: python }
  - { label: PyTorch, icon: pytorch }
  - { label: OpenCV, icon: opencv }
tags: [Computer Vision, Thermal Imaging, Sensor Fusion, YOLO]
media:
  badge: ACPA 2025
  items:
    - src: /assets/media/egg-setup.webp
      alt: Controlled visible + thermal imaging setup and illuminated egg tray
      caption: Imaging setup · visible + thermal acquisition
      background: '#f6f3ef'
    - src: /assets/media/egg-visible-thermal-preprocess.webp
      alt: Perspective transformation for visible and thermal duck egg images
      caption: Visible + thermal preprocessing
      background: '#f6f3ef'
    - src: /assets/media/egg-crops.webp
      alt: Detected duck eggs cropped into fertilized, unfertilized, and invalid samples
      caption: Detection → per-egg crops
      background: '#f6f3ef'
    - src: /assets/media/egg-rgb-result.webp
      alt: RGB classification result with normalized confusion matrix
      caption: RGB baseline · 92% accuracy
      background: '#f6f3ef'
    - src: /assets/media/egg-thermal-result.webp
      alt: Thermal classification result with normalized confusion matrix
      caption: Thermal baseline · 90% accuracy
      background: '#f6f3ef'
    - src: /assets/media/egg-fusion-result.webp
      alt: Cross-modal fusion metrics and normalized confusion matrix
      caption: Cross-modal fusion · 93% accuracy
      background: '#f6f3ef'
---

## Approach

- **Imaging setup.** A controlled rig captures visible and thermal images of illuminated duck-egg trays.
- **Stage 1: detection.** An object detector (YOLO) localises every egg and produces per-egg crops in both modalities.
- **Stage 2: classification.** A lightweight classifier labels each crop as fertilized, unfertilized or invalid.

## Results

| Input              | Accuracy |
| ------------------ | -------- |
| Visible (RGB) only | 92%      |
| Thermal only       | 90%      |
| Cross-modal fusion | ~93%     |

The work was presented as an extended abstract with an oral presentation at ACPA 2025.
