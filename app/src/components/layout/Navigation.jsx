import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from '../../i18n/I18nContext';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import styles from './Navigation.module.css';

// Three.js lives only on the home page (where the hero already loads it).
const NavPulse = lazy(() => import('../../three/NavPulse'));

const PHONE_WA = 'https://wa.me/34605166166';
const CONSULTORI_URL = 'https://ipediatria.imedicplatform.com/';

const SECTIONS = [
  { id: 'ajuda',     key: 'nav.help' },
  { id: 'equip',     key: 'nav.team' },
  { id: 'on-estem',  key: 'nav.where' },
  { id: 'contacte',  key: 'nav.contact' },
];

const LANGS = [
  ['ca', 'CA', 'Català'],
  ['en', 'EN', 'English'],
  ['ru', 'RU', 'Русский'],
];

export default function Navigation() {
  const { t, lang, setLang } = useTranslation();
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inici');
  const langRef = useRef(null);
  const lastY = useRef(0);

  // Scroll-aware: hide on scroll-down past 120px, show on scroll-up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Don't hide if mobile menu is open
      if (open) return;
      const goingDown = y > lastY.current && y > 140;
      const goingUp = y < lastY.current;
      if (goingDown) setHidden(true);
      else if (goingUp) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // Active section detection (home only)
  useEffect(() => {
    if (pathname !== '/') return;
    const ids = ['inici', ...SECTIONS.map((s) => s.id), 'consultori'];
    const observed = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!observed.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top edge that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );
    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeMobile = () => setOpen(false);
  const link = (hash) => (pathname === '/' ? `#${hash}` : `/#${hash}`);
  const isHome = pathname === '/';

  return (
    <motion.header
      className={styles.navWrap}
      initial={false}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
    >
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Principal">
        {/* Logo zone */}
        <Link to="/" className={styles.logo} onClick={closeMobile} aria-label="iPediatria · Inici">
          <img
            src="/logo.png"
            alt=""
            width="85"
            height="44"
            className={styles.logoImg}
          />
          {isHome && !reduced ? (
            <Suspense fallback={<span className={styles.pulseFallback} aria-hidden="true" />}>
              <NavPulse size={22} />
            </Suspense>
          ) : (
            <span className={styles.pulseFallback} aria-hidden="true" />
          )}
        </Link>

        <span className={styles.divider} aria-hidden="true" />

        {/* Center: section links with morphing active indicator */}
        <ul className={styles.links}>
          {SECTIONS.map((s) => {
            const isActive = isHome && activeSection === s.id;
            return (
              <li key={s.id} className={styles.linkLi}>
                <a
                  href={link(s.id)}
                  onClick={closeMobile}
                  className={`${styles.linkA} ${isActive ? styles.linkActive : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      className={styles.activePill}
                      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
                    />
                  )}
                  <span className={styles.linkText}>{t(s.key)}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <span className={styles.divider} aria-hidden="true" />

        {/* Right: lang + actions */}
        <div className={styles.actions}>
          <div
            className={`${styles.langSwitcher} ${langOpen ? styles.langSwitcherOpen : ''}`}
            ref={langRef}
          >
            <button
              type="button"
              className={styles.langBtn}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Canviar idioma"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
              }}
            >
              <span>{lang.toUpperCase()}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul className={styles.langDropdown} role="listbox" aria-label="Idioma">
              {LANGS.map(([code, , label]) => (
                <li key={code}>
                  <button
                    type="button"
                    className={`${styles.langOption} ${lang === code ? styles.active : ''}`}
                    role="option"
                    aria-selected={lang === code}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={PHONE_WA}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waCta}
            onClick={closeMobile}
            aria-label={`WhatsApp: ${t('nav.wa')}`}
          >
            <WhatsAppIcon />
            <span className={styles.waLabel}>{t('nav.wa')}</span>
          </a>

          <a
            href={CONSULTORI_URL}
            target="_blank"
            rel="noopener"
            className={styles.cta}
            onClick={closeMobile}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span>{t('nav.cta')}</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
          aria-label={open ? 'Tancar menú' : 'Obrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobilePanel}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <ul className={styles.mobileLinks}>
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.42,
                    ease: [0.23, 1, 0.32, 1],
                    delay: 0.05 + i * 0.05,
                  }}
                >
                  <a href={link(s.id)} onClick={closeMobile}>
                    <span className={styles.mobileNum}>0{i + 1}</span>
                    <span>{t(s.key)}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className={styles.mobileFoot}>
              <div className={styles.mobileLangs}>
                {LANGS.map(([code, short]) => (
                  <button
                    key={code}
                    type="button"
                    className={`${styles.mobileLang} ${lang === code ? styles.mobileLangActive : ''}`}
                    onClick={() => setLang(code)}
                  >
                    {short}
                  </button>
                ))}
              </div>
              <div className={styles.mobileCtas}>
                <a href={PHONE_WA} target="_blank" rel="noopener noreferrer" className={styles.waCta} onClick={closeMobile}>
                  <WhatsAppIcon />
                  <span>{t('nav.wa')}</span>
                </a>
                <a href={CONSULTORI_URL} target="_blank" rel="noopener" className={styles.cta} onClick={closeMobile}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{t('nav.cta')}</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
