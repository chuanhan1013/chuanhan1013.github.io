/**
 * Project categories, in the order their filter chips appear on the home page.
 * To add a category: add a key here, then use it in a project's `categories` list.
 * Categories with no projects are hidden automatically.
 */
export const categories = {
  'motion-planning': { label: 'Manipulation & Motion Planning', short: 'Motion Planning' },
  'robot-learning': { label: 'Robot Learning', short: 'Robot Learning' },
  humanoids: { label: 'Humanoids & Embodied AI', short: 'Humanoids & Embodied AI' },
  control: { label: 'Control & Dynamics', short: 'Control' },
  perception: { label: 'Perception & Sensing', short: 'Perception' },
  mechatronics: { label: 'Mechatronics & Hardware', short: 'Mechatronics' },
  'ai-engineering': { label: 'AI & Software Engineering', short: 'AI Engineering' },
} as const;

export type CategoryKey = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as [CategoryKey, ...CategoryKey[]];

/** Project status shown as a badge; keeps "ongoing" research distinct from finished work. */
export const statuses = {
  ongoing: 'Ongoing research',
  completed: 'Completed',
  prototype: 'Simulation prototype',
  'in-progress': 'In progress',
} as const;

export type StatusKey = keyof typeof statuses;
export const statusKeys = Object.keys(statuses) as [StatusKey, ...StatusKey[]];
