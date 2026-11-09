/**
 * Content types. Project/media types are inferred from the Zod schemas in `schemas.ts`
 * (shared with the content collection); the rest are plain interfaces for `src/data/*.ts`.
 */
import type { IconName } from '@/lib/icon-names';
import type { LogoMark, TechChip } from './schemas';

export type { Link, LogoMark, MediaItem, ProjectData, TechChip } from './schemas';

export interface TimelineEntry {
  when: string;
  label: string;
  title: string;
  logo?: LogoMark;
  text: string;
  /** Highlighted with a tinted background. */
  featured?: boolean;
}

export interface EducationEntry {
  period: string;
  school: string;
  degree: string;
  brand: { src: string; alt: string; shape: 'wide' | 'square' };
  details: string[];
  research: { label: string; logo: LogoMark };
  advisor: string;
}

export interface SkillGroup {
  title: string;
  icon: IconName;
  items: TechChip[];
}

export interface Award {
  title: string;
  text: string;
  icon: { src: string; alt: string; padding: string; remote?: boolean };
}
