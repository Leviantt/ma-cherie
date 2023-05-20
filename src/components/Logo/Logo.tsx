import Link from 'next/link';

import styles from './Logo.module.css';

export const Logo = () => {
	return (
		<Link href='/' className={styles.logo}>
			MA CHERIE
		</Link>
	);
};
