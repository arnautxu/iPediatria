import { useTranslation } from '../../i18n/I18nContext';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import styles from './Team.module.css';

const TEAM = [
  {
    id: 'm1',
    initials: 'IO',
    name: 'Dra. Iratxe Olabegoya',
    idx: '01',
    color: 'cyan',
    photo: '/dra-olabegoya.jpg',
  },
  {
    id: 'm2',
    initials: 'PP',
    name: 'Dr. Pere Plaja',
    idx: '02',
    color: 'mag',
    photo: null,
  },
  {
    id: 'm3',
    initials: 'FA',
    name: 'Inf. Fina Aguilar',
    idx: '03',
    color: 'ink',
    photo: null,
  },
];

export default function Team() {
  const { t } = useTranslation();

  return (
    <section id="equip" className="section">
      <div className="container">
        <SectionHead num="02" eyebrowKey="s3.eyebrow" h2Key="s3.h2" pKey="s3.p" />

        <div className={styles.grid}>
          {TEAM.map(({ id, initials, name, idx, color, photo }, i) => (
            <Reveal
              as="article"
              key={id}
              delay={i * 0.07}
              className={styles.card}
            >
              <div className={`${styles.portrait} ${styles[color]} ${photo ? styles.hasPhoto : styles.noPhoto}`}>
                {photo ? (
                  <img
                    src={photo}
                    alt={`Retrat de ${name}`}
                    className={styles.photo}
                    loading="lazy"
                    width="600"
                    height="510"
                  />
                ) : (
                  <>
                    <span className={styles.grain} aria-hidden="true" />
                    <span className={styles.initials}>{initials}</span>
                    <span className={styles.soonBadge}>Foto disponible aviat</span>
                  </>
                )}
                <span className={styles.idx}>{idx}</span>
              </div>
              <div className={styles.body}>
                <span className={styles.role}>{t(`s3.${id}.role`)}</span>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.bio}>{t(`s3.${id}.p`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
