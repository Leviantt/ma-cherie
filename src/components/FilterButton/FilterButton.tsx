import type { ReactNode } from 'react';
import styles from './FilterButton.module.css';

type FilterButtonProps = {
	toggle?: () => void | Promise<void>;
	isActive: boolean | undefined;
	readonly children?: ReactNode;
};

export const FilterButton = ({
	toggle,
	isActive,
	children,
}: FilterButtonProps) => {
	return (
		<button
			className={
				isActive ? [styles.button, styles.active].join(' ') : styles.button
			}
			onClick={toggle}
		>
			{children}
		</button>
	);
};
