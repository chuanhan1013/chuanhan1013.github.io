(() => {
  /* Basketball: remove duplicate side photo and shift the live GIF crop downward. */
  const basketball = document.querySelector('[aria-label="Basketball sensing project media"]');
  if (basketball) {
    const track = basketball.querySelector('.carousel-track');
    const slides = [...(track?.querySelectorAll('.carousel-slide') || [])];
    const duplicate = slides.find(slide => slide.querySelector('img')?.getAttribute('data-src')?.includes('basketball-side.webp'));
    duplicate?.remove();
    const demo = [...(track?.querySelectorAll('.carousel-slide') || [])].find(slide => {
      const img = slide.querySelector('img');
      return (img?.getAttribute('data-src') || img?.getAttribute('src') || '').includes('basketball-sensing-demo.gif');
    });
    if (demo) {
      demo.classList.remove('is-contained');
      demo.classList.add('basketball-demo');
    }
  }

  /* Triathlon: previous slide 2 leads, report Fig. 2-11 is slide 2, beam moves to slide 3. */
  const triathlon = document.querySelector('[aria-label="Triathlon robot project media"]');
  if (triathlon) {
    const track = triathlon.querySelector('.carousel-track');
    const slides = [...(track?.querySelectorAll('.carousel-slide') || [])];
    const byAsset = name => slides.find(slide => {
      const img = slide.querySelector('img');
      return [img?.getAttribute('src'), img?.getAttribute('data-src')].some(value => value?.includes(name));
    });
    const amphibious = byAsset('triathlon-amphibious.webp');
    const beam = byAsset('triathlon-beam.webp');
    if (track && amphibious && beam) {
      slides.forEach(slide => slide.classList.remove('is-active'));
      amphibious.classList.add('is-active', 'triathlon-hero');
      amphibious.classList.remove('is-contained');
      const heroImg = amphibious.querySelector('img');
      if (heroImg?.dataset.src && !heroImg.getAttribute('src')) {
        heroImg.src = heroImg.dataset.src;
        heroImg.removeAttribute('data-src');
      }
      track.prepend(amphibious);

      let water = [...track.querySelectorAll('.carousel-slide')].find(slide => {
        const img = slide.querySelector('img');
        return [img?.getAttribute('src'), img?.getAttribute('data-src')].some(value => value?.includes('triathlon-water-config.webp'));
      });
      if (!water) {
        water = document.createElement('figure');
        water.className = 'carousel-slide is-contained';
        water.innerHTML = '<img data-src="assets/media/triathlon-water-config.webp" alt="Water-channel configuration of the transformed triathlon robot" loading="lazy" decoding="async"><figcaption class="carousel-caption">Water-channel transformed configuration · report Fig. 2-11</figcaption>';
      }
      amphibious.after(water);
      water.after(beam);
      const waterImg = water.querySelector('img');
      if (waterImg) { waterImg.tabIndex = 0; waterImg.setAttribute('role', 'button'); }
    }
  }

  /* SATA: replace the duplicated third still with the existing stair-traversal reference. */
  const sata = [...document.querySelectorAll('#projects .feature-card')].find(card => card.querySelector('h3')?.textContent.includes('Bio-Inspired'));
  const sataThird = sata?.querySelectorAll('.carousel-slide')?.[2];
  if (sataThird) {
    const img = sataThird.querySelector('img');
    if (img) {
      img.removeAttribute('src');
      img.dataset.src = 'https://raw.githubusercontent.com/chuanhan1013/isaaclab-torque-locomotion/main/results/gym_reference/ev_stairs.gif';
      img.alt = 'Isaac Gym reference policy traversing stairs';
      img.referrerPolicy = 'no-referrer';
    }
    const cap = sataThird.querySelector('figcaption');
    if (cap) cap.textContent = 'Isaac Gym reference · stair traversal';
  }

  /* Egg research: replace the placeholder diagram with real ACPA presentation media. */
  const eggCard = [...document.querySelectorAll('#research .feature-card')].find(card => card.querySelector('h3')?.textContent.includes('Multimodal Visual'));
  const eggMedia = eggCard?.querySelector('.feature-media');
  if (eggMedia) {
    eggMedia.className = 'feature-media media-carousel egg-carousel';
    eggMedia.setAttribute('data-carousel', '');
    eggMedia.setAttribute('aria-label', 'Duck egg visible and thermal fertility research media');
    const slides = [
      ['assets/media/egg-setup.webp', 'Controlled visible + thermal imaging setup and illuminated egg tray', 'Imaging setup · visible + thermal acquisition'],
      ['assets/media/egg-visible-thermal-preprocess.webp', 'Perspective transformation for visible and thermal duck egg images', 'Visible + thermal preprocessing'],
      ['assets/media/egg-crops.webp', 'Detected duck eggs cropped into fertilized, unfertilized, and invalid samples', 'Detection → per-egg crops'],
      ['assets/media/egg-rgb-result.webp', 'RGB classification result with normalized confusion matrix', 'RGB baseline · 92% accuracy'],
      ['assets/media/egg-thermal-result.webp', 'Thermal classification result with normalized confusion matrix', 'Thermal baseline · 90% accuracy']
    ];
    eggMedia.innerHTML = `<div class="carousel-track">${slides.map(([src, alt, caption], i) => `<figure class="carousel-slide egg-slide${i === 0 ? ' is-active' : ''}"><img src="${src}" alt="${alt}" loading="lazy" decoding="async" tabindex="0" role="button"><figcaption class="carousel-caption">${caption}</figcaption></figure>`).join('')}</div><button class="carousel-btn prev" type="button" aria-label="Previous media">‹</button><button class="carousel-btn next" type="button" aria-label="Next media">›</button><div class="carousel-dots" aria-hidden="true"></div><span class="badge">ACPA 2025 · REAL EXPERIMENT MEDIA</span>`;
  }

  const style = document.createElement('style');
  style.textContent = '.basketball-demo{padding:0!important;background:#0d1720!important}.basketball-demo img{object-fit:cover!important;object-position:50% 68%!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important}.triathlon-hero{padding:0!important}.triathlon-hero img{object-fit:cover!important;object-position:50% 62%!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important}.egg-carousel .egg-slide{background:#f6f3ef}.egg-carousel .egg-slide img{object-fit:contain!important;width:100%!important;height:100%!important;background:#f6f3ef}';
  document.head.append(style);
})();
