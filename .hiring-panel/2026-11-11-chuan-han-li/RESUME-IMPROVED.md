# Chuan-Han Li

Singapore | +65 [phone as in original] | chuanhan1013@gmail.com
chuanhan1013.github.io | github.com/chuanhan1013 | linkedin.com/in/chuanhan-li

**Robotics MSc student (NUS) working on DRL-based collision-free arm motion planning at the Advanced Robotics Centre. Experience in humanoid manipulation (Unitree G1 + Dex3, simulation), RL locomotion (48 PPO policies, Isaac Gym → Isaac Lab), and physical robot / sensor builds.**

## Education

**National University of Singapore (NUS)**, Singapore — M.Sc. in Robotics — Expected Dec 2027

**National Taiwan University (NTU)**, Taipei, Taiwan — B.S. in Biomechatronics Engineering, GPA 3.75/4.3 — Jun 2026
Fu Bell Award (2022): department's top-ranked incoming student.

## Research Experience

**[ADD: role title, e.g. Graduate Research Assistant / Student Researcher] — Advanced Robotics Centre, NUS** — Jul 2026–Present
*DRL-Based Collision-Free Motion Planning in Dynamic Environments* · Advisor: Prof. Marcelo H. Ang Jr.
- Implemented exact whole-arm distance and collision checks on the lab-provided arm model for dynamic obstacle avoidance [ADD: per-step compute time, if measured].
- Built training and closed-loop simulation pipelines comparing reaching/avoidance baselines in dynamic environments; [ADD: one concrete result, e.g. success or collision rate vs. a named baseline, or the main failure mode identified — only what may be disclosed].

**[ADD: role title, e.g. Undergraduate Researcher] — Lab of Machine Learning and Machine Vision, NTU** — Sep 2024–Dec 2025
*Multimodal Visual–Thermal Fertility Detection* · Advisor: Prof. Yan-Fu Kuo
- Built a visible–thermal imaging setup and a two-stage detection/classification pipeline (duck eggs); multimodal fusion reached about 93% accuracy [ADD: unimodal baseline accuracy, if available].
- Presented at ACPA 2025 (extended abstract, oral presentation).

## Selected Robotics Projects

**Language-Guided Humanoid Manipulation** — NUS, Fall 2026 · [ADD: team size]
- Owned robot execution and led integration for a simulated Unitree G1; added perception-driven Dex3 finger grasping and visual grasp/place verification.
- Simulation batch: 24/24 end-to-end tasks completed. Dex3 finger grasp used for the cube; other objects used contact attachment.

**SATA Locomotion — Reproduction & Isaac Lab Port** — NTU, Spring 2026
- Reproduced SATA and evaluated 48 PPO policies across actuator ablations.
- Ported effort control and bio-actuator models from Isaac Gym to Isaac Lab, retrained across 8 seeds, and analysed cross-engine reward differences [ADD: main cause found, if any].

**CatchPoint — Recoverability-Aware Balance Assistance** — NUS, Fall 2026
- Designed capture-point control choosing between hands-off recovery, pelvic assistance and harness catch.
- In 2,000 pendulum-model perturbations: 54.6% recovered without a catch vs 9.6% for a threshold lock, at a matched ~5% fall rate.

**Autonomous Cleaning Robot (physical hardware)** — NTU, Fall 2025 · [ADD: team size]
- Integrated camera, ultrasonic and IMU sensing with motor control (Raspberry Pi–Arduino serial); implemented wall-following, visual hazard avoidance and task execution on a physical mobile robot [ADD: any measured result].

**Wearable Basketball Shot Sensing System (physical hardware)** — NTU, Fall 2025
- Independently built a dual-IMU wearable with Arduino firmware and 100 Hz wireless acquisition; implemented shot segmentation, feature extraction and a FastAPI/WebSocket dashboard for live analysis and replay.

## Work Experience

**AI Engineering Intern (R&D) — ChainSea Information Integration Co. Ltd.**, Taipei, Taiwan — Jul 2025–Jul 2026
- Delivered full-stack AI tools for test generation and validation; cut time to the first executable unit-test suite from weeks to about 1 day [ADD: for how many teams/projects].
- Built HAN-Agents, an AI coding-agent system with persistent memory, AST-based code graphs, hierarchical task orchestration and tool-verified quality gates.

## Technical Skills

- **Robotics:** ROS/ROS 2, motion planning, collision checking, forward/inverse kinematics, PID/PD control
- **Robot learning & perception:** reinforcement learning (PPO), PyTorch, TensorFlow, NumPy, OpenCV, YOLO, sensor fusion, VLMs
- **Simulation:** MuJoCo, Isaac Gym, Isaac Lab, Gazebo, CoppeliaSim, Gymnasium
- **Programming:** Python, C/C++, TypeScript/JavaScript
- **Tools:** Linux, Git, Docker, CI/CD, automated testing
- **Hardware & CAD:** Raspberry Pi, Arduino, SolidWorks, 3D printing
- **Languages:** Mandarin (native); English (IELTS Academic 7.0)

## Open questions ([ADD] items)

1. What was your formal role title at NUS ARC and at the NTU lab?
2. Can you disclose one DRL planning result (success/collision rate vs a named baseline, or the main failure mode)? Keep the lab's disclosure limits.
3. How fast is the whole-arm distance check per step?
4. Team sizes for the G1 project and the cleaning robot, and what you owned vs. others.
5. What was the unimodal baseline for the egg classifier?
6. What caused the Isaac Gym vs Isaac Lab reward difference?
7. How many teams/projects used the ChainSea test-generation tools?
8. Any measured result for the cleaning robot?
9. Do you actually use MPC, trajectory optimization, MoveIt, sampling planners, imitation learning or sim-to-real? Add them only if true.

Removed from the original (not added): Java, Assembly, React, Claude Code and Codex in the skills list. Restore any that a specific posting asks for.

Made with /hiring-panel by Alex Chen (@nocodealex) · chen.media
