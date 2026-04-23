// ============================================================
// iPediatria & iDoctor — minimal interactions
// ============================================================

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Form
function handleForm(e) {
  e.preventDefault();
  const ok = e.target.querySelector('.form-ok');
  if (ok) ok.classList.add('show');
  const btn = e.target.querySelector('button[type=submit]');
  if (btn) btn.disabled = true;
}
window.handleForm = handleForm;

// Nav scrolled state
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links?.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    links.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }
});

// Reveal on scroll
const revealSelector = '.reveal, .reveal-up, .reveal-fade, .reveal-scale, .section-head';
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll(revealSelector).forEach((el) => io.observe(el));

// Scrollspy
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach((a) => {
      const href = a.getAttribute('href');
      if (href === `#${id}`) {
        a.setAttribute('aria-current', 'true');
      } else if (!a.classList.contains('nav-cta')) {
        a.removeAttribute('aria-current');
      }
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((s) => spy.observe(s));
