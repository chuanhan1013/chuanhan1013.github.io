# Hiring panel — Chuan-Han Li (general CV)

- **Resume:** `cv-private/pdf/general.pdf` (one page; text layer extracted with pdftotext)
- **Target role (assumed):** Robotics / Embodied AI research engineer or research intern (motion planning, robot learning, manipulation). No job posting was given.
- **Date:** 2026-11-11

## The seven verdicts

| # | Reviewer | Verdict | Line that decided it |
|---|---|---|---|
| 1 | Automated screen | **PASS** | Single column, standard sections, contact details complete. Weak points: research entries have no role title, keywords missing, skills list padded, "∼" characters |
| 2 | Hiring manager (decision) | **INTERVIEW** (research intern); borderline for a research engineer | Positive: "DRL-Based Collision-Free Motion Planning…" at NUS ARC with Prof. Ang, plus the SATA 48-policy / 8-seed rigour. Negative: no results, no robotics publication |
| 3 | Hiring manager (day one) | MAYBE | "Completed 24/24 end-to-end simulation tasks (finger grasp for the cube; contact attachment for other objects)." |
| 4 | Another applicant | MAYBE | "Implemented exact whole-arm distance and collision checks on the lab's arm model for dynamic obstacle avoidance." (no result) |
| 5 | CEO | MAYBE | Same line as #4: the flagship role reports no outcome |
| 6 | Recruiter (top third) | MAYBE | "Built training and closed-loop simulation pipelines to compare reaching/avoidance baselines and diagnose failure modes…" (activity, not result) |
| 7 | Teammate | MAYBE | "Built HAN-Agents with persistent memory, AST-backed code graphs, hierarchical task orchestration…" (buzzwords; no users or collaborators named) |

**Overall:** the resume gets past the screen and gets an interview for a **research intern** role. It does not yet compete for a **research engineer** role. No reviewer said PASS (reject), and none said HIRE. The lab affiliation and the SATA rigour carried it. It was held back because none of the robotics work reports a result on a real robot.

## What is wrong (worst first)

1. **The current flagship research has no result.**
   - Lines: "Implemented exact whole-arm distance and collision checks…" and "Built training and closed-loop simulation pipelines to compare reaching/avoidance baselines and diagnose failure modes…"
   - Why it gets rejected: this is the role closest to the job, yet it lists only activity. There is no success or collision rate, no baseline comparison and no finding.
   - Flagged by: hiring manager (decision), day-one manager, applicant, CEO, recruiter, teammate (6/7).
2. **All manipulation and locomotion results are simulation-only, and the 24/24 caveat undercuts the headline.**
   - Line: "Completed 24/24 end-to-end simulation tasks (finger grasp for the cube; contact attachment for other objects)."
   - Why it gets rejected: readers see that only the cube was really grasped. Both physical builds report no numbers.
   - Flagged by: hiring manager (decision), day-one manager, applicant, CEO, automated screen (5/7).
   - Note: the caveat is required for honesty and must stay. The fix is the framing, not removing it.
3. **The only paid role is off-target and filled with jargon.**
   - Line: "Built HAN-Agents with persistent memory, AST-backed code graphs, hierarchical task orchestration, and tool-verified quality gates for AI coding workflows."
   - Why it gets rejected: it is not robotics, sits high on the page and names no users or impact. It also overlaps both labs for 12 months, so readers ask how deep each one went.
   - Flagged by: hiring manager (decision), day-one manager, CEO, teammate, automated screen (5/7).
4. **There is no robotics publication.**
   - Line: "Presented the work at ACPA 2025 as an extended abstract and oral presentation."
   - Why it gets rejected: the only paper is agricultural vision (duck eggs), not robotics.
   - Flagged by: hiring manager (decision), day-one manager, applicant, CEO, recruiter (5/7).
5. **Research entries have no role title.**
   - Line: "DRL-Based Collision-Free Motion Planning in Dynamic Environments" sits where a job title should be.
   - Why it gets rejected: a parser, or a 30-second reader, can't tell whether it was a job.
   - Flagged by: automated screen (and indirectly the recruiter).
6. **The summary is generic and doesn't mention manipulation.**
   - Line: "NUS MSc Robotics student with experience in motion planning, robot learning, and hardware–software integration."
   - Why it gets rejected: it repeats keywords without evidence.
   - Flagged by: recruiter.
7. **Collaboration and ownership are unclear.**
   - Lines: "Owned robot execution and led integration…" (no team size) and "Independently built…"
   - Why it gets rejected: the rest reads as solo work. A teammate can't tell what you owned versus what others built.
   - Flagged by: teammate.
8. **The skills list is padded and role keywords are missing.**
   - Line: "Python, C/C++, Java, Assembly, TypeScript/JavaScript, React" and "Claude Code, Codex".
   - Why it gets rejected: it dilutes the robotics match. Also absent (assumed role): MoveIt, MPC, trajectory optimization, RRT/PRM, imitation learning, sim-to-real, real-arm hardware.
   - Flagged by: automated screen, day-one manager.
9. **Parsing details.** "∼93%", "∼1 day" and "∼5%" use U+223C instead of "~". Project dates use seasons ("Fall 2026"), which some screens read as missing dates.
   - Flagged by: automated screen (both runs).

## Before / after automated screen

- **Before (original PDF):** PASS, with the five weak points above.
- **After (RESUME-IMPROVED.md, draft):** REJECT *as a draft*, because the `[ADD: ...]` placeholders (role titles, phone, results) are still unfilled. The screen said it "would likely pass once the placeholders are filled". It also confirmed that "manipulation" and "grasping" now appear. Remaining gaps: season-style dates, and MoveIt/MPC/trajectory-optimization/sim-to-real (add only if true).

## Interview questions the hiring manager would ask

1. What are the DRL planner's observation and action spaces and its reward? Which baseline beats you now, and what is the main failure mode?
2. How do you compute exact whole-arm distance (which primitives), and how fast is it per training step?
3. Why do SATA rewards differ between Isaac Gym and Isaac Lab: physics, the actuator model, or bugs in the port? How did you tell them apart?
4. Is "24/24" honest when most objects were attached by contact? What breaks without the attachment?

*This is a structured second opinion made by language models. It does not guarantee an interview, and it is not career advice.*

Made with /hiring-panel by Alex Chen (@nocodealex) · chen.media
