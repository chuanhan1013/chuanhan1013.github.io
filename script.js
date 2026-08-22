const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const links = [...document.querySelectorAll(".site-nav a[href^='#']")];

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
}

/* Profile / positioning polish */
const avatar = document.querySelector('.avatar');
if (avatar) avatar.src = 'assets/media/profile-chuanhan.jpg';

const profileRole = document.querySelector('.profile-role');
if (profileRole) {
  profileRole.innerHTML = 'M.Sc. Robotics<br />National University of Singapore<span class="profile-subdegree">B.S. Biomechatronics Engineering<br />National Taiwan University</span>';
}

const focus = [...document.querySelectorAll('.profile-facts > div')]
  .find(row => row.querySelector('dt')?.textContent.trim() === 'Focus')?.querySelector('dd');
if (focus) focus.textContent = 'Robotics · Embodied AI · AI Engineering · Software Engineering';

const heroLede = document.querySelector('.hero-lede');
if (heroLede) {
  heroLede.textContent = 'I am an M.Sc. Robotics student at the National University of Singapore and hold a B.S. in Biomechatronics Engineering from National Taiwan University. My background spans robot learning, multimodal perception, mechatronics, AI engineering, and software systems. My current research focuses on motion planning for robot manipulators in dynamic environments.';
}

const interests = document.querySelector('.interest-strip');
if (interests) {
  const tags = [...interests.querySelectorAll('span')];
  if (tags.length) tags[tags.length - 1].textContent = 'AI / Software Engineering';
}

document.querySelector('footer a[href="https://unavatar.io"]')?.remove();

/* Keep the basketball gallery concise: demo + architecture. */
const basketballCarousel = document.querySelector('[aria-label="Basketball sensing project media"]');
if (basketballCarousel) {
  [...basketballCarousel.querySelectorAll('.carousel-slide')].forEach(slide => {
    const img = slide.querySelector('img');
    if (img?.src.includes('basketball-sensing-setup.jpg')) slide.remove();
  });
  basketballCarousel.querySelector('.carousel-slide')?.classList.add('is-contained');
}

/* Add the real Franka Research 3 platform before the NUS method figure. */
const nusResearchCard = document.querySelector('#research .feature-card');
if (nusResearchCard) {
  const media = nusResearchCard.querySelector('.feature-media');
  if (media && !media.matches('[data-carousel]')) {
    media.className = 'feature-media media-carousel';
    media.setAttribute('data-carousel', '');
    media.setAttribute('aria-label', 'NUS dynamic manipulator research media');
    media.innerHTML = `
      <div class="carousel-track">
        <figure class="carousel-slide is-active media-real">
          <img src="https://franka.de/hubfs/20220920_Franka_Research1771.jpg" alt="Franka Research 3 robot platform" loading="lazy" referrerpolicy="no-referrer" />
          <figcaption class="carousel-caption">Franka Research 3 · official image: Franka Robotics</figcaption>
        </figure>
        <figure class="carousel-slide is-diagram is-contained">
          <img src="assets/diagrams/dynur.svg" alt="Method diagram for dynamic manipulator motion planning and link-centric obstacle representation" loading="lazy" />
          <figcaption class="carousel-caption">Research-method overview</figcaption>
        </figure>
      </div>
      <button class="carousel-btn prev" type="button" aria-label="Previous media">‹</button>
      <button class="carousel-btn next" type="button" aria-label="Next media">›</button>
      <div class="carousel-dots" aria-label="Choose research media"></div>
      <span class="badge">NUS ARC · Ongoing</span>`;
  }
  const tags = nusResearchCard.querySelector('.tag-row');
  if (tags && ![...tags.children].some(el => el.textContent.includes('Franka'))) {
    const tag = document.createElement('span');
    tag.textContent = 'Franka Research 3';
    tags.appendChild(tag);
  }
  const note = nusResearchCard.querySelector('.note');
  if (note && !nusResearchCard.querySelector('.project-links')) {
    const linksRow = document.createElement('div');
    linksRow.className = 'project-links';
    linksRow.innerHTML = '<a href="https://franka.de/franka-research-3" target="_blank" rel="noreferrer">FR3 platform ↗</a>';
    note.before(linksRow);
  }
}

/* Promote the cleaning robot from a thumbnail card to the fixed media pattern. */
const projectGrid = document.querySelector('.project-grid');
const cleaningMini = [...(projectGrid?.querySelectorAll('.mini-card') || [])]
  .find(card => card.querySelector('h3')?.textContent.includes('Autonomous Cleaning Robot'));
if (projectGrid && cleaningMini) {
  const card = document.createElement('article');
  card.className = 'feature-card feature-card--project cleaning-feature';
  card.innerHTML = `
    <div class="feature-media media-carousel" data-carousel aria-label="Autonomous cleaning robot project media">
      <div class="carousel-track">
        <figure class="carousel-slide is-active is-contained"><img src="assets/media/cleaning-final.webp" alt="Final autonomous cleaning robot prototype" loading="lazy" /><figcaption class="carousel-caption">Final integrated prototype</figcaption></figure>
        <figure class="carousel-slide is-contained"><img src="assets/media/cleaning-cad.webp" alt="Final CAD layout of the autonomous cleaning robot" loading="lazy" /><figcaption class="carousel-caption">System CAD</figcaption></figure>
        <figure class="carousel-slide is-contained"><img src="assets/media/cleaning-cfd.webp" alt="CFD airflow simulation for the robot vacuum module" loading="lazy" /><figcaption class="carousel-caption">Suction CFD</figcaption></figure>
      </div>
      <button class="carousel-btn prev" type="button" aria-label="Previous media">‹</button>
      <button class="carousel-btn next" type="button" aria-label="Next media">›</button>
      <div class="carousel-dots" aria-label="Choose project media"></div>
      <span class="badge">AUTONOMOUS SYSTEMS</span>
    </div>
    <div class="feature-body">
      <p class="feature-number">06</p>
      <h3>Autonomous Cleaning Robot</h3>
      <p class="meta">Mechatronics IV · Fall 2025 · Group 10</p>
      <p>Built an autonomous competition robot integrating Raspberry Pi vision, Arduino-based control, wall-following, obstacle sensing, red-zone recognition, and a custom vacuum module developed through CAD, airflow simulation, prototyping, and testing.</p>
      <div class="result-row compact"><div><strong>113 pts</strong><span>final score</span></div><div><strong>70 pts</strong><span>time-based performance</span></div></div>
      <div class="tag-row"><span>Raspberry Pi</span><span>Arduino</span><span>Computer Vision</span><span>Control</span><span>CAD / CFD</span></div>
      <div class="project-links"><a href="https://github.com/chuanhan1013/mechatronic_4_ntu_bime_2025_group10" target="_blank" rel="noreferrer">Code ↗</a></div>
    </div>`;
  projectGrid.parentNode.insertBefore(card, projectGrid);
  cleaningMini.remove();
}

/* Turn the triathlon robot into a full project gallery — one viewport, six useful assets. */
const triathlonMini = [...(projectGrid?.querySelectorAll('.mini-card') || [])]
  .find(card => card.querySelector('h3')?.textContent.includes('Amphibious Tracked Vehicle'));
if (projectGrid && triathlonMini) {
  const card = document.createElement('article');
  card.className = 'feature-card feature-card--project triathlon-feature';
  card.innerHTML = `
    <div class="feature-media media-carousel" data-carousel aria-label="Triathlon robot project media">
      <div class="carousel-track">
        <figure class="carousel-slide is-active is-contained"><img src="assets/media/triathlon-beam-demo.gif" alt="Triathlon tracked robot traversing the narrow beam stage" loading="lazy" /><figcaption class="carousel-caption">Narrow-beam traversal demo</figcaption></figure>
        <figure class="carousel-slide is-contained"><img src="assets/media/triathlon-amphibious.webp" alt="Final amphibious configuration of the terrain-adaptive triathlon robot" loading="lazy" /><figcaption class="carousel-caption">Final amphibious configuration</figcaption></figure>
        <figure class="carousel-slide is-contained"><img src="assets/media/triathlon-printing.webp" alt="3D-printing the robot wheel and transmission components" loading="lazy" /><figcaption class="carousel-caption">Rapid 3D-printed fabrication</figcaption></figure>
        <figure class="carousel-slide is-contained"><img src="assets/media/triathlon-water-course.webp" alt="Water-channel test course used for the triathlon robot competition" loading="lazy" /><figcaption class="carousel-caption">Water-channel stage</figcaption></figure>
        <figure class="carousel-slide is-contained"><img src="assets/media/triathlon-wind-course.webp" alt="Wind-tunnel test enclosure used for the triathlon robot competition" loading="lazy" /><figcaption class="carousel-caption">Wind-tunnel stage</figcaption></figure>
        <figure class="carousel-slide is-contained"><img src="assets/media/triathlon-competition.webp" alt="Final triathlon robot competition showcase with all teams" loading="lazy" /><figcaption class="carousel-caption">Competition-day showcase</figcaption></figure>
      </div>
      <button class="carousel-btn prev" type="button" aria-label="Previous media">‹</button>
      <button class="carousel-btn next" type="button" aria-label="Next media">›</button>
      <div class="carousel-dots" aria-label="Choose project media"></div>
      <span class="badge">MECHANICAL DESIGN · TEAM LEAD</span>
    </div>
    <div class="feature-body">
      <p class="feature-number">07</p>
      <h3>Terrain-Adaptive Triathlon Robot</h3>
      <p class="meta">Mechanical Design · Spring 2025 · Team project</p>
      <p>Designed and fabricated a transformable tracked robot for four distinct stages — ramp, narrow beam, water channel, and wind tunnel. I focused on modelling and 3D-printing the chassis, gearbox, and paddle-wheel mechanisms, then iterated the drivetrain, centre-of-mass placement, and amphibious guidance hardware through repeated tests.</p>
      <div class="result-row compact"><div><strong>4 / 4</strong><span>competition stages completed</span></div><div><strong>2nd</strong><span>overall official ranking</span></div></div>
      <div class="tag-row"><span>SolidWorks</span><span>OpenSCAD</span><span>3D Printing</span><span>Tracked Drive</span><span>Mechanical Design</span></div>
    </div>`;
  projectGrid.parentNode.insertBefore(card, projectGrid);
  triathlonMini.remove();
}
if (projectGrid && !projectGrid.querySelector('.mini-card')) projectGrid.remove();

/* Unified project-media behaviour: every research/project image can be enlarged. */
const extraStyle = document.createElement('style');
extraStyle.textContent = `
  .profile-subdegree{display:block;margin-top:10px;padding-top:10px;border-top:1px solid rgba(91,119,139,.18);font-size:.78em;line-height:1.45;color:#667988;font-weight:500}
  .media-carousel .carousel-slide.is-contained{display:grid;place-items:center;padding:12px;background:linear-gradient(180deg,#fcfeff,#f2f7fb)}
  .media-carousel .carousel-slide.is-contained img{object-fit:contain;max-width:100%;max-height:100%}
  .feature-media img{cursor:zoom-in}
  .diagram-frame,.carousel-slide.is-diagram{position:relative}
  .diagram-frame::after,.carousel-slide.is-diagram::after{content:'↗';position:absolute;right:12px;bottom:12px;width:28px;height:28px;display:grid;place-items:center;border-radius:9px;background:rgba(18,45,64,.48);backdrop-filter:blur(7px);color:white;font-size:14px;pointer-events:none}
  .diagram-lightbox{position:fixed;inset:0;z-index:1000;display:none;grid-template-columns:auto minmax(0,1fr) auto;grid-template-rows:1fr auto;align-items:center;gap:12px;padding:28px;background:rgba(8,20,30,.86);backdrop-filter:blur(10px)}
  .diagram-lightbox.is-open{display:grid}
  .diagram-lightbox .lb-stage{grid-column:2;grid-row:1;display:grid;place-items:center;min-width:0;min-height:0}
  .diagram-lightbox img{display:block;max-width:min(1280px,88vw);max-height:84vh;width:auto;height:auto;border-radius:18px;background:#f8fbfd;box-shadow:0 28px 80px rgba(0,0,0,.36)}
  .diagram-lightbox .lb-close{position:fixed;top:20px;right:22px;width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:white;font-size:27px;cursor:pointer;z-index:2}
  .diagram-lightbox .lb-nav{width:48px;height:58px;border:0;border-radius:14px;background:rgba(255,255,255,.14);backdrop-filter:blur(8px);color:white;font-size:34px;cursor:pointer;transition:background .18s ease}
  .diagram-lightbox .lb-nav:hover{background:rgba(255,255,255,.24)}
  .diagram-lightbox .lb-prev{grid-column:1;grid-row:1}.diagram-lightbox .lb-next{grid-column:3;grid-row:1}
  .diagram-lightbox .lb-caption{grid-column:1 / -1;grid-row:2;margin:0;color:rgba(255,255,255,.88);font-size:13px;text-align:center;min-height:20px}
  .diagram-lightbox.is-single .lb-nav{visibility:hidden}
  body.lightbox-open{overflow:hidden}
  @media(max-width:700px){.diagram-lightbox{padding:12px;gap:4px}.diagram-lightbox img{max-width:82vw;max-height:80vh}.diagram-lightbox .lb-nav{width:36px;height:50px;font-size:28px}.profile-subdegree{font-size:.8em}}
`;
document.head.appendChild(extraStyle);

const lightbox = document.createElement('div');
lightbox.className = 'diagram-lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Expanded project media');
lightbox.innerHTML = `
  <button class="lb-close" type="button" aria-label="Close media">×</button>
  <button class="lb-nav lb-prev" type="button" aria-label="Previous media">‹</button>
  <div class="lb-stage"><img alt="" /></div>
  <button class="lb-nav lb-next" type="button" aria-label="Next media">›</button>
  <p class="lb-caption"></p>`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lb-caption');
let gallery = [];
let galleryIndex = 0;

function mediaCaption(img) {
  return img.closest('figure')?.querySelector('figcaption')?.textContent.trim() || img.alt || '';
}
function renderLightbox() {
  const img = gallery[galleryIndex];
  if (!img) return;
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt || 'Expanded project media';
  lightboxCaption.textContent = mediaCaption(img) + (gallery.length > 1 ? ` · ${galleryIndex + 1} / ${gallery.length}` : '');
  lightbox.classList.toggle('is-single', gallery.length < 2);
}
function openLightbox(img) {
  const media = img.closest('.feature-media');
  gallery = media ? [...media.querySelectorAll('img')] : [img];
  galleryIndex = Math.max(0, gallery.indexOf(img));
  renderLightbox();
  lightbox.classList.add('is-open');
  document.body.classList.add('lightbox-open');
  lightbox.querySelector('.lb-close').focus();
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.classList.remove('lightbox-open');
  lightboxImg.removeAttribute('src');
  gallery = [];
}
function moveLightbox(delta) {
  if (gallery.length < 2) return;
  galleryIndex = (galleryIndex + delta + gallery.length) % gallery.length;
  renderLightbox();
}

document.querySelectorAll('.feature-media img').forEach(img => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', `${img.alt || 'Project media'} — open enlarged view`);
  img.addEventListener('click', () => openLightbox(img));
  img.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(img);
    }
  });
});

lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', () => moveLightbox(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});
let lbTouchX = null;
lightbox.addEventListener('touchstart', event => { lbTouchX = event.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', event => {
  if (lbTouchX === null) return;
  const dx = event.changedTouches[0].clientX - lbTouchX;
  lbTouchX = null;
  if (Math.abs(dx) > 45) moveLightbox(dx < 0 ? 1 : -1);
}, { passive: true });

const sections = [...document.querySelectorAll('.section-anchor')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealItems = [...document.querySelectorAll('.feature-card, .mini-card, .timeline article, .edu-card, .skills > div, .award-strip > div')];
  document.body.classList.add('reveal-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
    revealObserver.observe(item);
  });
}