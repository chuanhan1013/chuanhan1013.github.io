/** Client entry point shared by all portfolio pages. */
import { initCarousels } from './carousel';
import { initFilter } from './filter';
import { initLightbox } from './lightbox';
import { initNav } from './nav';
import { initReveal } from './reveal';
import { initTrajectory } from './trajectory';
import { initVideos } from './video';

// Each feature initialises independently, so a failure in one cannot disable the others.
for (const init of [
  initNav,
  initCarousels,
  initLightbox,
  initFilter,
  initReveal,
  initTrajectory,
  initVideos,
]) {
  try {
    init();
  } catch (error) {
    console.error(`${init.name} failed`, error);
  }
}
