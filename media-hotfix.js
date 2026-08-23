(() => {
  /* Cleaning robot: target the full feature card created by script-core.js. */
  const cleaningCard = [...document.querySelectorAll('#projects .feature-card')]
    .find(card => card.querySelector('h3')?.textContent.includes('Autonomous Cleaning Robot'));
  const cleaning = cleaningCard?.querySelector('[aria-label="Autonomous cleaning robot project media"]');
  if (cleaningCard && cleaning) {
    cleaningCard.classList.add('cleaning-feature-card');
    const sources = [
      ['assets/media/cleaning-final.webp', 'Final autonomous cleaning robot prototype', 'Final integrated prototype'],
      ['assets/media/cleaning-cad.webp', 'Final CAD layout of the autonomous cleaning robot', 'System CAD'],
      ['assets/media/cleaning-cfd.webp', 'CFD airflow simulation for the robot vacuum module', 'Suction CFD']
    ];
    const slides = [...cleaning.querySelectorAll('.carousel-slide')];
    slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      const item = sources[index];
      if (!img || !item) return;
      img.src = item[0];
      img.removeAttribute('data-src');
      img.alt = item[1];
      img.loading = 'eager';
      img.decoding = 'async';
      if (index === 0) img.fetchPriority = 'high';
      slide.classList.toggle('is-active', index === 0);
      slide.classList.add('cleaning-slide');
      const caption = slide.querySelector('.carousel-caption');
      if (caption) caption.textContent = item[2];
    });
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
    .cleaning-feature-card{content-visibility:visible!important}
    .cleaning-feature-card .feature-media{background:#eef3f7!important}
    .cleaning-feature-card .cleaning-slide{padding:6px!important;background:#eef3f7!important}
    .cleaning-feature-card .cleaning-slide img{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;background:#eef3f7!important;opacity:1!important;visibility:visible!important}
    .basketball-demo-landscape{padding:0!important;background:#0d1720!important}
    .basketball-demo-landscape img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;background:#0d1720!important;max-width:none!important;max-height:none!important}
  `;
  document.head.append(style);
})();
