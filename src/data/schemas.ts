/**
 * Zod schemas for portfolio content. TypeScript types are inferred from these, so the
 * content collection (src/content.config.ts), components and tests share one definition.
 */
import { z } from 'astro/zod';
import { iconNames } from '@/lib/icon-names';
import { categoryKeys, statusKeys } from './categories';

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  /** Opens in a new tab. */
  external: z.boolean().optional(),
});

export const logoMarkSchema = z.object({
  src: z.string(),
  shape: z.enum(['square', 'wide', 'portrait']),
  small: z.boolean().optional(),
});

export const techChipSchema = z.union([
  z.object({ label: z.string(), icon: z.enum(iconNames) }),
  z.object({ label: z.string(), glyph: z.string() }),
  z.object({ label: z.string() }),
]);

/**
 * One gallery image.
 *   cover   – fills the frame, cropped (`position` sets the focal point)
 *   contain – whole image, letterboxed on `background` (photos, recordings, plots)
 *   diagram – whole image on white with breathing room, plus an "open" hint
 */
export const mediaItemSchema = z
  .object({
    /** Image, or a short muted clip (.mp4/.webm) that loops while visible. */
    src: z.string(),
    alt: z.string().min(1),
    caption: z.string().optional(),
    fit: z.enum(['cover', 'contain', 'diagram']).default('contain'),
    position: z.string().optional(),
    background: z.string().optional(),
    /** Still frame for clips (shown before playback, on cards, and with reduced motion). */
    poster: z.string().optional(),
    /** Hosted elsewhere: loaded with `referrerpolicy="no-referrer"`. */
    remote: z.boolean().optional(),
  })
  .refine((item) => !/\.(mp4|webm)$/i.test(item.src) || !!item.poster, {
    message: 'Video media needs a `poster` image.',
    path: ['poster'],
  });

export const projectSchema = z.object({
  title: z.string(),
  /** Drafts are kept in the repo but excluded from every page (e.g. work awaiting grading). */
  draft: z.boolean().default(false),
  /** `research` entries appear under "Research"; `project` entries in the filterable grid. */
  kind: z.enum(['research', 'project']),
  categories: z.array(z.enum(categoryKeys)).min(1),
  /** Sort key within its section (ascending). */
  order: z.number(),
  status: z.enum(statusKeys),
  /** e.g. "Fall 2026", "2026–Present". */
  period: z.string(),
  /** Course / lab / organisation line, e.g. "ME5412 Robotics for Healthcare · NUS". */
  context: z.string(),
  /** e.g. "Solo", "Team of 4 · control & simulation lead". */
  team: z.string().optional(),
  contextLogo: logoMarkSchema.optional(),
  /** One-paragraph summary used on cards and as the detail-page lead. */
  summary: z.string(),
  results: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .max(3)
    .optional(),
  stack: z.array(techChipSchema).optional(),
  tags: z.array(z.string()).optional(),
  links: z.array(linkSchema).optional(),
  /** Short caveat shown on the card and detail page (e.g. unpublished research). */
  note: z.string().optional(),
  media: z.object({
    badge: z.string(),
    items: z.array(mediaItemSchema).min(1),
  }),
});

export type Link = z.infer<typeof linkSchema>;
export type LogoMark = z.infer<typeof logoMarkSchema>;
export type TechChip = z.infer<typeof techChipSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
