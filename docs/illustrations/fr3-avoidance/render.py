"""Render the second period of the illustration (a seamless loop) to raw.mp4."""
import os
import sys
import imageio.v3 as iio
import mujoco
import numpy as np

# Scenario parameters used for the published clip (read by sim.py from argv).
# HERO=1 renders the opening film: the hand sweeps left-right above the arm, along the name.
HERO = os.environ.get('HERO')
PARAMS = 'ox=0.2 oz=1.08 oz2=0 oy=0.5 D0=0.15 rs=0.6 krep=2.5 gx=0.25 gy=0.45 gz=0.82 vmax=0.9' if HERO else 'ox=0.22 oz=0.68 oz2=0 oy=0.6 D0=0.15 rs=0.6 krep=2.5'
sys.argv = ['sim.py'] + PARAMS.split()
from sim import FPS, SUB, P, d, dt, m, step  # noqa: E402

W, H = (1400, 1050) if HERO else (1200, 900) if os.environ.get('SCENE') else (960, 600)
r = mujoco.Renderer(m, H, W)
cam = mujoco.MjvCamera(); cam.lookat[:] = [0.28, 0.0, 0.36]; cam.distance = 1.45; cam.azimuth = 150; cam.elevation = -16
if os.environ.get('SCENE'):
    cam.lookat[:] = [0.26, 0.0, 0.42]; cam.distance = 1.75; cam.azimuth = 146; cam.elevation = -12
if HERO:  # facing the arm, so its sweep reads as left-right
    cam.lookat[:] = [0.1, 0.0, 0.6]; cam.distance = 1.95; cam.azimuth = 180; cam.elevation = -6
frames = []
q_start = None
track = []  # per frame: arm keypoints as [x, y] in 0..1 film coordinates
ARM = [mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_BODY, f'fr3_link{i}') for i in range(1, 8)]


def project(points):
    """World points -> normalised image coordinates of the current scene camera."""
    c0, c1 = r.scene.camera[0], r.scene.camera[1]
    pos = (np.array(c0.pos) + np.array(c1.pos)) / 2
    fwd = np.array(c0.forward); up = np.array(c0.up); right = np.cross(fwd, up)
    t = np.tan(np.deg2rad(m.vis.global_.fovy) / 2)
    out = []
    for p in points:
        v = p - pos; z = v @ fwd
        out.append([round(0.5 + (v @ right) / (z * t * W / H) / 2, 4), round(0.5 - (v @ up) / (z * t) / 2, 4)])
    return out

n = int(2 * P['T'] * FPS * SUB)
for k in range(n):
    t = k * dt
    best, risk, err = step(t); best = best[:3]
    if k == int(P['T'] * FPS * SUB): q_start = d.qpos.copy()
    if t >= P['T'] and k % SUB == 0:
        mujoco.mj_forward(m, d)
        r.update_scene(d, cam)
        sc = r.scene
        if best[0] < 0.3 and sc.ngeom < sc.maxgeom:
            g = sc.geoms[sc.ngeom]
            a = 0.25 + 0.75 * risk
            mujoco.mjv_initGeom(g, mujoco.mjtGeom.mjGEOM_LINE, np.zeros(3), np.zeros(3), np.zeros(9), np.array([0.24, 0.36, 1.0, a], np.float32))
            mujoco.mjv_connector(g, mujoco.mjtGeom.mjGEOM_LINE, 2.5 + 2.5 * risk, best[1], best[2])
            sc.ngeom += 1
        joints = [d.xpos[b].copy() for b in ARM] + [d.site_xpos[0].copy()]
        pts = []
        for p0, p1 in zip(joints[:-1], joints[1:]):  # joints plus midpoints, roughly along the links
            pts += [p0, (p0 + p1) / 2]
        pts.append(joints[-1])
        track.append(project(pts))
        frames.append(r.render().copy())
print('loop joint jump (rad):', np.abs(d.qpos - q_start).max().round(3))
if os.environ.get('TRACK'):
    import json
    json.dump({'fps': FPS, 'frames': track[::2]}, open(os.environ['TRACK'], 'w'), separators=(',', ':'))
iio.imwrite(os.environ.get('OUT', 'raw.mp4'), np.stack(frames), fps=FPS, codec='libx264', quality=9, macro_block_size=1)
