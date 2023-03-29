import type { ReactNode } from 'react';
import styles from './Grid.module.css';

type GridProps = {
	readonly children: ReactNode;
};

export const Grid = ({ children }: GridProps) => {
  return (
    <div className={styles.grid}>{children}</div>
  )
}
