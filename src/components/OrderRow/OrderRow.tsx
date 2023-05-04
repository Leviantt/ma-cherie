import { convertDatetimeToString } from '~/utils/convertDatetimeToString';
import styles from './OrderRow.module.css';
import type { OrderWithDesserts } from '~/types/OrderWithDesserts';
import { getTotalPrice } from '~/utils/getTotalPrice';
import { convertOrderStatus } from '~/utils/convertOrderStatus';

export const OrderRow = ({
	id,
	name,
	status,
	createdAt,
	desserts,
}: OrderWithDesserts) => {
	return (
		<tr>
			<td className={styles.col1} data-label='Номер'>
				{id}
			</td>
			<td className={styles.col2} data-label='Название'>
				{name}
			</td>
			<td className={styles.col4} data-label='Статус'>
				{convertOrderStatus(status)}
			</td>
			<td className={styles.col5} data-label='Время создания'>
				{convertDatetimeToString(createdAt)}
			</td>
			<td className={styles.col6} data-label='Цена'>
				{getTotalPrice(desserts.map((d) => d.dessert))}
			</td>
		</tr>
	);
};
