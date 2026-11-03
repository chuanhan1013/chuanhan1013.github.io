/** "Experience" timeline, newest first. */
import { arcLogo, chainseaLogo, mlmvLogo } from './logos';
import type { TimelineEntry } from './types';

export const experience: TimelineEntry[] = [
  {
    when: '2026–Present',
    label: 'CURRENT RESEARCH',
    title: 'Advanced Robotics Centre, NUS',
    logo: arcLogo,
    text: 'Researching motion planning for robot manipulators in dynamic environments under Prof. Marcelo H. Ang Jr., with a focus on obstacle representation and reliable autonomy.',
  },
  {
    when: 'Jul 2025–Jul 2026',
    label: 'INDUSTRY · AI ENGINEERING INTERN (R&D)',
    title: 'ChainSea Information Integration Co. Ltd.',
    logo: chainseaLogo,
    text: 'Built HAN-Agents and full-stack AI workflow tools; introduced docs-first engineering practices, automated testing workflows, and repository quality gates across production projects.',
    featured: true,
  },
  {
    when: 'Aug 2024–Jul 2025 · Feb–Jun 2026',
    label: 'RESEARCH ASSISTANT',
    title: 'Lab of Machine Learning and Machine Vision · National Taiwan University',
    logo: mlmvLogo,
    text: 'Supported computer-vision research through image annotation and dataset preparation under Prof. Yan-Fu Kuo, alongside independent multimodal visual–thermal research.',
  },
];
