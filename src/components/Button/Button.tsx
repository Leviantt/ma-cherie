import type { ReactNode } from 'react';
import styles from './Button.module.css';
import type { CustomButtonStyles } from '~/types/CustomButtonStyles';

type ButtonProps = {
	customStyles?: CustomButtonStyles;
	clicked?: boolean;
	onClick?: () => void | Promise<void>;
	readonly children?: ReactNode;
};

export const filterButtonStyles: CustomButtonStyles = {
	backgroundColor: '#fff',
	color: 'var(--primary-color)',
	boxShadow: '0px 4px 4px 0px #246B4942',
};

export const basicButtonStyles: CustomButtonStyles = {
	backgroundColor: '#a2c1b2',
	color: '#fff',
};

export const darkButtonStyles: CustomButtonStyles = {
	backgroundColor: 'var(--primary-color)',
	color: '#fff',
};

export const addButtonStyles: CustomButtonStyles = {
	backgroundColor: '#cadcd3',
	color: '#fff',
};

export const employeeButtonStyles: CustomButtonStyles = {
	backgroundColor: '#FDFBFB',
	color: '#000',
};

export const Button = (props: ButtonProps) => {
	const { customStyles, children, onClick, clicked } = props;

	return (
		<button
			style={customStyles ?? basicButtonStyles}
			className={
				clicked ? [styles.button, styles.clicked].join(' ') : styles.button
			}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
