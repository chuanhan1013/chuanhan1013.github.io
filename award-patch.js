(() => {
  const FU_BELL_IMAGE = 'https://cpo.ntu.edu.tw/001/Upload/1513/relpic/101455/207313/7cfaa5e7-d19b-4fc2-b2a6-ceec23b41566%40710x470.jpg';
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

  addIcon('Fu Bell Award', FU_BELL_IMAGE, 'award-mini-icon--fu', 'Fu Bell at National Taiwan University');
  addIcon('NTU Varsity Basketball', NTU_BASKETBALL_BADGE, 'award-mini-icon--basketball', 'National Taiwan University Owls basketball emblem');

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
    .award-mini-icon--fu{object-fit:cover;object-position:50% 30%}
    .award-mini-icon--basketball{object-fit:contain;padding:3px}
    .triathlon-hero img{object-position:50% 70%!important}
  `;
  document.head.append(style);
})();
