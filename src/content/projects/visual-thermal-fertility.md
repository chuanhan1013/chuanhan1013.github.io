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
contextUrl: https://www.mlmvlab.bime.ntu.edu.tw/?lang=en
summary: >-
  Built a controlled visible + thermal imaging setup for duck eggs and a two-stage pipeline: YOLOv8n
  finds each egg, and ResNet18 classifies every crop. The 4,290 eggs were labelled by hand by
  researchers at the Taiwan Livestock Research Institute's Eastern Region Branch in Yilan.
  Fusing the two modalities with cross-modal attention reached ~93% accuracy, against 92% and 90%
  for the same pipeline on visible or thermal images alone.
results:
  - { value: '~93%', label: cross-modal fusion }
  - { value: 92% / 90%, label: visible / thermal baselines }
  - { value: ACPA 2025, label: extended abstract · oral }
stack:
  - { label: Python, icon: python }
  - { label: PyTorch, icon: pytorch }
  - { label: OpenCV, icon: opencv }
tags: [Computer Vision, Thermal Imaging, Sensor Fusion, YOLOv8, ResNet18]
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
      alt: Detected duck eggs cropped into fertilised, unfertilised, and invalid samples
      caption: Detection → per-egg crops
      background: '#f6f3ef'
    - src: /assets/media/egg-rgb-result.webp
      alt: RGB classification result with normalised confusion matrix
      caption: RGB baseline · 92% accuracy
      background: '#f6f3ef'
    - src: /assets/media/egg-thermal-result.webp
      alt: Thermal classification result with normalised confusion matrix
      caption: Thermal baseline · 90% accuracy
      background: '#f6f3ef'
    - src: /assets/media/egg-fusion-result.webp
      alt: Cross-modal fusion metrics and normalised confusion matrix
      caption: Cross-modal fusion · 93% accuracy
      background: '#f6f3ef'
---

## Approach

- **Imaging setup.** A controlled rig captures visible and thermal images of illuminated duck-egg trays.
- **Stage 1: detection.** YOLOv8n draws a bounding box around every egg, and each egg is cropped out
  of the image in both modalities.
- **Stage 2: classification.** A ResNet18 classifier labels each crop as fertilised, unfertilised or
  invalid.
- **Single-modality baselines.** The same pipeline, trained on visible or on thermal crops alone.
- **Fusion.** Visible and thermal features are combined partway through the network (mid-level
  fusion) with cross-modal attention, so each modality can draw on the other before the final
  classification.

## Data

- **Scale.** Each tray holds 165 eggs. The dataset covers 13 trays in each of two batches:
  165 × 13 × 2 = 4,290 eggs.
- **Ground truth.** <span class="logo-mark logo-square is-small" aria-hidden="true"><img src="/assets/icons/tlri-emblem.png" alt="" loading="lazy" decoding="async"></span>
  Every egg was labelled by hand by researchers at the
  [Eastern Region Branch](https://english.tlri.gov.tw/view.php?theme=web_structure&id=222) (Yilan)
  of the Taiwan Livestock Research Institute (TLRI), Ministry of Agriculture.

## Results

| Input                                   | Accuracy |
| --------------------------------------- | -------- |
| Visible (RGB) only                      | 92%      |
| Thermal only                            | 90%      |
| Mid-level fusion, cross-modal attention | ~93%     |

The work was presented as an extended abstract with an oral presentation at ACPA 2025.
