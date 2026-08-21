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
