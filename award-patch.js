(() => {
  const NTU_EMBLEM = 'assets/icons/ntu-emblem.jpg';
  const NTU_BASKETBALL_BADGE = 'https://uba.tw/Uploads/TeamBadges/B96C7871-F121-41E1-BD8C-B3B008E0B6AF.png';

  const awardCards = [...document.querySelectorAll('.award-strip > div')];
  const addIcon = (label, src, className, alt) => {
    const card = awardCards.find(item => item.querySelector('strong')?.textContent.includes(label));
    if (!card || card.querySelector('.award-mini-icon')) return;
    card.classList.add('award-with-icon');
    const img = document.createElement('img');
    img.className = `award-mini-icon ${className}`;
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    card.prepend(img);
  };

  addIcon('Fu Bell Award', NTU_EMBLEM, 'award-mini-icon--fu', 'National Taiwan University emblem');
  addIcon('NTU Varsity Basketball', NTU_BASKETBALL_BADGE, 'award-mini-icon--basketball', 'National Taiwan University Owls basketball emblem');

  const eggCard = [...document.querySelectorAll('#research .feature-card')]
    .find(card => card.querySelector('h3')?.textContent.includes('Multimodal Visual'));
  if (eggCard) {
    const bodyParagraph = [...eggCard.querySelectorAll('.feature-body > p')]
      .find(p => !p.classList.contains('feature-number') && !p.classList.contains('meta') && !p.classList.contains('note'));
    if (bodyParagraph) {
      bodyParagraph.textContent = 'Built a two-stage object-detection and lightweight-classification pipeline together with a controlled visible + thermal imaging setup for duck eggs. Cross-modal fusion reached ~93% classification accuracy, compared with 92% visible-only and 90% thermal-only baselines.';
    }

    const metrics = [...eggCard.querySelectorAll('.result-row > div')];
    if (metrics[0]) {
      const strong = metrics[0].querySelector('strong');
      const span = metrics[0].querySelector('span');
      if (strong) strong.textContent = '~93%';
      if (span) span.textContent = 'cross-modal fusion';
    }
    if (metrics[1]) {
      const strong = metrics[1].querySelector('strong');
      const span = metrics[1].querySelector('span');
      if (strong) strong.textContent = '92% / 90%';
      if (span) span.textContent = 'visible / thermal baselines';
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    .award-strip > div.award-with-icon{
      display:grid!important;
      grid-template-columns:46px minmax(0,1fr)!important;
      grid-template-rows:auto auto;
      column-gap:12px;
      align-items:center;
    }
    .award-strip > div.award-with-icon > .award-mini-icon{
      grid-column:1;
      grid-row:1 / 3;
      width:46px;
      height:46px;
      margin:0;
      border:1px solid #d8e3eb;
      border-radius:11px;
      background:#fff;
      box-shadow:0 4px 12px rgba(25,63,95,.06);
    }
    .award-strip > div.award-with-icon > strong,
    .award-strip > div.award-with-icon > span{grid-column:2}
    .award-mini-icon--fu{object-fit:contain;padding:5px}
    .award-mini-icon--basketball{object-fit:contain;padding:3px}
    .triathlon-hero img{object-position:50% 76%!important}
  `;
  document.head.append(style);
})();
