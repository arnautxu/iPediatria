import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import styles from './Contact.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const errors = {
    name: values.name.trim().length < 2 ? 'Cal escriure el teu nom (mínim 2 lletres).' : null,
    email: !EMAIL_RE.test(values.email)
      ? "Sembla que falta un @ o un domini."
      : null,
    message: values.message.trim().length < 10
      ? 'Explica\'ns una mica més (mínim 10 caràcters).'
      : null,
  };
  const isValid = !errors.name && !errors.email && !errors.message;

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setSending(true);
    // No backend — fake-async then success
    await new Promise((res) => setTimeout(res, 700));
    setSending(false);
    setSent(true);
  };

  const handleChange = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const handleBlur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

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

            <div className={styles.hint}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <p>
                Per a urgències, no esperis resposta del formulari — contacta directament per WhatsApp o telèfon.
              </p>
            </div>
          </div>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <Field
              id="form-name"
              label={t('form.name')}
              type="text"
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && errors.name}
              disabled={sent}
              autoComplete="name"
            />
            <Field
              id="form-email"
              label={t('form.email')}
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              disabled={sent}
              autoComplete="email"
            />
            <Field
              id="form-msg"
              label={t('form.msg')}
              as="textarea"
              rows={4}
              value={values.message}
              onChange={handleChange('message')}
              onBlur={handleBlur('message')}
              error={touched.message && errors.message}
              disabled={sent}
            />

            <button
              type="submit"
              className={styles.submit}
              disabled={sending || sent}
              aria-busy={sending}
            >
              {sending ? (
                <>
                  <Spinner />
                  <span>Enviant…</span>
                </>
              ) : sent ? (
                <span>Enviat</span>
              ) : (
                <>
                  <span>{t('form.submit')}</span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            <AnimatePresence>
              {sent && (
                <motion.div
                  className={styles.success}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                >
                  <svg viewBox="0 0 36 36" fill="none" className={styles.checkmark} aria-hidden="true">
                    <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.8" className={styles.checkCircle} />
                    <path d="M11 18.5L16 23.5L25 13.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.checkTick} />
                  </svg>
                  <span>{t('form.ok')}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* -------- Field component with floating label + underline focus + error -------- */
function Field({ id, label, as, error, disabled, value, ...rest }) {
  const Tag = as === 'textarea' ? 'textarea' : 'input';
  const filled = value && value.length > 0;
  return (
    <div className={`${styles.field} ${filled ? styles.filled : ''} ${error ? styles.hasError : ''}`}>
      <Tag
        id={id}
        className={styles.control}
        value={value}
        disabled={disabled}
        placeholder=" "
        {...rest}
      />
      <label htmlFor={id} className={styles.floatLabel}>{label}</label>
      <span className={styles.underline} aria-hidden="true" />
      <AnimatePresence>
        {error && (
          <motion.span
            className={styles.error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 16 16" className={styles.spinner} aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}
