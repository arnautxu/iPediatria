import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nContext';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import styles from './Navigation.module.css';

const PHONE_WA = 'https://wa.me/34605166166';
const CONSULTORI_URL = 'https://ipediatria.imedicplatform.com/';

export default function Navigation() {
  const { t, lang, setLang } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const closeMobile = () => setOpen(false);

  // For nav links: when on home, use hash; when on legal pages, link back to home + hash.
  const link = (hash) => (pathname === '/' ? `#${hash}` : `/#${hash}`);

  return (
    <header className={styles.navWrap}>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.logo} onClick={closeMobile}>
          <img
            src="/logo.png"
            alt="iPediatria & iDoctor · Atenció mèdica familiar"
            width="85"
            height="44"
            className={styles.logoImg}
          />
        </Link>

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
          aria-label="Obrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          <li><a href={link('ajuda')} onClick={closeMobile}>{t('nav.help')}</a></li>
          <li><a href={link('equip')} onClick={closeMobile}>{t('nav.team')}</a></li>
          <li><a href={link('on-estem')} onClick={closeMobile}>{t('nav.where')}</a></li>
          <li><a href={link('contacte')} onClick={closeMobile}>{t('nav.contact')}</a></li>

          <li className={styles.langLi} ref={langRef}>
            <div className={`${styles.langSwitcher} ${langOpen ? styles.langSwitcherOpen : ''}`}>
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
                {[
                  ['ca', 'Català'],
                  ['en', 'English'],
                  ['ru', 'Русский'],
                ].map(([code, label]) => (
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
          </li>

          <li className={styles.waLi}>
            <a href={PHONE_WA} target="_blank" rel="noopener noreferrer" className={styles.waCta} onClick={closeMobile}>
              <WhatsAppIcon />
              <span>{t('nav.wa')}</span>
            </a>
          </li>

          <li className={styles.ctaLi}>
            <a href={CONSULTORI_URL} target="_blank" rel="noopener" className={styles.cta} onClick={closeMobile}>
              <span className={styles.dot} />
              <span>{t('nav.cta')}</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
