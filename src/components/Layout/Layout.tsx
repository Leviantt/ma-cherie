import { type ReactNode } from 'react';
import { Navbar } from '../Navbar';
import styles from './Layout.module.css';

type LayoutProps = {
	readonly children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<main className={styles.content}>{children}</main>
		</>
	);
};
