import type { ReactNode } from 'react';

import styles from './Grid.module.css';

type GridProps = {
	readonly children?: ReactNode;
	readonly cellMinWidth?: number;
};

export const Grid = ({ children, cellMinWidth }: GridProps) => {
	return (
		<div
			className={styles.grid}
			style={{
				gridTemplateColumns: `repeat(auto-fill, minmax(${
					cellMinWidth ?? 300
				}px, 1fr))`,
			}}
		>
			{children}
		</div>
	);
};
