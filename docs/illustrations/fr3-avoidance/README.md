# FR3 whole-arm avoidance illustration

Source of `public/assets/media/dynur/arm-avoidance.mp4`, the animation on the research page. It
is an **illustration only**: a simple task-priority controller written for the page, not the
research method, and it shows no research results.

The robot model is the Franka FR3 from
[MuJoCo Menagerie](https://github.com/google-deepmind/mujoco_menagerie) (Apache-2.0). It is not
copied into this repository.

Three outputs come from the same controller (`sim.py`):

| Output                            | Command                                 | Used for                                                                                                                                                       |
| --------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arm-avoidance.mp4` (light scene) | `python render.py`                      | Research gallery                                                                                                                                               |
| `arm-studio.mp4` (dark studio)    | `SCENE=scene-dark.xml python render.py` | Home-page opening film                                                                                                                                         |
| `src/data/hero-track.json`        | `python track.py`                       | Screen-space path of the arm and the obstacle in the opening film, so the letters of the name can lean out of the obstacle's way (`src/scripts/hero-avoid.ts`) |

`track.py` must use the same parameters and camera as the dark-studio render; re-run both together.

```bash
pip install mujoco "imageio[ffmpeg]"
git clone --depth 1 https://github.com/google-deepmind/mujoco_menagerie.git /tmp/menagerie
cp -r /tmp/menagerie/franka_fr3/fr3.xml /tmp/menagerie/franka_fr3/assets .
python sim.py                       # clearance / reaching check (no penetration expected)
MUJOCO_GL=egl python render.py      # writes raw.mp4 (one 8 s loop)
ffmpeg -i raw.mp4 -an -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -vf scale=800:-2 \
  -movflags +faststart ../../../public/assets/media/dynur/arm-avoidance.mp4
ffmpeg -ss 3.1 -i raw.mp4 -frames:v 1 -vf scale=800:-2 -c:v libwebp -quality 80 \
  ../../../public/assets/media/dynur/arm-avoidance-poster.webp
```
