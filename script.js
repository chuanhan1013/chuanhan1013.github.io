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
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });

sections.forEach((section) => observer.observe(section));
