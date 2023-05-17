import { convertDatetimeToString } from '~/utils/date';
import styles from './OrderRow.module.css';
import type { OrderWithDesserts } from '~/types/OrderWithDesserts';
import { getTotalPrice } from '~/utils/getTotalPrice';
import { SetStatus } from '../SetStatus';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export const OrderRow = ({
	id,
	name,
	status,
	createdAt,
	desserts,
	deliveryPrice,
	refetch,
}: OrderWithDesserts & { refetch: () => void }) => {
	const { t } = useTranslation('orders');
	return (
		<tr>
			<td className={styles.col1} data-label={t('number')}>
				{id}
			</td>
			<td className={styles.col2} data-label={t('name')}>
				<Link href={`/orders/${id}`}>{name}</Link>
			</td>
			<td className={styles.col3} data-label={t('status')}>
				<SetStatus status={status} orderId={id} refetch={refetch} />
			</td>
			<td className={styles.col4} data-label={t('created-at')}>
				{convertDatetimeToString(createdAt)}
			</td>
			<td className={styles.col5} data-label={t('price')}>
				{getTotalPrice(desserts) + +deliveryPrice}
			</td>
		</tr>
	);
};
