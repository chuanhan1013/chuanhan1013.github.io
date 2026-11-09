/** Organisation logos (files live in `public/assets/icons/`). */
import type { LogoMark } from './types';

const icon = (file: string) => `/assets/icons/${file}`;

export const logoFiles = {
  nusFullColor: icon('nus-fullcolor.jpg'),
  nusVertical: icon('nus-vertical.jpg'),
  ntuEmblem: icon('ntu-emblem.jpg'),
  mlmvLab: icon('mlmv-lab.png'),
  chainsea: icon('chainsea-official.png'),
} as const;

/** NUS vertical mark, used for the Advanced Robotics Centre. */
export const arcLogo: LogoMark = { src: logoFiles.nusVertical, shape: 'portrait' };
export const mlmvLogo: LogoMark = { src: logoFiles.mlmvLab, shape: 'square' };
export const mlmvLogoSmall: LogoMark = { ...mlmvLogo, small: true };
export const chainseaLogo: LogoMark = { src: logoFiles.chainsea, shape: 'wide' };
export const chainseaLogoSmall: LogoMark = { ...chainseaLogo, small: true };
