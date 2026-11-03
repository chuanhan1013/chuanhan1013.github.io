/**
 * Content model for the portfolio. Every page section is rendered from data that
 * conforms to these types, so `npm run check` catches missing or misspelled fields.
 */
import type { IconName } from '@/lib/icons';

export interface Link {
  label: string;
  href: string;
  /** Opens in a new tab (adds target/rel). */
  external?: boolean;
}

/** A framed organisation logo. See `src/styles/logo-mark.css` for the shapes. */
export interface LogoMark {
  src: string;
  shape: 'square' | 'wide' | 'portrait';
  small?: boolean;
}

/** Technology chip: a logo icon, a short text glyph, or just a dot. */
export type TechChip =
  { label: string; icon: IconName } | { label: string; glyph: string } | { label: string };

/**
 * One image in a card's media area. `fit` picks the visual treatment
 * (documented in `src/styles/media.css`).
 */
export type MediaItem = {
  src: string;
  alt: string;
  /** Overlay caption (also shown in the lightbox). */
  caption?: string;
  /** Extra attributes for remotely hosted images. */
  remote?: boolean;
} & (
  | { fit: 'photo' | 'diagram' }
  | { fit: 'cover'; position?: string }
  | { fit: 'contain'; padding?: string; background?: string }
  | { fit: 'flush'; background: string }
);

export interface MediaGallery {
  /** Accessible name of the carousel. */
  label: string;
  /** Corner badge text. */
  badge: string;
  /** One item renders a single framed image; more render a carousel. */
  items: [MediaItem, ...MediaItem[]];
  /** Background behind the slides (defaults to a soft gradient). */
  background?: string;
}

export interface FeatureCard {
  /** Stable id, used for anchors and tests. */
  id: string;
  title: string;
  meta: string;
  metaLogo?: LogoMark;
  /** Organisation chip below the meta line. */
  chip?: { label: string; logo: LogoMark | { src: string; shape: 'badge'; abbr: string } };
  summary: string;
  results?: { value: string; label: string }[];
  platforms?: TechChip[];
  tags?: string[];
  links?: Link[];
  note?: string;
  media: MediaGallery;
}

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
