// iPediatria & iDoctor — interactivity

// Form
function handleForm(e) {
  e.preventDefault();
  const ok = e.target.querySelector('.form-ok');
  ok.classList.add('show');
  e.target.querySelector('button[type=submit]').disabled = true;
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links?.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    toggle?.setAttribute('aria-expanded', false);
  }
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 40, 240)}ms`;
  io.observe(el);
});

// Parallax / glare on glass cards
const cards = document.querySelectorAll('.glass-card');
cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);

    // subtle 3D tilt only on bigger cards
    if (card.classList.contains('service') || card.classList.contains('member') || card.classList.contains('location')) {
      const rx = ((my - 50) / 50) * -3;
      const ry = ((mx - 50) / 50) * 3;
      card.style.transform = `translateY(-4px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Hero blob parallax on pointer move
const stage = document.querySelector('.bg-stage');
window.addEventListener('pointermove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  stage.style.transform = `translate(${x}px, ${y}px)`;
}, { passive: true });

// Smooth nav highlight (active section)
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach((a) => {
        const href = a.getAttribute('href');
        if (href === `#${id}`) a.style.color = 'var(--primary)';
        else if (!a.classList.contains('nav-cta')) a.style.color = '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach((s) => spy.observe(s));
