/** Client entry point for the portfolio page. */
import { initCarousels } from './carousel';
import { initLightbox } from './lightbox';
import { initNav } from './nav';
import { initReveal } from './reveal';

// Each feature initialises independently, so a failure in one cannot disable the others.
for (const init of [initNav, initCarousels, initLightbox, initReveal]) {
  try {
    init();
  } catch (error) {
    console.error(`${init.name} failed`, error);
  }
}
