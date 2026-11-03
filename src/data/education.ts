/** "Education & Skills" section: degrees, skill groups and awards. */
import { arcLogo, logoFiles, mlmvLogoSmall } from './logos';
import type { Award, EducationEntry, SkillGroup } from './types';

export const education: EducationEntry[] = [
  {
    period: 'Aug 2026–Dec 2027 (expected)',
    school: 'National University of Singapore',
    degree: 'M.Sc. in Robotics',
    brand: { src: logoFiles.nusFullColor, alt: 'National University of Singapore logo', shape: 'wide' },
    details: ['Singapore'],
    research: { label: 'Advanced Robotics Centre (ARC)', logo: arcLogo },
    advisor: 'Prof. Marcelo H. Ang Jr.',
  },
  {
    period: '2022–2026',
    school: 'National Taiwan University',
    degree: 'B.S. in Biomechatronics Engineering',
    brand: { src: logoFiles.ntuEmblem, alt: 'National Taiwan University emblem', shape: 'square' },
    details: ['GPA 3.75 / 4.3 · AI + Mechatronics & Control certificates'],
    research: { label: 'Lab of Machine Learning and Machine Vision', logo: mlmvLogoSmall },
    advisor: 'Prof. Yan-Fu Kuo',
  },
];

export const skills: SkillGroup[] = [
  {
    title: 'Robotics / Systems',
    icon: 'robotics',
    items: [
      { label: 'Robot kinematics' },
      { label: 'geometric modelling' },
      { label: 'Isaac Gym', glyph: 'IG' },
      { label: 'Isaac Lab', glyph: 'IL' },
      { label: 'PID/PD control' },
      { label: 'state machines' },
      { label: 'Raspberry Pi', icon: 'raspberrypi' },
      { label: 'Arduino', icon: 'arduino' },
    ],
  },
  {
    title: 'AI / Perception',
    icon: 'perception',
    items: [
      { label: 'PyTorch', icon: 'pytorch' },
      { label: 'TensorFlow', icon: 'tensorflow' },
      { label: 'OpenCV', icon: 'opencv' },
      { label: 'YOLO' },
      { label: 'CNNs' },
      { label: 'sensor fusion' },
      { label: 'multimodal perception' },
    ],
  },
  {
    title: 'Software / Engineering',
    icon: 'code',
    items: [
      { label: 'Python', icon: 'python' },
      { label: 'C/C++', icon: 'cplusplus' },
      { label: 'TypeScript/JavaScript', icon: 'typescript' },
      { label: 'Linux', icon: 'linux' },
      { label: 'Docker', icon: 'docker' },
      { label: 'Git', icon: 'git' },
      { label: 'CI/CD' },
      { label: 'automated testing' },
      { label: 'AI coding agents (Claude Code, Codex)' },
    ],
  },
  {
    title: 'CAD / Prototyping',
    icon: 'cube',
    items: [{ label: 'SolidWorks' }, { label: '3D printing' }, { label: 'mechatronic system integration' }],
  },
];

export const awards: Award[] = [
  {
    title: 'Fu Bell Award',
    text: "NTU · department's top-ranked incoming student · 2022",
    icon: { src: logoFiles.ntuEmblem, alt: 'National Taiwan University emblem', padding: '5px' },
  },
  {
    title: 'NTU Varsity Basketball',
    text: 'Representative player; led department-team training toward Division 1 promotion · 2024–2025',
    icon: {
      src: 'https://uba.tw/Uploads/TeamBadges/B96C7871-F121-41E1-BD8C-B3B008E0B6AF.png',
      alt: 'National Taiwan University Owls basketball emblem',
      padding: '3px',
      remote: true,
    },
  },
];
