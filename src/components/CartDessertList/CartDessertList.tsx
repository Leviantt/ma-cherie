import type { ReactNode } from 'react';

import styles from './CartDessertList.module.css';

type CartDessertListProps = {
	readonly children?: ReactNode;
};

export const CartDessertList = ({ children }: CartDessertListProps) => {
	return <div className={styles.list}>{children}</div>;
};
