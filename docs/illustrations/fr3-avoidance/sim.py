"""Whole-arm avoidance illustration for the research page (not the research method).

A task-priority velocity controller on the MuJoCo Menagerie Franka FR3: the closest arm point is
pushed away from the obstacle first, the end effector tracks alternating targets in the remaining
freedom, and the rest returns towards the home posture. `python sim.py [key=value ...]` prints
clearance and reaching statistics for a parameter set.
"""
import sys

import mujoco
import numpy as np

import os

m = mujoco.MjModel.from_xml_path(os.environ.get('SCENE', 'scene.xml')); d = mujoco.MjData(m)
mujoco.mj_resetDataKeyframe(m, d, 0)
home = d.qpos[:7].copy(); lo, hi = m.jnt_range[:7, 0], m.jnt_range[:7, 1]
links = [mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, f'fr3_link{i}_collision') for i in range(1, 8)]
obs_g = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, 'obstacle')
obs_m = m.body_mocapid[mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_BODY, 'obstacle')]
goal_m = m.body_mocapid[mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_BODY, 'goal')]
SITE = 0; FPS = 30; SUB = 8
P = dict(ph=0.0, gs=1.0, rs=0.9, D0=0.2, krep=1.4, T=8.0, ox=0.45, oy=0.5, oz=0.5, oz2=0.1, gy=0.3, gz=0.33, gx=0.5)
P.update({k: float(v) for k, v in (a.split('=') for a in sys.argv[1:])})
dt = 1 / (FPS * SUB)
def dls(J, v, lam):
    return J.T @ np.linalg.solve(J @ J.T + lam**2 * np.eye(J.shape[0]), v)
def obstacle(t):
    # Smooth closed loop: a low pass across the workspace, then a high return above the arm.
    w = 2 * np.pi * t / P['T'] + P['ph']
    y = P['oy'] * np.cos(w)
    z = P['oz'] + P['oz2'] * (1 - np.sin(w)) / 2
    return np.array([P['ox'], y, z])
def goal(t):
    s = P['gs'] if (t % P['T']) < P['T'] / 2 else -P['gs']
    return np.array([P['gx'], s * P['gy'], P['gz']])
fromto = np.zeros(6)
def step(t):
    d.mocap_pos[obs_m] = obstacle(t); d.mocap_pos[goal_m] = goal(t)
    mujoco.mj_kinematics(m, d); mujoco.mj_comPos(m, d)
    best = (1e9, None, None, None)
    for gid in links:
        dist = mujoco.mj_geomDistance(m, d, gid, obs_g, P['D0'], fromto)
        if dist < best[0]: best = (dist, fromto[:3].copy(), fromto[3:].copy(), gid)
    risk = float(np.clip(1 - (best[0] - 0.03) / (P['D0'] - 0.03), 0, 1))
    pe = d.site_xpos[SITE].copy(); jt = np.zeros((3, 7)); mujoco.mj_jacSite(m, d, jt, None, SITE)
    v = 2.5 * (goal(t) - pe); s = np.linalg.norm(v); v *= min(1, 0.5 / (s + 1e-9))
    v *= (1 - P['rs'] * risk)
    I = np.eye(7)
    if best[0] < P['D0']:
        p, q = best[1], best[2]
        n = p - q; n /= np.linalg.norm(n) + 1e-9
        jp = np.zeros((3, 7)); mujoco.mj_jac(m, d, jp, None, p, m.geom_bodyid[best[3]])
        j = (n @ jp)[None, :]
        mag = P['krep'] * ((P['D0'] - best[0]) / P['D0']) ** 1.5
        jpinv = j.T / (j @ j.T + 1e-3)
        dq1 = (jpinv * mag).ravel(); N1 = I - jpinv @ j
    else:
        dq1 = np.zeros(7); N1 = I
    jt1 = jt @ N1
    dq2 = N1 @ dls(jt1, v - jt @ dq1, 0.05)
    N2 = N1 @ (I - np.linalg.pinv(jt1) @ jt1)
    dq = dq1 + dq2 + N2 @ (0.6 * (home - d.qpos))
    d.qpos[:] = np.clip(d.qpos + np.clip(dq, -2.0, 2.0) * dt, lo + 0.05, hi - 0.05)
    return best, risk, np.linalg.norm(goal(t) - pe)
if __name__ == '__main__':
    mins = []; errs = []
    for k in range(int(2 * P['T'] * FPS * SUB)):
        best, risk, err = step(k * dt); mins.append(best[0]); errs.append(err)
    mins = np.array(mins); errs = np.array(errs)
    print(f"min clearance {mins.min():.3f}  frac<0.01 {np.mean(mins<0.01):.3f}  goal err median {np.median(errs):.3f}  reached(<2cm) {np.mean(errs<0.02):.2f}")
