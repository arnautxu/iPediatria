import { Link } from 'react-router-dom';
import styles from './LegalLayout.module.css';

export default function LegalLayout({ title, children, lastUpdate }) {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.crumbs}>
          <Link to="/">← Tornar a l'inici</Link>
        </div>
        <header className={styles.header}>
          <h1 className={styles.h1}>{title}</h1>
          {lastUpdate && <p className={styles.update}>Última actualització: {lastUpdate}</p>}
        </header>
        <article className={styles.content}>{children}</article>
      </div>
    </main>
  );
}
