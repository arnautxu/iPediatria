import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../../i18n/I18nContext';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'ipediatria-cookies-consent';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const id = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const consent = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.banner}
          role="dialog"
          aria-live="polite"
          aria-label="Avís de cookies"
          initial={{ y: 'calc(100% + 40px)', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 'calc(100% + 40px)', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className={styles.text}>
            <p>
              {t('cookies.text')}{' '}
              <Link to="/cookies">{t('cookies.more')}</Link>
            </p>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.reject} onClick={() => consent('necessary')}>
              {t('cookies.reject')}
            </button>
            <button type="button" className={styles.accept} onClick={() => consent('all')}>
              {t('cookies.accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
