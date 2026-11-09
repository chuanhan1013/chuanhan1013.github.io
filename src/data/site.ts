/** Identity, contact details and page-level copy shared by the portfolio and the CV. */
import type { IconName } from '@/lib/icons';
import type { Link } from './types';

export const person = {
  name: 'Chuan-Han Li',
  location: 'Singapore',
  email: 'chuanhan1013@gmail.com',
  website: 'https://chuanhan1013.github.io',
  github: 'https://github.com/chuanhan1013',
  linkedin: 'https://linkedin.com/in/chuanhan-li',
} as const;

export const seo = {
  title: 'Chuan-Han Li — Robotics & Embodied AI',
  description:
    'Chuan-Han Li — Robotics, embodied AI, motion planning, multimodal perception, and reliable autonomy.',
  ogDescription:
    'Research and engineering portfolio in robotics, embodied AI, motion planning, multimodal perception, and AI engineering.',
  themeColor: '#f7f9fc',
} as const;

export const nav: Link[] = [
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
];

export const profile = {
  avatar: { src: '/assets/media/profile-chuanhan.jpg', alt: 'Chuan-Han Li' },
  role: 'M.Sc. Robotics · National University of Singapore',
  links: [
    { icon: 'mail', label: 'Email', href: `mailto:${person.email}` },
    { icon: 'github', label: 'GitHub', href: person.github, external: true },
    { icon: 'linkedin', label: 'LinkedIn', href: person.linkedin, external: true },
  ] satisfies (Link & { icon: IconName })[],
};

export const hero = {
  eyebrow: 'Robotics · Embodied AI',
  /** The words inside {…} are highlighted. */
  headline: 'I build robotic systems across perception, planning, and {reliable autonomy}.',
  ledes: [
    'My current research focuses on deep reinforcement learning for robot manipulator motion planning in dynamic environments.',
    'With a background spanning biomechatronics, multimodal perception, robot learning, and AI/software engineering, I am interested in embodied AI systems that can perceive, reason, and act reliably in the physical world.',
  ],
  openTo: 'Open to robotics, embodied AI, AI systems, and research engineering opportunities in Singapore.',
  facts: [
    { term: 'Based in', value: person.location },
    { term: 'Education', value: 'M.Sc. Robotics, NUS · B.S. Biomechatronics, NTU' },
    { term: 'Focus', value: 'Robotics · Embodied AI · AI Engineering · Software Engineering' },
  ],
  interests: [
    'Deep Reinforcement Learning',
    'Motion Planning',
    'Embodied AI',
    'Multimodal Perception',
    'Reliable Autonomy',
  ],
};

export const footer = {
  text: 'Designed as a research-engineering portfolio. Built with semantic HTML, CSS, and hand-authored SVG diagrams.',
  links: [
    { label: 'Email', href: `mailto:${person.email}` },
    { label: 'GitHub', href: person.github },
    { label: 'LinkedIn', href: person.linkedin },
  ] satisfies Link[],
};
