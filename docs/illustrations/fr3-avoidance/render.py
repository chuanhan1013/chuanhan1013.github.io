"""Render the second period of the illustration (a seamless loop) to raw.mp4."""
import os
import sys
import imageio.v3 as iio
import mujoco
import numpy as np

# Scenario parameters used for the published clip (read by sim.py from argv).
sys.argv = ['sim.py'] + 'ox=0.22 oz=0.68 oz2=0 oy=0.6 D0=0.15 rs=0.6 krep=2.5'.split()
from sim import FPS, SUB, P, d, dt, m, step  # noqa: E402

W, H = (1200, 900) if os.environ.get('SCENE') else (960, 600)
r = mujoco.Renderer(m, H, W)
cam = mujoco.MjvCamera(); cam.lookat[:] = [0.28, 0.0, 0.36]; cam.distance = 1.45; cam.azimuth = 150; cam.elevation = -16
if os.environ.get('SCENE'):
    cam.lookat[:] = [0.26, 0.0, 0.42]; cam.distance = 1.75; cam.azimuth = 146; cam.elevation = -12
frames = []
q_start = None
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
            mujoco.mjv_initGeom(g, mujoco.mjtGeom.mjGEOM_LINE, np.zeros(3), np.zeros(3), np.zeros(9), np.array([0.93, 0.13, 0.1, a], np.float32))
            mujoco.mjv_connector(g, mujoco.mjtGeom.mjGEOM_LINE, 2.5 + 2.5 * risk, best[1], best[2])
            sc.ngeom += 1
        frames.append(r.render().copy())
print('loop joint jump (rad):', np.abs(d.qpos - q_start).max().round(3))
iio.imwrite(os.environ.get('OUT', 'raw.mp4'), np.stack(frames), fps=FPS, codec='libx264', quality=9, macro_block_size=1)
