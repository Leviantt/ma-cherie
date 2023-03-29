import type { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import styles from './Layout.module.css';

type LayoutProps = {
	readonly children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<div className={styles.content}>
				{children}
			</div>
		</>
	);
};
