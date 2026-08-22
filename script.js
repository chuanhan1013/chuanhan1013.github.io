const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];

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

/* Profile */
const avatar = document.querySelector('.avatar');
if (avatar) {
  avatar.src = 'assets/media/profile-chuanhan.jpg';
  avatar.loading = 'eager';
  avatar.decoding = 'async';
  avatar.fetchPriority = 'high';
}
const profileRole = document.querySelector('.profile-role');
if (profileRole) profileRole.innerHTML = 'M.Sc. Robotics<br />National University of Singapore<span class="profile-subdegree">B.S. Biomechatronics Engineering<br />National Taiwan University</span>';
const focus = [...document.querySelectorAll('.profile-facts > div')].find(row => row.querySelector('dt')?.textContent.trim() === 'Focus')?.querySelector('dd');
if (focus) focus.textContent = 'Robotics · Embodied AI · AI Engineering · Software Engineering';
const heroLede = document.querySelector('.hero-lede');
if (heroLede) heroLede.textContent = 'I am an M.Sc. Robotics student at the National University of Singapore and hold a B.S. in Biomechatronics Engineering from National Taiwan University. My background spans robot learning, multimodal perception, mechatronics, AI engineering, and software systems. My current research focuses on motion planning for robot manipulators in dynamic environments.';
const interests = document.querySelector('.interest-strip');
if (interests) {
  const tags = [...interests.querySelectorAll('span')];
  if (tags.length) tags[tags.length - 1].textContent = 'AI / Software Engineering';
}
document.querySelector('footer a[href="https://unavatar.io"]')?.remove();

/* Icons / identity */
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
const devicon = (slug, file = `${slug}-original.svg`) => `${DEVICON}${slug}/${file}`;
const svgIcon = body => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#235f9c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`)}`;
const categoryIcons = [
  svgIcon('<path d="M5 18h14M8 18v-3l3-2 2-5 3 1 2-4"/><circle cx="13" cy="8" r="1.5"/><circle cx="18" cy="5" r="1.5"/>'),
  svgIcon('<path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z"/><circle cx="12" cy="12" r="2.5"/>'),
  svgIcon('<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>'),
  svgIcon('<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>')
];
const iconMap = new Map([
  ['Python', devicon('python')], ['C/C++', devicon('cplusplus')], ['TypeScript/JavaScript', devicon('typescript')],
  ['Linux', devicon('linux')], ['Docker', devicon('docker')], ['Git', devicon('git')],
  ['PyTorch', devicon('pytorch')], ['TensorFlow', devicon('tensorflow')], ['OpenCV', devicon('opencv')],
  ['Arduino', devicon('arduino')], ['Raspberry Pi', devicon('raspberrypi')], ['FastAPI', devicon('fastapi')],
  ['Isaac Gym', devicon('nvidia')], ['Isaac Lab', devicon('nvidia')]
]);
function iconImg(src, alt = '') {
  const img = document.createElement('img');
  img.src = src; img.alt = alt; img.loading = 'lazy'; img.decoding = 'async'; img.referrerPolicy = 'no-referrer';
  return img;
}

[...document.querySelectorAll('.profile-links a')].forEach(link => {
  const mark = link.querySelector('span');
  if (!mark) return;
  const href = link.href || '';
  const src = href.startsWith('mailto:') ? svgIcon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>') : href.includes('github.com') ? devicon('github') : href.includes('linkedin.com') ? devicon('linkedin') : null;
  if (!src) return;
  mark.textContent = ''; mark.classList.add('profile-icon'); mark.appendChild(iconImg(src));
});

const institutions = [
  { match: 'National University of Singapore', label: 'NUS', sub: 'SG', cls: 'nus' },
  { match: 'National Taiwan University', label: 'NTU', sub: 'TW', cls: 'ntu' },
  { match: 'Advanced Robotics Centre', label: 'ARC', sub: 'NUS', cls: 'arc' },
  { match: 'ChainSea Information Integration', label: 'CS', sub: 'R&D', cls: 'chainsea' }
];
function institutionMark(data, compact = false) {
  const el = document.createElement('span');
  el.className = `institution-mark institution-${data.cls}${compact ? ' is-compact' : ''}`;
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<strong>${data.label}</strong><small>${data.sub}</small>`;
  return el;
}
document.querySelectorAll('.edu-card').forEach(card => {
  const data = institutions.find(x => card.textContent.includes(x.match));
  if (data) card.prepend(institutionMark(data));
});
document.querySelectorAll('.timeline article').forEach(article => {
  const data = institutions.find(x => article.textContent.includes(x.match));
  const body = article.children[1];
  if (!data || !body) return;
  const title = body.querySelector('h3');
  if (title) {
    const row = document.createElement('div'); row.className = 'timeline-title-row';
    title.before(row); row.append(institutionMark(data, true), title);
  }
});
function addEntityChip(card, mark, text, cls = '') {
  const meta = card?.querySelector('.meta');
  if (!meta || card.querySelector('.entity-chip')) return;
  const chip = document.createElement('div'); chip.className = `entity-chip ${cls}`.trim();
  chip.innerHTML = `<span class="entity-chip-mark">${mark}</span><span>${text}</span>`; meta.after(chip);
}
const researchCards = [...document.querySelectorAll('#research .feature-card')];
addEntityChip(researchCards[0], 'ARC', 'Advanced Robotics Centre · NUS', 'entity-nus');
addEntityChip(researchCards[1], 'MLMV', 'Machine Learning & Machine Vision Lab · NTU', 'entity-ntu');

document.querySelectorAll('.skills > div').forEach((group, i) => {
  const h3 = group.querySelector('h3'); const p = group.querySelector('p');
  if (!h3 || !p) return;
  const headIcon = document.createElement('span'); headIcon.className = 'skill-heading-icon'; headIcon.append(iconImg(categoryIcons[i] || categoryIcons[2])); h3.prepend(headIcon);
  const protectedText = p.textContent.replace('AI coding agents (Claude Code, Codex)', 'AI coding agents (Claude Code + Codex)');
  const items = protectedText.split(',').map(x => x.trim()).filter(Boolean);
  const wrap = document.createElement('div'); wrap.className = 'skill-items';
  items.forEach(label => {
    const item = document.createElement('span'); item.className = 'skill-item';
    const src = iconMap.get(label);
    if (src) item.append(iconImg(src)); else { const dot = document.createElement('span'); dot.className = 'skill-dot'; item.append(dot); }
    const text = document.createElement('span'); text.textContent = label.replace(' + Codex', ', Codex'); item.append(text); wrap.append(item);
  });
  p.replaceWith(wrap);
});

/* Research gallery */
const nusResearchCard = document.querySelector('#research .feature-card');
if (nusResearchCard) {
  const media = nusResearchCard.querySelector('.feature-media');
  if (media) {
    media.className = 'feature-media media-carousel'; media.dataset.carousel = ''; media.setAttribute('aria-label', 'NUS dynamic manipulator research media');
    media.innerHTML = `<div class="carousel-track">
      <figure class="carousel-slide is-active media-real"><img src="https://franka.de/hubfs/20220920_Franka_Research1771.jpg" alt="Franka Research 3 robot platform" loading="lazy" decoding="async" referrerpolicy="no-referrer"><figcaption class="carousel-caption">Franka Research 3 · Franka Robotics</figcaption></figure>
      <figure class="carousel-slide is-diagram is-contained"><img data-src="assets/diagrams/dynur.svg" alt="Method diagram for dynamic manipulator motion planning and link-centric obstacle representation" decoding="async"><figcaption class="carousel-caption">Research-method overview</figcaption></figure>
    </div><button class="carousel-btn prev" type="button" aria-label="Previous media">‹</button><button class="carousel-btn next" type="button" aria-label="Next media">›</button><div class="carousel-dots" aria-label="Choose research media"></div><span class="badge">NUS ARC · Ongoing</span>`;
  }
  const tags = nusResearchCard.querySelector('.tag-row');
  if (tags && ![...tags.children].some(x => x.textContent.includes('Franka'))) { const tag = document.createElement('span'); tag.textContent = 'Franka Research 3'; tags.append(tag); }
  const note = nusResearchCard.querySelector('.note');
  if (note && !nusResearchCard.querySelector('.project-links')) { const row = document.createElement('div'); row.className = 'project-links'; row.innerHTML = '<a href="https://franka.de/franka-research-3" target="_blank" rel="noreferrer">FR3 platform ↗</a>'; note.before(row); }
}

/* Basketball gallery: real photos + demo + architecture */
const basketball = document.querySelector('[aria-label="Basketball sensing project media"]');
if (basketball) {
  basketball.querySelector('.carousel-track').innerHTML = `
    <figure class="carousel-slide is-active is-contained"><img src="assets/media/basketball-setup.webp" alt="Basketball sensing prototype, receiver electronics, and dashboard setup" loading="lazy" decoding="async"><figcaption class="carousel-caption">Prototype + receiver + dashboard</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/basketball-wearable.webp" alt="Wearable basketball sensing electronics mounted on the arm" decoding="async"><figcaption class="carousel-caption">Wearable electronics prototype</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/basketball-side.webp" alt="Side view of the dual-IMU wearable sensing prototype" decoding="async"><figcaption class="carousel-caption">Dual-IMU placement</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/basketball-dashboard.webp" alt="Close view of the wearable sensor and live dashboard traces" decoding="async"><figcaption class="carousel-caption">Live dashboard traces</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/basketball-sensing-demo.gif" alt="Wearable dual-IMU basketball sensing demo with live motion traces" decoding="async"><figcaption class="carousel-caption">Live sensing demo</figcaption></figure>
    <figure class="carousel-slide is-diagram is-contained"><img data-src="assets/diagrams/imu-basketball.svg" alt="Dual-IMU basketball shot sensing system architecture" decoding="async"><figcaption class="carousel-caption">System architecture</figcaption></figure>`;
}

/* Full project cards */
const projectGrid = document.querySelector('.project-grid');
function insertProjectFromMini(titleNeedle, html) {
  const mini = [...(projectGrid?.querySelectorAll('.mini-card') || [])].find(card => card.querySelector('h3')?.textContent.includes(titleNeedle));
  if (!projectGrid || !mini) return null;
  const card = document.createElement('article'); card.className = 'feature-card feature-card--project'; card.innerHTML = html;
  projectGrid.parentNode.insertBefore(card, projectGrid); mini.remove(); return card;
}
const cleaningCard = insertProjectFromMini('Autonomous Cleaning Robot', `
  <div class="feature-media media-carousel" data-carousel aria-label="Autonomous cleaning robot project media"><div class="carousel-track">
    <figure class="carousel-slide is-active is-contained"><img src="assets/media/cleaning-final.webp" alt="Final autonomous cleaning robot prototype" loading="lazy" decoding="async"><figcaption class="carousel-caption">Final integrated prototype</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/cleaning-cad.webp" alt="Final CAD layout of the autonomous cleaning robot" decoding="async"><figcaption class="carousel-caption">System CAD</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/cleaning-cfd.webp" alt="CFD airflow simulation for the robot vacuum module" decoding="async"><figcaption class="carousel-caption">Suction CFD</figcaption></figure>
  </div><button class="carousel-btn prev" type="button" aria-label="Previous media">‹</button><button class="carousel-btn next" type="button" aria-label="Next media">›</button><div class="carousel-dots"></div><span class="badge">AUTONOMOUS SYSTEMS</span></div>
  <div class="feature-body"><p class="feature-number">06</p><h3>Autonomous Cleaning Robot</h3><p class="meta">Mechatronics IV · Fall 2025 · Group 10</p><p>Built an autonomous competition robot integrating Raspberry Pi vision, Arduino-based control, wall-following, obstacle sensing, red-zone recognition, and a custom vacuum module developed through CAD, airflow simulation, prototyping, and testing.</p><div class="result-row compact"><div><strong>113 pts</strong><span>final score</span></div><div><strong>70 pts</strong><span>time-based performance</span></div></div><div class="tag-row"><span>Raspberry Pi</span><span>Arduino</span><span>Computer Vision</span><span>Control</span><span>CAD / CFD</span></div><div class="project-links"><a href="https://github.com/chuanhan1013/mechatronic_4_ntu_bime_2025_group10" target="_blank" rel="noreferrer">Code ↗</a></div></div>`);
const triathlonCard = insertProjectFromMini('Amphibious Tracked Vehicle', `
  <div class="feature-media media-carousel" data-carousel aria-label="Triathlon robot project media"><div class="carousel-track">
    <figure class="carousel-slide is-active is-contained"><img src="assets/media/triathlon-beam.webp" alt="Terrain-adaptive tracked robot configured for narrow-beam traversal" loading="lazy" decoding="async"><figcaption class="carousel-caption">Beam-stage configuration</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/triathlon-amphibious.webp" alt="Final amphibious configuration of the terrain-adaptive triathlon robot" decoding="async"><figcaption class="carousel-caption">Final amphibious configuration</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/triathlon-printing.webp" alt="3D-printing the robot wheel and transmission components" decoding="async"><figcaption class="carousel-caption">Rapid 3D-printed fabrication</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/triathlon-water-course.webp" alt="Water-channel and ramp test course used for the triathlon robot competition" decoding="async"><figcaption class="carousel-caption">Water / ramp stage</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/triathlon-wind-course.webp" alt="Wind-tunnel test enclosure used for the triathlon robot competition" decoding="async"><figcaption class="carousel-caption">Wind-tunnel stage</figcaption></figure>
    <figure class="carousel-slide is-contained"><img data-src="assets/media/triathlon-competition.webp" alt="Final triathlon robot competition showcase with all teams" decoding="async"><figcaption class="carousel-caption">Competition-day showcase</figcaption></figure>
  </div><button class="carousel-btn prev" type="button" aria-label="Previous media">‹</button><button class="carousel-btn next" type="button" aria-label="Next media">›</button><div class="carousel-dots"></div><span class="badge">MECHANICAL DESIGN · TEAM LEAD</span></div>
  <div class="feature-body"><p class="feature-number">07</p><h3>Terrain-Adaptive Triathlon Robot</h3><p class="meta">Mechanical Design · Spring 2025 · Team project</p><p>Designed and fabricated a transformable tracked robot for four distinct stages — ramp, narrow beam, water channel, and wind tunnel. I focused on modelling and 3D-printing the chassis, gearbox, and paddle-wheel mechanisms, then iterated the drivetrain, centre-of-mass placement, and amphibious guidance hardware through repeated tests.</p><div class="result-row compact"><div><strong>4 / 4</strong><span>competition stages completed</span></div><div><strong>2nd</strong><span>overall official ranking</span></div></div><div class="tag-row"><span>SolidWorks</span><span>3D Printing</span><span>Tracked Drive</span><span>Mechanical Design</span></div></div>`);
if (projectGrid && !projectGrid.querySelector('.mini-card')) projectGrid.remove();

function addPlatformStrip(card, items) {
  const body = card?.querySelector('.feature-body'); if (!body || body.querySelector('.platform-strip')) return;
  const strip = document.createElement('div'); strip.className = 'platform-strip';
  items.forEach(({ label, icon, glyph }) => {
    const el = document.createElement('span'); el.className = 'platform-item';
    if (icon) el.append(iconImg(icon)); else { const g = document.createElement('span'); g.className = 'platform-glyph'; g.textContent = glyph || label.slice(0, 2); el.append(g); }
    const t = document.createElement('span'); t.textContent = label; el.append(t); strip.append(el);
  });
  const anchor = body.querySelector('.tag-row') || body.querySelector('.project-links'); anchor ? anchor.before(strip) : body.append(strip);
}
[...document.querySelectorAll('#projects .feature-card')].forEach(card => {
  const title = card.querySelector('h3')?.textContent || '';
  if (title.includes('HAN-Agents')) addPlatformStrip(card, [{label:'GitHub',icon:devicon('github')},{label:'Python',icon:devicon('python')},{label:'TypeScript',icon:devicon('typescript')}]);
  else if (title.includes('Bio-Inspired')) addPlatformStrip(card, [{label:'NVIDIA / Isaac',icon:devicon('nvidia')},{label:'Python',icon:devicon('python')},{label:'PyTorch',icon:devicon('pytorch')}]);
  else if (title.includes('Basketball')) addPlatformStrip(card, [{label:'Arduino',icon:devicon('arduino')},{label:'Python',icon:devicon('python')},{label:'FastAPI',icon:devicon('fastapi')}]);
});
addPlatformStrip(cleaningCard, [{label:'Raspberry Pi',icon:devicon('raspberrypi')},{label:'Arduino',icon:devicon('arduino')},{label:'OpenCV',icon:devicon('opencv')}]);
addPlatformStrip(triathlonCard, [{label:'CAD',glyph:'CAD'},{label:'3D Printing',glyph:'3D'},{label:'Mechanical Design',glyph:'ME'}]);

/* Performance + styling */
function hydrate(img) { if (img?.dataset?.src && !img.getAttribute('src')) { img.src = img.dataset.src; img.loading = 'lazy'; img.decoding = 'async'; } }
document.querySelectorAll('#research img, #projects img, #experience img, #education img').forEach(img => {
  if (img !== avatar) { if (!img.hasAttribute('loading') && !img.dataset.src) img.loading = 'lazy'; img.decoding = 'async'; try { img.fetchPriority = 'low'; } catch (_) {} }
});
const style = document.createElement('style');
style.textContent = `
.profile-subdegree{display:block;margin-top:10px;padding-top:10px;border-top:1px solid rgba(91,119,139,.18);font-size:.78em;line-height:1.45;color:#667988;font-weight:500}
.profile-links .profile-icon{overflow:hidden}.profile-links .profile-icon img{width:14px;height:14px;object-fit:contain}
.institution-mark{float:right;display:grid;place-items:center;align-content:center;width:48px;height:48px;margin:0 0 10px 14px;border:1px solid #d6e3ec;border-radius:13px;background:linear-gradient(145deg,#fff,#eef5fa);box-shadow:0 7px 18px rgba(25,63,95,.07);line-height:1;text-align:center}.institution-mark strong{color:#173e60;font-size:13px}.institution-mark small{margin-top:4px;color:#8a96a1;font-size:7px;font-weight:800;letter-spacing:.1em}.institution-nus{box-shadow:inset 0 3px 0 #ef7b23,0 7px 18px rgba(25,63,95,.07)}.institution-ntu{box-shadow:inset 0 3px 0 #9b1b30,0 7px 18px rgba(25,63,95,.07)}.institution-arc{box-shadow:inset 0 3px 0 #235f9c,0 7px 18px rgba(25,63,95,.07)}.institution-chainsea{box-shadow:inset 0 3px 0 #2a7f83,0 7px 18px rgba(25,63,95,.07)}.institution-mark.is-compact{float:none;flex:0 0 36px;width:36px;height:36px;margin:0;border-radius:10px}.institution-mark.is-compact strong{font-size:10px}.institution-mark.is-compact small{font-size:6px}.timeline-title-row{display:flex;align-items:center;gap:9px;margin-top:3px}.timeline-title-row h3{margin:0}
.entity-chip{display:inline-flex;align-items:center;gap:7px;margin-top:10px;padding:5px 8px;border:1px solid #dbe7ef;border-radius:9px;background:#f8fbfd;color:#586b7b;font-size:9px;font-weight:700}.entity-chip-mark{display:grid;place-items:center;min-width:27px;height:23px;padding:0 5px;border-radius:6px;background:#e8f2f9;color:#235f9c;font-size:8px;font-weight:900}.entity-ntu .entity-chip-mark{background:#f6ebee;color:#8e2137}
.skill-heading-icon{display:inline-grid;place-items:center;width:27px;height:27px;margin-right:8px;border:1px solid #d7e3ec;border-radius:8px;background:#f7fbfd;vertical-align:middle}.skill-heading-icon img{width:15px;height:15px}.skill-items{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.skill-item{display:inline-flex;align-items:center;gap:6px;padding:6px 8px;border:1px solid #dce6ee;border-radius:9px;background:#fbfdff;color:#506273;font-size:9px;font-weight:650;line-height:1.2}.skill-item img{width:14px;height:14px;object-fit:contain}.skill-dot{width:6px;height:6px;border-radius:50%;background:#9ab3c5}
.platform-strip{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px}.platform-item{display:inline-flex;align-items:center;gap:6px;padding:5px 8px;border:1px solid #dce7ef;border-radius:8px;background:#f9fcfe;color:#5d6f7e;font-size:9px;font-weight:720}.platform-item img{width:14px;height:14px;object-fit:contain}.platform-glyph{display:grid;place-items:center;min-width:20px;height:20px;padding:0 4px;border-radius:6px;background:#eaf3f8;color:#235f9c;font-size:7px;font-weight:900}
.feature-card,.edu-card,.timeline article,.skills>div{content-visibility:auto;contain-intrinsic-size:auto 420px}.media-carousel .carousel-slide.is-contained{display:grid;place-items:center;padding:12px;background:linear-gradient(180deg,#fcfeff,#f2f7fb)}.media-carousel .carousel-slide.is-contained img{object-fit:contain;max-width:100%;max-height:100%}.feature-media img{cursor:zoom-in}.diagram-frame,.carousel-slide.is-diagram{position:relative}.diagram-frame::after,.carousel-slide.is-diagram::after{content:'↗';position:absolute;right:12px;bottom:12px;width:28px;height:28px;display:grid;place-items:center;border-radius:9px;background:rgba(18,45,64,.48);backdrop-filter:blur(7px);color:#fff;font-size:14px;pointer-events:none}
.media-lightbox{position:fixed;inset:0;z-index:1000;display:none;grid-template-columns:auto minmax(0,1fr) auto;grid-template-rows:1fr auto;align-items:center;gap:12px;padding:28px;background:rgba(8,20,30,.86);backdrop-filter:blur(10px)}.media-lightbox.is-open{display:grid}.media-lightbox .lb-stage{grid-column:2;grid-row:1;display:grid;place-items:center;min-width:0;min-height:0}.media-lightbox img{display:block;max-width:min(1280px,88vw);max-height:84vh;width:auto;height:auto;border-radius:18px;background:#f8fbfd;box-shadow:0 28px 80px rgba(0,0,0,.36)}.media-lightbox .lb-close{position:fixed;top:20px;right:22px;width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;font-size:27px;cursor:pointer}.media-lightbox .lb-nav{width:48px;height:58px;border:0;border-radius:14px;background:rgba(255,255,255,.14);color:#fff;font-size:34px;cursor:pointer}.media-lightbox .lb-prev{grid-column:1;grid-row:1}.media-lightbox .lb-next{grid-column:3;grid-row:1}.media-lightbox .lb-caption{grid-column:1/-1;grid-row:2;margin:0;color:rgba(255,255,255,.9);font-size:13px;text-align:center}.media-lightbox.is-single .lb-nav{visibility:hidden}body.lightbox-open{overflow:hidden}@media(max-width:700px){.media-lightbox{padding:12px;gap:4px}.media-lightbox img{max-width:82vw;max-height:80vh}.media-lightbox .lb-nav{width:36px;height:50px;font-size:28px}.institution-mark{width:42px;height:42px}.skill-item{font-size:8px}}
`;
document.head.append(style);

/* Unified media lightbox (event delegation keeps dynamically created slides covered) */
const lb = document.createElement('div'); lb.className = 'media-lightbox'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.innerHTML = '<button class="lb-close" aria-label="Close media">×</button><button class="lb-nav lb-prev" aria-label="Previous media">‹</button><div class="lb-stage"><img alt=""></div><button class="lb-nav lb-next" aria-label="Next media">›</button><p class="lb-caption"></p>'; document.body.append(lb);
const lbImg = lb.querySelector('img'); const lbCaption = lb.querySelector('.lb-caption'); let gallery = []; let galleryIndex = 0;
function caption(img) { return img.closest('figure')?.querySelector('figcaption')?.textContent.trim() || img.alt || ''; }
function renderLb() { const img = gallery[galleryIndex]; if (!img) return; hydrate(img); lbImg.src = img.currentSrc || img.src || img.dataset.src || ''; lbImg.alt = img.alt || ''; lbCaption.textContent = caption(img) + (gallery.length > 1 ? ` · ${galleryIndex + 1} / ${gallery.length}` : ''); lb.classList.toggle('is-single', gallery.length < 2); }
function openLb(img) { const media = img.closest('.feature-media'); gallery = media ? [...media.querySelectorAll('img')] : [img]; galleryIndex = Math.max(0, gallery.indexOf(img)); renderLb(); lb.classList.add('is-open'); document.body.classList.add('lightbox-open'); lb.querySelector('.lb-close').focus(); }
function closeLb() { lb.classList.remove('is-open'); document.body.classList.remove('lightbox-open'); lbImg.removeAttribute('src'); gallery = []; }
function moveLb(delta) { if (gallery.length < 2) return; galleryIndex = (galleryIndex + delta + gallery.length) % gallery.length; renderLb(); }
document.addEventListener('click', e => { const img = e.target.closest?.('.feature-media img'); if (img) openLb(img); });
document.addEventListener('keydown', e => { const img = e.target.closest?.('.feature-media img'); if (img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLb(img); return; } if (!lb.classList.contains('is-open')) return; if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowLeft') moveLb(-1); if (e.key === 'ArrowRight') moveLb(1); });
document.querySelectorAll('.feature-media img').forEach(img => { img.tabIndex = 0; img.setAttribute('role','button'); });
lb.querySelector('.lb-close').addEventListener('click', closeLb); lb.querySelector('.lb-prev').addEventListener('click', () => moveLb(-1)); lb.querySelector('.lb-next').addEventListener('click', () => moveLb(1)); lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
let touchX = null; lb.addEventListener('touchstart', e => touchX = e.touches[0].clientX, {passive:true}); lb.addEventListener('touchend', e => { if (touchX === null) return; const dx = e.changedTouches[0].clientX - touchX; touchX = null; if (Math.abs(dx) > 45) moveLb(dx < 0 ? 1 : -1); }, {passive:true});

/* Deferred non-active carousel media: hydrate on proximity or interaction */
const deferred = [...document.querySelectorAll('img[data-src]')];
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, observer) => entries.forEach(entry => { if (!entry.isIntersecting) return; const active = entry.target.closest('.carousel-slide')?.classList.contains('is-active'); if (active) { hydrate(entry.target); observer.unobserve(entry.target); } }), {rootMargin:'250px 0px'});
  deferred.forEach(img => io.observe(img));
} else deferred.forEach(hydrate);
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const hydrateActive = () => { const active = carousel.querySelector('.carousel-slide.is-active img'); hydrate(active); };
    hydrateActive(); carousel.addEventListener('click', e => { if (e.target.closest('.carousel-btn,.carousel-dot')) setTimeout(hydrateActive, 0); }); carousel.addEventListener('touchend', () => setTimeout(hydrateActive, 0), {passive:true});
  });
});

/* Navigation / reveal */
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)); }), {rootMargin:'-20% 0px -70% 0px'});
  document.querySelectorAll('.section-anchor').forEach(section => sectionObserver.observe(section));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }), {threshold:.08,rootMargin:'0px 0px -6% 0px'});
    const reveal = [...document.querySelectorAll('.feature-card,.mini-card,.timeline article,.edu-card,.skills>div,.award-strip>div')]; document.body.classList.add('reveal-ready'); reveal.forEach((el,i) => { el.style.transitionDelay = `${Math.min(i%3,2)*55}ms`; revealObserver.observe(el); });
  }
}
