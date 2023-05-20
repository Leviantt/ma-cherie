import { useTranslation } from 'next-i18next';

import styles from './StatItem.module.css';
import type { StatData } from '~/types/StatData';

export const StatItem = ({ number, title }: StatData) => {
	const { t } = useTranslation('index');
	return (
		<div className={styles.box}>
			<span className={styles.statNumber}>{number}</span>
			<p className={styles.desc}>{t(title)}</p>
		</div>
	);
};
