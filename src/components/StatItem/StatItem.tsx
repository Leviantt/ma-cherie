import type { StatData } from '~/types/StatData';
import styles from './StatItem.module.css';

export const StatItem = ({ statNumber, description }: StatData) => {
  return (
    <div className={styles.box}>
      <span className={styles.statNumber}>{statNumber}</span>
      <p className={styles.desc}>{description}</p>
    </div>
  )
}
