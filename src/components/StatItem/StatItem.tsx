import type { StatData } from '~/types/StatData';
import styles from './StatItem.module.css';
import { useTranslation } from 'next-i18next';

export const StatItem = ({ number, title }: StatData) => {
	const { t } = useTranslation('index');
	return (
		<div className={styles.box}>
			<span className={styles.statNumber}>{number}</span>
			<p className={styles.desc}>{t(title)}</p>
		</div>
	);
};
