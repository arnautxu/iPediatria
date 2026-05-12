import { useTranslation } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import styles from './Services.module.css';

/* Custom monoline icons (24×24, stroke 1.6).
   Each has a single conceptual detail — not a stock medical set.
   c1 Disponibles avui    → calendar with a marked day
   c2 Consultori online   → laptop screen + heartbeat line
   c3 Visites a domicili  → house with stethoscope curve
   c4 Farmàcia inclosa    → pill + delivery arrow
   c5 Resultats al moment → clock with positive check
   c6 Vacunació           → syringe with droplet
   c7 Proves              → magnifying loupe over document
   c8 Equip complet       → cluster of three figures
*/
const ICONS = {
  c1: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5.5" width="17" height="14" rx="2.5" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3.5v3M16 3.5v3" />
      <circle cx="12" cy="14" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  c2: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M2 19.5h20" />
      <path d="M7 11.5h2.4l1.3-3 2.6 6 1.3-3H17" />
    </svg>
  ),
  c3: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11.5l8-7 8 7v8.5a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" />
      <path d="M10 14v2.2a2.2 2.2 0 0 0 4.4 0V14" />
      <circle cx="14.4" cy="12" r="1.2" />
    </svg>
  ),
  c4: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="9" width="11" height="6" rx="3" transform="rotate(-30 9 12)" />
      <path d="M8.2 14.5l3-5.2" />
      <path d="M16.5 16l3 3M18 14l3 3" />
    </svg>
  ),
  c5: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 13V8.5" />
      <path d="M9 4h6" />
      <path d="M9.5 13.2l2 2 3.5-4" />
    </svg>
  ),
  c6: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3l7 7" />
      <path d="M18.5 6.5l-12 12L3 21l2.5-3.5 12-12" />
      <path d="M11 12l3.5 3.5" />
      <path d="M9 21c-1 0-1.6-.6-1.6-1.6 0-1 1.6-3 1.6-3s1.6 2 1.6 3c0 1-.6 1.6-1.6 1.6z" fill="currentColor" stroke="none" />
    </svg>
  ),
  c7: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="13" height="16" rx="1.5" />
      <path d="M8 7h5M8 10h5" />
      <circle cx="15" cy="15" r="3.5" />
      <path d="M17.6 17.6L20.5 20.5" />
    </svg>
  ),
  c8: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M14.5 14.5c1-.7 2-1 2.5-1 2.4 0 4 2 4 4.5" />
    </svg>
  ),
};

const SERVICES = [
  { id: 'c1', num: '01' },
  { id: 'c2', num: '02', featured: true },
  { id: 'c3', num: '03' },
  { id: 'c4', num: '04' },
  { id: 'c5', num: '05' },
  { id: 'c6', num: '06' },
  { id: 'c7', num: '07' },
  { id: 'c8', num: '08' },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="ajuda" className="section">
      <div className="container">
        <SectionHead num="01" eyebrowKey="s1.eyebrow" h2Key="s1.h2" pKey="s1.p" />

        <div className={styles.grid}>
          {SERVICES.map(({ id, num, featured }, idx) => (
            <Reveal
              key={id}
              as="article"
              delay={(idx % 4) * 0.055}
              className={`${styles.card} ${featured ? styles.featured : ''}`}
            >
              <div className={styles.inner}>
                {featured && <span className={styles.badge}>{t('badge.featured')}</span>}
                <div className={styles.ico}>{ICONS[id]}</div>
                <h3 className={styles.h3}>{t(`s1.${id}.h3`)}</h3>
                <p className={styles.p}>{t(`s1.${id}.p`)}</p>
              </div>
              {!featured && <span className={styles.numWatermark} aria-hidden="true">{num}</span>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
