// ============================================================
// iPediatria & iDoctor — Editorial Interactions (v2)
// ============================================================

// ------ Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ------ Body loaded (triggers hero stagger)
window.addEventListener('load', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});

// ------ Form
function handleForm(e) {
  e.preventDefault();
  const ok = e.target.querySelector('.form-ok');
  if (ok) ok.classList.add('show');
  const btn = e.target.querySelector('button[type=submit]');
  if (btn) btn.disabled = true;
}
window.handleForm = handleForm;

// ------ Nav scroll state + scroll progress
const nav = document.querySelector('.nav');
const progress = document.querySelector('.scroll-progress');

const onScroll = () => {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = h > 0 ? Math.min(1, y / h) : 0;

  if (nav) nav.classList.toggle('scrolled', y > 20);
  if (progress) progress.style.setProperty('--p', p);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ------ Mobile toggle
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

// ============================================================
// SPLIT TEXT — Word reveal on headings tagged .word-reveal
// ============================================================
document.querySelectorAll('.word-reveal').forEach((el) => {
  let wi = 0;
  const wrapWords = (node, inheritedEl) => {
    if (node.nodeType === 3) {
      const text = node.textContent;
      if (!text.trim()) return;
      const frag = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      parts.forEach((p) => {
        if (!p.length) return;
        if (/^\s+$/.test(p)) {
          frag.appendChild(document.createTextNode(p));
          return;
        }
        const outer = document.createElement('span');
        outer.className = 'word';
        outer.style.setProperty('--wi', wi++);
        const inner = document.createElement('span');
        inner.textContent = p;
        // If the word came from inside an element with a gradient (e.g. <em>),
        // copy the gradient styles onto the inner span so background-clip: text
        // keeps working even though we introduced inline-block wrappers.
        if (inheritedEl) {
          const cs = getComputedStyle(inheritedEl);
          if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)' ||
              cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text') {
            inner.style.backgroundImage = cs.backgroundImage;
            inner.style.webkitBackgroundClip = 'text';
            inner.style.backgroundClip = 'text';
            inner.style.webkitTextFillColor = 'transparent';
            inner.style.color = 'transparent';
            inner.style.fontStyle = cs.fontStyle;
            inner.style.fontWeight = cs.fontWeight;
          }
        }
        outer.appendChild(inner);
        frag.appendChild(outer);
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1 && !node.classList.contains('word')) {
      const currentEl = (node.tagName === 'EM' || node.tagName === 'STRONG') ? node : inheritedEl;
      [...node.childNodes].forEach((c) => wrapWords(c, currentEl));
    }
  };
  [...el.childNodes].forEach((c) => wrapWords(c, null));
});

// Safety net: if for any reason .word-reveal elements never get .in (e.g.
// observer race or browser without IO), force-reveal after 1.5s so the site
// is never stuck with hidden words.
setTimeout(() => {
  document.querySelectorAll('.word-reveal:not(.in)').forEach((el) => el.classList.add('in'));
}, 1500);

// ============================================================
// REVEAL on scroll (multiple flavours)
// ============================================================
const revealSelector = '.reveal, .reveal-up, .reveal-fade, .reveal-scale, .word-reveal, .char-reveal, .hero-stats, .section-head';
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll(revealSelector).forEach((el, i) => {
  if (el.classList.contains('reveal')) {
    el.style.transitionDelay = `${Math.min(i * 35, 220)}ms`;
  }
  io.observe(el);
});

// ============================================================
// GLASS/CARD pointer tracking (glare + gradient follow)
// ============================================================
const trackedCards = document.querySelectorAll(
  '.glass-card, .service-card, .team-card, .location-card, .hero-featured, .tilt'
);
trackedCards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
  });
});

// ============================================================
// 3D TILT on team/service cards (desktop only)
// ============================================================
const tiltCards = document.querySelectorAll('.team-card, .service-card.featured, .hero-featured');
if (window.matchMedia('(hover: hover)').matches) {
  tiltCards.forEach((card) => {
    let raf = 0;
    const maxTilt = card.classList.contains('hero-featured') ? 6 : 4;

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const base = card.classList.contains('hero-featured') ? 'translateY(-4px)' : '';
        card.style.transform = `${base} perspective(1000px) rotateX(${(-y * maxTilt).toFixed(2)}deg) rotateY(${(x * maxTilt).toFixed(2)}deg)`;
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      card.style.transform = '';
    });
  });
}

// ============================================================
// MAGNETIC BUTTONS
// ============================================================
const magnets = document.querySelectorAll('.btn, .nav-cta, .hero-featured-cta, .magnetic');
if (window.matchMedia('(hover: hover)').matches) {
  magnets.forEach((m) => {
    m.addEventListener('pointermove', (e) => {
      const r = m.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      m.style.transform = `translate(${x}px, ${y}px)`;
    });
    m.addEventListener('pointerleave', () => {
      m.style.transform = '';
    });
  });
}

// ============================================================
// COUNT-UP on stat numbers
// ============================================================
const statNums = document.querySelectorAll('.stat-num[data-to]');
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const to = parseFloat(el.dataset.to);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(to * eased);
      el.innerHTML = `${prefix}${v}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countIO.unobserve(el);
  });
}, { threshold: 0.4 });
statNums.forEach((el) => countIO.observe(el));

// ============================================================
// CUSTOM CURSOR (unchanged behaviour, kept)
// ============================================================
const cursor = document.querySelector('.cursor-dot');
if (cursor && window.matchMedia('(hover: hover)').matches) {
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  window.addEventListener('pointermove', (e) => { targetX = e.clientX; targetY = e.clientY; });
  const render = () => {
    curX += (targetX - curX) * 0.22;
    curY += (targetY - curY) * 0.22;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  };
  render();

  const hoverables = document.querySelectorAll(
    'a, button, .service-card, .team-card, .location-card, .testimonial, .glass-card, input, textarea'
  );
  hoverables.forEach((el) => {
    el.addEventListener('pointerenter', () => {
      cursor.classList.add('hover');
      if (el.classList.contains('btn-magenta') || el.classList.contains('nav-cta') || el.classList.contains('hero-featured-cta')) {
        cursor.classList.add('cta');
      }
    });
    el.addEventListener('pointerleave', () => cursor.classList.remove('hover', 'cta'));
  });
}

// ============================================================
// Subtle parallax on the accent blurs
// ============================================================
const stage = document.querySelector('.stage');
window.addEventListener('pointermove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  if (stage) stage.style.transform = `translate(${x}px, ${y}px)`;
}, { passive: true });

// ============================================================
// Scrollspy
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach((a) => {
      const href = a.getAttribute('href');
      if (href === `#${id}`) {
        a.style.color = 'var(--cyan-deep)';
        const num = a.querySelector('.num');
        if (num) num.style.color = 'var(--cyan)';
      } else if (!a.classList.contains('nav-cta')) {
        a.style.color = '';
        const num = a.querySelector('.num');
        if (num) num.style.color = '';
      }
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((s) => spy.observe(s));

// ============================================================
// Marquee pause on hover
// ============================================================
const marquee = document.querySelector('.marquee-track');
if (marquee) {
  const parent = marquee.parentElement;
  parent.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  parent.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}
