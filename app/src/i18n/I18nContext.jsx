import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { TRANSLATIONS } from './translations';

const STORAGE_KEY = 'ipediatria-lang';
const DEFAULT_LANG = 'ca';
const SUPPORTED = ['ca', 'en', 'ru'];

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  });

  // Update <html lang>, <title>, meta description on language change.
  useEffect(() => {
    const dict = TRANSLATIONS[lang] || {};
    document.documentElement.lang = lang;
    if (dict['meta.title']) document.title = dict['meta.title'];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict['meta.desc']) metaDesc.setAttribute('content', dict['meta.desc']);
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  }, []);

  const t = useCallback(
    (key, fallback = '') => {
      const dict = TRANSLATIONS[lang] || {};
      return dict[key] !== undefined ? dict[key] : fallback;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}

/** Component that renders translated HTML safely (translations are author-controlled). */
export function THtml({ k, as: Tag = 'span', className, ...rest }) {
  const { t } = useTranslation();
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: t(k) }} {...rest} />;
}

/** Plain text translation. */
export function T({ k, fallback }) {
  const { t } = useTranslation();
  return <>{t(k, fallback)}</>;
}
