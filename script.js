// ============================================================
// iPediatria & iDoctor — Editorial Interactions
// ============================================================

// ------ Year
document.getElementById('year').textContent = new Date().getFullYear();

// ------ Form
function handleForm(e) {
  e.preventDefault();
  const ok = e.target.querySelector('.form-ok');
  ok.classList.add('show');
  e.target.querySelector('button[type=submit]').disabled = true;
}

// ------ Nav scroll state
const nav = document.querySelector('.nav');
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY;
  if (y > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  lastY = y;
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
    toggle?.setAttribute('aria-expanded', false);
  }
});

// ------ Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 35, 220)}ms`;
  io.observe(el);
});

// ------ Glass card glare follow
const glassCards = document.querySelectorAll('.glass-card, .service-card, .team-card, .location-card');
glassCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
  });
});

// ------ Custom cursor
const cursor = document.querySelector('.cursor-dot');
if (cursor && window.matchMedia('(hover: hover)').matches) {
  let targetX = 0, targetY = 0;
  let curX = 0, curY = 0;

  window.addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  const render = () => {
    curX += (targetX - curX) * 0.22;
    curY += (targetY - curY) * 0.22;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  };
  render();

  // hover states
  const hoverables = document.querySelectorAll(
    'a, button, .service-card, .team-card, .location-card, .testimonial, .glass-card, input, textarea'
  );
  hoverables.forEach((el) => {
    el.addEventListener('pointerenter', () => {
      cursor.classList.add('hover');
      if (el.classList.contains('btn-magenta') || el.classList.contains('nav-cta')) {
        cursor.classList.add('cta');
      }
    });
    el.addEventListener('pointerleave', () => {
      cursor.classList.remove('hover', 'cta');
    });
  });
}

// ------ Subtle parallax on the accent blurs
const stage = document.querySelector('.stage');
window.addEventListener('pointermove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  if (stage) stage.style.transform = `translate(${x}px, ${y}px)`;
}, { passive: true });

// ------ Scrollspy
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
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
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((s) => spy.observe(s));

// ------ Marquee pause on hover
const marquee = document.querySelector('.marquee-track');
if (marquee) {
  const parent = marquee.parentElement;
  parent.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  parent.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}
