import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal: fade + lift on scroll-into-view. Disabled for reduced motion.
 * Uses Framer Motion's whileInView for clean, interruptible behaviour.
 */
export default function Reveal({ children, delay = 0, y = 14, as = 'div', className, ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className} {...rest}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
