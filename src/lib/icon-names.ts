/**
 * Names of all registered icons. Kept free of asset imports so the content schema
 * (src/content.config.ts) can validate icon names without loading SVG files.
 * Every name here must have a matching entry in `src/lib/icons.ts` (type-checked there).
 */
export const deviconNames = [
  'arduino',
  'cplusplus',
  'docker',
  'fastapi',
  'git',
  'java',
  'github',
  'linkedin',
  'linux',
  'numpy',
  'opencv',
  'python',
  'pytorch',
  'raspberrypi',
  'react',
  'ros',
  'tensorflow',
  'typescript',
] as const;

export const uiIconNames = ['code', 'cube', 'mail', 'perception', 'robotics'] as const;

export const iconNames = [...deviconNames, ...uiIconNames] as const;

export type DeviconName = (typeof deviconNames)[number];
export type UiIconName = (typeof uiIconNames)[number];
export type IconName = (typeof iconNames)[number];
