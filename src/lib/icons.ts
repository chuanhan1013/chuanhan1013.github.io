/**
 * Icon registry.
 *
 * Technology logos come from the pinned `devicon` npm package and are bundled at build
 * time, so the site no longer depends on a CDN at runtime. To add a logo, import
 * `devicon/icons/<name>/<name>-original.svg?url` below and add it to `deviconUrls`.
 */
import arduino from 'devicon/icons/arduino/arduino-original.svg?url';
import cplusplus from 'devicon/icons/cplusplus/cplusplus-original.svg?url';
import docker from 'devicon/icons/docker/docker-original.svg?url';
import fastapi from 'devicon/icons/fastapi/fastapi-original.svg?url';
import git from 'devicon/icons/git/git-original.svg?url';
import java from 'devicon/icons/java/java-original.svg?url';
import github from 'devicon/icons/github/github-original.svg?url';
import linkedin from 'devicon/icons/linkedin/linkedin-original.svg?url';
import linux from 'devicon/icons/linux/linux-original.svg?url';
import numpy from 'devicon/icons/numpy/numpy-original.svg?url';
import opencv from 'devicon/icons/opencv/opencv-original.svg?url';
import python from 'devicon/icons/python/python-original.svg?url';
import pytorch from 'devicon/icons/pytorch/pytorch-original.svg?url';
import raspberrypi from 'devicon/icons/raspberrypi/raspberrypi-original.svg?url';
import react from 'devicon/icons/react/react-original.svg?url';
import ros from 'devicon/icons/ros/ros-original.svg?url';
import tensorflow from 'devicon/icons/tensorflow/tensorflow-original.svg?url';
import typescript from 'devicon/icons/typescript/typescript-original.svg?url';

import code from '@/assets/icons/ui/code.svg?url';
import cube from '@/assets/icons/ui/cube.svg?url';
import mail from '@/assets/icons/ui/mail.svg?url';
import perception from '@/assets/icons/ui/perception.svg?url';
import robotics from '@/assets/icons/ui/robotics.svg?url';

import type { DeviconName, IconName, UiIconName } from './icon-names';

export type { DeviconName, IconName, UiIconName } from './icon-names';

export const deviconUrls: Record<DeviconName, string> = {
  arduino,
  cplusplus,
  docker,
  fastapi,
  git,
  java,
  github,
  linkedin,
  linux,
  numpy,
  opencv,
  python,
  pytorch,
  raspberrypi,
  react,
  ros,
  tensorflow,
  typescript,
};

/** Hand-drawn line icons used by the site chrome. */
export const uiIconUrls: Record<UiIconName, string> = { code, cube, mail, perception, robotics };

export function iconUrl(name: IconName): string {
  return name in deviconUrls ? deviconUrls[name as DeviconName] : uiIconUrls[name as UiIconName];
}
