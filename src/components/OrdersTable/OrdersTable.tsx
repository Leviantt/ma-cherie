import { useTranslation } from 'next-i18next';

import styles from './OrdersTable.module.css';
import { api } from '~/utils/api';
import { OrderRow } from '../OrderRow';
import type { Status } from '@prisma/client';
import { filterByStatus } from '~/utils/filterByStatus';
import { compareByDate } from '~/utils/compareByDate';

export type MOCK_ORDER = {
	id: number;
	name: string;
	status: Status;
	createdAt: Date;
	desserts: number;
};

type OrdersTableProps = {
	filterByStatusFlags: boolean[];
};

export const OrdersTable = ({ filterByStatusFlags }: OrdersTableProps) => {
	const { t } = useTranslation('orders');
	const {
		data: orders,
		isLoading,
		error,
		refetch,
	} = api.order.getAllWithDesserts.useQuery();

	if (isLoading) return <div>{t('loading')}</div>;

	if (error) {
		console.log(error);
		return <div>{t('error')}</div>;
	}
	const filtered = filterByStatus(orders, filterByStatusFlags);
	filtered.sort(compareByDate);
	return (
		<table className={styles.ordersTable}>
			<thead>
				<tr>
					<th scope='col' className={styles.col1}>
						{t('number')}
					</th>
					<th scope='col' className={styles.col2}>
						{t('name')}
					</th>
					<th scope='col' className={styles.col3}>
						{t('status')}
					</th>
					<th scope='col' className={styles.col4}>
						{t('created-at')}
					</th>
					<th scope='col' className={styles.col5}>
						{t('price')}
					</th>
				</tr>
			</thead>
			<tbody>
				{filtered.map((order) => (
					<OrderRow key={order.id} {...order} refetch={() => void refetch()} />
				))}
			</tbody>
		</table>
	);
};
