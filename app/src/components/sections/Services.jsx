import { useTranslation } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import styles from './Services.module.css';

const ICONS = {
  c1: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  c2: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M17 9l4-2v10l-4-2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  c3: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  c4: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 3h6l1 5H8L9 3zM7 8h10l-1.5 13h-7L7 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  c5: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  c6: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  c7: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  c8: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
