/**
 * Printable CV (`/cv.html`). Wording is CV-specific, so it is kept separate from the
 * portfolio cards; contact details come from `site.ts`.
 */
export interface CvEntry {
  title: string;
  period: string;
  sub?: string;
  bullets?: string[];
}

export const cv = {
  title: 'Chuan-Han Li — CV',
  summary:
    'NUS MSc Robotics student with experience in robot learning, mechatronics, multimodal perception, and AI engineering. Currently researching manipulator motion planning in dynamic environments; interested in robotics, embodied AI, and reliable autonomy.',
  education: [
    {
      title: 'National University of Singapore (NUS) — M.Sc. in Robotics',
      period: '08/2026–12/2027',
      sub: 'Singapore',
    },
    {
      title: 'National Taiwan University (NTU) — B.S. in Biomechatronics Engineering',
      period: '09/2022–06/2026',
      sub: 'GPA 3.75/4.3 · Specialization Program Certificates: Artificial Intelligence; Mechatronics and Control',
    },
  ] satisfies CvEntry[],
  projects: [
    {
      title: 'Bio-Inspired Robot Learning Framework',
      period: 'Spring 2026',
      bullets: [
        'Reproduced the SATA (RSS 2025) torque-based locomotion pipeline and analysed policy behaviour and training stability in simulation.',
        'Adapted the implementation from Isaac Gym to Isaac Lab and examined training behaviour after the migration.',
      ],
    },
    {
      title: 'Autonomous Cleaning Robot (Raspberry Pi + Arduino)',
      period: 'Fall 2025',
      bullets: [
        'Integrated vision, wall-following, obstacle avoidance, and task-execution logic across a Raspberry Pi + Arduino architecture for autonomous competition runs.',
      ],
    },
    {
      title: 'Wearable Basketball Shot Sensing System — Solo',
      period: 'Fall 2025',
      bullets: [
        'Built an end-to-end dual-IMU sensing system spanning wireless acquisition, preprocessing, automated shot segmentation, feature extraction, and a Python web dashboard; received top-tier project recognition and a cash award.',
      ],
    },
    {
      title: 'Amphibious Tracked Vehicle (Triathlon Robot) — Team Lead',
      period: 'Spring 2025',
      bullets: [
        'Led mechanical design and rapid 3D-printed prototyping of a modular tracked vehicle with paddle conversion; one of only two teams to complete all four terrain stages and placed 2nd overall under official scoring.',
      ],
    },
  ] satisfies CvEntry[],
  research: [
    {
      title: 'Motion Planning for Robot Manipulators in Dynamic Environments',
      period: '07/2026–Present',
      sub: 'Advanced Robotics Centre, NUS · Advisor: Prof. Marcelo H. Ang Jr.',
      bullets: [
        'Developing a link-centric surface-distance grid that encodes obstacle proximity by link segment and approach direction; evaluating it as a policy observation for dynamic obstacle avoidance.',
      ],
    },
    {
      title: 'Multimodal Visual–Thermal Fertility Detection',
      period: '09/2024–12/2025',
      sub: 'Lab of Machine Learning and Machine Vision, NTU · Advisor: Prof. Yan-Fu Kuo',
      bullets: [
        'Built a 2-stage object-detection and lightweight-classification pipeline plus a controlled visible + thermal imaging setup for duck eggs; achieved ~93% classification accuracy with cross-modal fusion.',
        'Extended abstract accepted to ACPA 2025; oral presentation.',
      ],
    },
  ] satisfies CvEntry[],
  work: [
    {
      title: 'ChainSea Information Integration Co. Ltd. — AI Engineering Intern (R&D)',
      period: '07/2025–07/2026',
      sub: 'Taipei, Taiwan',
      bullets: [
        'Built HAN-Agents, an AI harness for test generation, execution, validation, and iterative refinement; reduced time to the first executable unit-test suite from weeks to ~1 day.',
        'Developed full-stack AI workflow tools and introduced docs-first engineering practices and repository quality gates across production projects.',
      ],
    },
  ] satisfies CvEntry[],
  skills: [
    {
      label: 'Robotics / Systems',
      text: 'robot kinematics, geometric modelling, Isaac Gym, Isaac Lab, PID/PD control, state machines, Raspberry Pi, Arduino',
    },
    {
      label: 'AI & Perception',
      text: 'PyTorch, TensorFlow, OpenCV, YOLO, CNNs, sensor fusion, multimodal perception',
    },
    {
      label: 'Software & CAD',
      text: 'Python, C/C++, TypeScript/JavaScript, Linux, Docker, Git, CI/CD, automated testing, AI coding agents (Claude Code, Codex), SolidWorks, 3D printing',
    },
    { label: 'Languages', text: 'Mandarin (Native), English (IELTS Academic 7.0)' },
  ],
  awards: [
    { label: 'Fu Bell Award, NTU (2022)', text: "Department's top-ranked incoming student." },
    {
      label: 'Basketball (2024–2025)',
      text: 'NTU varsity player; led department-team training, helping earn Division 1 promotion.',
    },
  ],
};
