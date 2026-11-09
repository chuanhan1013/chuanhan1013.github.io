/**
 * Content collections. Each project is one Markdown file in src/content/projects/:
 * front matter = card data (validated by `projectSchema`), body = detail-page write-up.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './data/schemas';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: projectSchema,
});

export const collections = { projects };
