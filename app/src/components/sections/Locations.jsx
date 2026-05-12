import { useTranslation, THtml } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import styles from './Locations.module.css';

const PHONE_WA = 'https://wa.me/34605166166';

/**
 * Inline SVG map — Costa Brava region with iPediatria coverage radius.
 * Stylized, not geographic: suggests "we cover this stretch of coast"
 * without the cost / load of a real Mapbox embed.
 */
function RegionMap() {
  return (
    <svg
      className={styles.mapRegion}
      viewBox="0 0 320 180"
      fill="none"
      aria-hidden="true"
    >
      {/* sea background */}
      <rect width="320" height="180" fill="url(#sea)" />
      {/* land — stylized Costa Brava silhouette */}
      <path
        d="M0 50 Q20 45 35 52 T70 48 Q95 55 110 50 T155 58 Q175 62 195 56 T240 64 Q260 70 280 66 L320 70 L320 0 L0 0 Z"
        fill="url(#land)"
      />
      {/* coastline stroke */}
      <path
        d="M0 50 Q20 45 35 52 T70 48 Q95 55 110 50 T155 58 Q175 62 195 56 T240 64 Q260 70 280 66 L320 70"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.2"
        fill="none"
      />
      {/* coverage radius dashed circle */}
      <circle
        cx="155"
        cy="58"
        r="62"
        stroke="rgba(0,174,239,0.45)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        fill="rgba(0,174,239,0.04)"
      />
      {/* inner radius */}
      <circle cx="155" cy="58" r="28" fill="rgba(0,174,239,0.08)" />
      {/* pin */}
      <g transform="translate(155 58)">
        <circle r="8" fill="var(--cyan)" />
        <circle r="3" fill="#fff" />
        <circle r="14" stroke="rgba(0,174,239,0.6)" strokeWidth="1" fill="none">
          <animate attributeName="r" from="8" to="20" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* place labels */}
      <text x="20" y="44" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.06em">BLANES</text>
      <text x="155" y="48" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="600" fontFamily="ui-monospace, monospace" letterSpacing="0.06em">PALAFRUGELL</text>
      <text x="290" y="60" textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="ui-monospace, monospace" letterSpacing="0.06em">PORTBOU</text>
      {/* SVG defs */}
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(0, 30, 60, 0)" />
          <stop offset="1" stopColor="rgba(0, 174, 239, 0.08)" />
        </linearGradient>
        <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255, 255, 255, 0.04)" />
          <stop offset="1" stopColor="rgba(255, 255, 255, 0.12)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Inline SVG map — Palafrugell street grid with pin at Plaça de Catalunya.
 * Schematic; not a real map. Cheap, brand-aligned, no API.
 */
function CityMap() {
  return (
    <svg
      className={styles.mapCity}
      viewBox="0 0 280 160"
      fill="none"
      aria-hidden="true"
    >
      <rect width="280" height="160" fill="rgba(245, 250, 253, 0.85)" />
      {/* street grid */}
      {[20, 60, 100, 140, 180, 220, 260].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="160" stroke="rgba(0,76,115,0.08)" strokeWidth="1" />
      ))}
      {[20, 50, 80, 110, 140].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="280" y2={y} stroke="rgba(0,76,115,0.08)" strokeWidth="1" />
      ))}
      {/* main avenue */}
      <line x1="0" y1="80" x2="280" y2="80" stroke="rgba(0,76,115,0.18)" strokeWidth="2" />
      <line x1="140" y1="0" x2="140" y2="160" stroke="rgba(0,76,115,0.18)" strokeWidth="2" />
      {/* plaça block */}
      <rect x="125" y="65" width="30" height="30" fill="rgba(0,174,239,0.1)" stroke="rgba(0,174,239,0.3)" strokeWidth="1" />
      {/* pin */}
      <g transform="translate(140 80)">
        <circle r="14" fill="rgba(0,174,239,0.15)" />
        <circle r="7" fill="var(--cyan)" />
        <circle r="2.5" fill="#fff" />
      </g>
      {/* label */}
      <text x="140" y="116" textAnchor="middle" fill="var(--ink-2)" fontSize="9" fontWeight="600" fontFamily="ui-monospace, monospace" letterSpacing="0.04em">PLAÇA DE CATALUNYA</text>
    </svg>
  );
}

export default function Locations() {
  const { t } = useTranslation();

  return (
    <section id="on-estem" className="section">
      <div className="container">
        <SectionHead num="03" eyebrowKey="s4.eyebrow" h2Key="s4.h2" pKey="s4.p" />

        <div className={styles.grid}>
          <Reveal as="article" className={`${styles.card} ${styles.featured}`}>
            <RegionMap />
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
            <CityMap />
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
