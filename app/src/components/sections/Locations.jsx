import { useTranslation, THtml } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import styles from './Locations.module.css';

const PHONE_WA = 'https://wa.me/34605166166';

export default function Locations() {
  const { t } = useTranslation();

  return (
    <section id="on-estem" className="section">
      <div className="container">
        <SectionHead num="03" eyebrowKey="s4.eyebrow" h2Key="s4.h2" pKey="s4.p" />

        <div className={styles.grid}>
          <Reveal as="article" className={`${styles.card} ${styles.featured}`}>
            <div className={styles.head}>
              <h3 className={styles.h3}>{t('s4.l1.h3')}</h3>
              <span className={styles.tag}>{t('s4.l1.tag')}</span>
            </div>
            <THtml as="p" k="s4.l1.addr" className={styles.addr} />
            <div className={styles.meta}>
              <span className={styles.chip}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{t('s4.l1.chip1')}</span>
              </span>
              <span className={styles.chip}>{t('s4.l1.chip2')}</span>
            </div>
            <div className={styles.actions}>
              <a className={styles.phone} href="tel:+34605166166">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A20 20 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2.1z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                +34 605 166 166
              </a>
              <a className={styles.whatsapp} href={PHONE_WA} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                <span>{t('s4.l1.wa')}</span>
              </a>
            </div>
          </Reveal>

          <Reveal as="article" delay={0.1} className={`${styles.card} ${styles.secondary}`}>
            <div className={styles.head}>
              <h3 className={styles.h3}>{t('s4.l2.h3')}</h3>
              <span className={styles.tag}>{t('s4.l2.tag')}</span>
            </div>
            <THtml as="p" k="s4.l2.addr" className={styles.addr} />
            <div className={styles.meta}>
              <span className={styles.chip}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{t('s4.l2.chip1')}</span>
              </span>
              <span className={styles.chip}>{t('s4.l2.chip2')}</span>
              <span className={styles.chip}>{t('s4.l2.chip3')}</span>
            </div>
            <a className={styles.phone} href="tel:+34972306565">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A20 20 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2.1z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              +34 972 30 65 65
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
