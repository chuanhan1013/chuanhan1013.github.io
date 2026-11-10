"""Export screen-space keypoints (arm links + obstacle) for the hero's letter avoidance. No rendering."""
import json, os, sys
os.environ['SCENE'] = 'scene-dark.xml'
sys.argv = ['sim.py'] + 'ox=0.2 oz=1.08 oz2=0 oy=0.5 D0=0.15 rs=0.6 krep=2.5 gx=0.25 gy=0.45 gz=0.82 vmax=0.9'.split()  # same parameters as render.py with HERO=1
import mujoco, numpy as np
from sim import FPS, SUB, P, d, dt, m, step, obstacle
W, H = 1400, 1050
r = mujoco.Renderer(m, H, W)
cam = mujoco.MjvCamera(); cam.lookat[:] = [0.1, 0.0, 0.6]; cam.distance = 1.95; cam.azimuth = 180; cam.elevation = -6
ARM = [mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_BODY, f'fr3_link{i}') for i in range(1, 8)]
def project(points):
    c0, c1 = r.scene.camera[0], r.scene.camera[1]
    pos = (np.array(c0.pos) + np.array(c1.pos)) / 2
    fwd = np.array(c0.forward); up = np.array(c0.up); right = np.cross(fwd, up)
    t = np.tan(np.deg2rad(m.vis.global_.fovy) / 2)
    out = []
    for p in points:
        v = p - pos; z = v @ fwd
        out += [round(0.5 + (v @ right) / (z * t * W / H) / 2, 3), round(0.5 - (v @ up) / (z * t) / 2, 3)]
    return out
frames = []
for k in range(int(2 * P['T'] * FPS * SUB)):
    t = k * dt
    step(t)
    if t >= P['T'] and k % (SUB * 2) == 0:  # 15 fps
        mujoco.mj_forward(m, d); r.update_scene(d, cam)
        joints = [d.xpos[b].copy() for b in ARM] + [d.site_xpos[0].copy()]
        pts = []
        for p0, p1 in zip(joints[2:-1], joints[3:]):  # from the shoulder outwards; the base never moves
            pts += [p0, (p0 + p1) / 2]
        pts.append(joints[-1])
        frames.append(project(pts) + project([obstacle(t)]))
json.dump({'fps': 15, 'aspect': W / H, 'arm': 0.045, 'ball': 0.05, 'frames': frames}, open('track.json', 'w'), separators=(',', ':'))
print(len(frames), len(frames[0]) // 2, 'points')
