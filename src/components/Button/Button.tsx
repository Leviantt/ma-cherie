import type { ReactNode } from 'react';
import styles from './Button.module.css';

export type CustomStyles = {
	color: string;
	backgroundColor: string;
	width?: string;
	boxShadow?: string;
};

type ButtonProps = {
	customStyles: CustomStyles;
	readonly children: ReactNode;
};

export const Button = (props: ButtonProps) => {
	const { customStyles, children } = props;
	return <button style={customStyles} className={styles.button}>{children}</button>;
};
