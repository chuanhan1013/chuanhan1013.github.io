(() => {
  /* Cleaning robot: replace the decorative placeholder with real project media. */
  const cleaningCard = [...document.querySelectorAll('#projects .mini-card')]
    .find(card => card.querySelector('h3')?.textContent.includes('Autonomous Cleaning Robot'));
  const cleaningPlaceholder = cleaningCard?.querySelector('.mini-visual.robot-cleaner');
  if (cleaningCard && cleaningPlaceholder) {
    const carousel = document.createElement('div');
    carousel.className = 'mini-visual media-carousel cleaning-mini-carousel';
    carousel.setAttribute('data-carousel', '');
    carousel.setAttribute('aria-label', 'Autonomous cleaning robot project media');
    carousel.innerHTML = `
      <div class="carousel-track">
        <figure class="carousel-slide is-active cleaning-slide">
          <img src="assets/media/cleaning-final.webp" alt="Final autonomous cleaning robot prototype" loading="lazy" decoding="async" tabindex="0" role="button">
          <figcaption class="carousel-caption">Final prototype</figcaption>
        </figure>
        <figure class="carousel-slide cleaning-slide">
          <img data-src="assets/media/cleaning-cad.webp" alt="Final CAD assembly of the autonomous cleaning robot" decoding="async" tabindex="0" role="button">
          <figcaption class="carousel-caption">Final CAD assembly</figcaption>
        </figure>
        <figure class="carousel-slide cleaning-slide">
          <img data-src="assets/media/cleaning-cfd.webp" alt="Flow simulation for the cleaning mechanism" decoding="async" tabindex="0" role="button">
          <figcaption class="carousel-caption">Flow simulation</figcaption>
        </figure>
      </div>
      <button class="carousel-btn prev" type="button" aria-label="Previous cleaning robot media">‹</button>
      <button class="carousel-btn next" type="button" aria-label="Next cleaning robot media">›</button>
      <div class="carousel-dots" aria-label="Choose cleaning robot media"></div>`;
    cleaningPlaceholder.replaceWith(carousel);
  }

  /* Basketball: replace the unusably small 80×142 GIF with a clear frame from the original 1080p recording. */
  const basketball = document.querySelector('[aria-label="Basketball sensing project media"]');
  if (basketball) {
    const demo = [...basketball.querySelectorAll('.carousel-slide')].find(slide => {
      const img = slide.querySelector('img');
      const src = img?.getAttribute('src') || img?.dataset?.src || '';
      return src.includes('basketball-sensing-demo.gif') || src.includes('basketball-demo-still.webp');
    });
    if (demo) {
      demo.classList.add('basketball-demo-landscape');
      const img = demo.querySelector('img');
      if (img) {
        img.src = 'assets/media/basketball-demo-still.webp';
        img.removeAttribute('data-src');
        img.alt = 'Dual-IMU wearable basketball sensing demo with the wearable hardware and live traces visible';
        img.loading = 'eager';
      }
      const caption = demo.querySelector('.carousel-caption');
      if (caption) caption.textContent = 'Wearable sensing demo · original recording frame';
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    .cleaning-mini-carousel{height:196px!important;margin:-2px 0 17px!important;border-radius:14px!important;min-height:196px!important}
    .cleaning-mini-carousel .carousel-track{height:194px!important}
    .cleaning-mini-carousel .cleaning-slide{padding:6px;background:#eef3f7}
    .cleaning-mini-carousel .cleaning-slide img{width:100%!important;height:100%!important;object-fit:contain!important;background:#eef3f7}
    .cleaning-mini-carousel .carousel-btn{width:28px;height:38px}
    .cleaning-mini-carousel .carousel-caption{font-size:8px;bottom:9px}
    .basketball-demo-landscape{padding:0!important;background:#0d1720!important}
    .basketball-demo-landscape img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;background:#0d1720!important;max-width:none!important;max-height:none!important}
    @media(max-width:700px){.cleaning-mini-carousel{height:182px!important;min-height:182px!important}.cleaning-mini-carousel .carousel-track{height:180px!important}}
  `;
  document.head.append(style);
})();
