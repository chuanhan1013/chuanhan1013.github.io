# chuanhan1013.github.io

Personal robotics and embodied AI portfolio for Chuan-Han Li — <https://chuanhan1013.github.io>.

Built with [Astro](https://astro.build) as a fully static site: no client framework, a few small
TypeScript modules for interactivity, and all content kept in typed data files.

## Quick start

```bash
nvm use            # Node version from .nvmrc
npm ci             # install exact locked dependencies
npm run dev        # http://localhost:4321 with live reload
```

| Command                 | What it does                                                                |
| ----------------------- | --------------------------------------------------------------------------- |
| `npm run dev`           | Local dev server with hot reload                                            |
| `npm run build`         | Production build into `dist/`                                               |
| `npm run preview`       | Serve the production build locally                                          |
| `npm run check`         | Type-check `.astro` / `.ts` files (catches content typos)                   |
| `npm run lint`          | ESLint + Prettier check                                                     |
| `npm run format`        | Auto-format everything with Prettier                                        |
| `npm run validate:html` | Validate the built HTML (`html-validate`)                                   |
| `npm test`              | Playwright tests on the built site (desktop + mobile, a11y, content checks) |
| `npm run verify`        | All of the above in CI order — run this before pushing                      |

First time running tests locally: `npx playwright install chromium`.

## Editing content

Almost every change is a data edit — no HTML or CSS needed.

| To change…                                  | Edit                     |
| ------------------------------------------- | ------------------------ |
| Name, contact links, SEO text, hero, footer | `src/data/site.ts`       |
| Research cards                              | `src/data/research.ts`   |
| Project cards                               | `src/data/projects.ts`   |
| Experience timeline                         | `src/data/experience.ts` |
| Education, skills, awards                   | `src/data/education.ts`  |
| Printable CV (`/cv.html`)                   | `src/data/cv.ts`         |
| Organisation logos                          | `src/data/logos.ts`      |

The shapes of all of these are defined in `src/data/types.ts`; `npm run check` fails if a field is
missing or misspelled.

### Common tasks

- **Add a project:** append an object to `projects` in `src/data/projects.ts`. Card numbers are
  assigned automatically in display order.
- **Add a photo/GIF to a card:** put the file in `public/assets/media/` and add an item to the
  card's `media.items`. Pick a `fit` (see the comment at the top of `src/styles/media.css`):
  `photo`, `cover` (+ optional `position`), `contain` (+ optional `padding` / `background`),
  `diagram`, or `flush` (+ `background`). The first item is shown first; the rest load on demand.
- **Add a technology logo:** chips accept any icon registered in `src/lib/icons.ts`. Logos come
  from the pinned [`devicon`](https://devicon.dev) package — import the SVG there and add it to
  `deviconUrls`.
- **Change colours / spacing:** design tokens live in `src/styles/tokens.css`; each component has
  its own stylesheet in `src/styles/`.

## Project structure

```
public/assets/        Images, GIFs, logos and diagrams (served as-is at /assets/…)
src/
  data/               All site content (typed)
  components/         One Astro component per UI block
  layouts/            HTML document shell
  pages/              index.astro → /, cv.astro → /cv.html
  scripts/            Client-side behaviour: carousel, lightbox, nav, scroll reveal
  styles/             Global tokens/base + one stylesheet per component
  lib/                Icon registry and small helpers
  assets/icons/ui/    Line icons used by the site chrome
tests/
  e2e/                Playwright browser tests (desktop + Pixel 7) incl. axe a11y scan
  unit/               Content integrity checks (assets exist, unique ids, alt text)
docs/
  diagrams/           TikZ sources for the SVG diagrams
```

## Deployment

`.github/workflows/ci.yml` runs on every pull request and every push to `main`: type-check → lint → build → HTML
validation → tests. When a push to `main` passes, the built `dist/` is deployed to GitHub Pages.

> **One-time setting:** in the repository's _Settings → Pages_, set **Source** to
> **GitHub Actions**. (Deploying from a branch would publish the raw source instead of the build.)

Dependabot opens weekly grouped PRs for npm packages and monthly PRs for GitHub Actions; CI must
pass before merging them.

## Diagrams

The SVGs in `public/assets/diagrams/` are generated from the TikZ sources in `docs/diagrams/`:

```bash
cd docs/diagrams
pdflatex -interaction=nonstopmode -halt-on-error han-agents.tex
pdftocairo -svg han-agents.pdf ../../public/assets/diagrams/han-agents.svg
```
