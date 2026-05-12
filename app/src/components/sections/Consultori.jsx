import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslation, THtml } from '../../i18n/I18nContext';
import Reveal from '../ui/Reveal';
import styles from './Consultori.module.css';

const CONSULTORI_URL = 'https://ipediatria.imedicplatform.com/';

export default function Consultori() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const spotRef = useRef(null);
  const visualRef = useRef(null);
  const mockupRef = useRef(null);

  // Cursor-following spotlight: lerped rAF loop, no React state to avoid re-renders.
  // Skipped on touch devices (no hover) and reduced-motion users.
  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const spot = spotRef.current;
    if (!wrap || !spot) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let raf;
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
    let running = false;

    const loop = () => {
      curX += (targetX - curX) * 0.14;
      curY += (targetY - curY) * 0.14;
      spot.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      if (running) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!running) {
        running = true;
        curX = targetX;
        curY = targetY;
        spot.style.opacity = '1';
        loop();
      }
    };

    const onLeave = () => {
      running = false;
      spot.style.opacity = '0';
      cancelAnimationFrame(raf);
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Mockup tilt — responds to cursor position within the visual zone.
  // Adds 3D presence without competing with the spotlight.
  useEffect(() => {
    if (reduced) return;
    const visual = visualRef.current;
    const mockup = mockupRef.current;
    if (!visual || !mockup) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let raf;
    let targetRX = 0, targetRY = 0;
    let curRX = 0, curRY = 0;
    let running = false;

    const loop = () => {
      curRX += (targetRX - curRX) * 0.12;
      curRY += (targetRY - curRY) * 0.12;
      mockup.style.transform = `perspective(1400px) rotateX(${curRX}deg) rotateY(${curRY}deg)`;
      if (running) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = visual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      // Range ±5deg for Y (left/right), ±3deg for X (up/down — inverted)
      targetRY = px * 10;
      targetRX = -py * 6;
      if (!running) {
        running = true;
        curRX = targetRX;
        curRY = targetRY;
        mockup.style.animation = 'none';
        loop();
      }
    };

    const onLeave = () => {
      running = false;
      targetRX = 0;
      targetRY = 0;
      cancelAnimationFrame(raf);
      // Smooth ease back to neutral, then restore float animation
      mockup.style.transition = 'transform .6s cubic-bezier(0.23, 1, 0.32, 1)';
      mockup.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
      setTimeout(() => {
        if (!mockup) return;
        mockup.style.transition = '';
        mockup.style.transform = '';
        mockup.style.animation = '';
      }, 650);
    };

    visual.addEventListener('mousemove', onMove);
    visual.addEventListener('mouseleave', onLeave);
    return () => {
      visual.removeEventListener('mousemove', onMove);
      visual.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section id="consultori" className="section">
      <div className="container">
        <Reveal className={styles.wrap} ref={wrapRef}>
          <div ref={spotRef} className={styles.spotlight} aria-hidden="true" />
          <div className={styles.copy}>
            <span className="eyebrow">{t('s2.eyebrow')}</span>
            <THtml as="h2" k="s2.h2" className={`${styles.h2} editorial-h2`} />
            <THtml as="p" k="s2.p" className={styles.lead} />

            <div className={styles.actions}>
              <a href={CONSULTORI_URL} target="_blank" rel="noopener" className={styles.btnCyan}>
                <span>{t('s2.cta')}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <ul className={styles.hours}>
              <li>
                <span className={`${styles.dot} ${styles.cyan}`} />
                <span className={styles.hourLabel}>{t('s2.r1.label')}</span>
                <span className={styles.hourTime}>{t('s2.r1.time')}</span>
              </li>
              <li>
                <span className={`${styles.dot} ${styles.cyan}`} />
                <span className={styles.hourLabel}>{t('s2.r2.label')}</span>
                <span className={styles.hourTime}>{t('s2.r2.time')}</span>
              </li>
              <li>
                <span className={`${styles.dot} ${styles.gray}`} />
                <span className={styles.hourLabel}>{t('s2.r3.label')}</span>
                <span className={styles.hourTime}>{t('s2.r3.time')}</span>
              </li>
            </ul>
          </div>

          <div className={styles.visual} ref={visualRef}>
            <span className={styles.liveTag} aria-hidden="true">
              <span className={styles.liveDot} />
              LIVE
            </span>
            <img
              ref={mockupRef}
              src="/mockup-app.png"
              alt="App iPediatria en tres pantalles: selecció de metge, videoconsulta i serveis disponibles"
              className={styles.mockup}
              width="900"
              height="1951"
              loading="lazy"
            />
            <span className={styles.shimmer} aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
