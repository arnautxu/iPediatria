import { useEffect, useRef } from 'react';

/**
 * Lerp-based 3D tilt effect for a card.
 * Returns a ref to attach to the element.
 *
 * Notes:
 *  - We rely on the lerp loop for smoothing — DO NOT add a CSS `transition: transform`
 *    to the element, or every frame fires a new transition and the motion stalls.
 *  - Skips touch and reduced-motion for accessibility and battery.
 */
export default function useTilt({ rangeX = 5, rangeY = 7, depth = 6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = null;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, tx, 0.12);
      cy = lerp(cy, ty, 0.12);
      el.style.transform =
        `perspective(700px) rotateX(${cx.toFixed(3)}deg) rotateY(${cy.toFixed(3)}deg) translateZ(${depth}px)`;
      if (Math.abs(cx - tx) > 0.01 || Math.abs(cy - ty) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      ty = dx * rangeY;
      tx = -dy * rangeX;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rangeX, rangeY, depth]);

  return ref;
}
