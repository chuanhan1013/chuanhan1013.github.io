/** Helpers for the `projects` content collection, shared by pages and components. */
import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategoryKey } from '@/data/categories';
import type { MediaItem } from '@/data/schemas';

export type ProjectEntry = CollectionEntry<'projects'>;

const byOrder = (a: ProjectEntry, b: ProjectEntry) => a.data.order - b.data.order;

/** All published entries (drafts excluded): research first, then projects, each by `order`. */
export async function getAllProjects(): Promise<ProjectEntry[]> {
  const all = await getCollection('projects', (entry) => !entry.data.draft);
  return [
    ...all.filter((p) => p.data.kind === 'research').sort(byOrder),
    ...all.filter((p) => p.data.kind === 'project').sort(byOrder),
  ];
}

export const projectUrl = (entry: ProjectEntry) => `/projects/${entry.id}.html`;

/** Categories that have at least one project, in the configured order, with counts. */
export function usedCategories(entries: ProjectEntry[]) {
  return (Object.keys(categories) as CategoryKey[])
    .map((key) => ({
      key,
      ...categories[key],
      count: entries.filter((e) => e.data.categories.includes(key)).length,
    }))
    .filter((c) => c.count > 0);
}

/** The image used on cards: the first gallery item. */
export const coverOf = (entry: ProjectEntry): MediaItem => entry.data.media.items[0] as MediaItem;

/** Unique, CSS-safe view-transition names linking a card to its detail page. */
export const transitionName = (entry: ProjectEntry, part: 'cover' | 'title') => `${part}-${entry.id}`;
