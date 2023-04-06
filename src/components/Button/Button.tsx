import type { ReactNode } from 'react';
import styles from './Button.module.css';
import type { CustomButtonStyles } from '~/types/CustomButtonStyles';

type ButtonProps = {
	customStyles: CustomButtonStyles;
	readonly children?: ReactNode;
};

export const Button = (props: ButtonProps) => {
	const { customStyles, children } = props;
	return (
		<button style={customStyles} className={styles.button}>
			{children}
		</button>
	);
};
