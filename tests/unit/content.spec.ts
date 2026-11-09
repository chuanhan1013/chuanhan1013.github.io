/**
 * Content integrity checks that run without a browser. They validate every project file against
 * the same Zod schema the site uses, and make sure media referenced by published entries exists
 * while media for drafts is never shipped from public/.
 */
import { expect, test } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { awards, education } from '../../src/data/education';
import { experience } from '../../src/data/experience';
import { projectSchema, type ProjectData } from '../../src/data/schemas';
import { profile } from '../../src/data/site';

const root = process.cwd();
const projectsDir = join(root, 'src/content/projects');
const inPublic = (src: string) => existsSync(join(root, 'public', src));

function loadProjects() {
  return readdirSync(projectsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const text = readFileSync(join(projectsDir, file), 'utf8');
      const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
      if (!match?.[1]) throw new Error(`${file}: missing front matter`);
      return { file, raw: parse(match[1]) as unknown, body: text.slice(match[0].length) };
    });
}

const mediaPaths = (data: ProjectData) => [
  ...[...data.media.items, ...(data.media.card ? [data.media.card] : [])].flatMap((item) => [
    item.src,
    item.poster,
  ]),
  data.contextLogo?.src,
];

test('every project file matches the content schema', () => {
  for (const { file, raw } of loadProjects()) {
    const result = projectSchema.safeParse(raw);
    expect(result.success, `${file}: ${result.success ? '' : result.error.message}`).toBe(true);
  }
});

test('published projects only reference media that exists; drafts ship no media', () => {
  for (const { file, raw } of loadProjects()) {
    const data = projectSchema.parse(raw);
    const local = mediaPaths(data).filter((src): src is string => !!src && src.startsWith('/'));
    for (const src of local) {
      if (data.draft)
        expect(inPublic(src), `${file}: draft media must not be in public/: ${src}`).toBe(false);
      else expect(inPublic(src), `${file}: missing ${src}`).toBe(true);
    }
  }
});

test('project titles are unique and every project has a write-up', () => {
  const projects = loadProjects();
  const titles = projects.map((p) => projectSchema.parse(p.raw).title);
  expect(new Set(titles).size).toBe(titles.length);
  for (const { file, body } of projects) expect(body.trim().length, file).toBeGreaterThan(100);
});

test('profile, timeline, education and award assets exist', () => {
  const srcs = [
    profile.avatar.src,
    ...experience.flatMap((e) => (e.logo ? [e.logo.src] : [])),
    ...education.flatMap((e) => [e.brand.src, e.research.logo.src]),
    ...awards.map((a) => a.icon.src),
  ].filter((src) => src.startsWith('/'));
  expect(srcs.filter((src) => !inPublic(src))).toEqual([]);
});
