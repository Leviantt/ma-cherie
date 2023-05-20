import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/router';

import styles from './Layout.module.css';
import { Navbar } from '../Navbar';

type LayoutProps = {
	readonly children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	const router = useRouter();
	useEffect(() => {
		const locale = localStorage.getItem('locale');
		if (locale) {
			const path = router.asPath;
			void router.push(path, path, { locale: locale });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='container'>
			<Navbar />
			<main className={styles.content}>{children}</main>
		</div>
	);
};
