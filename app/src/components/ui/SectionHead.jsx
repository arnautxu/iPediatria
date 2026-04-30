import { useTranslation, THtml } from '../../i18n/I18nContext';
import Reveal from './Reveal';
import styles from './SectionHead.module.css';

/**
 * Editorial section head: large outlined number watermark + eyebrow + h2 + lead.
 * Translated via i18n keys.
 */
export default function SectionHead({ num, eyebrowKey, h2Key, pKey, centered = false }) {
  const { t } = useTranslation();

  return (
    <Reveal as="header" className={`${styles.head} ${centered ? styles.centered : ''}`}>
      {num && <span className={styles.num} aria-hidden="true">{num}</span>}
      <div className={styles.text}>
        <span className={styles.eyebrow}>{t(eyebrowKey)}</span>
        <THtml as="h2" k={h2Key} className={`${styles.h2} editorial-h2`} />
        {pKey && <THtml as="p" k={pKey} className={styles.lead} />}
      </div>
    </Reveal>
  );
}
