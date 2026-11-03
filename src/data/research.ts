/** "Research" section cards (numbered 01, 02, … in order). */
import { arcLogo, logoFiles, mlmvLogoSmall } from './logos';
import type { FeatureCard } from './types';

const media = (file: string) => `/assets/media/${file}`;

export const research: FeatureCard[] = [
  {
    id: 'dynamic-manipulator-planning',
    title: 'Motion Planning for Robot Manipulators in Dynamic Environments',
    meta: 'Advanced Robotics Centre, NUS · Advisor: Prof. Marcelo H. Ang Jr. · 2026–Present',
    chip: { label: 'Advanced Robotics Centre · NUS', logo: arcLogo },
    summary:
      'Developing obstacle representations for learning-based motion planning in dynamic scenes, including a link-centric surface-distance grid that encodes obstacle proximity by link segment and approach direction for use as a policy observation.',
    tags: ['Manipulation', 'Motion Planning', 'RL Observation', 'Dynamic Obstacles', 'Franka Research 3'],
    links: [{ label: 'FR3 platform ↗', href: 'https://franka.de/franka-research-3', external: true }],
    note: 'Research in progress. Public portfolio intentionally shows the research direction rather than unpublished internal results.',
    media: {
      label: 'NUS dynamic manipulator research media',
      badge: 'NUS ARC · Ongoing',
      items: [
        {
          src: 'https://franka.de/hubfs/20220920_Franka_Research1771.jpg',
          alt: 'Franka Research 3 robot platform',
          caption: 'Franka Research 3 · Franka Robotics',
          fit: 'photo',
          remote: true,
        },
        {
          src: '/assets/diagrams/dynur.svg',
          alt: 'Method diagram for dynamic manipulator motion planning and link-centric obstacle representation',
          caption: 'Research-method overview',
          fit: 'diagram',
        },
      ],
    },
  },
  {
    id: 'visual-thermal-fertility',
    title: 'Multimodal Visual–Thermal Fertility Detection',
    meta: 'Lab of Machine Learning and Machine Vision, NTU · Advisor: Prof. Yan-Fu Kuo · 2024–2025',
    metaLogo: mlmvLogoSmall,
    chip: {
      label: 'Machine Learning & Machine Vision Lab · NTU',
      logo: { src: logoFiles.mlmvLab, shape: 'badge', abbr: 'MLMV' },
    },
    summary:
      'Built a two-stage object-detection and lightweight-classification pipeline together with a controlled visible + thermal imaging setup for duck eggs. Cross-modal fusion reached ~93% classification accuracy, compared with 92% visible-only and 90% thermal-only baselines.',
    results: [
      { value: '~93%', label: 'cross-modal fusion' },
      { value: '92% / 90%', label: 'visible / thermal baselines' },
      { value: 'ACPA 2025', label: 'extended abstract · oral' },
    ],
    tags: ['Computer Vision', 'Thermal Imaging', 'Sensor Fusion', 'YOLO'],
    media: {
      label: 'Duck egg visible and thermal fertility research media',
      badge: 'ACPA 2025 · REAL EXPERIMENT MEDIA',
      items: [
        {
          src: media('egg-setup.webp'),
          alt: 'Controlled visible + thermal imaging setup and illuminated egg tray',
          caption: 'Imaging setup · visible + thermal acquisition',
          fit: 'flush',
          background: '#f6f3ef',
        },
        {
          src: media('egg-visible-thermal-preprocess.webp'),
          alt: 'Perspective transformation for visible and thermal duck egg images',
          caption: 'Visible + thermal preprocessing',
          fit: 'flush',
          background: '#f6f3ef',
        },
        {
          src: media('egg-crops.webp'),
          alt: 'Detected duck eggs cropped into fertilized, unfertilized, and invalid samples',
          caption: 'Detection → per-egg crops',
          fit: 'flush',
          background: '#f6f3ef',
        },
        {
          src: media('egg-rgb-result.webp'),
          alt: 'RGB classification result with normalized confusion matrix',
          caption: 'RGB baseline · 92% accuracy',
          fit: 'flush',
          background: '#f6f3ef',
        },
        {
          src: media('egg-thermal-result.webp'),
          alt: 'Thermal classification result with normalized confusion matrix',
          caption: 'Thermal baseline · 90% accuracy',
          fit: 'flush',
          background: '#f6f3ef',
        },
        {
          src: media('egg-fusion-result.webp'),
          alt: 'Cross-modal fusion metrics and normalized confusion matrix',
          caption: 'Cross-modal fusion · 93% accuracy',
          fit: 'flush',
          background: '#f6f3ef',
        },
      ],
    },
  },
];
