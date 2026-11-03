/**
 * Content integrity checks that run without a browser: every asset referenced from the
 * data files must exist in `public/`, and ids must be unique.
 */
import { expect, test } from '@playwright/test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { awards, education } from '../../src/data/education';
import { experience } from '../../src/data/experience';
import { projects } from '../../src/data/projects';
import { research } from '../../src/data/research';
import { profile } from '../../src/data/site';

const publicFile = (src: string) => join(process.cwd(), 'public', src);

const referencedAssets = (): string[] => {
  const srcs: string[] = [profile.avatar.src];
  for (const card of [...research, ...projects]) {
    srcs.push(...card.media.items.map((item) => item.src));
    if (card.metaLogo) srcs.push(card.metaLogo.src);
    if (card.chip) srcs.push(card.chip.logo.src);
  }
  for (const entry of experience) if (entry.logo) srcs.push(entry.logo.src);
  for (const entry of education) srcs.push(entry.brand.src, entry.research.logo.src);
  for (const award of awards) srcs.push(award.icon.src);
  return srcs.filter((src) => src.startsWith('/'));
};

test('all locally referenced assets exist', () => {
  const missing = referencedAssets().filter((src) => !existsSync(publicFile(src)));
  expect(missing).toEqual([]);
});

test('feature card ids and carousel labels are unique', () => {
  const cards = [...research, ...projects];
  const ids = cards.map((c) => c.id);
  const labels = cards.map((c) => c.media.label);
  expect(new Set(ids).size).toBe(ids.length);
  expect(new Set(labels).size).toBe(labels.length);
});

test('every image has alt text', () => {
  for (const card of [...research, ...projects]) {
    for (const item of card.media.items) expect(item.alt.trim(), item.src).not.toBe('');
  }
});
