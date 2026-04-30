import { useState } from 'react';
import { useTranslation } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // No backend wired — show success message and disable submit
    setSent(true);
  };

  return (
    <section id="contacte" className="section">
      <div className="container">
        <SectionHead num="04" eyebrowKey="s5.eyebrow" h2Key="s5.h2" pKey="s5.p" />

        <Reveal className={styles.wrap}>
          <div className={styles.info}>
            <ul className={styles.list}>
              <li>
                <span className={styles.label}>{t('s5.c1.label')}</span>
                <a href="https://wa.me/34605166166" target="_blank" rel="noopener noreferrer" className={styles.value}>
                  +34 605 166 166
                </a>
              </li>
              <li>
                <span className={styles.label}>{t('s5.c2.label')}</span>
                <a href="tel:+34972306565" className={styles.value}>+34 972 30 65 65</a>
              </li>
              <li>
                <span className={styles.label}>{t('s5.c3.label')}</span>
                <a href="mailto:info@ipediatria.cat" className={styles.value}>info@ipediatria.cat</a>
              </li>
            </ul>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <label htmlFor="form-name">
              <span>{t('form.name')}</span>
              <input
                type="text"
                id="form-name"
                name="name"
                autoComplete="name"
                required
                placeholder={t('form.name.ph')}
                disabled={sent}
              />
            </label>
            <label htmlFor="form-email">
              <span>{t('form.email')}</span>
              <input
                type="email"
                id="form-email"
                name="email"
                autoComplete="email"
                required
                placeholder={t('form.email.ph')}
                disabled={sent}
              />
            </label>
            <label htmlFor="form-msg">
              <span>{t('form.msg')}</span>
              <textarea
                id="form-msg"
                name="message"
                rows="4"
                required
                placeholder={t('form.msg.ph')}
                disabled={sent}
              />
            </label>
            <button type="submit" className={styles.submit} disabled={sent}>
              <span>{t('form.submit')}</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {sent && <span className={styles.ok}>{t('form.ok')}</span>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
