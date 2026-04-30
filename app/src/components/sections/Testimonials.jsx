import { useTranslation, THtml } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import styles from './Testimonials.module.css';

const ITEMS = ['1', '2', '3', '4'];

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section id="testimonis" className="section">
      <div className="container">
        <SectionHead eyebrowKey="test.eyebrow" h2Key="test.h2" centered />

        <div className={styles.grid}>
          {ITEMS.map((n, i) => (
            <Reveal as="figure" key={n} delay={i * 0.06} className={styles.item}>
              <div className={styles.mark} aria-hidden="true">"</div>
              <THtml as="blockquote" k={`test.${n}.q`} className={styles.q} />
              <figcaption className={styles.caption}>
                <strong>{t(`test.${n}.name`)}</strong>
                <span>{t(`test.${n}.loc`)}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
