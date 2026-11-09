/** "Engineering & AI Systems" section cards (numbering continues after research). */
import { chainseaLogoSmall } from './logos';
import type { FeatureCard, MediaItem } from './types';

const media = (file: string) => `/assets/media/${file}`;
const code = (href: string) => ({ label: 'Code ↗', href, external: true });

/** Letterboxed photo on the cleaning-robot card's flat background. */
const cleaningSlide = (file: string, alt: string, caption: string): MediaItem => ({
  src: media(file),
  alt,
  caption,
  fit: 'contain',
  padding: '6px',
  background: '#eef3f7',
});

export const projects: FeatureCard[] = [
  {
    id: 'han-agents',
    title: 'HAN-Agents — Persistent Multi-Agent Coding Harness',
    meta: 'ChainSea Information Integration · AI Engineering Intern (R&D)',
    metaLogo: chainseaLogoSmall,
    summary:
      'Built a task orchestration layer for AI coding assistants combining a skill layer, live code graph, semantic memory, resumable checkpoints, hierarchical tasks, automated Executor → Critic → Memory dispatch, and tool-verified quality gates.',
    results: [
      { value: 'Weeks → ~1 day', label: 'to first executable unit-test suite' },
      { value: '8 languages', label: 'AST-backed code graph support' },
    ],
    platforms: [
      { label: 'GitHub', icon: 'github' },
      { label: 'Python', icon: 'python' },
      { label: 'TypeScript', icon: 'typescript' },
    ],
    links: [code('https://github.com/HanLi-Chainsea/han-agents')],
    media: {
      label: 'HAN-Agents architecture',
      badge: 'AI ENGINEERING',
      items: [
        {
          src: '/assets/diagrams/han-agents.svg',
          alt: 'HAN-Agents multi-agent coding harness architecture',
          fit: 'diagram',
        },
      ],
    },
  },
  {
    id: 'sata-locomotion',
    title: 'Bio-Inspired Robot Learning Framework',
    meta: 'Adaptive Control · Spring 2026',
    summary:
      'Reproduced the SATA (RSS 2025) torque-based locomotion pipeline, analysed policy behaviour and training stability, and migrated the implementation from Isaac Gym to Isaac Lab.',
    platforms: [
      { label: 'Isaac Lab', glyph: 'IL' },
      { label: 'Isaac Gym', glyph: 'IG' },
      { label: 'Python', icon: 'python' },
      { label: 'PyTorch', icon: 'pytorch' },
    ],
    tags: ['Isaac Lab', 'Isaac Gym', 'Torque Control', 'Robot Learning'],
    links: [code('https://github.com/chuanhan1013/isaaclab-torque-locomotion')],
    media: {
      label: 'SATA robot learning media',
      badge: 'ROBOT LEARNING',
      items: [
        {
          src: media('sata-rough-walk.gif'),
          alt: 'Quadruped locomotion policy replay on rough terrain in Isaac Lab',
          caption: 'Rough-terrain replay · final policy',
          fit: 'flush',
          background: '#101820',
        },
        {
          src: media('sata-early-crawl.gif'),
          alt: 'Early reward-bug locomotion behaviour during development',
          caption: 'Early iteration · reward bug',
          fit: 'flush',
          background: '#101820',
        },
        {
          src: media('sata-stairs.gif'),
          alt: 'Isaac Gym reference policy traversing stairs',
          caption: 'Isaac Gym reference · stair traversal',
          fit: 'flush',
          background: '#101820',
        },
      ],
    },
  },
  {
    id: 'basketball-sensing',
    title: 'Wearable Basketball Shot Sensing System',
    meta: 'Mechatronics II · Fall 2025 · Solo',
    summary:
      'Built an end-to-end dual-IMU wearable sensing system spanning 100 Hz wireless acquisition, preprocessing, automated shot segmentation, feature extraction, replay, labeling, and a Python web dashboard.',
    platforms: [
      { label: 'Arduino', icon: 'arduino' },
      { label: 'Python', icon: 'python' },
      { label: 'FastAPI', icon: 'fastapi' },
    ],
    tags: ['Arduino', 'Dual IMU', 'FastAPI', 'WebSocket', 'Signal Processing'],
    links: [code('https://github.com/chuanhan1013/mechatronic_2_ntu_bime_2025')],
    media: {
      label: 'Basketball sensing project media',
      badge: 'SOLO PROJECT',
      items: [
        {
          src: media('basketball-setup.webp'),
          alt: 'Basketball sensing prototype, receiver electronics, and dashboard setup',
          caption: 'Prototype + receiver + dashboard',
          fit: 'contain',
        },
        {
          src: media('basketball-wearable.webp'),
          alt: 'Wearable basketball sensing electronics mounted on the arm',
          caption: 'Wearable electronics prototype',
          fit: 'contain',
        },
        {
          src: media('basketball-dashboard.webp'),
          alt: 'Close view of the wearable sensor and live dashboard traces',
          caption: 'Live dashboard traces',
          fit: 'contain',
        },
        {
          src: media('basketball-demo-still.webp'),
          alt: 'Dual-IMU wearable basketball sensing demo with the wearable hardware and live traces visible',
          caption: 'Wearable sensing demo · original recording frame',
          fit: 'flush',
          background: '#0d1720',
        },
        {
          src: '/assets/diagrams/imu-basketball.svg',
          alt: 'Dual-IMU basketball shot sensing system architecture',
          caption: 'System architecture',
          fit: 'diagram',
        },
      ],
    },
  },
  {
    id: 'cleaning-robot',
    title: 'Autonomous Cleaning Robot',
    meta: 'Mechatronics IV · Fall 2025 · Group 10',
    summary:
      'Built an autonomous competition robot integrating Raspberry Pi vision, Arduino-based control, wall-following, obstacle sensing, red-zone recognition, and a custom vacuum module developed through CAD, airflow simulation, prototyping, and testing.',
    results: [
      { value: '113 pts', label: 'final score' },
      { value: '70 pts', label: 'time-based performance' },
    ],
    platforms: [
      { label: 'Raspberry Pi', icon: 'raspberrypi' },
      { label: 'Arduino', icon: 'arduino' },
      { label: 'OpenCV', icon: 'opencv' },
    ],
    tags: ['Raspberry Pi', 'Arduino', 'Computer Vision', 'Control', 'CAD / CFD'],
    links: [code('https://github.com/chuanhan1013/mechatronic_4_ntu_bime_2025_group10')],
    media: {
      label: 'Autonomous cleaning robot project media',
      badge: 'AUTONOMOUS SYSTEMS',
      background: '#eef3f7',
      items: [
        cleaningSlide(
          'cleaning-final.webp',
          'Final autonomous cleaning robot prototype',
          'Final integrated prototype',
        ),
        cleaningSlide('cleaning-cad.webp', 'Final CAD layout of the autonomous cleaning robot', 'System CAD'),
        cleaningSlide(
          'cleaning-cfd.webp',
          'CFD airflow simulation for the robot vacuum module',
          'Suction CFD',
        ),
      ],
    },
  },
  {
    id: 'triathlon-robot',
    title: 'Terrain-Adaptive Triathlon Robot',
    meta: 'Mechanical Design · Spring 2025 · Team project',
    summary:
      'Designed and fabricated a transformable tracked robot for four distinct stages — ramp, narrow beam, water channel, and wind tunnel. I focused on modelling and 3D-printing the chassis, gearbox, and paddle-wheel mechanisms, then iterated the drivetrain, centre-of-mass placement, and amphibious guidance hardware through repeated tests.',
    results: [
      { value: '4 / 4', label: 'competition stages completed' },
      { value: '2nd', label: 'overall official ranking' },
    ],
    platforms: [
      { label: 'CAD', glyph: 'CAD' },
      { label: '3D Printing', glyph: '3D' },
      { label: 'Mechanical Design', glyph: 'ME' },
    ],
    tags: ['SolidWorks', '3D Printing', 'Tracked Drive', 'Mechanical Design'],
    media: {
      label: 'Triathlon robot project media',
      badge: 'MECHANICAL DESIGN · TEAM LEAD',
      items: [
        {
          src: media('triathlon-amphibious.webp'),
          alt: 'Final amphibious configuration of the terrain-adaptive triathlon robot',
          caption: 'Final amphibious configuration',
          fit: 'cover',
          position: '50% 76%',
        },
        {
          src: media('triathlon-water-config.webp'),
          alt: 'Water-channel configuration of the transformed triathlon robot',
          caption: 'Water-channel transformed configuration · report Fig. 2-11',
          fit: 'contain',
        },
        {
          src: media('triathlon-beam.webp'),
          alt: 'Terrain-adaptive tracked robot configured for narrow-beam traversal',
          caption: 'Beam-stage configuration',
          fit: 'contain',
        },
        {
          src: media('triathlon-printing.webp'),
          alt: '3D-printing the robot wheel and transmission components',
          caption: 'Rapid 3D-printed fabrication',
          fit: 'contain',
        },
        {
          src: media('triathlon-water-course.webp'),
          alt: 'Water-channel and ramp test course used for the triathlon robot competition',
          caption: 'Water / ramp stage',
          fit: 'contain',
        },
        {
          src: media('triathlon-wind-course.webp'),
          alt: 'Wind-tunnel test enclosure used for the triathlon robot competition',
          caption: 'Wind-tunnel stage',
          fit: 'contain',
        },
        {
          src: media('triathlon-competition.webp'),
          alt: 'Final triathlon robot competition showcase with all teams',
          caption: 'Competition-day showcase',
          fit: 'contain',
        },
      ],
    },
  },
];
