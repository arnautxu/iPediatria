import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation, THtml } from '../../i18n/I18nContext';
import useTilt from '../../hooks/useTilt';

// Three.js scene is heavy — lazy-load so it doesn't block initial paint.
const HeroScene = lazy(() => import('../../three/HeroScene'));
import WhatsAppIcon from '../ui/WhatsAppIcon';
import styles from './Hero.module.css';

const PHONE_WA = 'https://wa.me/34605166166';
const CONSULTORI_URL = 'https://ipediatria.imedicplatform.com/';

const stagger = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.12 + delay * 0.06 },
});

export default function Hero() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const cardRef = useTilt();

  return (
    <section id="inici" className={styles.hero}>
      <Suspense fallback={null}>
        <HeroScene className={styles.scene} />
      </Suspense>

      <div className={styles.meta}>
        <span className={styles.metaLine} />
        <span className={styles.metaTag}>{t('hero.meta')}</span>
        <span className={styles.metaYear}>Des de 2010</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.copy}>
          <motion.span className={styles.eyebrow} {...stagger(0)}>
            {t('hero.eyebrow')}
          </motion.span>

          <h1 className={styles.title}>
            <motion.span {...stagger(1)}>{t('hero.title.l1')}</motion.span>
            <motion.span {...stagger(2)} dangerouslySetInnerHTML={{ __html: t('hero.title.l2') }} />
          </h1>

          <motion.p
            className={styles.lead}
            {...stagger(3)}
            dangerouslySetInnerHTML={{ __html: t('hero.lead') }}
          />

          <motion.div className={styles.actions} {...stagger(4)}>
            <a href={CONSULTORI_URL} target="_blank" rel="noopener noreferrer" className={styles.btnMagenta}>
              <span>{t('hero.cta')}</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={PHONE_WA} target="_blank" rel="noopener noreferrer" className={styles.btnWa}>
              <WhatsAppIcon />
              <span>{t('hero.wa')}</span>
            </a>
          </motion.div>
        </div>

        <aside className={styles.aside}>
          <motion.div
            ref={cardRef}
            className={styles.featured}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          >
            <div className={styles.featuredHead}>
              <span className={styles.statusDot} />
              <span>{t('featured.head')}</span>
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.avatarStack} aria-hidden="true">
                <div className={`${styles.avatar} ${styles.a1}`}>IO</div>
                <div className={`${styles.avatar} ${styles.a2}`}>PP</div>
                <div className={`${styles.avatar} ${styles.a3}`}>FA</div>
              </div>
              <p>{t('featured.body')}</p>
              <div className={styles.wave} aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
              <a href={CONSULTORI_URL} target="_blank" rel="noopener" className={styles.featuredCta}>
                <span>{t('featured.cta')}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </aside>
      </div>

      <motion.div
        className={styles.marquee}
        role="complementary"
        aria-label="Resum del servei"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? false : { opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.65 }}
      >
        <div className={styles.marqueeTrack}>
          <THtml as="span" k="hero.proof" className={styles.proofItem} />
          <THtml as="span" k="hero.proof" className={styles.proofItem} aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}
