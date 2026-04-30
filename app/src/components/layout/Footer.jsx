import { Link, useLocation } from 'react-router-dom';
import { useTranslation, THtml } from '../../i18n/I18nContext';
import Reveal from '../ui/Reveal';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import styles from './Footer.module.css';

const PHONE_WA = 'https://wa.me/34605166166';
const CONSULTORI_URL = 'https://ipediatria.imedicplatform.com/';

export default function Footer() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const home = (hash) => (pathname === '/' ? `#${hash}` : `/#${hash}`);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <Reveal>
          <div className={styles.signature}>
            <THtml as="h2" k="footer.h2" className={`${styles.bigTitle} editorial-display`} />
            <div className={styles.ctas}>
              <a href={CONSULTORI_URL} target="_blank" rel="noopener" className={styles.btnMagenta}>
                <span>{t('footer.cta')}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={PHONE_WA} target="_blank" rel="noopener noreferrer" className={styles.btnWa}>
                <WhatsAppIcon />
                <span>{t('footer.wa')}</span>
              </a>
            </div>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <div>
            <Link to="/" className={styles.logo}>
              <img src="/logo.png" alt="iPediatria & iDoctor" width="100" height="52" className={styles.logoImg} />
            </Link>
            <p className={styles.tag}>{t('footer.tag')}</p>
          </div>
          <div>
            <h4 className={styles.h4}>{t('footer.nav')}</h4>
            <ul>
              <li><a href={home('ajuda')}>{t('nav.help')}</a></li>
              <li><a href={home('equip')}>{t('nav.team')}</a></li>
              <li><a href={home('on-estem')}>{t('nav.where')}</a></li>
              <li><a href={home('contacte')}>{t('nav.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.h4}>{t('footer.contact')}</h4>
            <ul>
              <li>{t('footer.addr')}</li>
              <li>{t('footer.domicili')}</li>
              <li><a href="tel:+34605166166">+34 605 166 166</a></li>
              <li><a href="mailto:info@ipediatria.cat">info@ipediatria.cat</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} iPediatria & iDoctor · Tots els drets reservats.</span>
          <span className={styles.legal}>
            <Link to="/legal">{t('footer.legal')}</Link> ·{' '}
            <Link to="/privacy">{t('footer.privacy')}</Link> ·{' '}
            <Link to="/cookies">{t('footer.cookies')}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
