/** "Experience" timeline, newest first. */
import { arcLogo, chainseaLogo, mlmvLogo } from './logos';
import type { TimelineEntry } from './types';

export const experience: TimelineEntry[] = [
  {
    when: '2026–Present',
    label: 'CURRENT RESEARCH',
    title: 'Advanced Robotics Centre, NUS',
    logo: arcLogo,
    text: 'Motion planning for robot manipulators among moving obstacles, advised by Prof. Marcelo H. Ang Jr.',
  },
  {
    when: 'Jul 2025–Jul 2026',
    label: 'INDUSTRY · AI ENGINEERING INTERN (R&D)',
    title: 'ChainSea Information Integration Co. Ltd.',
    logo: chainseaLogo,
    text: 'Built HAN-Agents and full-stack AI workflow tools; introduced automated testing and quality gates across production projects.',
    featured: true,
  },
  {
    when: 'Aug 2024–Jul 2025 · Feb–Jun 2026',
    label: 'RESEARCH ASSISTANT',
    title: 'Lab of Machine Learning and Machine Vision · National Taiwan University',
    logo: mlmvLogo,
    text: 'Image annotation and dataset preparation for computer-vision research under Prof. Yan-Fu Kuo, plus independent visual–thermal research.',
  },
];
