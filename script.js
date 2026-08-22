const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const links = [...document.querySelectorAll(".site-nav a[href^='#']")];

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

/* Profile / positioning polish */
const avatar = document.querySelector('.avatar');
if (avatar) avatar.src = 'assets/media/profile-chuanhan.jpg';

const profileRole = document.querySelector('.profile-role');
if (profileRole) {
  profileRole.innerHTML = 'M.Sc. Robotics<br />National University of Singapore<span class="profile-subdegree">B.S. Biomechatronics Engineering<br />National Taiwan University</span>';
}

const focus = [...document.querySelectorAll('.profile-facts > div')].find(row => row.querySelector('dt')?.textContent.trim() === 'Focus')?.querySelector('dd');
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

/* Keep the basketball carousel concise: demo + architecture only. */
const basketballCarousel = document.querySelector('[aria-label="Basketball sensing project media"]');
if (basketballCarousel) {
  const slides = [...basketballCarousel.querySelectorAll('.carousel-slide')];
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img?.src.includes('basketball-sensing-setup.jpg')) slide.remove();
  });
  const first = basketballCarousel.querySelector('.carousel-slide');
  first?.classList.add('is-contained');
}

/* Promote the cleaning robot from a thumbnail card to the same fixed media pattern. */
const projectGrid = document.querySelector('.project-grid');
const cleaningMini = projectGrid?.querySelector('.mini-card:first-child');
if (projectGrid && cleaningMini?.querySelector('h3')?.textContent.includes('Autonomous Cleaning Robot')) {
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
  if (projectGrid.querySelectorAll('.mini-card').length === 1) projectGrid.classList.add('is-single');
}

/* Readability + lightbox for technical figures. */
const extraStyle = document.createElement('style');
extraStyle.textContent = `
  .profile-subdegree{display:block;margin-top:10px;padding-top:10px;border-top:1px solid rgba(91,119,139,.18);font-size:.78em;line-height:1.45;color:#667988;font-weight:500}
  .media-carousel .carousel-slide.is-contained{display:grid;place-items:center;padding:12px;background:linear-gradient(180deg,#fcfeff,#f2f7fb)}
  .media-carousel .carousel-slide.is-contained img{object-fit:contain;max-width:100%;max-height:100%}
  .project-grid.is-single{grid-template-columns:minmax(0,1fr)}
  .diagram-frame img,.carousel-slide.is-diagram img{cursor:zoom-in}
  .diagram-frame,.carousel-slide.is-diagram{position:relative}
  .diagram-frame::after,.carousel-slide.is-diagram::after{content:'↗';position:absolute;right:12px;bottom:12px;width:28px;height:28px;display:grid;place-items:center;border-radius:9px;background:rgba(18,45,64,.48);backdrop-filter:blur(7px);color:white;font-size:14px;pointer-events:none}
  .diagram-lightbox{position:fixed;inset:0;z-index:1000;display:none;place-items:center;padding:34px;background:rgba(8,20,30,.82);backdrop-filter:blur(10px)}
  .diagram-lightbox.is-open{display:grid}
  .diagram-lightbox img{display:block;max-width:min(1180px,94vw);max-height:90vh;width:auto;height:auto;border-radius:18px;background:#f8fbfd;box-shadow:0 28px 80px rgba(0,0,0,.36)}
  .diagram-lightbox button{position:fixed;top:22px;right:24px;width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:white;font-size:27px;cursor:pointer}
  body.lightbox-open{overflow:hidden}
  @media(max-width:700px){.diagram-lightbox{padding:14px}.diagram-lightbox img{max-width:96vw;max-height:84vh}.profile-subdegree{font-size:.8em}}
`;
document.head.appendChild(extraStyle);

const lightbox = document.createElement('div');
lightbox.className = 'diagram-lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Expanded technical figure');
lightbox.innerHTML = '<button type="button" aria-label="Close figure">×</button><img alt="" />';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('img');
const closeLightbox = () => { lightbox.classList.remove('is-open'); document.body.classList.remove('lightbox-open'); lightboxImg.removeAttribute('src'); };
const openLightbox = (img) => { lightboxImg.src = img.currentSrc || img.src; lightboxImg.alt = img.alt || 'Expanded technical figure'; lightbox.classList.add('is-open'); document.body.classList.add('lightbox-open'); lightbox.querySelector('button').focus(); };

const zoomable = [...document.querySelectorAll('.diagram-frame img, .carousel-slide.is-diagram img')];
zoomable.forEach(img => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', `${img.alt || 'Technical figure'} — open enlarged view`);
  img.addEventListener('click', () => openLightbox(img));
  img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); } });
});
lightbox.querySelector('button').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox(); });

const sections = [...document.querySelectorAll(".section-anchor")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const revealItems = [...document.querySelectorAll(
    ".feature-card, .mini-card, .timeline article, .edu-card, .skills > div, .award-strip > div"
  )];
  document.body.classList.add("reveal-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
    revealObserver.observe(item);
  });
}
