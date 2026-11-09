/**
 * Gallery clips: play only while their slide is active and on screen; otherwise pause.
 * With reduced motion, clips never autoplay and show native controls instead.
 */
import { hydrate } from './lazy-media';

export function initVideos(): void {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('.gallery video')];
  if (!videos.length) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    videos.forEach((video) => {
      video.controls = true;
    });
    return;
  }

  const onScreen = new Set<HTMLVideoElement>();
  const sync = (video: HTMLVideoElement) => {
    const active = video.closest('.gallery__slide')?.classList.contains('is-active');
    if (active && onScreen.has(video)) {
      hydrate(video);
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) onScreen.add(video);
        else onScreen.delete(video);
        sync(video);
      }
    },
    { threshold: 0.35 },
  );
  videos.forEach((video) => observer.observe(video));

  // Slide changes (carousel.ts) start or stop the clips in that gallery.
  document.addEventListener('gallery:change', (event) => {
    (event.target as Element).querySelectorAll<HTMLVideoElement>('video').forEach(sync);
  });
}
