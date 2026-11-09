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
      title: 'CatchPoint — Recoverability-Aware Balance Assistance (ME5412, NUS) — Team of 5',
      period: 'Fall 2026',
      bullets: [
        'Proposed the concept adopted by the team and led its control design: a capture-point controller that stays hands-off, applies a minimum-norm pelvic nudge, or escalates to a harness catch.',
        'In a 2,000-push pendulum Monte Carlo, 54.6% of pushes were recovered without a harness catch vs 9.6% for a threshold lock at a matched ~5% fall rate (simulation); built the walker sizing study and a MuJoCo humanoid demonstration.',
      ],
    },
    {
      title: 'Safe LLM-to-Simulation Pipeline for the Unitree G1 (EE5112, NUS) — Team of 3',
      period: 'Fall 2026',
      bullets: [
        'Built the ROS 2 safety bridge and six-stage orchestrator that gate LLM-generated robot models before any joint command reaches the simulated G1; 20/20 live end-to-end trials with 4/4 tampered models refused, 85/85 bridge test outcomes.',
      ],
    },
    {
      title: 'Language-Guided Humanoid Manipulation in MuJoCo (EE5112, NUS) — Team of 3',
      period: 'Fall 2026',
      bullets: [
        'Owned robot execution and led integration, evaluation and the live demo for a language → VLM grounding → plan → walk-and-manipulate loop on a simulated Unitree G1; final frozen batch 24/24 end-to-end with live API calls (finger grasp for the cube, contact attachment for other objects; simulation).',
        'Diagnosed why friction grasps failed during walking, built an offline API-replay harness (138/144 under perception noise), and added a perception-driven Dex3 finger grasp.',
      ],
    },
    {
      title: 'FR3Avoid — Gymnasium Benchmark for Whole-Arm Obstacle Avoidance (ME5418, NUS) — Team of 2',
      period: 'Fall 2026',
      bullets: [
        'Specified and verified a Franka Research 3 environment with capsule collision geometry, a braking-curve action limiter and held-out obstacle directions; a privileged potential-field baseline reaches 96% success (RL training is the next stage).',
      ],
    },
    {
      title: 'Bio-Inspired Torque-Based Locomotion — SATA Reproduction & Isaac Lab Port',
      period: 'Spring 2026',
      bullets: [
        'Reproduced SATA (RSS 2025) on Isaac Gym and ablated its actuator mechanisms across 48 policies: removing activation or fatigue raised reward but exceeded a realisable actuator envelope (peak torque 42.5 vs 22.5 N·m, simulation).',
        'Ported the full stack to Isaac Lab and traced the remaining reward gap to the Gym reference term by term.',
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
        'Researching learning-based reaching and collision avoidance for a 7-DoF manipulator among moving obstacles (simulation), with a focus on whole-arm obstacle representations and baseline-controlled evaluation.',
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
