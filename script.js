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

// ============================================================
// I18N
// ============================================================
const LANG_KEY = 'ipediatria-lang';

function applyLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.documentElement.lang = lang;
  document.title = t['meta.title'] || document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t['meta.desc']) metaDesc.content = t['meta.desc'];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    if (t[el.dataset.i18nHtml] !== undefined) el.innerHTML = t[el.dataset.i18nHtml];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    if (t[el.dataset.i18nPlaceholder] !== undefined) el.placeholder = t[el.dataset.i18nPlaceholder];
  });

  const langCurrent = document.querySelector('.lang-current');
  if (langCurrent) langCurrent.textContent = lang.toUpperCase();

  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem(LANG_KEY, lang);
}

// Language selector
const langSwitcher = document.querySelector('.lang-switcher');
const langBtn      = document.querySelector('.lang-btn');

langBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = langSwitcher.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.lang-option').forEach((btn) => {
  btn.addEventListener('click', () => {
    applyLang(btn.dataset.lang);
    langSwitcher.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
});
document.addEventListener('click', () => {
  langSwitcher?.classList.remove('open');
  langBtn?.setAttribute('aria-expanded', 'false');
});

// Apply saved or default language
applyLang(localStorage.getItem(LANG_KEY) || 'ca');

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
