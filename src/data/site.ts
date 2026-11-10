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
  /** One plain line under the name. */
  tagline: 'I build robotic systems across perception, planning, and reliable autonomy.',
  /** Scannable facts instead of paragraphs. `live` marks the availability line. */
  facts: [
    { term: 'Now', value: 'M.Sc. Robotics at NUS · research at the Advanced Robotics Centre' },
    { term: 'Research', value: 'Deep RL for manipulator motion planning in dynamic environments' },
    { term: 'Based in', value: person.location },
    { term: 'Open to', value: 'Robotics, embodied AI and research engineering roles', live: true },
  ] as { term: string; value: string; live?: boolean }[],
  /** Background film: an illustration of the research theme, labelled as such on the page. */
  film: {
    src: '/assets/media/dynur/arm-studio.mp4',
    poster: '/assets/media/dynur/arm-studio-poster.webp',
    note: 'Illustration · whole-arm avoidance',
    href: '/projects/dynamic-manipulator-planning.html',
  },
};

export const footer = {
  text: 'Robotics and embodied AI portfolio. Built with Astro.',
  links: [
    { label: 'Email', href: `mailto:${person.email}` },
    { label: 'GitHub', href: person.github },
    { label: 'LinkedIn', href: person.linkedin },
  ] satisfies Link[],
};
