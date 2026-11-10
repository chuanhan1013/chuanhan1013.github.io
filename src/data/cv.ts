/**
 * Printable CV (`/cv.html`).
 *
 * This mirrors the owner's private CV source, `chuanhan1013/cv-private` (`src/general.tex`):
 * same sections, same order, same entries and wording. When that file changes, update this
 * one to match. Two deliberate differences: the phone number is never published here, and
 * the A*STAR entry stays out until the owner says it can go public.
 */
export interface CvEntry {
  /** Bold heading, left. */
  title: string;
  /** Right of the heading (dates, or place for education/work). */
  right: string;
  /** Second line, left (degree, lab, role). */
  sub?: string;
  /** Second line, right (place, advisor, dates). */
  subRight?: string;
  /** Small note under the entry. */
  note?: string;
  bullets?: string[];
}

export const cv = {
  title: 'Chuan-Han Li — CV',
  summary:
    'NUS MSc Robotics student with experience in motion planning, robot learning, and hardware–software integration.',
  sections: [
    {
      heading: 'Education',
      entries: [
        {
          title: 'National University of Singapore (NUS)',
          right: 'Expected Dec 2027',
          sub: 'M.Sc. in Robotics',
          subRight: 'Singapore',
        },
        {
          title: 'National Taiwan University (NTU)',
          right: 'Jun 2026',
          sub: 'B.S. in Biomechatronics Engineering, GPA: 3.75/4.3',
          subRight: 'Taipei, Taiwan',
          note: 'Fu Bell Award (2022): department’s top-ranked incoming student.',
        },
      ],
    },
    {
      heading: 'Research Experience',
      entries: [
        {
          title: 'DRL-Based Collision-Free Motion Planning in Dynamic Environments',
          right: 'Jul 2026–Present',
          sub: 'Advanced Robotics Centre, NUS',
          subRight: 'Advisor: Prof. Marcelo H. Ang Jr.',
          bullets: [
            'Implemented exact whole-arm distance and collision checks on the lab’s arm model for dynamic obstacle avoidance.',
            'Built training and closed-loop simulation pipelines to compare reaching/avoidance baselines and diagnose failure modes in dynamic environments.',
          ],
        },
        {
          title: 'Multimodal Visual–Thermal Fertility Detection',
          right: 'Sep 2024–Dec 2025',
          sub: 'Lab of Machine Learning and Machine Vision, NTU',
          subRight: 'Advisor: Prof. Yan-Fu Kuo',
          bullets: [
            'Built a two-stage detection/classification pipeline and visible–thermal imaging setup for duck eggs; achieved ~93% accuracy through multimodal fusion.',
            'Presented the work at ACPA 2025 as an extended abstract and oral presentation.',
          ],
        },
      ],
    },
    {
      heading: 'Work Experience',
      entries: [
        {
          title: 'ChainSea Information Integration Co. Ltd.',
          right: 'Taipei, Taiwan',
          sub: 'AI Engineering Intern (R&D)',
          subRight: 'Jul 2025–Jul 2026',
          bullets: [
            'Built HAN-Agents with persistent memory, AST-backed code graphs, hierarchical task orchestration, and tool-verified quality gates for AI coding workflows.',
            'Delivered full-stack AI tools for test generation and validation; reduced time to the first executable unit-test suite from weeks to ~1 day.',
          ],
        },
      ],
    },
    {
      heading: 'Selected Robotics & Mechatronics Projects',
      entries: [
        {
          title: 'Language-Guided Humanoid Manipulation',
          right: 'NUS | Fall 2026',
          bullets: [
            'Owned robot execution and led integration on a simulated Unitree G1; added perception-driven Dex3 finger grasping and visual grasp/place verification.',
            'Completed 24/24 end-to-end simulation tasks (finger grasp for the cube; contact attachment for other objects).',
          ],
        },
        {
          title: 'CatchPoint — Recoverability-Aware Balance Assistance',
          right: 'NUS | Fall 2026',
          bullets: [
            'Designed capture-point control for hands-off recovery, pelvic assistance or harness catch. In 2,000 pendulum-model perturbations, recovery without a catch was 54.6% vs 9.6% for a threshold lock at a matched ~5% fall rate.',
          ],
        },
        {
          title: 'SATA Locomotion — Reproduction & Isaac Lab Port',
          right: 'NTU | Spring 2026',
          bullets: [
            'Reproduced SATA and evaluated 48 PPO policies across actuator ablations; ported effort control and bio-actuator models from Isaac Gym to Isaac Lab, retrained across 8 seeds, and analysed cross-engine reward differences.',
          ],
        },
        {
          title: 'Wearable Basketball Shot Sensing System',
          right: 'NTU | Fall 2025',
          bullets: [
            'Independently built a dual-IMU wearable with Arduino firmware and 100 Hz wireless acquisition; implemented shot segmentation, feature extraction, and a FastAPI/WebSocket dashboard for live analysis and replay.',
          ],
        },
        {
          title: 'Autonomous Cleaning Robot',
          right: 'NTU | Fall 2025',
          bullets: [
            'Integrated camera, ultrasonic and IMU sensing with motor control via Raspberry Pi–Arduino serial communication; implemented wall-following, visual hazard avoidance, and task execution on a physical mobile robot.',
          ],
        },
      ],
    },
  ] as { heading: string; entries: CvEntry[] }[],
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
};
