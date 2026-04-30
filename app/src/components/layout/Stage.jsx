import styles from './Stage.module.css';

export default function Stage() {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.grain} />
      <span className={`${styles.accent} ${styles.cyan}`} />
      <span className={`${styles.accent} ${styles.mag}`} />
      <span className={styles.ruleTop} />
    </div>
  );
}
