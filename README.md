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

Almost every change is a content edit — no HTML or CSS needed.

| To change…                                  | Edit                             |
| ------------------------------------------- | -------------------------------- |
| A research or project entry (card + page)   | `src/content/projects/<slug>.md` |
| Project categories (filter chips)           | `src/data/categories.ts`         |
| Name, contact links, SEO text, hero, footer | `src/data/site.ts`               |
| Experience timeline                         | `src/data/experience.ts`         |
| Education, skills, awards                   | `src/data/education.ts`          |
| Printable CV (`/cv.html`)                   | `src/data/cv.ts`                 |

Every project is one Markdown file: the front matter is the card data, validated by the Zod
schema in `src/data/schemas.ts`, and the body is the write-up on `/projects/<slug>.html`.
`npm run check` and the build fail if a field is missing or misspelled.

### Common tasks

- **Add a project.** Copy an existing file in `src/content/projects/`, then:
  - set `kind` (`research` or `project`), `categories`, `status` and `order` (lower comes first);
  - put its media in `public/assets/media/<slug>/`.

  It then appears on the home page, in the filter counts, and as its own page.

- **Keep a project unpublished.** Set `draft: true` and keep its media outside `public/` (for
  example in `docs/drafts/`). Drafts never reach the build, and a unit test fails if a draft's
  media sits in `public/`.
- **Add media.** Pick a `fit`:
  - `cover` crops to fill the frame (optional `position`);
  - `contain` letterboxes the whole image (optional `background`);
  - `diagram` shows it on white with an "open" hint.

  Short clips (`.mp4`) need a `poster` image. A card can show its own small loop: add
  `media.card` (same fields as an item); otherwise the card uses the first item. They play muted while on screen and never autoplay
  with reduced motion. Keep clips to a few hundred KB, for example with
  `ffmpeg -i in.mp4 -an -c:v libx264 -crf 30 -vf scale=960:-2 -movflags +faststart out.mp4`.

- **Add a category.** Add a key to `src/data/categories.ts`. Empty categories are hidden.
- **Add a technology logo.** Chips accept any icon registered in `src/lib/icons.ts` and
  `src/lib/icon-names.ts`. Logos come from the pinned [`devicon`](https://devicon.dev) package.
- **Change colours, type or motion.** Edit the design tokens in `src/styles/tokens.css`. All motion
  lives in `src/styles/motion.css` and respects `prefers-reduced-motion`.

## Project structure

```
public/assets/        Images, clips, logos and diagrams (served as-is at /assets/…)
src/
  content/projects/   One Markdown file per research/project entry
  data/               Schemas, categories and the remaining site content (typed)
  components/         One Astro component per UI block
  layouts/            Document shell and the shared site layout
  pages/              index → /, projects/[slug] → /projects/<slug>.html, cv → /cv.html
  scripts/            Client behaviour: carousel, lightbox, filter, nav, reveal, video, hero art
  styles/             Design tokens, base styles, one stylesheet per component, motion layer
  lib/                Icon registry and helpers
  assets/icons/ui/    Line icons used by the site chrome
tests/
  e2e/                Playwright browser tests (desktop + Pixel 7) incl. axe a11y scan
  unit/               Content checks (schema, media exist, drafts not shipped)
docs/
  diagrams/           TikZ sources for the SVG diagrams
  illustrations/      Source of rendered illustration clips (MuJoCo)
  drafts/             Media for draft entries (never deployed)
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
