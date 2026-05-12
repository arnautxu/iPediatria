import { useTranslation, THtml } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import styles from './Testimonials.module.css';

/**
 * Testimonials — editorial restraint. No giant quote marks, no border-stripes.
 * Each card: monogram avatar + quote + caption with location and source badge.
 * Footer below the grid surfaces the aggregate proof (★ 4.9 · Google Reviews).
 */

const ITEMS = [
  { id: '1', initials: 'MO', tone: 'cyan' },
  { id: '2', initials: 'EL', tone: 'mag'  },
  { id: '3', initials: 'AN', tone: 'cyan' },
  { id: '4', initials: 'ED', tone: 'mag'  },
];

const GOOGLE_URL = 'https://www.google.com/search?q=iPediatria+Palafrugell+reviews';

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section id="testimonis" className="section">
      <div className="container">
        <SectionHead eyebrowKey="test.eyebrow" h2Key="test.h2" centered />

        <div className={styles.grid}>
          {ITEMS.map(({ id, initials, tone }, i) => (
            <Reveal as="figure" key={id} delay={i * 0.06} className={styles.item}>
              <div className={styles.head}>
                <div className={`${styles.avatar} ${styles[tone]}`} aria-hidden="true">
                  <span>{initials}</span>
                </div>
                <div className={styles.headMeta}>
                  <span className={styles.name}>{t(`test.${id}.name`)}</span>
                  <span className={styles.loc}>{t(`test.${id}.loc`)}</span>
                </div>
                <svg className={styles.stars} viewBox="0 0 100 16" fill="none" aria-label="5 estrelles">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <path
                      key={n}
                      d="M8 0l2.5 5 5.5.8-4 3.9.9 5.5L8 12.6 3.1 15.2 4 9.7 0 5.8 5.5 5z"
                      transform={`translate(${n * 21} 0)`}
                      fill="currentColor"
                    />
                  ))}
                </svg>
              </div>

              <THtml as="blockquote" k={`test.${id}.q`} className={styles.q} />

              <span className={styles.divider} aria-hidden="true" />
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.proof} delay={0.18}>
          <div className={styles.proofMark}>
            <span className={styles.rating}>4.9</span>
            <svg viewBox="0 0 80 16" fill="none" className={styles.proofStars} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((n) => (
                <path
                  key={n}
                  d="M8 0l2.5 5 5.5.8-4 3.9.9 5.5L8 12.6 3.1 15.2 4 9.7 0 5.8 5.5 5z"
                  transform={`translate(${n * 16} 0)`}
                  fill="currentColor"
                />
              ))}
            </svg>
          </div>
          <p className={styles.proofText}>
            Mitjana de valoracions reals de famílies a{' '}
            <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className={styles.proofLink}>
              Google Reviews
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 9l6-6M9 3H4M9 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
