/**
 * Printable CV (`/cv.html`).
 *
 * This mirrors the owner's private CV source, `chuanhan1013/cv-private` (`src/general.tex`):
 * same core entries and wording, with additional online projects. When that file changes, update this
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
    'NUS MSc Robotics student focused on manipulation, motion planning, robot learning, and hardware–software integration.',
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
          note: 'Specialization certificates: Artificial Intelligence; Mechatronics and Control. Fu Bell Award (2022): department’s top-ranked incoming student.',
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
            'Developing risk-aware switching between reaching and learned avoidance policies for a 7-DoF arm around moving obstacles.',
            'Implemented link-centric obstacle representations and exact whole-arm collision checks on the lab’s arm model; trained and compared policies in closed-loop simulation.',
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
            'Delivered full-stack AI tools for test generation and validation; reduced time to the first executable unit-test suite from weeks to ~1 day.',
            'Built HAN-Agents with persistent memory, AST code graphs, multi-agent task orchestration and automated quality checks.',
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
            'Owned execution and integrated language grounding, task planning and visual verification on a simulated Unitree G1.',
            'Validated 24/24 English/Chinese tasks in MuJoCo, evaluating the complete instruction-to-placement pipeline.',
          ],
        },
        {
          title: 'Autonomous Cleaning Robot',
          right: 'NTU | Fall 2025',
          bullets: [
            'Integrated Raspberry Pi vision, ultrasonic/IMU sensing and Arduino C++ control via serial for wall-following and hazard avoidance; the team’s physical robot scored 113/120 in the final competition.',
          ],
        },
        {
          title: 'Quadruped Locomotion — RL Reproduction & Isaac Lab Port',
          right: 'NTU | Spring 2026',
          bullets: [
            'Reproduced torque-based locomotion (SATA, RSS 2025) with 48 PPO policies across actuator ablations; ported Isaac Gym training to Isaac Lab, retrained 8 seeds, and traced most reward gaps to joint-acceleration definitions.',
          ],
        },
        {
          title: 'Wearable Basketball Shot Sensing System',
          right: 'NTU | Fall 2025',
          bullets: [
            'Independently built a 100 Hz wireless dual-IMU wearable with Arduino firmware, shot segmentation, feature extraction and a FastAPI/WebSocket live/replay dashboard; received a course project award.',
          ],
        },
        {
          title: 'Amphibious Tracked Robot',
          right: 'NTU | Spring 2025',
          bullets: [
            'Led mechanical design and 3D-printed prototyping of a tracked robot with paddle-wheel conversion; the team completed all four terrain stages and placed 2nd overall.',
          ],
        },
        {
          title: 'CatchPoint — Recoverability-Aware Balance Assistance',
          right: 'NUS | Fall 2026',
          bullets: [
            'Designed capture-point control for hands-off recovery, pelvic assistance or harness catch. In 2,000 pendulum-model perturbations, recovery without a catch was 54.6% vs 9.6% for a threshold lock at a matched ~5% fall rate.',
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
