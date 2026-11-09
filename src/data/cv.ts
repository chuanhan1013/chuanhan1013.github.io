/**
 * Printable CV (`/cv.html`). Wording is CV-specific, so it is kept separate from the
 * portfolio cards; contact details come from `site.ts`.
 *
 * Source of truth: the private repository `chuanhan1013/cv-private` (`src/general.tex`).
 * Shared entries mirror its wording; this page may list more projects. Never copy its
 * phone number, and leave out A*STAR until the owner says it can be published.
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
    'NUS MSc Robotics student with experience in motion planning, robot learning, and hardware–software integration.',
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
        'Designed capture-point control for hands-off recovery, pelvic assistance or harness catch. In 2,000 pendulum-model perturbations, recovery without a catch was 54.6% vs 9.6% for a threshold lock at a matched ~5% fall rate.',
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
        'Owned robot execution and led integration on a simulated Unitree G1; added perception-driven Dex3 finger grasping and visual grasp/place verification.',
        'Completed 24/24 end-to-end simulation tasks (finger grasp for the cube; contact attachment for other objects).',
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
        'Reproduced SATA and evaluated 48 PPO policies across actuator ablations; ported effort control and bio-actuator models from Isaac Gym to Isaac Lab, retrained across 8 seeds, and analysed cross-engine reward differences.',
      ],
    },
    {
      title: 'Autonomous Cleaning Robot (Raspberry Pi + Arduino)',
      period: 'Fall 2025',
      bullets: [
        'Integrated camera, ultrasonic and IMU sensing with motor control via Raspberry Pi–Arduino serial communication; implemented wall-following, visual hazard avoidance, and task execution on a physical mobile robot.',
      ],
    },
    {
      title: 'Wearable Basketball Shot Sensing System — Solo',
      period: 'Fall 2025',
      bullets: [
        'Independently built a dual-IMU wearable with Arduino firmware and 100 Hz wireless acquisition; implemented shot segmentation, feature extraction, and a FastAPI/WebSocket dashboard for live analysis and replay.',
        'Received top-tier project recognition and a cash award.',
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
      title: 'DRL-Based Collision-Free Motion Planning in Dynamic Environments',
      period: '07/2026–Present',
      sub: 'Advanced Robotics Centre, NUS · Advisor: Prof. Marcelo H. Ang Jr.',
      bullets: [
        'Implemented exact whole-arm distance and collision checks on the lab’s arm model for dynamic obstacle avoidance.',
        'Built training and closed-loop simulation pipelines to compare reaching/avoidance baselines and diagnose failure modes in dynamic environments.',
      ],
    },
    {
      title: 'Multimodal Visual–Thermal Fertility Detection',
      period: '09/2024–12/2025',
      sub: 'Lab of Machine Learning and Machine Vision, NTU · Advisor: Prof. Yan-Fu Kuo',
      bullets: [
        'Built a two-stage detection/classification pipeline and visible–thermal imaging setup for duck eggs; achieved ~93% accuracy through multimodal fusion.',
        'Presented the work at ACPA 2025 as an extended abstract and oral presentation.',
      ],
    },
  ] satisfies CvEntry[],
  work: [
    {
      title: 'ChainSea Information Integration Co. Ltd. — AI Engineering Intern (R&D)',
      period: '07/2025–07/2026',
      sub: 'Taipei, Taiwan',
      bullets: [
        'Built HAN-Agents with persistent memory, AST-backed code graphs, hierarchical task orchestration, and tool-verified quality gates for AI coding workflows.',
        'Delivered full-stack AI tools for test generation and validation; reduced time to the first executable unit-test suite from weeks to ~1 day.',
      ],
    },
  ] satisfies CvEntry[],
  skills: [
    { label: 'Programming & Web', text: 'Python, C/C++, Java, Assembly, TypeScript/JavaScript, React' },
    {
      label: 'Robotics',
      text: 'ROS/ROS 2, motion planning, collision checking, forward/inverse kinematics, PID/PD control',
    },
    {
      label: 'AI & Perception',
      text: 'PyTorch, TensorFlow, NumPy, OpenCV, YOLO, reinforcement learning, sensor fusion, VLMs',
    },
    { label: 'Simulation', text: 'MuJoCo, Gazebo, CoppeliaSim, Isaac Gym, Isaac Lab, Gymnasium' },
    {
      label: 'Engineering Tools',
      text: 'Linux, Git, Docker, CI/CD, automated testing, Claude Code, Codex',
    },
    { label: 'Hardware & CAD', text: 'Raspberry Pi, Arduino, SolidWorks, 3D printing' },
    { label: 'Languages', text: 'Mandarin (native); English (IELTS Academic 7.0)' },
  ],
  awards: [
    { label: 'Fu Bell Award, NTU (2022)', text: "Department's top-ranked incoming student." },
    {
      label: 'Basketball (2024–2025)',
      text: 'NTU varsity player; led department-team training, helping earn Division 1 promotion.',
    },
  ],
};
